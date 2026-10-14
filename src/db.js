const Database = require("better-sqlite3");

const db = new Database(":memory:");

db.exec(`
  CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL
  );

  INSERT INTO users (username, password)
  VALUES
    ('alice', 'demo-password-1'),
    ('bob', 'demo-password-2');
`);

module.exports = db;