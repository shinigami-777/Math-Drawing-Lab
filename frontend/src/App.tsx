import { useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas';
import PromptPanel from './components/PromptPanel';
import EquationPanel from './components/EquationPanel';

export type Theme = 'light' | 'dark';

function App() {
  const [drawingData, setDrawingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // FIX: Added the missing theme state here
  const [theme, setTheme] = useState<Theme>('dark');

  // Generate new equations via AI
  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8000/api/v1/drawings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style: 'minimal', complexity: 'medium' })
      });
      if (!response.ok) throw new Error("Failed to generate drawing");
      const data = await response.json();
      setDrawingData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Re-evaluate modified equations locally without AI
  const handleUpdateSpec = async (newSpec: any) => {
    // Optimistically update the UI to feel responsive
    setDrawingData((prev: any) => ({ ...prev, spec: newSpec }));
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/drawings/sample', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpec)
      });
      if (response.ok) {
        const data = await response.json();
        setDrawingData(data); // Render the newly sampled points
      }
    } catch (err) {
      console.error("Failed to resample", err);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0a0a0a', color: '#fff', overflow: 'hidden' }}>
      {/* Left Sidebar (Desmos style) */}
      <div style={{ width: '400px', display: 'flex', flexDirection: 'column', borderRight: '1px solid #333', backgroundColor: '#141414', zIndex: 10, boxShadow: '2px 0 10px rgba(0,0,0,0.5)' }}>
        <PromptPanel onGenerate={handleGenerate} isLoading={isLoading} theme={theme} />
        {error && <div style={{ color: '#ff6b6b', padding: '10px 20px', backgroundColor: 'rgba(255,0,0,0.1)' }}>{error}</div>}
        {/* Pass theme here if EquationPanel is also expecting it */}
        <EquationPanel spec={drawingData?.spec} onUpdate={handleUpdateSpec} />
      </div>
      
      {/* Right Canvas */}
      <div style={{ flex: 1, position: 'relative' }}>
        <DrawingCanvas data={drawingData} />
      </div>
    </div>
  );
}

export default App;