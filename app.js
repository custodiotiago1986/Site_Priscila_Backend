const createError = require("http-errors");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { format } = require("date-fns");
const cors = require('cors'); // Importa o middleware CORS

const configData = require("./connection"); // Ajustado para o novo modelo
const userRouter = require('./routes/users');

async function getApp() {

  // Conectar ao banco de dados
  var connectionInfo = await configData.getConnectionInfo();
  mongoose.connect(connectionInfo.DATABASE_URL);

  const app = express();

  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);

  // Configuração do motor de visualização
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");

  // Configuração CORS
  app.use(cors());

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.locals.format = format;

  // Configurar rotas
  app.use("/users", userRouter);

  // Captura 404 e encaminha para o manipulador de erros
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // Manipulador de erros
  app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    res.status(err.status || 500);
    res.render("error");
  });

  return app;
}

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

module.exports = {
  getApp
};