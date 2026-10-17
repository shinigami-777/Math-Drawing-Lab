export default function EquationPanel({ spec, onUpdate }: { spec: any, onUpdate: (newSpec: any) => void }) {
  if (!spec) return <div style={{ padding: '20px', color: '#888' }}>Generate a drawing to see equations here.</div>;

  const handleChange = (layerIndex: number, field: string, value: string | number) => {
    const newSpec = JSON.parse(JSON.stringify(spec));
    if (field === 'x' || field === 'y') {
      newSpec.layers[layerIndex][field] = value;
    } else if (field === 'start' || field === 'end') {
      newSpec.layers[layerIndex].parameter[field] = Number(value);
    } else if (field === 'stroke') {
      newSpec.layers[layerIndex].style[field] = value;
    }
    onUpdate(newSpec);
  };

  return (
    <div style={{ padding: '15px', overflowY: 'auto', height: '100%' }}>
      <h3 style={{ marginTop: 0, paddingBottom: '10px', borderBottom: '1px solid #333' }}>{spec.title}</h3>
      {spec.layers.map((layer: any, i: number) => (
        <div key={layer.id} style={{ marginBottom: '15px', padding: '12px', backgroundColor: '#1e1e1e', borderRadius: '8px', borderLeft: `4px solid ${layer.style.stroke}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <strong>{layer.id}</strong>
            <input 
              type="color" 
              value={layer.style.stroke} 
              onChange={(e) => handleChange(i, 'stroke', e.target.value)}
              style={{ width: '24px', height: '24px', padding: 0, border: 'none', cursor: 'pointer' }}
            />
          </div>
          
          {layer.type === 'parametric' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontFamily: 'monospace' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '40px', color: '#aaa' }}>x(t) =</span>
                <input 
                  type="text" 
                  value={layer.x} 
                  onChange={(e) => handleChange(i, 'x', e.target.value)}
                  style={{ flex: 1, padding: '4px', backgroundColor: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ width: '40px', color: '#aaa' }}>y(t) =</span>
                <input 
                  type="text" 
                  value={layer.y} 
                  onChange={(e) => handleChange(i, 'y', e.target.value)}
                  style={{ flex: 1, padding: '4px', backgroundColor: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
                <span style={{ color: '#aaa' }}>t bounds:</span>
                <input 
                  type="number" 
                  value={layer.parameter.start} 
                  step="0.1"
                  onChange={(e) => handleChange(i, 'start', e.target.value)}
                  style={{ width: '60px', padding: '4px', backgroundColor: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
                <span style={{ color: '#aaa' }}>to</span>
                <input 
                  type="number" 
                  value={layer.parameter.end} 
                  step="0.1"
                  onChange={(e) => handleChange(i, 'end', e.target.value)}
                  style={{ width: '60px', padding: '4px', backgroundColor: '#2a2a2a', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}