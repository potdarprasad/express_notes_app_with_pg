To install postgres db manager run command:
    npm i pg --save


To Create Database run following commands:
create database notes_app;

create extension if not exists "uuid-ossp";

create table users(
	id uuid default uuid_generate_v4(),
	first_name varchar(50),
	last_name varchar(50),
	email varchar(100) unique not null,
	password varchar(100),
	primary key(id)
);
