import re

import unicodedata

dictionary = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"


def encrypt(values):
    text = remove_accent(values.get('text').upper())
    text = clean_text(text)
    a = int(values.get('a'))
    b = int(values.get('b'))
    ciphertext = ""
    for letter in text:
        if letter in dictionary:
            original_letter_ref = dictionary.index(letter)
            cipher_num_ref = (a * original_letter_ref + b) % 27
            encrypted_letter = dictionary[cipher_num_ref]
            ciphertext += encrypted_letter
        else:
            ciphertext += letter

    return ciphertext


def remove_accent(text):
    new_text = ''.join((c for c in unicodedata.normalize('NFD', text) if unicodedata.category(c) != 'Mn'))
    return new_text


def clean_text(text):
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return re.sub(r'\s+', ' ', text).strip()
