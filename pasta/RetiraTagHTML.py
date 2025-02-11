import pandas as pd
import re

def remove_html_tags(text):
    """
    Remove tags HTML de um texto.
    :param text: Texto com possíveis tags HTML.
    :return: Texto sem tags HTML.
    """
    if pd.isna(text):
        return text
    return re.sub(r'<[^>]*>', '', str(text))

def processar_excel(origem, destino):
    """
    Remove tags HTML de todas as células de um arquivo Excel.
    :param origem: Caminho do arquivo Excel de origem.
    :param destino: Caminho do arquivo Excel para salvar o resultado.
    """
    try:
        # Lê o arquivo Excel (todas as abas)
        excel_data = pd.read_excel(origem, sheet_name=None, engine='openpyxl')
        
        # Processa cada aba
        processado = {}
        for aba, df in excel_data.items():
            # Aplica a remoção de HTML em todas as células da aba
            df_limpo = df.applymap(remove_html_tags)
            processado[aba] = df_limpo

        # Salva o resultado em um novo arquivo Excel
        with pd.ExcelWriter(destino, engine='openpyxl') as writer:
            for aba, df_limpo in processado.items():
                df_limpo.to_excel(writer, sheet_name=aba, index=False)

        print(f"Arquivo processado com sucesso! Salvo em: {destino}")
    except Exception as e:
        print(f"Erro ao processar o arquivo Excel: {e}")

# Caminhos para os arquivos Excel
arquivo_origem = "C:/Users/8761124/Documents/Pessoal/Programação/pasta/Status.xlsx"  # Substitua pelo caminho do arquivo original
arquivo_destino = "arquivo_processado.xlsx"  # Substitua pelo caminho do arquivo de destino

# Processar o arquivo Excel
processar_excel(arquivo_origem, arquivo_destino)