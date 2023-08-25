import re

import unicodedata


def remove_accent(text):
    # Definimos un diccionario de reemplazo para las letras acentuadas
    replacements = {'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'}

    # Utilizamos un bucle para reemplazar las letras acentuadas
    cleaned_text = ''.join(replacements.get(char, char) for char in text)

    return cleaned_text

def clean_text(text):
    text = re.sub(r'[^a-zA-ZñÑ\s]', '', text)
    return re.sub(r'\s+', ' ', text).strip()
