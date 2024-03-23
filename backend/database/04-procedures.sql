
DELIMITER $$
CREATE DEFINER=`root`@`%` PROCEDURE `sp_Login`(IN `correo` VARCHAR(255), IN `contrasena` VARCHAR(255), OUT `resultado` BOOLEAN)
BEGIN
    DECLARE existe INT;

    -- Verificar si el correo y la contraseña coinciden
    SELECT COUNT(*) INTO existe
    FROM usuario
    WHERE correo = usuario.correo AND contrasena = usuario.contrasena;

    -- Si existe al menos un usuario con el correo y contraseña proporcionados, establecer el resultado como true
    IF existe > 0 THEN
        SET resultado = TRUE;
    ELSE
        SET resultado = FALSE;
    END IF;
END$$
DELIMITER ;


