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

const register = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const auth = await client.query("SELECT * FROM users WHERE username = $1", [
      req.body.username,
    ]);

    if (auth.rows.length === 1) {
      return res
        .status(400)
        .json({ status: "error", msg: "Username already exists." });
    }

    const hash = await bcrypt.hash(req.body.password, 12);

    await client.query(
      `INSERT INTO users(username, hash, full_name, date_of_birth, contact, address, role) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        `,
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

const login = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const auth = await client.query(
      `
      SELECT * FROM users
      WHERE username = $1
      `,
      [req.body.username]
    );

    console.log(auth.rows);

    if (auth.rows.length === 0) {
      return res.status(400).json({ status: "error", msg: "Not authorised." });
    }

    const result = await bcrypt.compare(req.body.password, auth.rows[0].hash);

    if (!result) {
      console.error("Username or password error.");
      return res.status(401).json({ status: "error", msg: "Login failed." });
    }

    const claims = {
      username: auth.rows[0].username,
      fullName: auth.rows[0].full_name,
      dateOfBirth: auth.rows[0].date_of_birth,
      contact: auth.rows[0].contact,
      address: auth.rows[0].address,
      role: auth.rows[0].role,
      pendingApproval: auth.rows[0].pending_approval,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: "30d",
      jwtid: uuidv4(),
    });

    await client.query("COMMIT");

    return res.status(200).json({ access, refresh });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    res.status(400).json({ status: "error", msg: "Login failed." });
  } finally {
    client.release();
  }
};

const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const claims = {
      username: decoded.username,
      fullName: decoded.fullName,
      dateOfBirth: decoded.dateOfBirth,
      contact: decoded.contact,
      address: decoded.address,
      role: decoded.role,
      pendingApproval: decoded.pendingApproval,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    return res.status(200).json({ access });
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Refreshing token failed." });
  }
};

module.exports = { register, login, refresh };
