CREATE TABLE Food (
    id int  NOT NULL,
    food_name varchar(100)  NOT NULL,
    price money  NOT NULL,
    image_url text  NOT NULL,
    menus_id char(25)  NOT NULL,
    orders_id char(25)  NOT NULL,
    CONSTRAINT Food_pk PRIMARY KEY  (id)
);

--

CREATE TABLE base_user (
    id char(25)  NOT NULL,
    username varchar(255)  NOT NULL CHECK (LEN(username) >= 3),
    email varchar(255)  NOT NULL CHECK (LEN(email) >= 6),
    password text  NOT NULL,
    is_owner bit  NOT NULL DEFAULT 0 CHECK (is_owner IN (0, 1)),
    CONSTRAINT base_user_pk PRIMARY KEY  (id)
);

--

CREATE TABLE customer (
    id char(25)  NOT NULL,
    base_user_id char(25)  NOT NULL,
    balance money  NOT NULL DEFAULT 0,
    CONSTRAINT customer_pk PRIMARY KEY  (id)
);

--

CREATE TABLE market (
    id char(25)  NOT NULL,
    owner_id char(25)  NOT NULL,
    CONSTRAINT market_pk PRIMARY KEY  (id)
);

--

CREATE TABLE menus (
    id char(25)  NOT NULL,
    owner_id char(25)  NOT NULL,
    market_id char(25)  NOT NULL,
    CONSTRAINT menus_pk PRIMARY KEY  (id)
);

--

CREATE TABLE orders (
    id char(25)  NOT NULL,
    customer_id char(25)  NOT NULL,
    CONSTRAINT orders_pk PRIMARY KEY  (id)
);

--

CREATE TABLE owner (
    id char(25)  NOT NULL,
    base_user_id char(25)  NOT NULL,
    CONSTRAINT owner_pk PRIMARY KEY  (id)
);

--

ALTER TABLE Food ADD CONSTRAINT Food_menus
    FOREIGN KEY (menus_id)
    REFERENCES menus (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

--

ALTER TABLE Food ADD CONSTRAINT Food_orders
    FOREIGN KEY (orders_id)
    REFERENCES orders (id);

--

ALTER TABLE customer ADD CONSTRAINT customer_base_user
    FOREIGN KEY (base_user_id)
    REFERENCES base_user (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

--

ALTER TABLE market ADD CONSTRAINT market_owner
    FOREIGN KEY (owner_id)
    REFERENCES owner (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

--

ALTER TABLE menus ADD CONSTRAINT menus_market
    FOREIGN KEY (market_id)
    REFERENCES market (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

--

ALTER TABLE menus ADD CONSTRAINT menus_owner
    FOREIGN KEY (owner_id)
    REFERENCES owner (id);

--

ALTER TABLE orders ADD CONSTRAINT orders_customer
    FOREIGN KEY (customer_id)
    REFERENCES customer (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;

--

ALTER TABLE owner ADD CONSTRAINT owner_base_user
    FOREIGN KEY (base_user_id)
    REFERENCES base_user (id)
    ON DELETE  CASCADE 
    ON UPDATE  CASCADE;