# 🛸 AeroOps - Drone Management System

[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

O **AeroOps** é um sistema de gestão operacional completo, desenvolvido para otimizar os fluxos de trabalho de empresas prestadoras de serviços com drones. O sistema gerencia desde o cadastro de aeronaves e pessoal até o faturamento detalhado por operação e piloto.

---

## 🚀 Funcionalidades Principais

Atualmente, o sistema conta com uma arquitetura de banco de dados robusta que suporta:

- **Gestão de Frota**: Controle de status (disponível, manutenção, operação) e tipos de drones (pulverização/imagem).
- **Gestão de Equipe**: Cadastro detalhado de Pilotos e Auxiliares, incluindo documentos obrigatórios (CPF, CNH, SARPAS).
- **CRM Simplificado**: Cadastro de clientes e fazendas.
- **Ciclo de Operação**:
  - Emissão de Ordens de Serviço (OS) com cálculo de hectares e valores.
  - Planejamento de Operações vinculadas às OS.
  - Escala de Trabalho (Schedule) com registro de produção diária.
- **Inteligência de Faturamento**:
  - Views para acompanhamento de produção por piloto.
  - Faturamento consolidado por operação.

---

## 🏗️ Arquitetura do Banco de Dados

O projeto utiliza **PostgreSQL** e foi planejado para integridade referencial total. A estrutura básica inclui:

- **Users**: Autenticação com RBAC (Admin, Manager, Viewer).
- **Entidades**: `Pilots`, `Auxiliaries`, `Clients`, `Drones`.
- **Fluxo Operacional**: `Orders` -> `Operations` -> `Work_Schedule`.
- **Automação**: Triggers para atualização automática de `updated_at` em todas as tabelas.

---

## 🛠️ Tecnologias

- **Banco de Dados**: PostgreSQL
- **Modelagem**: SQL (DDL/DML)
- **Backend**: (Em breve)
- **Frontend**: (Em breve)

---

## ⚙️ Instalação e Configuração

Atualmente, o projeto foca na base de dados. Para configurar o ambiente de desenvolvimento:

1. **Pré-requisitos**:
   - PostgreSQL instalado localmente ou via Docker.

2. **Criação do Banco**:
   ```sql
   CREATE DATABASE drone_management;
   ```

3. **Execução do Schema**:
   Navegue até a pasta `database/` e execute:
   ```bash
   psql -d drone_management -f schema.sql
   ```

4. **População de Dados (Opcional)**:
   Para testar com dados fictícios:
   ```bash
   psql -d drone_management -f seed.sql
   ```

---

## 🗺️ Roadmap / Próximos Passos

- [ ] Implementação da API REST (Node.js/Python).
- [ ] Desenvolvimento do Dashboard Administrativo.
- [ ] Módulo de relatórios em PDF para clientes.
- [ ] Integração com mapas para visualização de áreas sobrevoadas.

---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

---
*Desenvolvido com foco em eficiência agrícola e operacional.*
