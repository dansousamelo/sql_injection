from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente do arquivo .env
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuração do banco de dados
conn = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)

@app.get("/reports")
def get_reports(city: str = Query(None), recordID: str = Query(None)):
    cursor = conn.cursor(dictionary=True)
    sql = "SELECT * FROM HomicideReport WHERE 1=1"
    if city:
        sql += f" AND City = '{city}'"
    if recordID:
        sql += f" AND RecordID = {recordID}"
    
    cursor.execute(sql)
    result = cursor.fetchall()
    cursor.close()
    return result
