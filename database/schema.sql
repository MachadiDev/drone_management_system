-- Database schema for drone operations management system (PostgreSQL)

-- ENUM Types
CREATE TYPE user_role AS ENUM ('admin', 'manager', 'viewer');
CREATE TYPE order_status AS ENUM ('pendente', 'em andamento', 'concluído', 'cancelado');
CREATE TYPE service_type AS ENUM ('inspeção', 'pulverização', 'fotogrametria', 'mapeamento');
CREATE TYPE payment_status AS ENUM ('pendente', 'pago', 'cancelado');
CREATE TYPE drone_status AS ENUM ('disponível', 'em manutenção', 'em operação');
CREATE TYPE drone_type AS ENUM ('pulverização', 'imagem');
CREATE TYPE schedule_status AS ENUM ('pendente', 'em andamento', 'concluído', 'cancelado');

-- Tables

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Pilots Table
CREATE TABLE pilots (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    cnh VARCHAR(20) UNIQUE NOT NULL,
    sarpas_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Auxiliaries Table
CREATE TABLE auxiliaries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    cnh VARCHAR(20) UNIQUE NOT NULL,
    sarpas_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Clients Table
CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(18) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Drones Table
CREATE TABLE drones (
    id SERIAL PRIMARY KEY,
    model VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    sisant_number VARCHAR(50) UNIQUE,
    status drone_status NOT NULL DEFAULT 'disponível',
    type drone_type NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    client_id INTEGER REFERENCES clients(id) ON DELETE CASCADE,
    date_order DATE DEFAULT CURRENT_DATE,
    farm_name VARCHAR(255),
    total_hectares DECIMAL(10,2),
    crop_type VARCHAR(100),
    city VARCHAR(100),
    state VARCHAR(50),
    status order_status NOT NULL DEFAULT 'pendente',
    service_type service_type NOT NULL,
    payment_status payment_status NOT NULL DEFAULT 'pendente',
    value_hectare DECIMAL(10,2),
    total_value DECIMAL(12,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Operations Table
CREATE TABLE operations (
    id SERIAL PRIMARY KEY,
    operation_number VARCHAR(50) UNIQUE NOT NULL,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    total_hectares DECIMAL(10,2),
    flighted_hectares DECIMAL(10,2) DEFAULT 0,
    service_type service_type NOT NULL,
    start_date DATE,
    end_date DATE,
    farm_name VARCHAR(255),
    crop_type VARCHAR(100),
    status order_status NOT NULL DEFAULT 'pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Work Schedule Table
CREATE TABLE work_schedule (
    id SERIAL PRIMARY KEY,
    operation_id INTEGER REFERENCES operations(id) ON DELETE CASCADE,
    pilot_id INTEGER REFERENCES pilots(id),
    auxiliary_id INTEGER REFERENCES auxiliaries(id),
    drone_id INTEGER REFERENCES drones(id),
    date_schedule DATE NOT NULL,
    production DECIMAL(10,2) DEFAULT 0,
    status schedule_status NOT NULL DEFAULT 'pendente',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Views

-- vw_faturamento_piloto
CREATE VIEW vw_faturamento_piloto AS
SELECT 
    ws.id,
    ws.pilot_id,
    SUM(ws.production * o.value_hectare) as total_value,
    ws.status,
    ws.created_at,
    ws.updated_at
FROM work_schedule ws
JOIN operations op ON ws.operation_id = op.id
JOIN orders o ON op.order_id = o.id
GROUP BY ws.id, ws.pilot_id, ws.status, ws.created_at, ws.updated_at;

-- vw_faturamento_operacoes
CREATE VIEW vw_faturamento_operacoes AS
SELECT 
    ws.id,
    ws.operation_id,
    ws.pilot_id,
    ws.auxiliary_id,
    ws.drone_id,
    ws.date_schedule,
    ws.production,
    o.value_hectare,
    (ws.production * o.value_hectare) as total_value,
    ws.status,
    ws.created_at,
    ws.updated_at
FROM work_schedule ws
JOIN operations op ON ws.operation_id = op.id
JOIN orders o ON op.order_id = o.id;

-- Triggers for updated_at (Postgres doesn't automate this like MySQL)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_pilots_updated_at BEFORE UPDATE ON pilots FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_auxiliaries_updated_at BEFORE UPDATE ON auxiliaries FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_drones_updated_at BEFORE UPDATE ON drones FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_operations_updated_at BEFORE UPDATE ON operations FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_work_schedule_updated_at BEFORE UPDATE ON work_schedule FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
