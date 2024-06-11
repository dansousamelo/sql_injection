
# SQL Injection

**Autor:** Daniel de Sousa Oliveira Melo Veras  
**Data de Criação:** 08/06/2024

---

## Introdução

<p><strong><em>SQL Injection</em></strong> é uma das vulnerabilidades mais perigosas e comuns em aplicações web. Este projeto trata-se de uma simulação de como funciona a técnica de sql injection para fins didáticos, abaixo temos uma imagem de como ficou o client-side da aplicação.</p>

<div style="display: flex; flex-direction: column; justify-content: center; align-items:center;">
     <img src="https://github.com/dansousamelo/sql_injection/assets/48137972/9fc7b340-2e93-4b2a-9afc-a460e07aa9f2" alt="Imagem da aplicação de simulação de sql injection" style="display: block; margin: 0 auto;">
</div>








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

```bash
client
│   .eslintrc.json
│   .gitignore
│   index.html
│   jest.config.ts
│   package-lock.json
│   package.json
│   server.json
│   setupTests.ts
│   tsconfig.json
│   tsconfig.node.json
│   vercel.json
│   vite.config.ts
└───src
node_modules
database
│   Fisico_DanielVeras.sql
│   Popula_DanielVeras.md
│   SQLInjection.sql
server
│   .env
│   main.py
│   package-lock.json
│   package.json
└───__pycache__
README.md
```

## Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` no diretório `server` com o seguinte conteúdo:

```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=HomicideDB
```

### Instalação

Siga os passos abaixo para configurar o projeto:

1. Clone o repositório:

    ```bash
    git clone <URL do repositório>
    ```

2. Instale as dependências do cliente:

    ```bash
    cd client
    npm install --legacy-peer-deps
    ```

3. Instale as dependências do servidor:

    ```bash
    cd server
    pip install -r requirements.txt
    ```

### Executando o Projeto

1. Inicie o servidor:

    ```bash
    cd server
    uvicorn main:app --reload
    ```

2. Inicie o cliente:

    ```bash
    cd client
    npm run dev
    ```

### Endpoints

#### GET /reports

Retorna relatórios de homicídios com base nos parâmetros fornecidos.

- **Parâmetros de Consulta:**
  - `city` (opcional): Filtra relatórios por cidade.
  - `recordID` (opcional): Filtra relatórios pelo ID do registro.

### Exemplo de Uso

Para obter relatórios de homicídios por cidade:

```bash
curl -X GET "http://localhost:8000/reports?city=Columbia"
```

Para obter relatórios de homicídios por ID de registro:

```bash
curl -X GET "http://localhost:8000/reports?recordID=2"
```

## Conclusão

SQL Injection é uma ameaça significativa, mas com práticas de codificação seguras e uso de ferramentas adequadas, é possível mitigar este risco. Entender a teoria e a prática de SQL Injection é fundamental para qualquer desenvolvedor ou profissional de segurança da informação.

---

