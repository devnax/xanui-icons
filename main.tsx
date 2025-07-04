import React from 'react';
import { createRoot } from 'react-dom/client';
import Icon1k from './src/ABC'
import { Home } from './src'
// import { Tag } from '@xanui/core';

const App = () => {
  return (
    <div style={{ fontFamily: 'monospace,math, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to makepack CLI!</h1>
      <p>Edit <code>index.tsx</code> and save to reload.</p>
      <a
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#61dafb', textDecoration: 'none' }}
      >
        Learn React
      </a>
      <div style={{ marginTop: "50px" }}>
        {/* <Tag
          color="#61dafb"
          style={{ fontSize: '24px', padding: '10px', borderRadius: '5px' }}
        >
          Hello, Xanui!
        </Tag> */}
        <Home
          color="#61dafb"
        />
      </div>
    </div>
  );
}
const rootEle = document.getElementById('root')
if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}
