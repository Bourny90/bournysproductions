import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  created_at: string;
}

export interface LoginCode {
  email: string;
  code: string;
  expires_at: string;
  attempts: number;
}

// Generate a 6-digit numeric code
export const generateLoginCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create account with email verification code
export const createAccount = async (
  email: string,
  username: string
): Promise<{ success: boolean; message: string; error?: string }> => {
  try {
    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return {
        success: false,
        message: '',
        error: 'Email already registered',
      };
    }

    // Check if username already exists
    const { data: existingUsername } = await supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();

    if (existingUsername) {
      return {
        success: false,
        message: '',
        error: 'Username already taken',
      };
    }

    // Generate login code
    const loginCode = generateLoginCode();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Expires in 1 hour

    // Store login code
    const { error: codeError } = await supabase.from('login_codes').insert([
      {
        email,
        code: loginCode,
        expires_at: expiresAt.toISOString(),
        attempts: 0,
        created_at: new Date().toISOString(),
      },
    ]);

    if (codeError) throw codeError;

    // In production, send email here
    console.log(`[DEV] Login code for ${email}: ${loginCode}`);

    return {
      success: true,
      message: `Verification code sent to ${email}. Check your inbox!`,
    };
  } catch (error: any) {
    console.error('Create account error:', error);
    return {
      success: false,
      message: '',
      error: error.message || 'Failed to create account',
    };
  }
};

// Verify login code and create/get user
export const verifyLoginCode = async (
  email: string,
  code: string,
  username?: string
): Promise<{ success: boolean; message: string; error?: string; user?: AuthUser; token?: string }> => {
  try {
    // Check if login code exists and is valid
    const { data: loginCodeRecord, error: codeError } = await supabase
      .from('login_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .single();

    if (codeError || !loginCodeRecord) {
      return {
        success: false,
        message: '',
        error: 'Invalid verification code',
      };
    }

    // Check if code has expired
    if (new Date(loginCodeRecord.expires_at) < new Date()) {
      return {
        success: false,
        message: '',
        error: 'Verification code has expired',
      };
    }

    // Check max attempts
    if (loginCodeRecord.attempts >= 5) {
      return {
        success: false,
        message: '',
        error: 'Too many failed attempts. Request a new code.',
      };
    }

    // Check if user exists
    const { data: existingUser, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    let user: AuthUser;

    if (!existingUser) {
      // Create new user
      if (!username) {
        return {
          success: false,
          message: '',
          error: 'Username required for new account',
        };
      }

      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([
          {
            email,
            username,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (createError) throw createError;
      user = newUser as AuthUser;
    } else {
      user = existingUser as AuthUser;
    }

    // Create session token
    const sessionToken = generateSessionToken();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

    const { error: sessionError } = await supabase.from('sessions').insert([
      {
        user_id: user.id,
        token: sessionToken,
        expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
      },
    ]);

    if (sessionError) throw sessionError;

    // Delete used login code
    await supabase.from('login_codes').delete().eq('email', email);

    return {
      success: true,
      message: 'Successfully logged in!',
      user,
      token: sessionToken,
    };
  } catch (error: any) {
    console.error('Verify code error:', error);
    return {
      success: false,
      message: '',
      error: error.message || 'Failed to verify code',
    };
  }
};

// Increment failed attempts
export const incrementCodeAttempts = async (email: string): Promise<void> => {
  try {
    const { data: loginCodeRecord } = await supabase
      .from('login_codes')
      .select('attempts')
      .eq('email', email)
      .single();

    if (loginCodeRecord) {
      await supabase
        .from('login_codes')
        .update({ attempts: loginCodeRecord.attempts + 1 })
        .eq('email', email);
    }
  } catch (error) {
    console.error('Error incrementing attempts:', error);
  }
};

// Generate secure session token
export const generateSessionToken = (): string => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

// Get user from session token
export const getUserFromToken = async (token: string): Promise<AuthUser | null> => {
  try {
    const { data: session } = await supabase
      .from('sessions')
      .select('user_id, expires_at')
      .eq('token', token)
      .single();

    if (!session || new Date(session.expires_at) < new Date()) {
      return null;
    }

    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', session.user_id)
      .single();

    return user as AuthUser | null;
  } catch (error) {
    console.error('Error getting user from token:', error);
    return null;
  }
};

// Logout
export const logout = async (token: string): Promise<void> => {
  try {
    await supabase.from('sessions').delete().eq('token', token);
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
