#import dataexplorer
import os
from shutil import rmtree

import zipfile
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
from random import randint
import main

app = Flask(__name__)

# Set folder to store files in
UPLOAD_FOLDER = os.getcwd() + '/temp/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

@app.route('/uploader', methods=['GET', 'POST'])
@cross_origin(origin='*', headers=['Content-Type', 'Authorization'])
def upload_file():
    if request.method == 'POST':
        temp_path = os.path.join(app.config['UPLOAD_FOLDER'])

        f = request.files['file']
        filename = secure_filename(f.filename) 

        # Make temp folder 
        folder = randint(0,1000)
        if os.path.exists(os.path.join(temp_path, str(folder))):
            folder += randint(1000,2000)
            os.mkdir(os.path.join(temp_path, str(folder)))
        else:
            os.mkdir(os.path.join(temp_path, str(folder)))

        # Save Zipfile in temp folder
        zip_path = os.path.join(app.config['UPLOAD_FOLDER'], str(folder), filename)
        f.save(zip_path)
        print("Flask: File Saved")

        # Unzip file
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(os.path.join(
                app.config['UPLOAD_FOLDER'], str(folder)))
        print("Flask: File Unzipped")

        result = main.main(os.path.join(app.config['UPLOAD_FOLDER'], str(folder), filename[:-4]))
        
        #  Delete Data
        rmtree(os.path.join(app.config['UPLOAD_FOLDER'], str(folder)))

        return jsonify(result)


@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
