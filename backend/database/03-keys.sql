USE snupie_bd;
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