CREATE TABLE  users (
	username VARCHAR(16) PRIMARY KEY,
	password VARCHAR(50) NOT NULL
);

CREATE TABLE messages (
	msg_id SERIAL PRIMARY KEY,
	message VARCHAR(160) NOT NULL,
	sender VARCHAR(16) NOT NULL,
	date TIMESTAMPTZ NOT NULL,
	FOREIGN KEY (sender)
		REFERENCES users (username)
);