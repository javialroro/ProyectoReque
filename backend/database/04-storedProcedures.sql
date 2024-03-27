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
    IN p_nombre NVARCHAR(255),
    IN p_cedula NVARCHAR(255),
    IN p_correoElectronico NVARCHAR(255),
    IN p_departamento NVARCHAR(255),
    IN p_numeroTelefono NVARCHAR(255),
    IN p_contrasena NVARCHAR(255),
    OUT idUsuario INT
)
BEGIN
    INSERT INTO Usuario
    (idProyecto, nombre, cedula, correoElectronico, departamento, numeroTelefono, contrasena, idRol, IdEstado)
VALUES
    (NULL, p_nombre, p_cedula, p_correoElectronico, p_departamento, p_numeroTelefono, p_contrasena, 2, 1);

    -- Obtener el ID del usuario recién insertado
    SET idUsuario = LAST_INSERT_ID();
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
    IN p_idUsuario INT,
    IN p_storyPoints INT
)
BEGIN
    INSERT INTO Tareas (idProyecto, nombre, descripcion, idEstado, idUsuario, fechaFinalizacion, storyPoints) VALUES 
	(p_idProyecto, p_nombre , p_descripcion, 1, p_idUsuario, NULL, p_storyPoints);
END //

DELIMITER ;




-- proced login 

DELIMITER //

CREATE PROCEDURE LOGIN(
    IN p_email NVARCHAR(255),
    IN p_contrasena NVARCHAR(255),
    OUT idUsuarioR INT,
    OUT respuesta BOOLEAN
)
BEGIN    
    DECLARE existe INT;

    -- Verificar si el correo y la contraseña coinciden
    SELECT COUNT(*) INTO existe
    FROM Usuario
    WHERE Usuario.correoElectronico = p_email AND Usuario.contrasena = p_contrasena;

    -- Si existe al menos un usuario con el correo y contraseña proporcionados, establecer el resultado como true
    IF existe > 0 THEN
		SELECT idUsuario INTO idUsuarioR
		FROM usuario
		WHERE Usuario.correoElectronico = p_email AND Usuario.contrasena = p_contrasena;
        
        SET respuesta = TRUE;
    ELSE
        SET respuesta = FALSE;
    END IF;
END //




-- para consultar proyectos
-- proced que recibe un id de proyecto y devuelve todas sus tareas con sus estados y el nombre de la persona a cargo de la tarea
DELIMITER //

CREATE PROCEDURE infoTareasDeProyecto(
    IN idProyecto INT
)
BEGIN
    SELECT Tareas.nombre, EstadoTarea.nombre AS estado, Usuario.nombre AS responsable
    FROM Tareas
    INNER JOIN EstadoTarea ON EstadoTarea.idEstado = Tareas.idEstado
    INNER JOIN Usuario ON Usuario.idUsuario = Tareas.idUsuario
    WHERE Tareas.idProyecto = idProyecto;
END//

DELIMITER ;



-- para modificar proyecto
-- proced que recibe un id o nombre de proyecto y devuelve todas sus tareas
DELIMITER //
CREATE PROCEDURE tareasDeProyecto(
 IN idProyecto INT
 )
 BEGIN
	SELECT idTarea, Tareas.nombre, Usuario.nombre as UsuarioACargo, storyPoints, descripcion, Tareas.idEstado
	FROM Tareas
    INNER JOIN Usuario ON Usuario.idUsuario = Tareas.idUsuario
	WHERE Tareas.idProyecto = idProyecto;

END//

DELIMITER ;

-- proced que recibe datos de una tarea y le hace un update con los datos ingresados
DELIMITER //
CREATE PROCEDURE actualizarTarea(
    IN _idTarea INT,
	IN nuevoNombre NVARCHAR(255),
    IN nuevaDesc NVARCHAR(255),
    IN nuevoEstado INT,
    IN nuevoUsuario INT,
    IN nuevoStoryPoint INT    
)
BEGIN
	UPDATE Tareas
		SET nombre = nuevoNombre,
			descripcion = nuevaDesc,
			idEstado = nuevoEstado,
			idUsuario = nuevoUsuario,
            storyPoints = nuevoStoryPoint
		WHERE Tareas.idTarea = _idTarea;
