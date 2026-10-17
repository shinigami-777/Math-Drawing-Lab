export default function EquationPanel({ spec }: { spec: any }) {
  if (!spec) return <div style={{ padding: '20px' }}>No equations yet.</div>;

  return (
    <div style={{ padding: '20px', width: '350px', borderLeft: '1px solid #444', height: '100vh', overflowY: 'auto' }}>
      <h3>{spec.title}</h3>
      {spec.layers.map((layer: any) => (
        <div key={layer.id} style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#1e1e1e', borderRadius: '4px' }}>
          <strong>Layer: {layer.id}</strong>
          <div style={{ fontFamily: 'monospace', marginTop: '5px', fontSize: '13px' }}>
            {layer.type === 'parametric' && (
              <>
                <div>x(t) = {layer.x}</div>
                <div>y(t) = {layer.y}</div>
              </>
            )}
            <div style={{ color: '#888', marginTop: '4px' }}>
              t ∈ [{layer.parameter.start.toFixed(2)}, {layer.parameter.end.toFixed(2)}]
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}