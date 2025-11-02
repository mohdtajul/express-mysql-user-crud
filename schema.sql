show tables;

create table user(
    id int primary key,
    username varchar(38) not null,
    email varchar(28) unique not null,
    password varchar(22) not null
)