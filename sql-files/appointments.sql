CREATE TABLE appointments
(
id SERIAL NOT NULL,
doctor_id SERIAL NOT NULL,
patient_id SERIAL NOT NULL,
time TIME NOT NULL,
date DATE NOT NULL,
status VARCHAR(9) NOT NULL DEFAULT 'PENDING',
PRIMARY KEY (id),
FOREIGN KEY (doctor_id) REFERENCES users(id),
FOREIGN KEY (patient_id) REFERENCES users(id),
FOREIGN KEY (status) REFERENCES appointment_status(status)
);

SELECT * FROM appointments;