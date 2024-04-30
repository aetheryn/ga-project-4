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

const getUserByFullname = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const user = await client.query(
      `
    SELECT id FROM users
    WHERE full_name = $1
    `,
      [req.body.fullName]
    );

    await client.query("COMMIT");

    return res.status(200).json(user.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error in getting user ${req.body.fullName}.`,
    });
  } finally {
    client.release();
  }
};

const updateUser = async (req, res) => {
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

    if (user.rows[0].username !== req.decoded.username) {
      return res.status(401).json({ status: "error", msg: "Unauthorised." });
    }

    for (const attributes in req.body) {
      await client.query(
        `
              UPDATE users
              SET ${attributes} = $1 
              WHERE id = $2
              `,
        [req.body[attributes], req.params.id]
      );
    }

    await client.query("COMMIT");

    return res.status(200).json(`User ${req.params.id} updated successfully.`);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error to update user." });
  } finally {
    client.release();
  }
};

const deleteUser = async (req, res) => {
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

    if (req.decoded.role !== "DOCTOR") {
      return res.status(401).json({ status: "error", msg: "Unauthorised." });
    }

    await client.query(
      `
        DELETE FROM users
        WHERE id = $1
    `,
      [req.params.id]
    );

    await client.query("COMMIT");
    return res.status(200).json("User deleted.");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error to delete user." });
  } finally {
    client.release();
  }
};

module.exports = {
  getUsers,
  getUser,
  getUserByFullname,
  updateUser,
  deleteUser,
};
