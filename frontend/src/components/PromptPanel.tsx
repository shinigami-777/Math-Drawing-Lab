import { useState } from 'react';
import type { Theme } from '../App'; // FIX: Added 'type' keyword here

export default function PromptPanel({ onGenerate, isLoading, theme }: { onGenerate: (p: string) => void, isLoading: boolean, theme: Theme }) {
  const [prompt, setPrompt] = useState("");
  
  const inputBg = theme === 'dark' ? '#1e1e1e' : '#ffffff';
  const border = theme === 'dark' ? '#333' : '#ccc';
  const textColor = theme === 'dark' ? '#fff' : '#000';
  
  // Dynamic button colors based on state and theme
  const btnBg = isLoading 
    ? (theme === 'dark' ? '#333333' : '#e0e0e0') 
    : '#aa3bff'; 
  const btnText = isLoading 
    ? (theme === 'dark' ? '#888888' : '#888888') 
    : '#ffffff';

  return (
    <div style={{ padding: '20px', borderBottom: `1px solid ${border}` }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Draw a butterfly ..."
          disabled={isLoading}
          style={{ 
            flex: 1, 
            padding: '12px 16px', 
            backgroundColor: inputBg, 
            border: `1px solid ${border}`, 
            color: textColor, 
            borderRadius: '8px',
            fontSize: '15px',
            outline: 'none',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
          }}
          onKeyDown={(e) => e.key === 'Enter' && !isLoading && onGenerate(prompt)}
        />
        <button 
          onClick={() => onGenerate(prompt)} 
          disabled={isLoading} 
          style={{ 
            padding: '0 20px', 
            cursor: isLoading ? 'not-allowed' : 'pointer', 
            backgroundColor: btnBg, 
            color: btnText, 
            border: 'none', 
            borderRadius: '8px', 
            fontWeight: '600',
            fontSize: '15px',
            transition: 'background-color 0.2s',
            minWidth: '120px'
          }}
        >
          {isLoading ? 'Drawing...' : 'Generate'}
        </button>
      </div>
    </div>
  );
}