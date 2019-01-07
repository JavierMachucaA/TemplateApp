create table usuarios(
	id serial PRIMARY KEY,
	nombre varchar(40),
	apellido varchar(40),
	segundo_nombre varchar(40),
	seguno_apellido varchar(40),
	usuarioId varchar(40),
	correo varchar(100),
	activo boolean,
	contrasena varchar(16)
);