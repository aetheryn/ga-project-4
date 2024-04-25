const pool = require("../db/db.js");

// Query Tool in SQL //
/*
CREATE TABLE visit_details
(
id SERIAL NOT NULL,
doctor_id SERIAL NOT NULL,
patient_id SERIAL NOT NULL,
subjective TEXT,
objective TEXT,
assessment TEXT,
plan TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id),
FOREIGN KEY (doctor_id) REFERENCES users(id),
FOREIGN KEY (patient_id) REFERENCES users(id)
);
*/

const getDetails = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const allDetails = await client.query("SELECT * FROM visit_details");

    await client.query("COMMIT");

    return res.status(200).json(allDetails.rows);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error in getting visit details." });
  } finally {
    client.release();
  }
};

const addDetails = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    if (req.body.doctorId != req.decoded.id) {
      return res.status(401).json({ status: "error", msg: "Unauthorised." });
    }

    await client.query(
      `
            INSERT INTO visit_details(
                doctor_id, patient_id, subjective, objective, assessment, plan
            ) VALUES ($1, $2, $3, $4, $5, $6)
            `,
      [
        req.body.doctorId,
        req.body.patientId,
        req.body.subjective,
        req.body.objective,
        req.body.assessment,
        req.body.plan,
      ]
    );

    await client.query("COMMIT");

    return res
      .status(200)
      .json(
        `Visit details added for Patient ${req.body.patientId} by Doctor ${req.body.doctorId}`
      );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error in adding visit details." });
  } finally {
    client.release();
  }
};

const updateDetails = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const detail = await client.query(
      `
            SELECT * FROM visit_details
            WHERE id = $1
        `,
      [req.params.id]
    );

    if (detail.rows[0].doctor_id != req.decoded.id) {
      return res.status(401).json({ status: "error", msg: "Bleh." });
    }

    await client.query(
      `
      UPDATE visit_details
      SET subjective = $1, objective = $2, assessment = $3, plan = $4
      WHERE patient_id = $5 AND id = $6
      `,
      [
        req.body.subjective,
        req.body.objective,
        req.body.assessment,
        req.body.plan,
        req.body.patientId,
        req.params.id,
      ]
    );

    await client.query("COMMIT");
    return res
      .status(200)
      .json(
        `Visit details updated for Patient ${req.body.patientId} on ${detail.rows[0].created_at}.`
      );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);

    return res
      .status(400)
      .json({ status: "error", msg: "Error in updating visit details." });
  } finally {
    client.release();
  }
};

module.exports = { getDetails, addDetails, updateDetails };
