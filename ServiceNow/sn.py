import requests
from requests.auth import HTTPBasicAuth
import pandas as pd


# URLs das APIs
base_url = "https://mti.service-now.com/api/now/table"
usuario = 'luizguimaraes@mti.mt.gov.br'
senha = 'Shukako12?'


# 1️⃣ Buscar Projetos
url_pm_project = f"{base_url}/pm_project"
params_pm = {
    "sysparm_query": "state!=4^sys_class_name!=u_projetos_mt_mais_conectado",
    "sysparm_display_value": "true",
    "sysparm_fields": "sys_id,number,short_description,project_status,state,sys_created_by,end_date"
}

response_pm = requests.get(url_pm_project, params=params_pm, auth=HTTPBasicAuth(usuario, senha), headers={"Accept": "application/json"})
projetos = response_pm.json().get("result", [])

# Criar DataFrame dos Projetos
df_projetos = pd.DataFrame(projetos)

if not df_projetos.empty:
    df_projetos = df_projetos.rename(columns={
        "sys_id": "id_projeto",
        "number": "Número do Projeto",
        "short_description": "Descrição",
        "project_status": "Status do Projeto",
        "state": "Estado",
        "sys_created_by": "Criado por",
        "end_date": "Data de Conclusão"
    })
else:
    print("⚠️ Nenhum projeto encontrado na API pm_project.")

# 2️⃣ Buscar Relatórios de Status
url_status_report = f"{base_url}/u_project_status_report"
params_status = {
    "sysparm_display_value": "true",
    "sysparm_fields": "sys_id,u_project,report_date,u_status,u_comments"
}

response_status = requests.get(url_status_report, params=params_status, auth=HTTPBasicAuth(usuario, senha), headers={"Accept": "application/json"})
relatorios = response_status.json().get("result", [])

# Criar DataFrame dos Relatórios de Status
df_status = pd.DataFrame(relatorios)

if not df_status.empty:
    df_status = df_status.rename(columns={
        "sys_id": "id_relatorio",
        "u_project": "id_projeto",
        "report_date": "Data do Relatório",
        "u_status": "Status do Relatório",
        "u_comments": "Comentários"
    })
else:
    print("⚠️ Nenhum relatório de status encontrado na API u_project_status_report.")

# 3️⃣ Verificar se ambas as tabelas possuem a coluna id_projeto
if "id_projeto" in df_projetos.columns and "id_projeto" in df_status.columns:
    # Fazer o merge apenas se as colunas estiverem corretas
    df_final = df_projetos.merge(df_status, on="id_projeto", how="left")
    print("✅ Merge realizado com sucesso.")
    
    # Exbir os primeiros registros no consolei
    print(df_final.head())

    # 4️⃣ Salvar para CSV (Opcional)
    df_final.to_csv("relatorio_status_projetos.csv", index=False)

    # 5️⃣ Salvar para Excel (Opcional)
    df_final.to_excel("relatorio_status_projetos.xlsx", index=False)

else:
    print("❌ Erro: id_projeto não encontrado em um dos DataFrames. Verifique os dados retornados pela API.")