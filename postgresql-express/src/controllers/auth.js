const pool = require("../db/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// --- Query Tool in SQL --- //
/* 
CREATE TABLE roles (
    role VARCHAR(7) NOT NULL PRIMARY KEY
);

INSERT INTO roles(role) VALUES ('DOCTOR');
INSERT INTO roles(role) VALUES ('PATIENT');
*/

/*
CREATE TABLE users
(
id SERIAL NOT NULL,
username VARCHAR(20) NOT NULL,
hash TEXT NOT NULL,
full_name VARCHAR(50) NOT NULL,
date_of_birth DATE NOT NULL,
contact CHAR(8) NOT NULL,
address TEXT NOT NULL,
role VARCHAR(7) NOT NULL DEFAULT 'PATIENT',
pending_approval BOOLEAN NOT NULL DEFAULT FALSE,
PRIMARY KEY (id),
FOREIGN KEY (role) REFERENCES roles(role)
);
*/

const getRoles = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const queryText = "SELECT * FROM roles";
    const allRoles = await client.query(queryText);

    await client.query("COMMIT");

    return res.status(200).json(allRoles.rows);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error in getting roles." });
  } finally {
    client.release();
  }
};

const getUsers = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const allUsers = await client.query("SELECT * FROM users");

    await client.query("COMMIT");

    return res.status(200).json(allUsers.rows);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error in getting users." });
  } finally {
    client.release();
  }
};

const register = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const auth = await client.query("SELECT * FROM users WHERE username = $1", [
      req.body.username,
    ]);
    console.log(auth.rows);
    if (auth.rows.length === 1) {
      return res
        .status(400)
        .json({ status: "error", msg: "Username already exists." });
    }

    const hash = await bcrypt.hash(req.body.password, 12);

    await client.query(
      `INSERT INTO users(username, hash, full_name, date_of_birth, contact, address, role) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        req.body.username,
        hash,
        req.body.fullName,
        req.body.dateOfBirth,
        req.body.contact,
        req.body.address,
        req.body.role,
      ]
    );

    await client.query("COMMIT");

    return res.status(200).json({ status: "ok", msg: "User created." });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Invalid registration." });
  } finally {
    client.release();
  }
};

module.exports = { getRoles, getUsers, register };
