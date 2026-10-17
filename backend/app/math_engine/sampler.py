import numpy as np

def sample_parametric(layer, num_samples=100):
    safe_dict = {
        "sin": np.sin,
        "cos": np.cos,
        "tan": np.tan,
        "pi": np.pi,
        "sqrt": np.sqrt,
        "exp": np.exp,
        "abs": np.abs,
        "__builtins__": None
    }
    
    t = np.linspace(layer.parameter.start, layer.parameter.end, num_samples)
    safe_dict[layer.parameter.name] = t
    
    x_expr = layer.x.replace('^', '**').replace('math.', '').replace('np.', '')
    y_expr = layer.y.replace('^', '**').replace('math.', '').replace('np.', '')
    
    x_vals = eval(x_expr, safe_dict)
    y_vals = eval(y_expr, safe_dict)
    
    # Broadcast scalar values (like 0 or 5) into arrays of the correct length
    if isinstance(x_vals, (int, float)):
        x_vals = np.full_like(t, x_vals)
    if isinstance(y_vals, (int, float)):
        y_vals = np.full_like(t, y_vals)
    
    return [{"x": float(x), "y": float(y)} for x, y in zip(x_vals, y_vals)]