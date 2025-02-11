import pandas as pd

def extrair_excel_para_txt(caminho_excel, caminho_txt, colunas=None, separador='\t'):
    try:
        # Ler o arquivo Excel
        df = pd.read_excel(caminho_excel)
        
        # Imprimir nomes das colunas disponíveis
        print("Colunas disponíveis:", list(df.columns))
        
        # Selecionar colunas específicas se fornecidas
        if colunas:
            df = df[colunas]
        
        # Salvar em arquivo de texto
        df.to_csv(caminho_txt, sep=separador, index=False, encoding='utf-8')
        
        print(f"Dados extraídos salvos em {caminho_txt}")
    
    except Exception as e:
        print(f"Erro ao processar o Excel: {e}")

# Chame a função com o caminho correto
extrair_excel_para_txt('C:/Users/8761124/Documents/Pessoal/Programação/pasta/Status.pdf', 'dados_extraidos.txt')