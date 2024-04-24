const pool = require("../db/db.js");

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

const getUser = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const user = await client.query(
      `
        SELECT * FROM users
        WHERE id = $1
    `,
      [req.params.id]
    );

    await client.query("COMMIT");

    return res.status(200).json(user.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error in getting user with ID ${req.params.id}.`,
    });
  } finally {
    client.release();
  }
};

module.exports = { getUsers, getUser };
