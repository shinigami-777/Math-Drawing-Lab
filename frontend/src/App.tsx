import { useState } from 'react';
import DrawingCanvas from './components/DrawingCanvas';
import PromptPanel from './components/PromptPanel';
import EquationPanel from './components/EquationPanel';

function App() {
  const [drawingData, setDrawingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#121212', color: '#fff' }}>
      <PromptPanel onGenerate={handleGenerate} isLoading={isLoading} />
      {error && <div style={{ color: 'red', padding: '10px' }}>{error}</div>}
      
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <DrawingCanvas data={drawingData} />
        </div>
        <EquationPanel spec={drawingData?.spec} />
      </div>
    </div>
  );
}

export default App;