create database dbrest;

use dbrest;

-- user table
create table usuario(
    id_usuario int(11) not null,
    email varchar(100) default '' not null,
    senha varchar(100) default '' not null,
);

alter table usuario
    add primary key (id_usuario);

alter table usuario
    modify id_usuario int(11) not null auto_increment, auto_increment = 2;

-- links tables
create table produtos (
    id_produto int(11) not null,
    nome varchar(150) default '' not null,
    preco double default 0 not null,
);

alter table produtos
    add primary key (id_produto);

alter table produtos
    modify id_produto int(11) not null auto_increment, auto_increment = 2;