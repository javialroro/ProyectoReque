-- Obtener todos los usuarios y su información 
USE snupie_bd;

DELIMITER //

CREATE PROCEDURE obtenerUsuarios()
BEGIN
    SELECT * FROM Usuario;
END //

DELIMITER ;

-- Obtener todos los proyectos y su información

DELIMITER //

CREATE PROCEDURE obtenerProyectos()
BEGIN
    SELECT * FROM Proyectos;
END //

DELIMITER ;



DELIMITER //

-- Cantidad de tareas en proceso, terminadas y pendientes

DELIMITER //

CREATE PROCEDURE tareasPorEstado()
BEGIN
    SELECT EstadoTarea.nombre, COUNT(Tareas.idEstado) AS Cantidad
    FROM Tareas
    INNER JOIN EstadoTarea ON Tareas.idEstado = EstadoTarea.idEstado
    GROUP BY EstadoTarea.nombre;
END //

DELIMITER ;



-- Registrar usuario

DELIMITER //

CREATE PROCEDURE registrarUsuario(
    IN p_idProyecto INT,
    IN p_nombre NVARCHAR(255),
    IN p_cedula NVARCHAR(255),
    IN p_correoElectronico NVARCHAR(255),
    IN p_departamento NVARCHAR(255),
    IN p_contrasena NVARCHAR(255),
    IN p_idRol INT,
    IN p_IdEstado INT
)
BEGIN
    INSERT INTO Usuario (idProyecto, nombre, cedula, correoElectronico, departamento, contrasena, idRol, IdEstado)
    VALUES (p_idProyecto, p_nombre, p_cedula, p_correoElectronico, p_departamento, p_contrasena, p_idRol, p_IdEstado);
END //

DELIMITER ;

