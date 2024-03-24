USE snupie_bd;

ALTER TABLE HistorialProyecto ADD CONSTRAINT fk_historial_proyecto FOREIGN KEY (idProyecto) REFERENCES Proyectos(idProyecto);
ALTER TABLE Tareas ADD CONSTRAINT fk_tareas_proyecto FOREIGN KEY (idProyecto) REFERENCES Proyectos(idProyecto);
ALTER TABLE Tareas ADD CONSTRAINT fk_estado_tarea FOREIGN KEY (idEstado) REFERENCES EstadoTarea(idEstado);
ALTER TABLE Foro ADD CONSTRAINT fk_foro_proyecto FOREIGN KEY (idProyecto) REFERENCES Proyectos(idProyecto);
ALTER TABLE ForoComentarios ADD CONSTRAINT fk_foro_comentarios FOREIGN KEY (idForo) REFERENCES Foro(idForo);
ALTER TABLE Usuario ADD CONSTRAINT fk_usuario_proyecto FOREIGN KEY (idProyecto) REFERENCES Proyectos(idProyecto);
ALTER TABLE Reuniones ADD CONSTRAINT fk_reuniones_proyecto FOREIGN KEY (IdProyecto) REFERENCES Proyectos(idProyecto);
AlTER TABLE ColaboradoresReuniones ADD CONSTRAINT fk_colaboradores_reuniones FOREIGN KEY (idReunion) REFERENCES Reuniones(idReunion);
ALTER TABLE Proyectos ADD CONSTRAINT fk_proyecto_estado FOREIGN KEY (Estado) REFERENCES EstadoProyecto(idEstado);
AlTER TABLE Usuario ADD CONSTRAINT fk_usuario_rol FOREIGN KEY (idRol) REFERENCES Rol(idRol);
ALTER TABLE Usuario ADD CONSTRAINT fk_usuario_estado FOREIGN KEY (idEstado) REFERENCES EstadoUsuario(idEstado);
ALTER TABLE Tareas ADD CONSTRAINT fk_tareas_usuario FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario);  
