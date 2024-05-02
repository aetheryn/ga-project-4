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
    const allDetails = await client.query(`SELECT * FROM visit_details`);

    return res.status(200).json(allDetails.rows);
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error in getting visit details." });
  } finally {
    client.release();
  }
};

// Only the logged-in 'DOCTOR' can add a record //
const addDetails = async (req, res) => {
  const client = await pool.connect();

  try {
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

    return res
      .status(200)
      .json(
        `Visit details added for Patient ${req.body.patientId} by Doctor ${req.body.doctorId}`
      );
  } catch (error) {
    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error in adding visit details." });
  } finally {
    client.release();
  }
};

// Only the logged-in 'DOCTOR' can update a record that was created by them //
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
      return res.status(401).json({ status: "error", msg: "Blah." });
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

// Only the logged-in 'DOCTOR' can delete a record that was created by them //
const deleteDetails = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const record = await client.query(
      `
            SELECT * FROM visit_details
            WHERE id = $1
        `,
      [req.params.id]
    );

    if (record.rows[0].doctor_id != req.decoded.id) {
      return res.status(401).json({ status: "error", msg: "Bleh." });
    }

    await client.query(
      `
      DELETE FROM visit_details
      WHERE id = $1
      `,
      [req.params.id]
    );

    await client.query("COMMIT");
    return res.status(200).json("Record deleted.");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res.status(400).json("Error in deleting.");
  } finally {
    client.release();
  }
};

// Either a logged-in 'DOCTOR' OR THE logged-in 'PATIENT' can access the 'PATIENT' records //
const getDetailsByPatient = async (req, res) => {
  const client = await pool.connect();

  try {
    const details = await client.query(
      `
            SELECT * FROM visit_details
            WHERE patient_id = $1
        `,
      [req.params.id]
    );

    if (req.decoded.role !== "DOCTOR" && req.decoded.id != req.params.id) {
      return res.status(401).json({ status: "error", msg: "Testing." });
    }
    return res.status(200).json(details.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error in getting records for patient ${req.params.id}.`,
    });
  } finally {
    client.release();
  }
};

module.exports = {
  getDetails,
  addDetails,
  updateDetails,
  deleteDetails,
  getDetailsByPatient,
};
