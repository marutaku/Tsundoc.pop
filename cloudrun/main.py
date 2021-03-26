import os
from flask import Flask, request
import pkg_resources, imp
imp.reload(pkg_resources)

import spacy
nlp = spacy.load('ja_ginza')

app = Flask(__name__)

@app.route("/nouns", methods=['POST'])
def extract_nouns():
    request_json = request.get_json()
    if request_json and 'title' in request_json:

        title = request_json['title']
        doc = nlp(title)

        nouns = []
        for sent in doc.sents:
            nouns += [token.orth_ for token in sent if "NOUN" in token.pos_]
                
        return { "nouns": ",".join(nouns) }

    else:
        return { "msg": "params are not exits" }


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))
