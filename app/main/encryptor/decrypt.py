import math
from collections import Counter

from main.tools.tools import clean_text, remove_accent

dictionary = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
originalFrecuency = ["E", "A", "O"]


def do_json_response(values):
    text = clean_text(remove_accent(values.get('text').upper()))
    frequencies = frequency_analysis(text)
    a, b = find_ab(frequencies[0][0], frequencies[1][0], values.get('option'))
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
    best1 = "E"
    if option == 1:
        best1 = "A"
    elif option == 2:
        best1 = "O"

    best1_value = dictionary.index(best1)
    first_letter_value = dictionary.index(first_letter)
    second_letter_value = dictionary.index(second_letter)

    modulo = 27
    a = (first_letter_value - second_letter_value) * pow(best1_value, -1, modulo) % modulo
    b = (first_letter_value - a * best1_value) % modulo

    if is_coprime(a) and find_inverse(a) is None:
        return find_ab(first_letter, second_letter, option + 1)
    return a, b


def frequency_analysis(text):
    counter = Counter(text.replace(" ", "").replace("\n", ""))
    return counter.most_common(5)


def is_coprime(a):
    mcd = math.gcd(a, 27)
    return mcd == 1
