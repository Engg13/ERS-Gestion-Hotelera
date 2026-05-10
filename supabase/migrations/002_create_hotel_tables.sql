-- Create HABITACION table
CREATE TABLE IF NOT EXISTS habitaciones (
  id_habitacion UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero VARCHAR(10) NOT NULL UNIQUE,
  categoria VARCHAR(50) NOT NULL,
  precio_diario DECIMAL(10, 2) NOT NULL,
  estado VARCHAR(20) NOT NULL CHECK (estado IN ('disponible', 'ocupada')),
  ciudad VARCHAR(255) NOT NULL,
  descripcion TEXT,
  capacidad INT NOT NULL DEFAULT 2,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RESERVA table
CREATE TABLE IF NOT EXISTS reservas (
  id_reserva UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_usuario UUID NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
  id_habitacion UUID NOT NULL REFERENCES habitaciones(id_habitacion) ON DELETE CASCADE,
  fecha_reserva TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE NOT NULL,
  estado VARCHAR(20) NOT NULL CHECK (estado IN ('confirmada', 'cancelada')),
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  CONSTRAINT check_fechas CHECK (fecha_fin > fecha_inicio)
);

-- Create PAGO table
CREATE TABLE IF NOT EXISTS pagos (
  id_pago UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_reserva UUID NOT NULL REFERENCES reservas(id_reserva) ON DELETE CASCADE,
  monto DECIMAL(10, 2) NOT NULL,
  fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  metodo VARCHAR(50) NOT NULL CHECK (metodo IN ('tarjeta', 'efectivo', 'transferencia')),
  estado VARCHAR(20) NOT NULL CHECK (estado IN ('pagado', 'pendiente')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create TICKET table
CREATE TABLE IF NOT EXISTS tickets (
  id_ticket UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_reserva UUID NOT NULL REFERENCES reservas(id_reserva) ON DELETE CASCADE,
  codigo_qr TEXT NOT NULL UNIQUE,
  fecha_emision TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create IMAGEN_HABITACION table
CREATE TABLE IF NOT EXISTS imagenes_habitacion (
  id_imagen UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_habitacion UUID NOT NULL REFERENCES habitaciones(id_habitacion) ON DELETE CASCADE,
  url TEXT NOT NULL,
  orden INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_habitaciones_estado ON habitaciones(estado);
CREATE INDEX idx_habitaciones_ciudad ON habitaciones(ciudad);
CREATE INDEX idx_habitaciones_categoria ON habitaciones(categoria);

CREATE INDEX idx_reservas_usuario ON reservas(id_usuario);
CREATE INDEX idx_reservas_habitacion ON reservas(id_habitacion);
CREATE INDEX idx_reservas_estado ON reservas(estado);
CREATE INDEX idx_reservas_fechas ON reservas(fecha_inicio, fecha_fin);

CREATE INDEX idx_pagos_reserva ON pagos(id_reserva);
CREATE INDEX idx_pagos_estado ON pagos(estado);

CREATE INDEX idx_tickets_reserva ON tickets(id_reserva);
CREATE INDEX idx_tickets_codigo_qr ON tickets(codigo_qr);

CREATE INDEX idx_imagenes_habitacion ON imagenes_habitacion(id_habitacion);

-- Create triggers to auto-update updated_at
CREATE TRIGGER update_habitaciones_updated_at BEFORE UPDATE ON habitaciones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reservas_updated_at BEFORE UPDATE ON reservas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pagos_updated_at BEFORE UPDATE ON pagos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_imagenes_habitacion_updated_at BEFORE UPDATE ON imagenes_habitacion
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for development
INSERT INTO habitaciones (numero, categoria, precio_diario, estado, ciudad, descripcion, capacidad)
VALUES
  ('101', 'Standard', 85.00, 'disponible', 'Madrid', 'Habitación estándar con vista a la ciudad', 2),
  ('102', 'Deluxe', 120.00, 'disponible', 'Madrid', 'Habitación deluxe con cama king size', 2),
  ('103', 'Suite', 200.00, 'disponible', 'Madrid', 'Suite de lujo con sala de estar', 4),
  ('201', 'Standard', 80.00, 'disponible', 'Barcelona', 'Habitación estándar moderna', 2),
  ('202', 'Deluxe', 115.00, 'disponible', 'Barcelona', 'Habitación deluxe con balcón', 2),
  ('203', 'Suite', 190.00, 'ocupada', 'Barcelona', 'Suite ejecutiva', 4),
  ('301', 'Standard', 75.00, 'disponible', 'Valencia', 'Habitación confortable', 2),
  ('302', 'Deluxe', 110.00, 'disponible', 'Valencia', 'Habitación deluxe premium', 2),
  ('401', 'Standard', 70.00, 'disponible', 'Sevilla', 'Habitación estándar acogedora', 2),
  ('402', 'Suite', 180.00, 'disponible', 'Sevilla', 'Suite con terraza privada', 4)
ON CONFLICT (numero) DO NOTHING;

-- Insert sample images for rooms
INSERT INTO imagenes_habitacion (id_habitacion, url, orden)
SELECT h.id_habitacion, 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800', 1
FROM habitaciones h WHERE h.numero = '101'
UNION ALL
SELECT h.id_habitacion, 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800', 1
FROM habitaciones h WHERE h.numero = '102'
UNION ALL
SELECT h.id_habitacion, 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', 1
FROM habitaciones h WHERE h.numero = '103'
UNION ALL
SELECT h.id_habitacion, 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800', 1
FROM habitaciones h WHERE h.numero = '201'
ON CONFLICT DO NOTHING;
