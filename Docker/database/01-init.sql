-- Crear la base de datos
CREATE DATABASE snupie_bd;

-- Usar la base de datos creada
USE snupie_bd;

-- Crear la tabla "Foro"
CREATE TABLE  Foro (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    proyecto INT,
    tema VARCHAR(255)
);

-- Crear la tabla "Foro_Mensajes"
CREATE TABLE  Foro_Mensajes (
    id_foro INT,
    mensaje VARCHAR(255)
);

-- Crear la tabla "colaboradores_reuniones"
CREATE TABLE  colaboradores_reuniones (
    id_reunion INT,
    id_colaborador INT
);

-- Crear la tabla "estados"
CREATE TABLE  estados (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

-- Crear la tabla "proyectos"
CREATE TABLE  proyectos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    campo VARCHAR(255),
    presupuesto INT,
    tareas INT,
    recursos_necesarios VARCHAR(255),
    estado INT,
    responsable INT,
    fecha_inicio DATE
);

-- Crear la tabla "reuniones"
CREATE TABLE  reuniones (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    proyecto INT,
    fecha DATE,
    tema VARCHAR(255),
    medio VARCHAR(255)
);

-- Crear la tabla "rol"
CREATE TABLE  rol (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255)
);

-- Crear la tabla "tareas"
CREATE TABLE tareas (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT,
    nombre VARCHAR(255),
    estado INT
);

-- Crear la tabla "usuario"
CREATE TABLE usuario (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255),
    contrasena VARCHAR(255),
    rol INT,
    proyecto INT
);

-- Agregar las claves foráneas necesarias
ALTER TABLE Foro ADD CONSTRAINT fk_foro_proyecto FOREIGN KEY (proyecto) REFERENCES proyectos(id);
ALTER TABLE Foro_Mensajes ADD CONSTRAINT fk_foro_mensaje FOREIGN KEY (id_foro) REFERENCES Foro(id);
ALTER TABLE colaboradores_reuniones ADD CONSTRAINT fk_colaborador_reunion FOREIGN KEY (id_reunion) REFERENCES reuniones(id);
ALTER TABLE colaboradores_reuniones ADD CONSTRAINT fk_colaborador_usuario FOREIGN KEY (id_colaborador) REFERENCES usuario(id);
ALTER TABLE proyectos ADD CONSTRAINT fk_proyecto_estado FOREIGN KEY (estado) REFERENCES estados(id);
ALTER TABLE proyectos ADD CONSTRAINT fk_proyecto_responsable FOREIGN KEY (responsable) REFERENCES usuario(id);
ALTER TABLE reuniones ADD CONSTRAINT fk_reunion_proyecto FOREIGN KEY (proyecto) REFERENCES proyectos(id);
ALTER TABLE tareas ADD CONSTRAINT fk_tarea_proyecto FOREIGN KEY (id_proyecto) REFERENCES proyectos(id);
ALTER TABLE tareas ADD CONSTRAINT fk_tarea_estado FOREIGN KEY (estado) REFERENCES estados(id);
ALTER TABLE usuario ADD CONSTRAINT fk_usuario_rol FOREIGN KEY (rol) REFERENCES rol(id);
ALTER TABLE usuario ADD CONSTRAINT fk_usuario_proyecto FOREIGN KEY (proyecto) REFERENCES proyectos(id);
