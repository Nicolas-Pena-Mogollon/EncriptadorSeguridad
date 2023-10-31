import secrets

from flask import Flask, render_template, session

from main.routes import bp

app = Flask(__name__, template_folder='./templates/')
app.secret_key = secrets.token_hex(24)
app.config['MAX_LOGIN_ATTEMPTS'] = 3  # Número máximo de intentos de inicio de sesión
app.config['BLOCK_TIME_MINUTES'] = 5
app.register_blueprint(bp)


@app.route('/')
def hello_world():  # put application's code here
    if session.get('logged_in'):
        return render_template('encrypter.html')
    else:
        return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
