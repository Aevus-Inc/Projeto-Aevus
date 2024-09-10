create database aevus;
use aevus;

create table empresa (
id int primary key auto_increment,
cnpj char(14),
email varchar(100),
senha varchar(30),

constraint uk_email unique (email),
constraint uk_cpj unique (cnpj)
);