-- --------     << Trabalho Final >>     ------------
-- 
--                    SCRIPT DE CRIACAO (DDL)
-- 
-- Data Criacao ...........: 08/06/2024
-- Autor(es) ..............: Daniel de Sousa Oliveira Melo Veras
-- Banco de Dados .........: MySQL
-- Base de Dados(nome) ....: HomicideDB
-- 
-- Data Ultima Alteracao ..: 08/06/2024
--   => Criacao das tabelas 
-- 
-- PROJETO => 01 Base de Dados
--         => 09 Tabelas
-- 
-- ----------------------------------------------------------------

CREATE DATABASE IF NOT EXISTS HomicideDB;
USE HomicideDB;

-- Criação da tabela Agency
CREATE TABLE IF NOT EXISTS Agency (
    AgencyCode VARCHAR(10) PRIMARY KEY,
    AgencyName VARCHAR(100),
    AgencyType VARCHAR(50)
);

-- Criação da tabela HomicideReport
CREATE TABLE IF NOT EXISTS HomicideReport (
    RecordID INT PRIMARY KEY,
    AgencyCode VARCHAR(10) NOT NULL,
    City VARCHAR(100),
    State VARCHAR(50),
    Year INT,
    Month INT,
    Incident INT,
    CrimeType VARCHAR(50),
    CrimeSolved TINYINT(1),
    VictimCount INT,
    PerpetratorCount INT,
    RecordSource VARCHAR(100),
    Weapon VARCHAR(50),
    Relationship VARCHAR(50),
    FOREIGN KEY (AgencyCode) REFERENCES Agency(AgencyCode)
);

-- Criação da tabela GenericInformationAboutPersonInvolved
CREATE TABLE IF NOT EXISTS GenericInformationAboutPersonInvolved (
    PersonID INT AUTO_INCREMENT PRIMARY KEY,
    RecordID INT NOT NULL,
    Role ENUM('Victim', 'Perpetrator') NOT NULL,
    Sex VARCHAR(10),
    Age INT,
    Race VARCHAR(50),
    Ethnicity VARCHAR(50),
    FOREIGN KEY (RecordID) REFERENCES HomicideReport(RecordID)
);
