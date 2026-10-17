from fastapi import APIRouter, HTTPException
from app.schemas.drawing import DrawingSpec, DrawingRequest
from app.math_engine.sampler import sample_parametric
from app.services.ai_generator import generate_drawing_spec

router = APIRouter()

@router.post("/api/v1/drawings")
def create_drawing(request: DrawingRequest):
    try:
        # AI generates structured JSON specification
        drawing = generate_drawing_spec(request.prompt)
        
        # Math engine samples coordinate arrays
        sampled_layers = []
        for layer in drawing.layers:
            points = sample_parametric(layer)
            sampled_layers.append({
                "id": layer.id,
                "style": layer.style.model_dump(),
                "points": points
            })
            
        return {"spec": drawing.model_dump(), "sampled_layers": sampled_layers}
    except Exception as e:
        import traceback
        traceback.print_exc() # <--- This will print the exact crash reason in your terminal
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/api/v1/drawings/sample")
def sample_drawing(spec: DrawingSpec):
    try:
        sampled_layers = []
        for layer in spec.layers:
            points = sample_parametric(layer)
            sampled_layers.append({
                "id": layer.id,
                "style": layer.style.model_dump(),
                "points": points
            })
            
        return {"spec": spec.model_dump(), "sampled_layers": sampled_layers}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail="Invalid mathematical expression")