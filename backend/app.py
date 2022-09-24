from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from werkzeug.utils import secure_filename
from pathlib import Path
from zipfile import ZipFile
from shutil import rmtree
from main import main
import os


app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = os.getcwd() + '/temp/'


@app.route('/')
def home():
    return 'Hi'


@app.route('/upload', methods=['GET', 'POST'])
def upload():
    Path(os.getcwd() + '/temp/').mkdir(parents=True, exist_ok=True)

    if request.method == 'POST':
        f = request.files['file']
        filename = secure_filename(f.filename)

        try:
            # Save the Zipfile
            zip_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            f.save(zip_path)

            # Unzip the file
            with ZipFile(zip_path, 'r') as zip_ref:
                zip_ref.extractall(app.config['UPLOAD_FOLDER'])

            # Get the data
            result = main(os.path.join(
                app.config['UPLOAD_FOLDER'], filename[:-4]))

            # Delete the file
            rmtree(app.config['UPLOAD_FOLDER'])

            return jsonify(result)
        except:
            rmtree(app.config['UPLOAD_FOLDER'])
            abort(400)


if __name__ == '__main__':
    app.run(host='192.168.1.229', port=5000, debug=True)
