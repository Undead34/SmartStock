-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-10-2023 a las 04:09:10
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4
SET
  SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

START TRANSACTION;

SET
  time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */
;

/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;

/*!40101 SET NAMES utf8mb4 */
;

--
-- Base de datos: `inventario`
--
-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `control`
--
CREATE TABLE `control` (
  `id` varchar(36) NOT NULL,
  `equipment_name` varchar(255) DEFAULT NULL,
  `equipment_type` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `sold` int(11) DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `customers`
--
CREATE TABLE `customers` (
  `id` varchar(36) NOT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `customer_country` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `equipment`
--
CREATE TABLE `equipment` (
  `id` varchar(36) NOT NULL,
  `equipment_name` varchar(255) DEFAULT NULL,
  `equipment_type` varchar(255) DEFAULT NULL,
  `serial_number` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `entry_date` datetime DEFAULT NULL,
  `assign_date` datetime DEFAULT NULL,
  `observation` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `delivery_note` text DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `tracking`
--
CREATE TABLE `tracking` (
  `id` varchar(36) NOT NULL,
  `supplier_name` varchar(255) DEFAULT NULL,
  `equipment_name` varchar(255) DEFAULT NULL,
  `entry_date` datetime DEFAULT NULL,
  `arrival_date` date DEFAULT NULL,
  `remaining_days` int(11) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `observation` text DEFAULT NULL
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------
--
-- Estructura de tabla para la tabla `users`
--
CREATE TABLE `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `FullName` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `LoginToken` varchar(100) DEFAULT NULL,
  `TokenExpirationDate` datetime DEFAULT NULL,
  `TempLoginCodes` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT "user"
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Índices para tablas volcadas
--
--
-- Indices de la tabla `control`
--
ALTER TABLE
  `control`
ADD
  PRIMARY KEY (`id`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE
  `customers`
ADD
  PRIMARY KEY (`id`);

--
-- Indices de la tabla `equipment`
--
ALTER TABLE
  `equipment`
ADD
  PRIMARY KEY (`id`);

--
-- Indices de la tabla `tracking`
--
ALTER TABLE
  `tracking`
ADD
  PRIMARY KEY (`id`);