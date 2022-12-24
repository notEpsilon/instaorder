CREATE TABLE users (
    id char(25)  NOT NULL,
    username varchar(255)  NOT NULL UNIQUE CHECK (LEN(username) >= 3),
    email varchar(255)  NOT NULL UNIQUE CHECK (LEN(email) >= 6),
    password text  NOT NULL,
    is_owner tinyint  NOT NULL DEFAULT 0 CHECK (is_owner IN (0, 1)),
    CONSTRAINT users_pk PRIMARY KEY  (id)
);
