const createPaymentIntent = async (amount) => {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });

  return response.json();
};

export default {
  createPaymentIntent,
};
