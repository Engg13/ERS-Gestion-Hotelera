CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    correo VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    tipo_usuario VARCHAR(20)
);

CREATE TABLE Habitacion (
    id_habitacion INT PRIMARY KEY AUTO_INCREMENT,
    numero INT,
    categoria VARCHAR(50),
    precio_diario DECIMAL(10,2),
    estado VARCHAR(20)
);

CREATE TABLE Reserva (
    id_reserva INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_habitacion INT,
    fecha_reserva DATE,
    fecha_inicio DATE,
    fecha_fin DATE,
    estado VARCHAR(20),
    total DECIMAL(10,2),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_habitacion) REFERENCES Habitacion(id_habitacion)
);

CREATE TABLE Pago (
    id_pago INT PRIMARY KEY AUTO_INCREMENT,
    id_reserva INT UNIQUE,
    monto DECIMAL(10,2),
    fecha_pago DATE,
    metodo VARCHAR(50),
    estado VARCHAR(20),
    FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva)
);

CREATE TABLE Ticket (
    id_ticket INT PRIMARY KEY AUTO_INCREMENT,
    id_reserva INT UNIQUE,
    codigo_qr VARCHAR(255),
    fecha_emision DATE,
    FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva)
);

CREATE TABLE ImagenHabitacion (
    id_imagen INT PRIMARY KEY AUTO_INCREMENT,
    id_habitacion INT,
    url VARCHAR(255),
    FOREIGN KEY (id_habitacion) REFERENCES Habitacion(id_habitacion)
);

-- CRUD INICIAL

INSERT INTO Usuario (nombre, correo, password, tipo_usuario)
VALUES ('Juan Perez', 'juan@mail.com', '123456', 'cliente');


SELECT * FROM Usuario;


UPDATE Usuario SET nombre = 'Juan P.' WHERE id_usuario = 1;


DELETE FROM Usuario WHERE id_usuario = 1;



INSERT INTO Habitacion (numero, categoria, precio_diario, estado)
VALUES (101, 'Suite', 80000, 'Disponible');

SELECT * FROM Habitacion;

UPDATE Habitacion SET estado = 'Ocupada' WHERE id_habitacion = 1;

DELETE FROM Habitacion WHERE id_habitacion = 1;

INSERT INTO Reserva (id_usuario, id_habitacion, fecha_reserva, fecha_inicio, fecha_fin, estado, total)
VALUES (1, 1, CURDATE(), '2026-04-20', '2026-04-25', 'Confirmada', 400000);

SELECT * FROM Reserva;

UPDATE Reserva SET estado = 'Cancelada' WHERE id_reserva = 1;

DELETE FROM Reserva WHERE id_reserva = 1;

INSERT INTO Pago (id_reserva, monto, fecha_pago, metodo, estado)
VALUES (1, 120000, CURDATE(), 'Tarjeta', 'Pagado');

SELECT * FROM Pago;

UPDATE Pago SET estado = 'Rechazado' WHERE id_pago = 1;

DELETE FROM Pago WHERE id_pago = 1;

INSERT INTO Ticket (id_reserva, codigo_qr, fecha_emision)
VALUES (1, 'QR123ABC', CURDATE());

SELECT * FROM Ticket;

INSERT INTO ImagenHabitacion (id_habitacion, url)
VALUES (1, 'https://hotel.com/img1.jpg');

SELECT * FROM ImagenHabitacion;
