-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-08-2023 a las 18:09:03
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Base de datos: `inventario`
--

-- --------------------------------------------------------

-- Tabla: Users
CREATE TABLE Users (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(50) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    LoginToken VARCHAR(100),
    TokenExpirationDate DATETIME,
    TempLoginCodes VARCHAR(255)
);

-- Tabla para almacenar la información de los equipos
CREATE TABLE equipment (
    id VARCHAR(36) PRIMARY KEY,
    equipment_name VARCHAR(255),
    equipment_type VARCHAR(255),
    serial_number VARCHAR(255),
    model VARCHAR(255),
    code VARCHAR(255),
    entry_date DATETIME,
    observation TEXT,
    location VARCHAR(255),
    customer_name VARCHAR(255)
);

-- Tabla para almacenar la información de los clientes
CREATE TABLE customers (
    id VARCHAR(36) PRIMARY KEY,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    customer_country VARCHAR(255),
    code VARCHAR(255),
    observation TEXT
);

-- Tabla para almacenar el control de inventario
CREATE TABLE control (
    id VARCHAR(36) PRIMARY KEY,
    equipment_name VARCHAR(255),
    equipment_type VARCHAR(255),
    code VARCHAR(255),
    observation TEXT,
    stock INT,
    sold INT
);

-- Tabla para realizar el seguimiento de los equipos
CREATE TABLE tracking (
    id VARCHAR(36) PRIMARY KEY,
    supplier_name VARCHAR(255),
    equipment_name VARCHAR(255),
    entry_date DATETIME,
    arrival_date DATE,
    code VARCHAR(255),
    status VARCHAR(255),
    observation TEXT
);
