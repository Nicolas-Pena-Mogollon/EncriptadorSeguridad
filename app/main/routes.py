from flask import Flask, Blueprint, jsonify, request

from main.encryptor.encrypt import encrypt

from main.encryptor.decrypt import do_json_response

bp = Blueprint('routes', __name__)


@bp.route('/encrypt', methods=['POST'])
def encrypt_data():
    if request.is_json:
        data = request.json.get('jsonValues')
        if data is not None:
            return jsonify(encrypt(data))
    else:
        return jsonify("Ha ocurrido un error")


@bp.route('/decrypt', methods=['POST'])
def decrypt_data():
    if request.is_json:
        data = request.json.get('jsonValues')
        if data is not None:
            return jsonify(do_json_response(data))
    else:
        return jsonify("Ha ocurrido un error")
