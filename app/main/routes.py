from flask import Blueprint, jsonify, request, session, redirect, url_for, render_template
from datetime import datetime
from functools import wraps
#import logging
import json
import bcrypt
import jwt

from main.encryptor.encrypt import encrypt
from main.encryptor.decrypt import do_json_response
from main.db.db import Database, is_user_blocked, block_user, blocked_users

db = Database().db
bp = Blueprint('routes', __name__)


#logging.basicConfig(filename='./config/login_attempts.log', level=logging.INFO,
                    #format='%(asctime)s - %(levelname)s - %(message)s')
with open('./config/config.json') as config_file:
    config = json.load(config_file)

max_login_attempts1 = config['MAX_LOGIN_ATTEMPTS1']
max_login_attempts2 = config['MAX_LOGIN_ATTEMPTS2']
block_time_minutes = config['BLOCK_TIME_MINUTES']
SECRET_KEY = config['CLAVE']


def require_auth(view_func):
    @wraps(view_func)
    def decorated_view(*args, **kwargs):
        if 'access_token' in request.cookies:
            token = request.cookies.get('access_token')

            try:
                decoded_token = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
                # Verifica que el token sea válido y contiene la información necesaria
                if 'username' in decoded_token and 'password' in decoded_token:
                    # El usuario está autenticado, puedes continuar con la vista
                    return view_func(*args, **kwargs)
            except jwt.ExpiredSignatureError:
                return render_template('unauthorized.html')
            except jwt.DecodeError:
                return render_template('unauthorized.html')
        return render_template('unauthorized.html')

    return decorated_view


@bp.route('/encrypter')
@require_auth
def encrypter():
    return render_template('encrypter.html')


@bp.route('/index')
def index():
    session['logged_in'] = False
    session['login_attempts'] = 0
    return render_template('index.html')


@bp.route('/encrypt', methods=['POST'])
@require_auth
def encrypt_data():
    if request.is_json:
        data = request.json.get('jsonValues')
        if data is not None:
            return jsonify(encrypt(data))
    else:
        return jsonify("Ha ocurrido un error")


@bp.route('/decrypt', methods=['POST'])
@require_auth
def decrypt_data():
    if request.is_json:
        data = request.json.get('jsonValues')
        if data is not None:
            return jsonify(do_json_response(data))
    else:
        return jsonify("Ha ocurrido un error")


@bp.route('/login', methods=['POST'])
def login():
    if request.is_json:
        data = request.json
        username = data.get('jsonValues', {}).get('username')
        password = data.get('jsonValues', {}).get('password')
        if is_user_blocked(username) and session['login_attempts']:
            minutes, seconds = divmod((blocked_users[username]['block_until'] - datetime.now()).total_seconds(), 60)
            return jsonify({'blocked': [int(minutes), int(seconds)]})

        if check_credentials(username, password):
            # Las credenciales son válidas, inicia sesión.
            session['logged_in'] = True
            # Reinicia los intentos de inicio de sesión
            session['login_attempts'] = 0

            # Genera un token JWT para el usuario
            user_token = jwt.encode({'username': username, 'password': password}, SECRET_KEY, algorithm='HS256')

            return jsonify({'access_token': user_token})

        else:
            # Credenciales incorrectas, aumenta el contador de intentos.
            session['login_attempts'] = session.get('login_attempts', 0) + 1
            if session['login_attempts'] >= max_login_attempts2:
                block_user(username, 5)
                minutes, seconds = divmod((blocked_users[username]['block_until'] - datetime.now()).total_seconds(), 60)
                return jsonify({'blocked': [int(minutes), int(seconds)]})
            if session['login_attempts'] == max_login_attempts1:
                block_user(username, 1)
                minutes, seconds = divmod((blocked_users[username]['block_until'] - datetime.now()).total_seconds(), 60)
                return jsonify({'blocked': [int(minutes), int(seconds)]})
            # Registra el intento de inicio de sesión incorrecto
            #log_message = f"Intento de inicio de sesión fallido - Usuario: {username}, Hora: {datetime.now()}"
            #logging.error(log_message)
            return jsonify({'error': 'Credenciales inválidas'})

    return jsonify({'error': 'Invalid request'}), 400


def check_credentials(username, password):
    cursor = db.cursor()
    cursor.execute("SELECT username, password FROM usuarios WHERE username = %s", (username,))

    user = cursor.fetchone()
    return user is not None and bcrypt.checkpw(password.encode('utf-8'), user[1].encode('utf-8'))
