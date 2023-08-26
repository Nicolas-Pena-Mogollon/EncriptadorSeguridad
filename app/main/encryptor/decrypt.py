import math
from collections import Counter

from main.tools.tools import clean_text, remove_accent

dictionary = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
originalFrecuency = ["E", "A", "O"]


def do_json_response(values):
    text = clean_text(remove_accent(values.get('text').upper()))
    frequencies = frequency_analysis(text)
    if frequencies is None:
        return {'text': "Ingrese solo caracteres de la A a la Z"}
    option = values.get('option')
    a, b = find_ab(frequencies[0][0], frequencies[1][0], option)
    if a == -1:
        return {'text': "No se ha logrado desencriptar"}
    decrypt_text = decrypt(text, a, b)
    return {'text': decrypt_text, 'a': a, 'b': b, 'frequencies': frequencies}


def decrypt(text, a, b):
    n = 27
    inverse_a = find_inverse(a)
    plaintext = ""
    for char in text:
        if char in dictionary:
            c = dictionary.index(char)
            m = (inverse_a * (c - b)) % n
            plaintext += dictionary[m]
        else:
            plaintext += char

    return plaintext


def find_inverse(a):
    for i in range(27):
        if (a * i) % 27 == 1:
            return i
    return None


def find_ab(first_letter, second_letter, option):
    if option == 0:
        best1 = "E"
    elif option == 1:
        best1 = "A"
    elif option == 2:
        best1 = "O"
    else:
        return -1, -1
    best1_value = dictionary.index(best1)
    first_letter_value = dictionary.index(first_letter)
    second_letter_value = dictionary.index(second_letter)
    modulo = 27
    if best1_value == 0:
        a = first_letter_value
    elif find_inverse(best1_value) is None:
        return find_ab(first_letter, second_letter, option + 1)
    else:
        a = (first_letter_value - second_letter_value) * pow(best1_value, -1, modulo) % modulo
    b = (first_letter_value - a * best1_value) % modulo

    if not is_coprime(a) or find_inverse(a) is None:
        return find_ab(first_letter, second_letter, option + 1)
    return a, b


def frequency_analysis(text):
    cleaned_text = text.replace(" ", "").replace("\n", "")
    if cleaned_text == "":
        return None
    letter_count = Counter(cleaned_text)
    total_letters = len(cleaned_text)
    results = []

    for letter, count in letter_count.items():
        percentage = (count / total_letters) * 100
        results.append((letter, count, percentage))

    results.sort(key=lambda x: x[1], reverse=True)

    return results[:5]


def is_coprime(a):
    mcd = math.gcd(a, 27)
    return mcd == 1
