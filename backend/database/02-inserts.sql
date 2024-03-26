USE snupie_bd;

INSERT INTO Proyectos (Nombre, recursos_necesarios, Presupuesto, Responsable, descripcion, fecha_inicio, Estado) VALUES 
('Proyecto 1', 'Recursos necesarios del Proyecto 1', 1000, 1, 'Descripción del Proyecto 1', NOW(), 1),
('Proyecto 2', 'Recursos necesarios del Proyecto 2', 2000, 2, 'Descripción del Proyecto 2', NOW(), 1),
('Proyecto 3', 'Recursos necesarios del Proyecto 3', 3000, 3, 'Descripción del Proyecto 3', NOW(), 1);

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
('Juan Pérez', '1234567890', 'juan@example.com', 'Desarrollo', '4565456', 'contrasena123', 1, 1),
('María Gómez', '0987654321', 'maria@example.com', 'Diseño', '123132132', 'contrasena456', 2, 1),
('Carlos Rodríguez', '5678901234', 'carlos@example.com', 'QA', '98789787', 'contrasena789', 2, 1);

-- Inserts para la tabla Tareas
INSERT INTO Tareas (idProyecto, nombre, descripcion, idEstado, idUsuario) VALUES 
(1, 'Proyecto 1', 'Descripción de la tarea 1 del Proyecto 1', 1, 1),
(2, 'Proyecto 2', 'Descripción de la tarea 1 del Proyecto 2', 2, 2),
(3, 'Proyecto 3', 'Descripción de la tarea 1 del Proyecto 3', 3, 1),
(3, 'Proyecto 4', 'Descripción de la tarea 2 del Proyecto 3', 1, 1);

-- Inserts para la tabla HistorialProyecto
INSERT INTO HistorialProyecto (hora, descripcion, idProyecto) VALUES 
(NOW(), 'Descripción del historial del Proyecto 1', 1),
(NOW(), 'Descripción del historial del Proyecto 2', 2),
(NOW(), 'Descripción del historial del Proyecto 3', 3);

-- Inserts para la tabla Foro
INSERT INTO Foro (idProyecto, tema, idUsuario, descripcion) VALUES 
(1, 'Tema del Foro Proyecto 1', 1, 'Descripción del Foro del Proyecto 1'),
(2, 'Tema del Foro Proyecto 2', 2, 'Descripción del Foro del Proyecto 2'),
(3, 'Tema del Foro Proyecto 3', 3, 'Descripción del Foro del Proyecto 3');

-- Inserts para la tabla ForoComentarios
INSERT INTO ForoComentarios (idForo, idUsuario, mensaje, fecha) VALUES 
(1, 2, 'Comentario en el foro del Proyecto 1', NOW()),
(1, 3, 'Otro comentario en el foro del Proyecto 1', NOW()),
(2, 1, 'Comentario en el foro del Proyecto 2', NOW()),
(2, 3, 'Otro comentario en el foro del Proyecto 2', NOW()),
(3, 1, 'Comentario en el foro del Proyecto 3', NOW());

-- Inserts para la tabla Reuniones
INSERT INTO Reuniones (IdProyecto, tema, fecha, medio) VALUES 
(1, 'Tema de la Reunión 1 Proyecto 1', NOW(), 'Presencial'),
(2, 'Tema de la Reunión 2 Proyecto 2', NOW(), 'Virtual'),
(3, 'Tema de la Reunión 3 Proyecto 3', NOW(), 'Presencial');

-- Inserts para la tabla ColaboradoresReuniones
INSERT INTO ColaboradoresReuniones (idReunion, idColaborador) VALUES 
(1, 2),
(1, 3),
(2, 1),
(2, 3),
(3, 1),
(3, 2);

