from openai import OpenAI
import os
import re
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)

def generate_response(story, word):
    response = client.responses.create(
        model="openai/gpt-4o-mini",
        input = f"""
        Given the following story snippet as context: {story == "" and "Once upon a time" or story}, 
        Continue the story with exactly one magic-themed sentence, relating to the word: {word},
        """
    )

    match = re.search(word, response.output_text, re.IGNORECASE)
    response = response.output_text
    if (match):
        response = response.replace(match.group(), f"<span><h1>{match.group()}</h1></span>") + "<br/><br/>"

    return {"oldStory": story, "newStory": response, "fullStory": story + " " + response}


