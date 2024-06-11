-- ----------------     << Trabalho Final >>     ------------------
-- 
--                    SCRIPT DE SIMULAÇÃO (DML)
-- 
-- Data Criacao ...........: 08/06/2024
-- Autor(es) ..............: Daniel de Sousa Oliveira Melo Veras
-- Banco de Dados .........: MySQL
-- Base de Dados(nome) ....: HomicideDB
-- 
-- Data Ultima Alteracao ..: 08/06/2024
--   => Criacao do script de simulação
-- 
-- --------

-- Seleciona o banco de dados
USE HomicideDB;

SELECT * FROM HomicideReport;
-- Exemplo 1 de SQL Injection
-- Suponha que a aplicação execute a seguinte consulta para buscar relatórios de homicídios por cidade
SELECT * FROM HomicideReport WHERE City = 'Anchorage';
-- Um invasor pode usar ' OR '1'='1' -- no campo cidade
-- A consulta resultante será:
SELECT * FROM HomicideReport WHERE City = '' OR '1'='1';
-- Isso retornará todos os registros da tabela HomicideReport

-- Exemplo 2 de SQL Injection
-- Suponha que a aplicação execute a seguinte consulta para obter detalhes de um relatório específico
SELECT * FROM HomicideReport WHERE RecordID = '2';
-- Um invasor pode usar 1 UNION SELECT AgencyCode, AgencyName, AgencyType, null, null, null, null, null, null, null, null, null, null, null FROM Agency --
-- A consulta resultante será:
SELECT * FROM HomicideReport WHERE RecordID = 1 UNION SELECT AgencyCode, AgencyName, AgencyType, null, null, null, null, null, null, null, null, null, null, null FROM Agency -- ;
-- Isso retornará dados combinados de HomicideReport e Agency

-- Prevenção de SQL Injection
-- Use consultas preparadas para evitar SQL Injection
-- Exemplo em PHP com PDO:
-- $stmt = $pdo->prepare('SELECT * FROM HomicideReport WHERE City = :city');
-- $stmt->execute(['city' => $city]);
-- $stmt = $pdo->prepare('SELECT * FROM HomicideReport WHERE RecordID = :recordID');
-- $stmt->execute(['recordID' => $recordID]);
