# from flask import Flask
# from flask import render_template

from flask import Flask, render_template, jsonify
from stock_scraper import get_data
import data_getter

app = Flask(__name__)


@app.route("/circle/<graph_id>")
def make_circlemap(graph_id):
    template = "circlepack/index%s.html" % graph_id
    return render_template(template)

@app.route("/treemap/<graph_id>")
def make_treemap(graph_id):
    template = "treemap/index%s.html" % graph_id
    return render_template(template)

@app.route("/tree/<graph_id>")
def make_tree(graph_id):
    template = "tree/index%s.html" % graph_id
    return render_template(template)

@app.route("/")
def index():
    return render_template("index.html")

# @app.route("/2")
# def index2():
#     return render_template("index2.html")

# @app.route("/circlepack")
# def circlepack():
#     return render_template("circlepack/index.html")
#
# @app.route("/circlepack2")
# def circlepack2():
#     return render_template("circlepack/index2.html")


@app.route("/data")
def data():
    return jsonify(get_data())

@app.route("/data2")
def data2():
    return jsonify(data_getter.get_data2())
    # return jsonify(results=data_getter.get_data2())
    # return data_getter.get_data()

@app.route("/data3")
def data3():
    # return jsonify(data_getter.get_data())
    return jsonify(data_getter.get_data3())
    # return data_getter.get_data()



if __name__ == "__main__":
    app.run(debug=True)
