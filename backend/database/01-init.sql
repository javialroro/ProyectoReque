GRANT ALL PRIVILEGES ON snupie_bd.* TO 'myuser'@'%';
FLUSH PRIVILEGES;

CREATE DATABASE snupie_bd;

USE snupie_bd;

CREATE TABLE Proyectos (
    idProyecto INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Nombre NVARCHAR(255),
    recursos_necesarios NVARCHAR(255),
    Presupuesto DOUBLE PRECISION,
    Responsable INT, 
    descripcion NVARCHAR(255),
    fecha_inicio DATE,
    Estado INT

);

CREATE TABLE  Tareas (
    idTarea INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idProyecto INT,
    nombre NVARCHAR(255),
    descripcion NVARCHAR(255),
    idEstado INT,
    idUsuario INT
);

CREATE TABLE HistorialProyecto(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    hora DATETIME,
    descripcion NVARCHAR(255),
    idProyecto INT
    
);

CREATE TABLE Foro(
    idForo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idProyecto INT,
    tema NVARCHAR(255),
    idUsuario INT,
    descripcion NVARCHAR(255)
);

CREATE TABLE ForoComentarios(
    idComentario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idForo INT,
    idUsuario INT,
    mensaje NVARCHAR(255),
    fecha DATETIME
);

CREATE TABLE Rol(
    idRol INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre NVARCHAR(255)
);
    
CREATE TABLE EstadoProyecto(
    idEstado INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre NVARCHAR(255)
);

CREATE TABLE EstadoTarea(
    idEstado INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre NVARCHAR(255)
);

CREATE TABLE EstadoUsuario(
    idEstado INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre NVARCHAR(255)
);

CREATE TABLE  Usuario (
    idUsuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idProyecto INT,
    nombre NVARCHAR(255),
    cedula NVARCHAR(255),
    correoElectronico NVARCHAR(255),
    departamento NVARCHAR(255),
    contrasena NVARCHAR(255),
    idRol INT,
    IdEstado INT
);

CREATE TABLE Reuniones (
    idReunion INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    IdProyecto INT,
    tema NVARCHAR(255),
    fecha DATETIME,
    medio NVARCHAR(255)
);

CREATE TABLE ColaboradoresReuniones(
    idReunion INT,
    idColaborador INT
);

