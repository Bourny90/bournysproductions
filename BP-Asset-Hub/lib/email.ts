import nodemailer from 'nodemailer';

// Create transporter (use your email service)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendLoginCodeEmail = async (
  email: string,
  code: string,
  username?: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const subject = username ? 'Welcome to BP Asset Hub - Verify Your Account' : 'Your BP Asset Hub Login Code';
    const htmlContent = username
      ? `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background-color: #050505; color: #fff; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 20px; border-radius: 8px; text-align: center; }
              .content { background-color: #121212; padding: 20px; border-radius: 8px; margin-top: 20px; }
              .code-box { background-color: #0a0a0a; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
              .code { font-size: 32px; font-weight: bold; color: #dc2626; letter-spacing: 5px; }
              .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Welcome to BP Asset Hub</h1>
              </div>
              <div class="content">
                <p>Hi ${username},</p>
                <p>Thanks for creating your BP Asset Hub account! Here's your verification code:</p>
                <div class="code-box">
                  <div class="code">${code}</div>
                </div>
                <p>This code expires in 1 hour. Enter it on the verification page to complete your signup.</p>
                <p>If you didn't create this account, you can ignore this email.</p>
              </div>
              <div class="footer">
                <p>© 2024 Bournys Productions. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `
      : `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background-color: #050505; color: #fff; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 20px; border-radius: 8px; text-align: center; }
              .content { background-color: #121212; padding: 20px; border-radius: 8px; margin-top: 20px; }
              .code-box { background-color: #0a0a0a; border: 2px solid #dc2626; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
              .code { font-size: 32px; font-weight: bold; color: #dc2626; letter-spacing: 5px; }
              .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>BP Asset Hub Login</h1>
              </div>
              <div class="content">
                <p>Here's your login code:</p>
                <div class="code-box">
                  <div class="code">${code}</div>
                </div>
                <p>This code expires in 1 hour. Enter it on the login page to access your account.</p>
                <p>If you didn't request this code, you can safely ignore this email.</p>
              </div>
              <div class="footer">
                <p>© 2024 Bournys Productions. All rights reserved.</p>
              </div>
            </div>
          </body>
        </html>
      `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

export const sendDownloadLinkEmail = async (
  email: string,
  productName: string,
  downloadLink: string,
  expiresIn: string = '7 days'
): Promise<{ success: boolean; error?: string }> => {
  try {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #050505; color: #fff; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 20px; border-radius: 8px; text-align: center; }
            .content { background-color: #121212; padding: 20px; border-radius: 8px; margin-top: 20px; }
            .download-btn { background-color: #dc2626; color: white; padding: 15px 40px; border-radius: 8px; text-decoration: none; display: inline-block; font-weight: bold; margin: 20px 0; }
            .download-btn:hover { background-color: #b91c1c; }
            .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Your Download is Ready</h1>
            </div>
            <div class="content">
              <p>Your purchase of <strong>${productName}</strong> is ready to download!</p>
              <p>Use the button below to download your file. This link expires in ${expiresIn}.</p>
              <center>
                <a href="${downloadLink}" class="download-btn">Download Now</a>
              </center>
              <p>If the button doesn't work, copy and paste this link into your browser:</p>
              <p style="word-break: break-all; background-color: #0a0a0a; padding: 10px; border-radius: 4px;">${downloadLink}</p>
              <p>If you have any issues, contact our support team.</p>
            </div>
            <div class="footer">
              <p>© 2024 Bournys Productions. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: `Download: ${productName} - BP Asset Hub`,
      html: htmlContent,
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error sending download email:', error);
    return { success: false, error: error.message };
  }
};
