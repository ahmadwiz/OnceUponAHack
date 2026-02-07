from flask import request, jsonify
from config import app
from client import generate_response, generate_image_for_sentence, text_to_speech


@app.route("/story", methods=["GET"])
def get_story_snippet():
    word = request.args.get("word") or ""
    story = request.args.get("story") or ""

    full_story, new_sentence = generate_response(story, word)
    image_data_url = generate_image_for_sentence(new_sentence)
    audio_data_url = text_to_speech(new_sentence)

    return jsonify({
        "response": full_story,
        "image": image_data_url,
        "audio": audio_data_url,
    })



if __name__ == '__main__':
    app.run(debug=True)

