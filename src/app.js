const express = require("express");
const { exec } = require("node:child_process");
const db = require("./db");

const app = express();
app.use(express.json());

// INTENTIONALLY VULNERABLE: hardcoded fake secret
const API_SECRET = "lab_fake_api_secret_12345";

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// INTENTIONALLY VULNERABLE: SQL injection
app.get("/users", (req, res) => {
  const username = req.query.username || "";

  const query =
    `SELECT id, username FROM users WHERE username = '${username}'`;

  try {
    const users = db.prepare(query).all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Database query failed" });
  }
});

// INTENTIONALLY VULNERABLE: command injection
// Only use this route in the isolated local lab.
app.get("/ping", (req, res) => {
  const host = req.query.host || "127.0.0.1";

  exec(`ping -c 1 ${host}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(400).json({ error: "Command failed" });
    }

    res.json({ output: stdout, error: stderr });
  });
});

// Demonstrates why hardcoded secrets are problematic.
app.get("/internal-config", (req, res) => {
  res.json({ apiSecret: API_SECRET });
});

module.exports = app;