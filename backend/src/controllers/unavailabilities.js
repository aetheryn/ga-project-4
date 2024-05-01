const pool = require("../db/db.js");

const getUnavailibilities = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const allUnavailabilities = await client.query(
      "SELECT * FROM unavailabilities"
    );

    await client.query("COMMIT");

    return res.status(200).json(allUnavailabilities.rows);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error in getting appointments." });
  } finally {
    client.release();
  }
};

module.exports = { getUnavailibilities };
