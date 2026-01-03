export async function handler() {
  const response = await fetch("https://api.mercadopago.com/v1/payments", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      transaction_amount: 4.50,
      payment_method_id: "pix",
      description: "Plano mensal"
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      copiaecola: data.point_of_interaction.transaction_data.qr_code
    })
  };
}
