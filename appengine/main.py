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
## Custom filters
app.register_blueprint(sample.blueprint)
##
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred)
db = firestore.client()

# Configuration for sass -> css minified
assets = Environment(app)
css = Bundle('scss/core/main.scss', filters='libsass, cssmin',
             depends='scss/**/*.scss', output='main.min.css')
assets.register('scss_all', css)

## TODO: Add js to the site.

def get_safe_param(request, param):
    """Returns param escaped and formated"""
    return format(escape(request.args.get(param)))

@app.route('/', methods=['GET'])
def root():
    """Renders index.jinja"""
    ## TODO: Query db and pass data to template.
    return render_template('index.jinja')






if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT, debug=True)
