export default function DrawingCanvas({ data }: { data: any }) {
  if (!data) return null;

  const { viewport } = data.spec;
  const viewWidth = viewport.x_max - viewport.x_min;
  const viewHeight = viewport.y_max - viewport.y_min;

  const gridLinesX = [];
  for (let x = Math.ceil(viewport.x_min / 5) * 5; x <= viewport.x_max; x += 5) {
    gridLinesX.push(x);
  }
  
  const gridLinesY = [];
  for (let y = Math.ceil(viewport.y_min / 5) * 5; y <= viewport.y_max; y += 5) {
    gridLinesY.push(y);
  }

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#121212', position: 'relative' }}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`${viewport.x_min} ${-viewport.y_max} ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <g transform="scale(1, -1)">
          {/* Grid Lines */}
          {gridLinesX.map(x => (
            <line key={`gx-${x}`} x1={x} y1={viewport.y_min} x2={x} y2={viewport.y_max} stroke="#222" strokeWidth={viewWidth / 500} />
          ))}
          {gridLinesY.map(y => (
            <line key={`gy-${y}`} x1={viewport.x_min} y1={y} x2={viewport.x_max} y2={y} stroke="#222" strokeWidth={viewWidth / 500} />
          ))}

          {/* Coordinate Axes */}
          <line x1={viewport.x_min} y1={0} x2={viewport.x_max} y2={0} stroke="#444" strokeWidth={viewWidth / 250} />
          <line x1={0} y1={viewport.y_min} x2={0} y2={viewport.y_max} stroke="#444" strokeWidth={viewWidth / 250} />

          {/* Rendered Math Curves */}
          {data.sampled_layers.map((layer: any) => {
            const pathData = layer.points
              .map((p: any, i: number) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
              .join(' ');
              
            return (
              <path
                key={layer.id}
                d={pathData}
                stroke={layer.style.stroke}
                strokeWidth={layer.style.stroke_width * (viewWidth / 800)} 
                fill={layer.style.fill !== "none" ? layer.style.fill : "transparent"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}