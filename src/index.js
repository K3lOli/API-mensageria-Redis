require("dotenv/config");
const express = require("express");
const cors = require("cors");
// const EmailRoutes = require("./routes/email");
// const cors = require("@fastify/cors");
// const formBody = require("@fastify/formbody");
const UserController = require("./controllers/EmailController");

const server = express();

const corsOptions = {
  // credentials: true,
  // origin:  /localhost\:5173/,
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Permite incluir cookies na solicitação (se necessário)
  optionsSuccessStatus: 204,
};

server.use(cors(corsOptions));
// server.register(cors, corsOptions);
// server.register(formBody);

// server.register(EmailRoutes);
server.use(express.json());

server.post("/send", UserController.sendEmail);

server.listen(
  {
    port: process.env.PORT || 3333,
  },
  () => console.log("Server is running")
);
