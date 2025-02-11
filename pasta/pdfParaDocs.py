from pdfminer.high_level import extract_text
from docx import Document

def pdf_to_docx(pdf_path, docx_path):
    try:
        # Extrair texto do PDF
        text = extract_text(pdf_path)

        if not text.strip():
            print("O PDF está vazio ou não contém texto extraível.")
            return

        # Criar um documento Word
        doc = Document()

        # Adicionar o texto extraído ao documento Word, linha por linha
        for line in text.splitlines():
            doc.add_paragraph(line)

        # Salvar o documento Word
        doc.save(docx_path)
        print(f"Conversão concluída: {docx_path}")

    except Exception as e:
        print(f"Erro ao converter PDF para DOCX: {e}")

# Caminhos de exemplo
pdf_path = "C:/Users/8761124/Documents/Pessoal/Programação/pasta/Status.pdf"
docx_path = "saida.docx"

pdf_to_docx(pdf_path, docx_path)