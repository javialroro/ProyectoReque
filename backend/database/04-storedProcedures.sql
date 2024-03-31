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
    IN p_estado INT,
    IN p_rol INT
)
BEGIN
    update Usuario
    set Usuario.correoElectronico = p_correoElectronico, Usuario.departamento = p_departamento, Usuario.numeroTelefono = p_telefono, Usuario.IdEstado = p_estado, Usuario.idRol = p_rol
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
    IN p_fecha_inicio DATE,
    OUT p_id_proyecto INT
)
BEGIN
    INSERT INTO Proyectos (Nombre, recursos_necesarios, Presupuesto, Responsable, descripcion, fecha_inicio, Estado) 
    VALUES (p_nombre, p_recursos_necesarios, p_Presupuesto, p_Responsable, p_descripcion, p_fecha_inicio, 1);
    
    SET p_id_proyecto = LAST_INSERT_ID();
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
		FROM Usuario
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



-- Eliminar colaborador de un proyecto

DELIMITER //

CREATE PROCEDURE eliminarColaboradorProyecto(
    IN p_idUsuario INT,
    IN p_idProyecto INT
)
BEGIN
    UPDATE Usuario
    SET Usuario.idProyecto = null, Usuario.IdEstado = 1
    WHERE Usuario.idUsuario = p_idUsuario AND Usuario.idProyecto = p_idProyecto;
END //

DELIMITER ;


-- Finalizar tarea 

DELIMITER //

CREATE PROCEDURE finalizarTarea(
    IN p_idTarea INT
)
BEGIN
    UPDATE Tareas
    SET Tareas.idEstado = 3, Tareas.FechaFinalizacion = NOW()
    WHERE Tareas.idTarea = p_idTarea;
END //

DELIMITER ;


-- total de tareas de un proyecto para cada dia de los ultimos 22 dias 

DELIMITER //

CREATE PROCEDURE TotalTareasPorDia(
    IN proyecto_id INT
)
BEGIN
    DECLARE contador INT;
    DECLARE fecha_actual DATE;
    DECLARE total_tareas INT;
    DECLARE i INT DEFAULT 0;
    DECLARE column_names VARCHAR(255); -- Variable para almacenar los nombres de columna dinámicos
    DECLARE pivot_query VARCHAR(1000); -- Consulta dinámica para pivotar los resultados

    -- Crear una tabla temporal para almacenar los resultados
    CREATE TEMPORARY TABLE IF NOT EXISTS TempTotalTareasPorDia (
        Fecha DATE,
        TareasRestantes INT
    );

    -- Loop para los últimos 22 días
    WHILE i < 22 DO
        -- Calcular la fecha para el día actual del ciclo
        SET fecha_actual = DATE_SUB(CURDATE(), INTERVAL i DAY);

        -- Obtener el total de tareas para el proyecto hasta la fecha actual
        SELECT COUNT(*) INTO total_tareas
        FROM Tareas
        WHERE idProyecto = proyecto_id
        AND (FechaFinalizacion IS NULL OR FechaFinalizacion >= fecha_actual);

        -- Obtener el número de tareas completadas en la fecha actual
        SELECT COUNT(*) INTO contador
        FROM Tareas
        WHERE idProyecto = proyecto_id
        AND FechaFinalizacion = fecha_actual;

        -- Calcular las tareas restantes
        SET contador = total_tareas - contador;

        -- Insertar el resultado en la tabla temporal
        INSERT INTO TempTotalTareasPorDia (Fecha, TareasRestantes) VALUES (fecha_actual, contador);

        -- Incrementar el contador
        SET i = i + 1;
    END WHILE;

    -- Construir nombres de columna para la consulta dinámica
    SET @column_names = '';
    SET i = 0;
    WHILE i < 22 DO
        SET @column_names = CONCAT(@column_names, 'SUM(CASE WHEN Fecha = DATE_SUB(CURDATE(), INTERVAL ', i, ' DAY) THEN TareasRestantes ELSE 0 END) AS `', DATE_SUB(CURDATE(), INTERVAL i DAY), '`, ');
        SET i = i + 1;
    END WHILE;
    SET @column_names = LEFT(@column_names, LENGTH(@column_names) - 2); -- Eliminar la última coma

    -- Construir la consulta dinámica para pivotar los resultados
    SET @pivot_query = CONCAT('SELECT ', @column_names, ' FROM TempTotalTareasPorDia');

    -- Ejecutar la consulta dinámica
    PREPARE stmt FROM @pivot_query;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;

    -- Limpiar la tabla temporal
    DROP TEMPORARY TABLE IF EXISTS TempTotalTareasPorDia;
END //

DELIMITER ;


-- Crear reunion 

DELIMITER //

CREATE PROCEDURE crearReunion(
	IN p_idProyecto INT,
    IN p_tema NVARCHAR(255),
    IN p_fecha DATE,
    IN p_medio NVARCHAR(255),
    OUT p_idReunion INT
)
BEGIN
	INSERT INTO Reuniones (IdProyecto, tema, fecha, medio) VALUES 
	(p_idProyecto, p_tema, p_fecha, p_medio);
    
    SET p_idReunion = LAST_INSERT_ID();

END //

DELIMITER ;



-- Añadir colaboradres a reunion

DELIMITER //

CREATE PROCEDURE anadirColaboradoresReunion(
	IN p_idReunion INT,
    IN p_idColaborador INT
)
BEGIN
	INSERT INTO ColaboradoresReuniones (idReunion, idColaborador) VALUES 
	(p_idReunion, p_idColaborador);
END //

DELIMITER ;
