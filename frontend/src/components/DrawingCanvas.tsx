export default function DrawingCanvas({ data }: { data: any }) {
  if (!data) return <div style={{ color: '#888' }}>Enter a prompt to start drawing.</div>;

  const { viewport } = data.spec;
  const width = 500;
  const height = 500;
  
  // Transform mathematical coordinates to SVG viewbox coordinates
  const scaleX = width / (viewport.x_max - viewport.x_min);
  const scaleY = height / (viewport.y_max - viewport.y_min);

  return (
    <svg width={width} height={height} style={{ border: '1px solid #ccc' }}>
      <g transform={`translate(${width/2}, ${height/2}) scale(${scaleX}, ${-scaleY})`}>
        {data.sampled_layers.map((layer: any) => {
          const pathData = layer.points
            .map((p: any, i: number) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
            .join(' ');
            
          return (
            <path
              key={layer.id}
              d={pathData}
              stroke={layer.style.stroke}
              strokeWidth={layer.style.stroke_width / scaleX} 
              fill={layer.style.fill}
            />
          );
        })}
      </g>
    </svg>
  );
}