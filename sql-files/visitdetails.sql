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