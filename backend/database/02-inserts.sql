USE snupie_bd;

INSERT INTO Proyectos (Nombre, recursos_necesarios, Presupuesto, Responsable, descripcion, fecha_inicio, Estado) VALUES 
('Proyecto 1', 'Macbooks para los desarrolladores', 1000, 1, 'Creacion de web para cocina', NOW(), 1),
('Proyecto 2', 'Automovil de la empresa', 2000, 2, 'Venta de materiales', NOW(), 1),
('Proyecto 3', 'Equipo de laboratorio', 3000, 3, 'Pruebas en laboratorio', NOW(), 1);

INSERT INTO Rol (nombre) VALUES 
('Administrador'),
('Colaborador');

-- Inserts para la tabla EstadoProyecto
INSERT INTO EstadoProyecto (nombre) VALUES 
('En curso'),
('Finalizado'),
('Cancelado');

-- Inserts para la tabla EstadoTarea
INSERT INTO EstadoTarea (nombre) VALUES 
('Pendiente'),
('En proceso'),
('Completada');

-- Inserts para la tabla EstadoUsuario
INSERT INTO EstadoUsuario (nombre) VALUES 
('Disponible'),
('Ocupado');

-- Inserts para la tabla Usuario
INSERT INTO Usuario (nombre, cedula, correoElectronico, departamento, numeroTelefono, contrasena, idRol, IdEstado) VALUES 
('Juan Perez', '1234567890', 'juan@example.com', 'Desarrollo', '4565456', 'contrasena123', 1, 1),
('Maria Gomez', '0987654321', 'maria@example.com', 'Diseno', '123132132', 'contrasena456', 2, 1),
('Carlos Rodriguez', '5678901234', 'carlos@example.com', 'QA', '98789787', 'contrasena789', 2, 1);

-- Inserts para la tabla Tareas
INSERT INTO Tareas (idProyecto, nombre, descripcion, idEstado, idUsuario, storyPoints) VALUES 
(1, 'Crear base de datos', 'Creacion de base de datos relacional', 1, 1,1),
(2, 'Buscar posibles clientes', 'Busqueda de clientes adecuados para la venta', 1, 2, 2),
(3, 'Compra de equipo', 'Compra de equipo de laboratorio', 2, 1, 2),
(1, 'Hostear web', 'Buscar host web y hostear los archivos', 3, 3,3);

-- Inserts para la tabla HistorialProyecto
INSERT INTO HistorialProyecto (hora, descripcion, idProyecto) VALUES 
(NOW(), 'Version 1.0', 1),
(NOW(), 'Version 2.1', 2),
(NOW(), 'Version 2.3', 3);

-- Inserts para la tabla Foro
INSERT INTO Foro (idProyecto, tema, idUsuario, descripcion) VALUES 
(1, 'Dudas generales devs', 1, 'Dudas generales de desarrolladores del proyecto de la cocina'),
(2, 'Posibles clientes', 2, 'Posibles clientes para la venta de materiales de construccion'),
(3, 'Necesidades de equipo', 3, 'Necesidades de equipo para el laboratorio de pruebas'),
(NULL, '¿Que hay de almuerzo en el comedor?', 1, 'Alguien sabe que es el almuerzo en el comedor');

-- Inserts para la tabla ForoComentarios
INSERT INTO ForoComentarios (idForo, idUsuario, mensaje, fecha) VALUES 
(1, 2, 'Cuales tecnologias usamos?', NOW()),
(1, 3, 'Podriamos usar React', NOW()),
(1,2, 'Me parece bien', NOW()),
(2, 1, 'Tengo un cliente que va a hacer casa', NOW()),
(2, 3, 'Pasame el contacto por favor', NOW()),
(2,1, 'Claro, seria don Carlos Venegas y su esposa', NOW()),
(3, 2, 'Necesitamos un microscopio', NOW()),
(3, 1, 'Solo vos necesitas?', NOW()),
(3, 2, 'Si, solo yo', NOW())
;

-- Inserts para la tabla Reuniones
INSERT INTO Reuniones (IdProyecto, tema, fecha, medio) VALUES 
(1, 'Analisis de requerimientos', NOW(), 'Presencial'),
(2, 'Reunion con Carlos Venegas', NOW(), 'Virtual'),
(3, 'Reunion con doctores', NOW(), 'Presencial');

-- Inserts para la tabla ColaboradoresReuniones
INSERT INTO ColaboradoresReuniones (idReunion, idColaborador) VALUES 
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(3, 1),
(3, 2);

