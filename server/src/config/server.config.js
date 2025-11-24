const morgan = require("morgan");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const removeXPoweredByHeader = require("../middleware/removeHeader");

const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:4173"],
  credentials: true,
};

const serverConfig = (app) => {
  app.use(morgan("dev"));
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(removeXPoweredByHeader); // кастомная миддлварка, чтобы срезать заголовок X-Powered-By
  app.use(express.static(path.join(__dirname, "../public"))); // статика - для раздачи картинок, текстов, звуков и т.д.
};

module.exports = serverConfig;
