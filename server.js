const express = require("express");
const mercadopago = require("mercadopago");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

app.post("/criar-pagamento", async (req, res) => {
  try {
    const preference = await mercadopago.preferences.create({
      items: req.body.items
    });

    res.json({
      id: preference.body.id,
      init_point: preference.body.init_point
    });

  } catch (error) {
    console.log(error);
    res.status(500).send("Erro ao criar pagamento");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
