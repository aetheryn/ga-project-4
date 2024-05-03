CREATE TABLE appointment_status (
	status VARCHAR(9) NOT NULL PRIMARY KEY
);

INSERT INTO appointment_status(status) VALUES ('PENDING');
INSERT INTO appointment_status(status) VALUES ('COMPLETED');
INSERT INTO appointment_status(status) VALUES ('MISSED');

SELECT * FROM appointments;