CREATE TABLE users
(
id SERIAL NOT NULL,
username VARCHAR(20) NOT NULL,
hash TEXT NOT NULL,
full_name VARCHAR(50) NOT NULL,
date_of_birth DATE NOT NULL,
contact CHAR(8) NOT NULL,
address TEXT NOT NULL,
role VARCHAR(7) NOT NULL DEFAULT 'PATIENT',
pending_approval BOOLEAN NOT NULL DEFAULT FALSE,
PRIMARY KEY (id),
FOREIGN KEY (role) REFERENCES roles(role)
);

INSERT INTO users(username, hash, full_name, date_of_birth, contact, address, role) 
	VALUES ('doctorone', '123', 'Doctor One', '1 Jan 1961', '88888888', 'Singapore 000000', 'DOCTOR');

SELECT * FROM users;