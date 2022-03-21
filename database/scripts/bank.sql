CREATE TABLE clients
(
    id serial NOT NULL PRIMARY KEY,
    name varchar NOT NULL,
    address varchar NOT NULL,
    phone varchar NOT NULL UNIQUE,
)


CREATE TABLE cakes
(
    id serial NOT NULL PRIMARY KEY,
    name varchar NOT NULL,
    price numeric NOT NULL,
    image varchar NOT NULL,
    description TEXT NOT NULL,
)


CREATE TABLE orders
(
    id serial NOT NULL PRIMARY KEY,
    clientId integer NOT NULL REFERENCES clients(id),
    cakeId integer NOT NULL REFERENCES cakes(id),
    quantity integer NOT NULL,
    createdAt DATE NOT NULL,
    totalPrice numeric NOT NULL,
)
