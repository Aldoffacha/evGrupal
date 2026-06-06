-- Esquema de base de datos para FARMABOL
-- Ejecutar en el SQL Editor de Supabase

-- Sucursales
CREATE TABLE sucursales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  direccion TEXT NOT NULL,
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- Productos
CREATE TABLE productos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  nombre TEXT NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  stockMinimo INTEGER NOT NULL DEFAULT 5,
  fechaVencimiento DATE NOT NULL,
  sucursalId UUID NOT NULL REFERENCES sucursales(id),
  createdAt TIMESTAMPTZ DEFAULT NOW()
);

-- Ventas
CREATE TABLE ventas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  productoId UUID NOT NULL REFERENCES productos(id),
  productoNombre TEXT NOT NULL,
  cantidad INTEGER NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  sucursalId UUID NOT NULL REFERENCES sucursales(id),
  fecha TIMESTAMPTZ DEFAULT NOW()
);

-- Transferencias
CREATE TABLE transferencias (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  productoId UUID NOT NULL REFERENCES productos(id),
  productoNombre TEXT NOT NULL,
  cantidad INTEGER NOT NULL,
  sucursalOrigenId UUID NOT NULL REFERENCES sucursales(id),
  sucursalDestinoId UUID NOT NULL REFERENCES sucursales(id),
  estado TEXT DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'completada', 'cancelada')),
  fecha TIMESTAMPTZ DEFAULT NOW()
);

-- Bucket de storage para comprobantes
-- Crear desde la UI de Supabase Storage: bucket "comprobantes" (público)

-- Datos de prueba
INSERT INTO sucursales (nombre, direccion) VALUES
  ('Sucursal Central', 'Av. Principal #123'),
  ('Sucursal Norte', 'Calle 2 #456'),
  ('Sucursal Sur', 'Av. Secundaria #789');

INSERT INTO productos (codigo, nombre, precio, stock, stockMinimo, fechaVencimiento, sucursalId) VALUES
  ('MED001', 'Paracetamol 500mg', 5.50, 100, 10, '2026-12-31', (SELECT id FROM sucursales LIMIT 1)),
  ('MED002', 'Ibuprofeno 400mg', 8.00, 50, 10, '2026-11-30', (SELECT id FROM sucursales LIMIT 1)),
  ('MED003', 'Amoxicilina 500mg', 12.00, 20, 5, '2026-10-15', (SELECT id FROM sucursales LIMIT 1)),
  ('MED004', 'Vitamina C 1000mg', 15.00, 3, 5, '2026-08-20', (SELECT id FROM sucursales OFFSET 1 LIMIT 1)),
  ('MED005', 'Jarabe para la tos', 22.00, 8, 5, '2026-07-10', (SELECT id FROM sucursales OFFSET 2 LIMIT 1));
