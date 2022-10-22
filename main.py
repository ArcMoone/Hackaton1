from flask import Flask, render_template, request, g
import sqlite3
import os

app = Flask(__name__)

app.config['DATABASE'] = os.path.join(app.root_path, 'Data.db')

def connectDB():
    conn = sqlite3.connect(app.config['DATABASE'])
    conn.row_factory = sqlite3.Row
    return conn

def createDB():
    db = connectDB()
    with app.open_resource('sqDB.sql', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()
    db.close()

def getDB():
    if not hasattr(g, 'DBLink'):
        g.DBLink = connectDB()
    return g.DBLink

@app.route("/")
def index():
    return render_template('map.html')

@app.route("/getPoints")
def getPoints():
    db = getDB()
    #TODO: изменить эту функцию для получения массива меток из бд
    return 0

@app.route("/getUserPoint")
def getPoints():
    db = getDB()
    #TODO: изменить эту функцию для получения метки пользователя из бд
    return 0

@app.teardown_appcontext
def closeDB(error):
    if hasattr(g, 'DBLink'):
        g.DBLink.close()

if __name__ == "__main__":
    app.run(debug=True)