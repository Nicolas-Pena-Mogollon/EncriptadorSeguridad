from flask import Flask, Blueprint, jsonify, request

from app.main.encryptor.encrypt import encrypt

bp = Blueprint('routes', __name__)


@bp.route('/encrypt', methods=['POST'])
def encrypt_data():
    if request.is_json:
        data = request.json.get('jsonValues')
        if data is not None:
            return jsonify(encrypt(data))
    else:
        return jsonify("Ha ocurrido un error")

    """
    data = request.form.get('data')
    encrypted_data = encrypt(data)
    return jsonify({'encrypted_data': encrypted_data})"""


"""
@app.route('/decrypt', methods=['POST'])
def decrypt_data():
    encrypted_data = request.form.get('encrypted_data')
    decrypted_data = decrypt(encrypted_data)
    return jsonify({'decrypted_data': decrypted_data})
"""
