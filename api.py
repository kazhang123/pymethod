from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

from flask_cors import cross_origin
from backend.parser import AstParser
from backend.systrace import trace_call

app = Flask(__name__)
CORS(app)

@app.route('/graph', methods=['POST'])
@cross_origin()
def respond():
    response = {}
    try:
        file = request.files['file']
        filename = file.filename
        file_bytes = file.read()
        ast_parser = AstParser()
        defs, static_edges = ast_parser.parse(file_bytes)
        args = request.form.getlist('arg')
        dynamic_edges, call_seq = trace_call(file_bytes, filename, defs, args)
        response["defs"] = defs
        response["staticFromToEdges"] = static_edges
        response["dynamicFromToEdges"] = dynamic_edges
        response["callSequence"] = call_seq

    except Exception as e:
        response['Error in POST: '] = str(e)

    response = jsonify(response)
    return response

@app.route('/')
def index():
    return "<h1>Welcome to the Project 2 API</h1>"

if __name__ == '__main__':
    app.run(threaded=True, port=8888)