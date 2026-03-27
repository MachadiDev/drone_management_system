-- Seed data for drone operations management system (PostgreSQL)

-- USE THIS FILE FOR TESTING PURPOSES ONLY

-- Clean Tables (Optional, commented out for safety)
-- TRUNCATE work_schedule, operations, orders, drones, clients, auxiliaries, pilots, users RESTART IDENTITY CASCADE;

-- 1. Users
INSERT INTO users (name, email, password, role) VALUES
('Admin Drone', 'admin@dronesystem.com', 'admin123', 'admin'),
('Manager Operational', 'manager@dronesystem.com', 'manager123', 'manager'),
('Viewer User', 'viewer@dronesystem.com', 'viewer123', 'viewer');

-- 2. Pilots
INSERT INTO pilots (name, cpf, cnh, sarpas_number) VALUES
('Ricardo Silva', '123.456.789-01', 'CNH-123456789', 'SARPAS-98765'),
('Camila Santos', '234.567.890-12', 'CNH-234567890', 'SARPAS-87654'),
('Felipe Andrade', '345.678.901-23', 'CNH-345678901', 'SARPAS-76543');

-- 3. Auxiliaries
INSERT INTO auxiliaries (name, cpf, cnh, sarpas_number) VALUES
('João Oliveira', '456.789.012-34', 'CNH-456789012', 'SARPAS-65432'),
('Maria Souza', '567.890.123-45', 'CNH-567890123', 'SARPAS-54321'),
('Bruno Lima', '678.901.234-56', 'CNH-678901234', 'SARPAS-43210');

-- 4. Clients
INSERT INTO clients (name, cpf_cnpj) VALUES
('Fazenda Sol Nascente Ltda', '12.345.678/0001-90'),
('Agro Industrial Verde', '23.456.789/0001-01'),
('José da Silva Dantas', '789.012.345-67'),
('Cooperativa de Grãos Sul', '34.567.890/0001-12');

-- 5. Drones
INSERT INTO drones (model, brand, registration_number, sisant_number, status, type) VALUES
('Agras T40', 'DJI', 'PP-ABC01', 'SISANT-0001', 'disponível', 'pulverização'),
('Agras T30', 'DJI', 'PP-DEF02', 'SISANT-0002', 'disponível', 'pulverização'),
('Mavic 3 Multispectral', 'DJI', 'PP-GHI03', 'SISANT-0003', 'em operação', 'imagem'),
('Phantom 4 RTK', 'DJI', 'PP-JKL04', 'SISANT-0004', 'em manutenção', 'imagem');

-- 6. Orders
INSERT INTO orders (order_number, client_id, farm_name, total_hectares, crop_type, city, state, status, service_type, value_hectare, total_value) VALUES
('ORD-2024-001', 1, 'Fazenda Bela Vista', 500.00, 'Soja', 'Rio Verde', 'GO', 'concluído', 'pulverização', 50.00, 25000.00),
('ORD-2024-002', 2, 'Gleba A', 250.00, 'Milho', 'Sorriso', 'MT', 'em andamento', 'pulverização', 45.00, 11250.00),
('ORD-2024-003', 3, 'Fazenda Esperança', 100.00, 'Cana-de-açúcar', 'Piracicaba', 'SP', 'pendente', 'inspeção', 120.00, 12000.00),
('ORD-2024-004', 4, 'Área Sul', 1000.00, 'Trigo', 'Cascavel', 'PR', 'pendente', 'mapeamento', 30.00, 30000.00);

-- 7. Operations
INSERT INTO operations (operation_number, order_id, total_hectares, flighted_hectares, service_type, start_date, end_date, farm_name, crop_type, status) VALUES
('OP-001', 1, 500.00, 500.00, 'pulverização', '2024-03-01', '2024-03-05', 'Fazenda Bela Vista', 'Soja', 'concluído'),
('OP-002', 2, 250.00, 150.00, 'pulverização', '2024-03-10', NULL, 'Gleba A', 'Milho', 'em andamento'),
('OP-003', 4, 1000.00, 0.00, 'mapeamento', '2024-03-20', NULL, 'Área Sul', 'Trigo', 'pendente');

-- 8. Work Schedule
INSERT INTO work_schedule (operation_id, pilot_id, auxiliary_id, drone_id, date_schedule, production, status) VALUES
(1, 1, 1, 1, '2024-03-01', 100.00, 'concluído'),
(1, 1, 1, 1, '2024-03-02', 150.00, 'concluído'),
(1, 2, 2, 2, '2024-03-03', 150.00, 'concluído'),
(1, 2, 2, 2, '2024-03-04', 100.00, 'concluído'),
(2, 3, 3, 2, '2024-03-11', 80.00, 'concluído'),
(2, 3, 3, 2, '2024-03-12', 70.00, 'em andamento'),
(3, 1, 1, 3, '2024-03-21', 0.00, 'pendente');
