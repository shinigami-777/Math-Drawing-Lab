from pydantic import BaseModel
from typing import List

class Parameter(BaseModel):
    name: str
    start: float
    end: float

class Style(BaseModel):
    stroke: str
    stroke_width: int
    fill: str

class Layer(BaseModel):
    id: str
    type: str
    x: str
    y: str
    parameter: Parameter
    style: Style

class Viewport(BaseModel):
    x_min: int
    y_min: int
    x_max: int
    y_max: int

class DrawingSpec(BaseModel):
    version: int
    title: str
    coordinate_system: str
    layers: List[Layer]
    viewport: Viewport

class DrawingRequest(BaseModel):
    prompt: str
    style: str = "minimal"
    complexity: str = "medium"