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

const seedUnavailabilities = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM unavailabilities");

    await client.query(
      `
                INSERT INTO unavailabilities(
                    doctor_id, time, date
                ) VALUES ('4', '12:00:000', '2024-05-02')
                `
    );

    await client.query(
      `
                  INSERT INTO unavailabilities(
                      doctor_id, time, date
                  ) VALUES ('14', '09:30:000', '2024-05-01')
                  `
    );

    await client.query(
      `
                  INSERT INTO unavailabilities(
                      doctor_id, time, date
                  ) VALUES ('4', '17:20:000', '2024-06-03')
  
                  `
    );

    await client.query("COMMIT");

    return res.status(200).json("Unavailabilities seeded.");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error in seeding unavailabilities." });
  } finally {
    client.release();
  }
};

const addUnavailabilities = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `
                  INSERT INTO unavailabilities(
                      doctor_id, time, date
                  ) VALUES ($1, $2, $3)
                  `,
      [req.body.doctorId, req.body.time, req.body.date]
    );

    await client.query("COMMIT");

    return res.status(200).json("Added.");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res.status(400).json({ status: "error", msg: "Error in adding." });
  } finally {
    client.release();
  }
};

const removeUnavailabilities = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const timeslot = await client.query(
      `
              SELECT * FROM unavailabilities
              WHERE id = $1
          `,
      [req.params.id]
    );

    // if (timeslot.rows[0].doctor_id != req.decoded.id) {
    //   return res.status(401).json({ status: "error", msg: "Unauthorised." });
    // }

    await client.query(
      `
        DELETE FROM unavailabilities
        WHERE id = $1
        `,
      [req.params.id]
    );

    await client.query("COMMIT");
    return res.status(200).json("Timeslot has become available.");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res.status(400).json("Error in deleting your unavailabiltiy.");
  } finally {
    client.release();
  }
};

const getUnavailabilitiesByDoctor = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const slot = await client.query(
      `
            SELECT * FROM unavailabilities
            WHERE doctor_id = $1
        `,
      [req.params.id]
    );

    await client.query("COMMIT");
    return res.status(200).json(slot.rows);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error in getting unavailabilities for doctor ${req.params.id}.`,
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getUnavailibilities,
  seedUnavailabilities,
  addUnavailabilities,
  removeUnavailabilities,
  getUnavailabilitiesByDoctor,
};
