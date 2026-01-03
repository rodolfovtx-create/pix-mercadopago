export async function handler(event) {
  console.log("Webhook recebido:", event.body);
  return { statusCode: 200 };
}