END //



-- proced que recibe nombre de tarea y la elimina
DELIMITER //

CREATE PROCEDURE eliminarTarea(
    IN _idTarea INT
)
BEGIN
    DELETE FROM Tareas
    WHERE Tareas.idTarea = _idTarea;
END //

DELIMITER ;





-- para foros
-- proced que recibe el id de un foro y devuelve todos los comentarios de ese foro 
DELIMITER //

CREATE PROCEDURE ObtenerComentariosDeForo(
    IN idForo INT
)
BEGIN
    SELECT idComentario, idForo, Usuario.nombre, mensaje, fecha
    FROM ForoComentarios
    INNER JOIN Usuario ON Usuario.idUsuario = ForoComentarios.idUsuario
    WHERE ForoComentarios.idForo = idForo;
END //

DELIMITER ;


-- proced que recibe un id de usuario, verifica si el usuario es admin, si es admin muestra todos los foros de la empresa, si es colaborador muestra los foros del proyecto en el que esta trabajando el colaborador

DELIMITER //

CREATE PROCEDURE MostrarForosSegunUsuario(
    IN userID INT
)
BEGIN
    DECLARE userRoleID INT;

    -- Obtener el ID del rol del usuario
    SELECT idRol INTO userRoleID
    FROM Usuario
    WHERE idUsuario = userID;

    -- Si el usuario es administrador, muestra todos los foros de la empresa
    IF userRoleID = 1 THEN
        SELECT idForo, Foro.idProyecto, tema, Usuario.nombre, descripcion
        FROM Foro
        INNER JOIN Usuario ON Usuario.idUsuario = Foro.IdUsuario;
        
    -- Si el usuario es colaborador, muestra los foros del proyecto en el que está trabajando
    ELSEIF userRoleID = 2 THEN
        SELECT f.idForo, f.idProyecto, f.tema, u.nombre AS NombreUsuario, f.descripcion
        FROM Foro f
        INNER JOIN Usuario u ON f.idProyecto = u.idProyecto
        WHERE u.idUsuario = userID;

    -- Si el usuario no es ni administrador ni colaborador, no muestra nada
    ELSE
        SELECT 'El usuario no tiene un rol válido';
    END IF;
END //

DELIMITER ;


-- Obtener todos los usuarios que son administradores
DELIMITER //

CREATE PROCEDURE mostrarAdministradores()
BEGIN
    SELECT * FROM Usuario 
    WHERE Usuario.idRol = 1;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE mostrarColaboradoresPorProyecto(
	IN p_idProyecto INT
)
BEGIN
    SELECT * FROM Usuario 
    WHERE Usuario.idProyecto = p_idProyecto;
END //

DELIMITER ;

-- Crear foros



DELIMITER //
CREATE PROCEDURE crearForo(
	IN p_idProyecto INT,
    IN p_tema NVARCHAR(255),
    IN p_idUsuario INT,
    IN p_descripcion NVARCHAR(255)
)
BEGIN
	IF p_idProyecto = NULL THEN
    INSERT INTO Foro (idProyecto, tema, idUsuario, descripcion) VALUES
    (NULL, p_tema, p_idUsuario, p_descripcion);

    ELSE

    INSERT INTO Foro (idProyecto, tema, idUsuario, descripcion) VALUES
    (p_idProyecto, p_tema, p_idUsuario, p_descripcion);
    END IF;
END //

DELIMITER ;

-- Comentarios de foro 

DELIMITER //

CREATE PROCEDURE crearComentarioForo(
	IN p_idForo INT,
    IN p_idUsuario INT,
    IN p_mensaje NVARCHAR(255)
)
BEGIN
    INSERT INTO ForoComentarios (idForo, idUsuario, mensaje, fecha) VALUES 
    (p_idForo, p_idUsuario, p_mensaje, now());
END //

DELIMITER ;


