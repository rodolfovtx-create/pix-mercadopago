import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// 🔓 LIBERA CORS (ESSENCIAL)
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API PIX Mercado Pago funcionando ✅");
});

app.post("/pix", async (req, res) => {
  const { valor, descricao } = req.body;

  if (!valor || Number(valor) < 1) {
    return res.status(400).json({ erro: "Valor mínimo é R$ 1,00" });
  }

  try {
    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        transaction_amount: Number(valor),
        description: descricao || "Pagamento PIX",
        payment_method_id: "pix",
        payer: {
          email: "cliente@email.com"
        }
      })
    });

    const data = await response.json();

    res.json({
      copia_e_cola: data.point_of_interaction.transaction_data.qr_code,
      qr_code_base64: data.point_of_interaction.transaction_data.qr_code_base64
    });

  } catch (e) {
    res.status(500).json({ erro: "Erro ao gerar PIX" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
      
