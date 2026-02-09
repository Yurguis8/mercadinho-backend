const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

app.post("/create-payment", async (req, res) => {
  try {
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            title: "Compra Mercadinho",
            quantity: 1,
            unit_price: req.body.amount
          }
        ]
      }
    });

    res.json({
      init_point: result.init_point
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar pagamento" });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
