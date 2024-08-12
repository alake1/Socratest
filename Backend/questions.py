import json
import pandas as pd
from random import choice
from string import ascii_uppercase
from flask import Flask, jsonify, request, make_response
from utils import *
import io
import requests
from PyPDF2 import PdfReader

app = Flask(__name__)

headers = {"User-Agent": "Mozilla/5.0 (X11; Windows; Windows x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36"}


def get_filename(topic):
    return topic.lower().replace(" ", "_")


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "*")
    response.headers.add("Access-Control-Allow-Methods", "*")
    return response


@app.route("/question", methods=["GET"])
def get_question():
    qid = request.args.get("qid")
    qid = int(qid)
    topic = request.args.get("topic")
    question = [generate_questions(topic, level=LEVEL)[0]]

    return _corsify_actual_response(jsonify(question.to_dict()))


@app.route("/questions", methods=["GET"])
def questions2():
    topic = request.args.get("topic")
    print(topic)
    jf = get_filename(topic)
    qn = json.load(open("questions\\" + jf + ".json", "r", encoding="utf8"))

    for qni in qn:
        qni["id"] = "".join(choice(ascii_uppercase) for i in range(4))
        qni["isComplete"] = False
        qni["refName"] = "".join(choice(ascii_uppercase) for i in range(4))
    return _corsify_actual_response(jsonify(qn[:3]))


@app.route("/new-topic-questions", methods=["GET"])
def questions3():
    topic = request.args.get("topic")
    print(topic)
    questions = generate_questions(topic, level=LEVEL)
    for qni in questions:
        qni["id"] = "".join(choice(ascii_uppercase) for i in range(4))
    return _corsify_actual_response(jsonify(questions))


@app.route("/upload-questions", methods=["GET"])
def questions4():
    url = request.args.get("url")
    response = requests.get(url=url, headers=headers, timeout=120)
    on_fly_mem_obj = io.BytesIO(response.content)
    pdf_file = PdfReader(on_fly_mem_obj)
    text = ""
    for page in pdf_file.pages:
        text += page.extract_text()
    prompt = textwrap.dedent(
        f"""QUESTION: Ask me 10 multiple-choice questions with 4 options each based on the passage shared below.
    Passage : {text}

  Questions should be of medium to hard difficulty, and of medium length.
  """
    )
    chat = model1.start_chat()
    i = 0
    qns = []
    while True and i < 5:
        i = i + 1
        response = chat.send_message(content=prompt, stream=False)
        try:
            questions = json.loads(response.text)
            break
        except:
            pass
    for qni in questions:
        qni["question"] = qni["question_title"]
        qni["id"] = "".join(choice(ascii_uppercase) for i in range(4))
    return _corsify_actual_response(jsonify(questions))


def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run(port=8000, debug=True)
