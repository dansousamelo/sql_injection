
# Guia Teórico sobre SQL Injection

**Autor:** Daniel de Sousa Oliveira Melo Veras  
**Data de Criação:** 08/06/2024

---

## Introdução

SQL Injection é uma das vulnerabilidades mais perigosas e comuns em aplicações web. Este guia explora a teoria por trás do SQL Injection, seus impactos e como mitigá-lo de forma eficaz.

## O que é SQL Injection?

SQL Injection é uma técnica de ataque que permite a um invasor inserir ou manipular consultas SQL que são executadas por um banco de dados. Isso é possível quando os dados fornecidos pelo usuário são diretamente inseridos em consultas SQL sem a devida sanitização.

### Como Funciona?

Quando uma aplicação web recebe entradas do usuário e as utiliza diretamente em consultas SQL, um invasor pode inserir comandos maliciosos que alteram a estrutura da consulta SQL. Isso pode resultar em diversas ações indesejadas, como:

- **Bypass de autenticação:** Acesso não autorizado ao sistema.
- **Exfiltração de dados:** Obtenção de dados confidenciais.
- **Modificação de dados:** Alteração ou exclusão de dados.
- **Execução de comandos:** Execução de comandos administrativos no banco de dados.

## Tipos de SQL Injection

### 1. **Injeção Clássica**
A injeção clássica ocorre quando o invasor insere comandos SQL diretamente em campos de entrada.

### 2. **Injeção Cega**
A injeção cega ocorre quando a aplicação não retorna resultados visíveis de erro, mas ainda é vulnerável a manipulações.

### 3. **Injeção Baseada em Erros**
Essa técnica explora mensagens de erro do banco de dados para inferir a estrutura da consulta SQL.

### 4. **Injeção Inferida**
Aqui, o invasor faz perguntas booleanas e deduz informações baseadas nas respostas (verdadeiro/falso).

### 5. **Injeção de União (Union-Based)**
Esse método utiliza a cláusula UNION para combinar resultados de múltiplas consultas em uma única resposta.

## Exemplos Teóricos

### Exemplo Simples

**Consulta Vulnerável:**

```sql
SELECT * FROM users WHERE username = '$username' AND password = '$password';
```

**Injeção:**

```sql
' OR '1'='1
```

**Consulta Resultante:**

```sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '';
```

### Exemplo Médio

**Consulta Vulnerável:**

```sql
SELECT * FROM HomicideReport WHERE City = '$city';
```

**Injeção:**

```sql
' OR '1'='1' --
```

**Consulta Resultante:**

```sql
SELECT * FROM HomicideReport WHERE City = '' OR '1'='1' -- ;
```

### Exemplo Complexo

**Consulta Vulnerável:**

```sql
SELECT * FROM HomicideReport WHERE RecordID = $recordID;
```

**Injeção:**

```sql
1 UNION SELECT AgencyCode, AgencyName, AgencyType, null, null, null, null, null, null, null, null, null, null, null FROM Agency --
```

**Consulta Resultante:**

```sql
SELECT * FROM HomicideReport WHERE RecordID = 1 UNION SELECT AgencyCode, AgencyName, AgencyType, null, null, null, null, null, null, null, null, null, null, null FROM Agency -- ;
```

## Consequências de SQL Injection

- **Comprometimento de Dados:** Acesso, alteração ou exclusão de dados críticos.
- **Vazamento de Informações Sensíveis:** Exposição de dados pessoais ou corporativos.
- **Impacto na Reputação:** Perda de confiança dos clientes e danos à reputação da empresa.
- **Implicações Legais:** Penalidades legais devido à violação de normas de proteção de dados.

## Prevenção de SQL Injection

### 1. **Uso de Consultas Preparadas**
Consultas preparadas garantem que os dados do usuário sejam tratados como parâmetros e não como comandos SQL.

```php
$stmt = $pdo->prepare('SELECT * FROM HomicideReport WHERE City = :city');
$stmt->execute(['city' => $city]);
```

### 2. **Validação e Sanitização de Entradas**
Valide e sanitize todas as entradas fornecidas pelo usuário para remover caracteres maliciosos.

### 3. **Uso de ORM (Object-Relational Mapping)**
Utilizar ORM pode abstrair e proteger contra injeções SQL ao construir consultas SQL seguras.

### 4. **Configuração Correta do Banco de Dados**
Restringir permissões de usuários no banco de dados, garantindo o princípio do menor privilégio.

## Estrutura do Projeto

O projeto está organizado da seguinte maneira:

- **Fisico_DanielVeras.sql**: Script SQL para a criação das tabelas do banco de dados.
- **Popula_DanielVeras.sql**: Script SQL para popular o banco de dados com dados de exemplo.
- **README.md**: Documento que fornece uma visão geral sobre SQL Injection, exemplos teóricos, consequências e métodos de prevenção.
- **SQLInjection.sql**: Script SQL com exemplos de consultas vulneráveis a SQL Injection para fins de demonstração e ensino.

## Conclusão

SQL Injection é uma ameaça significativa, mas com práticas de codificação seguras e uso de ferramentas adequadas, é possível mitigar este risco. Entender a teoria e a prática de SQL Injection é fundamental para qualquer desenvolvedor ou profissional de segurança da informação.

---

