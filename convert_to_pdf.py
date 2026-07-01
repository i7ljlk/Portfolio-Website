import os
import win32com.client

def convert_to_pdf(doc_name, pdf_name):
    in_file = os.path.abspath(doc_name)
    out_file = os.path.abspath(pdf_name)
    
    try:
        word = win32com.client.Dispatch('Word.Application')
        doc = word.Documents.Open(in_file)
        doc.SaveAs(out_file, FileFormat=17) # 17 is wdFormatPDF
        doc.Close()
    except Exception as e:
        print(f"Error converting {doc_name}: {e}")
    finally:
        word.Quit()

if __name__ == "__main__":
    convert_to_pdf('Hassan_Mundher_CV_EN.docx', 'Hassan_Mundher_CV_EN.pdf')
    convert_to_pdf('Hassan_Mundher_CV_AR.docx', 'Hassan_Mundher_CV_AR.pdf')
