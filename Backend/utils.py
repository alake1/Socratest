import json
import typing_extensions as typing
import textwrap
import google.generativeai as genai
import random

# GOOGLE_API_KEY = "Add your key here"
genai.configure(api_key=GOOGLE_API_KEY)


class Question(typing.TypedDict):
    question_title: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    answer: str  # --- only one of option_a, option_b, option_c, option_d
    explanation: str


class PassageQuestion(typing.TypedDict):
    passage: str
    question_title: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    answer: str  # --- only one of option_a, option_b, option_c, option_d
    explanation: str


class AnswerOption(typing.TypedDict):
    answer: str  # --- only one of a, b, c, d


# Model Config
temperature = round(random.uniform(0.5, 1.5), 1)  # can change
config = {"response_mime_type": "application/json", "response_schema": list[Question], "temperature": temperature}

model1 = genai.GenerativeModel("models/gemini-1.5-flash", generation_config={"response_mime_type": "application/json", "response_schema": list[Question]})

model2 = genai.GenerativeModel("models/gemini-1.5-flash", generation_config={"response_mime_type": "application/json", "response_schema": list[PassageQuestion]})

verification_model = genai.GenerativeModel("models/gemini-1.5-flash", generation_config={"response_mime_type": "application/json", "response_schema": AnswerOption})

TOPIC = "chemistry"  # any
LEVEL = "high-school"  # primary-school, undergrad, expert, intermediate
NUM_QUESTIONS = 2  # any


def define_chatbot(level):
    if "grad" in level:
        return "professor"
    elif "school" in level:
        return "teacher"
    return "examiner"


def define_student_type(level):
    if "grad" in level:
        return "university students"
    elif "school" in level:
        return level + " students"
    return "people"


def get_section(exam):
    if exam == "Graduate Record Examinations":
        return "GRE verbal reasoning section"
    return "SAT critical Reading and Comprehension section"


chatbot_type = define_chatbot(LEVEL)
student_type = define_student_type(LEVEL)


def get_prompt1(topic, chatbot_type, num_questions, student_type):
    prompt = textwrap.dedent(
        f"""You are a {topic} {chatbot_type} in the USA. Generate a list of {num_questions} multiple-choice questions with 4 options each for evaluating {student_type} in {topic}.

  Question should be of medium to hard difficulty, and of short to long length. Answer should only be one of option_a, option_b, option_c, option_d. Explanation should explain the answer.
  """
    )
    return prompt


def get_prompt2(exam, num_questions):
    section = get_section(exam)
    prompt = textwrap.dedent(
        f"""You are a {exam} examiner. Ask me {num_questions} multiple-choice questions with 4 options each for the {section}.

  Passages should be very different from one another. Questions should be based on the passage. Questions should be of medium to hard difficulty, and of medium to long length. Answer should only be one of option_a, option_b, option_c, option_d. Explanation should explain the answer.
  """
    )
    return prompt


exam = "Graduate Record Examinations"  # SAT Aptitude Test


def convert_res(resp):
    newjs = []
    for res in resp:
        newres = {
            "question": res["question"],
            "options": [res["option_a"], res["option_b"], res["option_c"], res["option_d"]],
            "correctOption": ["option_a", "option_b", "option_c", "option_d"].index(res["answer"]),
            "explanation": res["explanation"],
        }
        newjs.append(newres)
    return newjs


def generate_questions(topic, level):
    """
    Generate Questions with multiple-choice options and answers.
    Ask question back to the model to verify that answer is valid.
    """
    if topic.lower() in ["sat", "gre"]:
        relevant_model = model2
        prompt = get_prompt2(topic, 1)
    else:
        relevant_model = model1
        chatbot_type = define_chatbot(level)
        student_type = define_student_type(level)
        prompt = get_prompt1(topic, chatbot_type, NUM_QUESTIONS, student_type)
    i = 0
    qns = []
    while True and i < 5:
        i = i + 1
        chat = relevant_model.start_chat()
        response = chat.send_message(content=prompt, stream=False)
        try:
            qns = json.loads(response.text)
            break
        except:
            pass
    verification_chat = verification_model.start_chat()
    verified_questions = []
    for qn in qns:
        qn["question"] = qn["question_title"]
        question = qn["question_title"]
        opts = {"a": qn["option_a"], "b": qn["option_b"], "c": qn["option_c"], "d": qn["option_d"]}
        prompt = textwrap.dedent(
            f"""{question}
        Options: {opts}
        Answer should only be one of - a / b / c / d
        """
        )

        response = verification_chat.send_message(content=prompt, stream=False)
        answer = json.loads(response.text)
        if answer["answer"] == qn["answer"][-1]:
            verified_questions.append(qn)
        return verified_questions


generate_questions("reactjs", "high-school")
