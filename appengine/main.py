import os
import re
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from flask import Flask, render_template
from flask_assets import Environment, Bundle
from flask import request, escape
from custom_filters import sample

PORT = os.environ.get('PORT')
app = Flask(__name__)
## Custom filters:
## For more information about flask blueprints go here:
## https://flask.palletsprojects.com/en/2.1.x/blueprints/
app.register_blueprint(sample.filter_bp)
##
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred)
db = firestore.client()

# Configuration for sass -> css minified
assets = Environment(app)
css = Bundle('scss/core/main.scss', filters='libsass, cssmin',
             depends='scss/**/*.scss', output='main.min.css')
assets.register('scss_all', css)

js_min = Bundle('main.min.js')
assets.register('js_min', js_min)


def get_safe_param(request, param):
    """Returns param escaped and formated"""
    return format(escape(request.args.get(param)))

@app.route('/', methods=['GET'])
def root():
    """Renders index.jinja"""

    index_ref = db.collection('content').document('index')
    index = index_ref.get()
    index_json = None

    if index:
        index_json = index.to_dict()

    return render_template('index.jinja', page=index_json)






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)
