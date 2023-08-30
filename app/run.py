from flask import Flask, render_template

from main.routes import bp

app = Flask(__name__, template_folder='./templates/')

app.register_blueprint(bp)


@app.route('/')
def hello_world():  # put application's code here
    return render_template('index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
