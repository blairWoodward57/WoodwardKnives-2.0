CREATE TABLE IF NOT EXISTS KnifeUsers (
    id serial primary key,
    firstName varchar(25),
    lastName varchar(25),
    isAdmin boolean,
    auth_id text,
    userImg text,
    address_1 VARCHAR(300),
    address_2 VARCHAR(300),
    address_3 VARCHAR(300),
    address_4 VARCHAR(300)
)