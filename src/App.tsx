import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TranslationInterface from './pages/TranslationInterface';
import ApiDocs from './pages/ApiDocs';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/translate" element={<TranslationInterface />} />
          <Route path="/docs" element={<ApiDocs />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;