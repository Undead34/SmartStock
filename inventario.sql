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

-- Tabla: Equipment
CREATE TABLE Equipment (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Equipment_Name VARCHAR(255) NOT NULL,
    Equipment_Type VARCHAR(50) NOT NULL,
    Serial_Number VARCHAR(50) UNIQUE NOT NULL,
    Model VARCHAR(100),
    Code VARCHAR(50) UNIQUE NOT NULL,
    Entry_Date DATE,
    Observation TEXT,
    Location VARCHAR(100)
);

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

-- Tabla: Clients
CREATE TABLE Clients (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Client_Name VARCHAR(100) NOT NULL,
    Country VARCHAR(100),
    Client_Number VARCHAR(50),
    Email VARCHAR(100),
    Phone_Number VARCHAR(20)
);

-- Tabla: Delivery_Notes
CREATE TABLE Delivery_Notes (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Equipment_ID INT,
    Client_ID INT,
    Delivery_Date DATE,
    Delivery_Note TEXT,
    Status VARCHAR(50),
    FOREIGN KEY (Equipment_ID) REFERENCES Equipment(ID),
    FOREIGN KEY (Client_ID) REFERENCES Clients(ID)
);

-- Tabla: Purchase_Tracking
CREATE TABLE Purchase_Tracking (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Equipment_ID INT,
    Purchase_Date DATE,
    Arrival_Date DATE,
    Status VARCHAR(50),
    FOREIGN KEY (Equipment_ID) REFERENCES Equipment(ID)
);
