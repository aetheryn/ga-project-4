const pool = require("../db/db.js");

const getAppointments = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const allAppointments = await client.query("SELECT * FROM appointments");

    await client.query("COMMIT");

    return res.status(200).json(allAppointments.rows);
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

const seedAppointments = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query("DELETE FROM appointments");

    await client.query(
      `
                INSERT INTO appointments(
                    doctor_id, patient_id, time, date
                ) VALUES ('4', '5', '18:00:000', '2024-05-05')
                `
    );

    await client.query(
      `
                  INSERT INTO appointments(
                      doctor_id, patient_id, time, date
                  ) VALUES ('14', '15', '12:30:000', '2024-05-02')
                  `
    );

    await client.query(
      `
                  INSERT INTO appointments(
                      doctor_id, patient_id, time, date
                  ) VALUES ('4', '19', '12:00:000', '2024-05-03')
  
                  `
    );

    await client.query("COMMIT");

    return res.status(200).json("Appointments seeded.");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error in seeding appointments." });
  } finally {
    client.release();
  }
};

const addAppointment = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // if (req.body.patientId != req.decoded.id) {
    //   return res.status(401).json({ status: "error", msg: "Unauthorised." });
    // }

    await client.query(
      `
              INSERT INTO appointments(
                  doctor_id, patient_id, time, date
              ) VALUES ($1, $2, $3, $4)
              `,
      [req.body.doctorId, req.body.patientId, req.body.time, req.body.date]
    );

    await client.query("COMMIT");

    return res
      .status(200)
      .json(
        `Appointment added for Patient ${req.body.patientId} with Doctor ${req.body.doctorId}.`
      );
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res
      .status(400)
      .json({ status: "error", msg: "Error in creating appointment." });
  } finally {
    client.release();
  }
};

const updateAppointmentStatus = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const detail = await client.query(
      `
            SELECT * FROM appointments
            WHERE id = $1
        `,
      [req.params.id]
    );

    // if (detail.rows[0].patient_id != req.decoded.id) {
    //   return res.status(401).json({ status: "error", msg: "Unauthorised." });
    // }

    await client.query(
      `
      UPDATE appointments
      SET status = $1
      WHERE id = $2
      `,
      [req.body.status, req.params.id]
    );

    await client.query("COMMIT");
    return res.status(200).json(`Appointment status updated.`);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);

    return res
      .status(400)
      .json({ status: "error", msg: "Error in updating appointment status." });
  } finally {
    client.release();
  }
};

const deleteAppointment = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const record = await client.query(
      `
            SELECT * FROM appointments
            WHERE id = $1
        `,
      [req.params.id]
    );

    // if (record.rows[0].doctor_id != req.decoded.id) {
    //   return res.status(401).json({ status: "error", msg: "Unauthorised." });
    // }

    await client.query(
      `
      DELETE FROM appointments
      WHERE id = $1
      `,
      [req.params.id]
    );

    await client.query("COMMIT");
    return res.status(200).json("Appointment deleted.");
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res.status(400).json("Error in deleting.");
  } finally {
    client.release();
  }
};

const getAppointmentsByDoctor = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const details = await client.query(
      `
            SELECT * FROM appointments
            WHERE doctor_id = $1
        `,
      [req.params.id]
    );

    await client.query("COMMIT");
    return res.status(200).json(details.rows);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error in getting records for doctor ${req.params.id}.`,
    });
  } finally {
    client.release();
  }
};

const getUpcomingAppointmentsByDoctor = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const details = await client.query(
      `
              SELECT * FROM appointments
              WHERE doctor_id = $1 AND status = 'PENDING'
          `,
      [req.params.id]
    );

    await client.query("COMMIT");
    return res.status(200).json(details.rows);
  } catch (error) {
    await client.query("ROLLBACK");

    console.error(error.message);
    return res.status(400).json({
      status: "error",
      msg: `Error in getting records for doctor ${req.params.id}.`,
    });
  } finally {
    client.release();
  }
};

const getAppointmentsByPatient = async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const details = await client.query(
      `
              SELECT * FROM appointments
              WHERE patient_id = $1
          `,
      [req.params.id]
    );

    await client.query("COMMIT");
    return res.status(200).json(details.rows);
  } catch (error) {
    await client.query("ROLLBACK");

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
  getAppointments,
  addAppointment,
  seedAppointments,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentsByDoctor,
  getUpcomingAppointmentsByDoctor,
  getAppointmentsByPatient,
};
