import { useState } from 'react';

export default function ExternalApiPage() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('Click "Load API Data" to fetch the response.');

  const loadData = async () => {
    setLoading(true);
    setOutput('Loading...');

    try {
      const response = await fetch('/api/test/external');
      const text = await response.text();

      try {
        const json = JSON.parse(text);
        setOutput(JSON.stringify(json, null, 2));
      } catch {
        setOutput(text);
      }
    } catch (error) {
      setOutput(`Request failed: ${String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '24px' }}>
      <h1>External API Test</h1>
      <p>Calls your backend route: <code>/api/test/external</code></p>
      <button
        type="button"
        onClick={loadData}
        disabled={loading}
        style={{
          border: 0,
          borderRadius: '8px',
          background: '#111827',
          color: '#ffffff',
          padding: '10px 14px',
          cursor: loading ? 'wait' : 'pointer',
        }}
      >
        {loading ? 'Loading...' : 'Load API Data'}
      </button>
      <pre
        style={{
          marginTop: '16px',
          border: '1px solid #dcdce4',
          borderRadius: '8px',
          padding: '12px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          background: '#ffffff',
          color: '#000000',
        }}
      >
        {output}
      </pre>
    </main>
  );
}
