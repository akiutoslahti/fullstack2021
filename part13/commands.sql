create database blogdb;
create user bloguser with encrypted password 'blogpasswd';
grant all privileges on database blogdb to bloguser;

create table blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (author, url, title) values ('Dan Abramov', 'https://overreacted.io/on-let-vs-const/', 'On let vs const');
insert into blogs (author, url, title) values ('Laurenz Albe', 'https://www.cybertec-postgresql.com/en/gaps-in-sequences-postgresql/', 'Gaps in sequences in PostgreSQL');
