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
    IN p_numeroTelefono NVARCHAR(255),
    IN p_contrasena NVARCHAR(255),
    IN p_idRol INT,
    IN p_IdEstado INT
)
BEGIN
    INSERT INTO Usuario (idProyecto, nombre, cedula, correoElectronico, departamento, numeroTelefono, contrasena, idRol, IdEstado)
    VALUES (p_idProyecto, p_nombre, p_cedula, p_correoElectronico, p_departamento, p_numeroTelefono, p_contrasena, p_idRol, p_IdEstado);
END //

DELIMITER ;


-- proced con todos los trabajadores que no tengan proyecto

DELIMITER //

CREATE PROCEDURE obtenerUsuariosSinProyecto()
BEGIN
    SELECT * FROM Usuario
    WHERE Usuario.idProyecto is null;
END //

DELIMITER ;


-- proced con update del proyecto asignado al colaborador(Asignar proyecto a un colaborador sin proyecto actualmente)


DELIMITER //

CREATE PROCEDURE asignarProyectoAColaborador(
	IN p_idProyecto INT,
    IN p_idUsuario INT
)
BEGIN
    update Usuario
    set Usuario.idProyecto = p_idProyecto, Usuario.IdEstado = 2
    where Usuario.idUsuario = p_idUsuario;
END //

DELIMITER ;


-- proced update de los datos del colab


DELIMITER //

CREATE PROCEDURE modificarColaborador(
    IN p_idUsuario INT,
    IN p_correoElectronico NVARCHAR(255),
    IN p_departamento NVARCHAR(255),
    IN p_telefono NVARCHAR(255),
    IN p_estado INT
)
BEGIN
    update Usuario
    set Usuario.correoElectronico = p_correoElectronico, Usuario.departamento = p_departamento, Usuario.numeroTelefono = p_telefono, Usuario.IdEstado = p_estado
    where Usuario.idUsuario = p_idUsuario;
END //

DELIMITER ;



-- proced que hace insert del nuevo proyecto en la tabla proyectos 
DELIMITER //

CREATE PROCEDURE crearProyecto(
    IN p_nombre NVARCHAR(255),
    IN p_recursos_necesarios NVARCHAR(255),
    IN p_Presupuesto DOUBLE,
    IN p_Responsable INT,
    IN p_descripcion NVARCHAR(255),
    IN p_fecha_inicio DATE
)
BEGIN
    INSERT INTO Proyectos (Nombre, recursos_necesarios, Presupuesto, Responsable, descripcion, fecha_inicio, Estado) VALUES 
    (p_nombre, p_recursos_necesarios, p_Presupuesto, p_Responsable, p_descripcion, p_fecha_inicio, 1);
END //

DELIMITER ;



-- proced para crear tarea y asignarla el proyecto


DELIMITER //

CREATE PROCEDURE crearTarea(
    IN p_idProyecto INT, 
    IN p_nombre NVARCHAR(255),
    IN p_descripcion NVARCHAR(255),
    IN p_idUsuario INT
)
BEGIN
    INSERT INTO Tareas (idProyecto, nombre, descripcion, idEstado, idUsuario) VALUES 
	(p_idProyecto, p_nombre , p_descripcion, 1, p_idUsuario);
END //

DELIMITER ;