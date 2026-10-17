import os
from google import genai
from google.genai import types
from app.schemas.drawing import DrawingSpec

# The client automatically picks up the GEMINI_API_KEY environment variable
client = genai.Client()

def generate_drawing_spec(prompt: str) -> DrawingSpec:
    system_prompt = """
    You are a mathematical drawing planner. Convert the user's prompt into a 
    structured drawing specification using parametric or polar curves. 
    Use radians. Separate distinct parts into different layers.
    Ensure expressions use valid Python math syntax (e.g., '16*sin(t)**3').
    """
    
    full_prompt = f"{system_prompt}\n\nDraw this: {prompt}"
    
    # Generate content using Gemini 3.5 Flash and enforce the Pydantic schema
    response = client.models.generate_content(
        model='gemini-3.8-flash',
        contents=full_prompt,
        config=types.GenerateContentConfig(
            response_mime_type='application/json',
            response_schema=DrawingSpec,
        ),
    )
    
    # Parse the returned JSON text directly into your Pydantic model
    return DrawingSpec.model_validate_json(response.text)