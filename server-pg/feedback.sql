CREATE TABLE feedbacks (
    id integer GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    created timestamp with time zone NOT NULL,
    name text,
    email text,
    description text,
    type text
);

CREATE TABLE configuration (
    name text,
    max integer not null,
    min integer not null,
    speed integer not null
);

insert into configuration values ('device1', 100, 10, 54);
insert into configuration values ('device2', 60, 0, 10);
insert into configuration values ('device3', 60, 30, 40);
insert into configuration values ('device4', 34, 10, 20);