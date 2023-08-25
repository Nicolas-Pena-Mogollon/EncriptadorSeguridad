from main.tools.tools import remove_accent, clean_text

dictionary = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"


def encrypt(values):
    text = clean_text(remove_accent(values.get('text').upper()))

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
