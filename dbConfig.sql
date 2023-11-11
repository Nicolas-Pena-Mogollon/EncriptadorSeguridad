ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'Seguridad2023.';
FLUSH PRIVILEGES;
-- Crear la base de datos si aún no existe
CREATE DATABASE IF NOT EXISTS cifrado;

-- Usar la base de datos
USE cifrado;

-- Crear la tabla para almacenar información de usuarios
CREATE TABLE usuarios (
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

-- Insertar un usuario de ejemplo
INSERT INTO usuarios (username, password) VALUES ('usuario1', '$2b$12$LUIjpFoeHpTj5IrPMHFQV.AXKSHfRLIdC6w6HwmJ7nMFK1j03I25G');
INSERT INTO usuarios (username, password) VALUES ('usuario2', '$2b$12$0BgUl3Ae7JDPi/rou5MGa.bzlsQ7AuKshllEqEmsL8wkaB0F1852y');
INSERT INTO usuarios (username, password) VALUES ('usuario3', '$2b$12$1pt6MD/9Ji3x4gaFZ16YWemjWXgXodkCX9/eNz3oZWOR0ovGn0nDW');

-- Puedes agregar más usuarios según sea necesario

CREATE USER 'cifrado'@'localhost' IDENTIFIED BY 'Cifrado2023.';
GRANT ALL PRIVILEGES ON cifrado.* TO 'cifrado'@'localhost';
FLUSH PRIVILEGES;