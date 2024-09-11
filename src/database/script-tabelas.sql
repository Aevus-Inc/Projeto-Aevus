create database if not exists aevus;
use aevus;

create table if not exists empresa (
id int primary key auto_increment,
cnpj char(14) not null,
email varchar(100) not null,
senha varchar(30) not null,

constraint uk_email unique (email),
constraint uk_cpj unique (cnpj)
);