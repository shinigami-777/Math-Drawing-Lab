import { useState } from 'react';

export default function PromptPanel({ onGenerate, isLoading }: { onGenerate: (p: string) => void, isLoading: boolean }) {
  const [prompt, setPrompt] = useState("");

  return (
    <div style={{ padding: '20px', borderBottom: '1px solid #444' }}>
      <input 
        type="text" 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., Draw a butterfly with symmetrical wings"
        style={{ width: '300px', padding: '8px', marginRight: '10px' }}
        onKeyDown={(e) => e.key === 'Enter' && onGenerate(prompt)}
      />
      <button onClick={() => onGenerate(prompt)} disabled={isLoading} style={{ padding: '8px 16px' }}>
        {isLoading ? 'Generating...' : 'Draw'}
      </button>
    </div>
  );
}