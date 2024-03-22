USE snupie_bd;
-- Insertar datos predeterminados en la tabla "estados"
INSERT INTO estados (nombre) VALUES ('En proceso'), ('Completado'), ('Pendiente');

-- Insertar datos predeterminados en la tabla "rol"
INSERT INTO rol (nombre) VALUES ('Administrador'), ('Usuario');

-- Insertar datos predeterminados en la tabla "proyectos"
INSERT INTO proyectos (nombre, campo, presupuesto, tareas, recursos_necesarios, estado, responsable, fecha_inicio)
VALUES 
('Proyecto 1', 'Tecnología', 10000, 5, 'Recursos humanos', 1, 1, '2024-04-01'),
('Proyecto 2', 'Medicina', 15000, 8, 'Recursos materiales', 2, 2, '2024-04-15'),
('Proyecto 3', 'Educación', 12000, 6, 'Recursos financieros', 3, 3, '2024-05-01');

-- Insertar datos predeterminados en la tabla "usuario"
INSERT INTO usuario (correo, contrasena, rol, proyecto)
VALUES 
('admin@example.com', 'admin123', 1, 1),
('usuario1@example.com', 'usuario123', 2, 1),
('usuario2@example.com', 'usuario123', 2, 2);

-- Insertar datos predeterminados en la tabla "Foro"
INSERT INTO Foro (proyecto, tema) VALUES (1, 'Discusión general del proyecto 1'), (2, 'Problemas médicos'), (3, 'Metodologías educativas');

-- Insertar datos predeterminados en la tabla "Foro_Mensajes"
INSERT INTO Foro_Mensajes (id_foro, mensaje) VALUES 
(1, '¡Hola! ¿Cómo va el proyecto?'),
(2, 'Tenemos que discutir el plan de tratamiento.'),
(3, '¿Alguien tiene sugerencias para mejorar el proceso de enseñanza?');

-- Insertar datos predeterminados en la tabla "colaboradores_reuniones"
INSERT INTO colaboradores_reuniones (id_reunion, id_colaborador) VALUES (1, 1), (2, 2), (3, 3);

-- Insertar datos predeterminados en la tabla "reuniones"
INSERT INTO reuniones (proyecto, fecha, tema, medio) VALUES 
(1, '2024-04-05', 'Revisión semanal', 'Virtual'),
(2, '2024-04-10', 'Presentación de casos', 'Presencial'),
(3, '2024-05-05', 'Planificación de actividades', 'Virtual');

-- Insertar datos predeterminados en la tabla "tareas"
INSERT INTO tareas (id_proyecto, nombre, estado) VALUES 
(1, 'Desarrollar interfaz de usuario', 3),
(2, 'Investigar nuevos tratamientos', 1),
(3, 'Elaborar material didáctico', 2);
