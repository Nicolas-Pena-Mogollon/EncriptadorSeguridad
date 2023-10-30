from datetime import datetime, timedelta

import mysql.connector


class Database:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Database, cls).__new__(cls)
            # Configura la conexión a la base de datos aquí
            cls._instance.db = mysql.connector.connect(
                host='localhost',
                user='cifrado',
                password='Cifrado2023.',
                database='cifrado'
            )
        return cls._instance


# Define una estructura de datos para el bloqueo de usuarios
blocked_users = {}


# Función para comprobar si un usuario está bloqueado
def is_user_blocked(username):
    block_info = blocked_users.get(username)
    if block_info and block_info['block_until'] > datetime.now():
        return True
    return False


# Función para bloquear a un usuario
def block_user(username, block_time_minutes):
    block_until = datetime.now() + timedelta(minutes=block_time_minutes)
    blocked_users[username] = {'block_until': block_until}
