import Stripe from 'stripe';

const stripeKey = process.env.STRIPE_SECRET_KEY || '';
export const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
});

export const createCheckoutSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  customerId?: string,
  customerEmail?: string
) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cancel`,
      customer: customerId,
      customer_email: !customerId ? customerEmail : undefined,
      metadata: {
        timestamp: new Date().toISOString(),
      },
    });
    return session;
  } catch (error) {
    console.error('Stripe error:', error);
    throw error;
  }
};

export const retrieveSession = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'line_items'],
    });
    return session;
  } catch (error) {
    console.error('Error retrieving session:', error);
    throw error;
  }
};
