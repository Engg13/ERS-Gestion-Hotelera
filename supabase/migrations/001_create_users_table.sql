-- Create users table
CREATE TABLE IF NOT EXISTS usuarios (
  id_usuario UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(255) NOT NULL,
  correo VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  tipo_usuario VARCHAR(20) NOT NULL CHECK (tipo_usuario IN ('cliente', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX idx_usuarios_correo ON usuarios(correo);

-- Create index on tipo_usuario for filtering
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo_usuario);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to auto-update updated_at
CREATE TRIGGER update_usuarios_updated_at BEFORE UPDATE ON usuarios
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert a default admin user (password: admin123)
-- Note: In production, use proper password hashing with bcrypt
INSERT INTO usuarios (nombre, correo, password, tipo_usuario)
VALUES ('Admin', 'admin@grandhotel.com', 'admin123', 'admin')
ON CONFLICT (correo) DO NOTHING;
