from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)

def generate_response(story, word):
    if story == "":
        story = "Once upon a time,"

    response = client.responses.create(
        model="openai/gpt-4o-mini",
        input=f"Given the following story snippet: {story}, respond with exactly one sentence following the story that relates to the word: {word}."
    )

    return story + " " + response.output_text