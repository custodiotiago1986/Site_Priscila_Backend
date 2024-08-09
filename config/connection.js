require("dotenv").config();
const mongoose = require("mongoose");

async function getConnectionInfo() {
  const DATABASE_URL = process.env.DATABASE_URL;
  const DATABASE_NAME = process.env.DATABASE_NAME || "azure-todo-app";

  if (!DATABASE_URL) {
    throw new Error("No value in DATABASE_URL in env var");
  }

  return {
    DATABASE_URL,
    DATABASE_NAME
  };
}

module.exports = {
  getConnectionInfo
};