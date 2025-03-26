import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe2, Code } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const endpoints = [
  {
    name: 'Translation',
    endpoint: '/api/translate',
    method: 'POST',
    description: 'Translate text between English and Hindi using MahaTranslate\'s advanced AI model',
    request: {
      body: `{
  "text": "Hello, how are you?",
  "sourceLang": "en",
  "targetLang": "hi"
}`,
      curl: `curl -X POST https://mahatranslate.ai/api/translate \\
  -H 'Content-Type: application/json' \\
  -d '{"text":"Hello, how are you?","sourceLang":"en","targetLang":"hi"}'`,
      js: `const response = await fetch('https://mahatranslate.ai/api/translate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: 'Hello, how are you?',
    sourceLang: 'en',
    targetLang: 'hi'
  })
});

const data = await response.json();
console.log(data.translatedText);`
    },
    response: `{
  "success": true,
  "translatedText": "नमस्ते, आप कैसे हैं?",
  "confidence": 0.95
}`
  },
  {
    name: 'Speech to Text',
    endpoint: '/api/speech-to-text',
    method: 'POST',
    description: 'Convert spoken audio to text for translation',
    request: {
      body: `// Multipart form data
{
  "audio": [binary audio file],
  "language": "en"
}`,
      curl: `curl -X POST https://mahatranslate.ai/api/speech-to-text \\
  -F 'audio=@recording.wav' \\
  -F 'language=en'`,
      js: `const formData = new FormData();
formData.append('audio', audioBlob);
formData.append('language', 'en');

const response = await fetch('https://mahatranslate.ai/api/speech-to-text', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.text);`
    },
    response: `{
  "success": true,
  "text": "Hello, how are you?",
  "confidence": 0.92
}`
  }
];

function ApiDocs() {
  return (
    <div className="min-h-screen bg-[#0B0B1F] text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <Globe2 className="w-8 h-8 text-indigo-400" />
              <h1 className="text-2xl font-bold">MahaTranslate API</h1>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-6 h-6 text-indigo-400" />
                <h2 className="text-2xl font-bold">Getting Started</h2>
              </div>
              <p className="text-gray-400 mb-4">
                MahaTranslate provides a robust API for English-Hindi translation, powered by our custom-built AI model. 
                Our API is designed to handle both text and speech translation with high accuracy and natural-sounding results.
              </p>
              <div className="bg-black/30 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-medium mb-2">Base URL</h3>
                <code className="text-indigo-400">https://mahatranslate.ai/api</code>
              </div>
              <p className="text-gray-400 mb-4">
                All API requests should be made to the base URL. The API currently supports:
              </p>
              <ul className="list-disc ml-6 text-gray-400 space-y-2">
                <li>Text translation between English and Hindi</li>
                <li>Speech-to-text conversion for audio input</li>
                <li>High-accuracy translation with confidence scores</li>
                <li>Natural language processing for context-aware translations</li>
              </ul>
            </div>

            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">{endpoint.name}</h2>
                <p className="text-gray-400 mb-6">{endpoint.description}</p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Endpoint</h3>
                    <div className="flex items-center gap-2 bg-black/30 p-3 rounded-lg">
                      <span className="px-2 py-1 bg-indigo-600 rounded text-sm font-medium">
                        {endpoint.method}
                      </span>
                      <code className="text-indigo-400">{endpoint.endpoint}</code>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Request Body</h3>
                    <SyntaxHighlighter
                      language="json"
                      style={atomDark}
                      className="rounded-lg"
                    >
                      {endpoint.request.body}
                    </SyntaxHighlighter>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">cURL Example</h3>
                    <SyntaxHighlighter
                      language="bash"
                      style={atomDark}
                      className="rounded-lg"
                    >
                      {endpoint.request.curl}
                    </SyntaxHighlighter>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">JavaScript Example</h3>
                    <SyntaxHighlighter
                      language="javascript"
                      style={atomDark}
                      className="rounded-lg"
                    >
                      {endpoint.request.js}
                    </SyntaxHighlighter>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Response</h3>
                    <SyntaxHighlighter
                      language="json"
                      style={atomDark}
                      className="rounded-lg"
                    >
                      {endpoint.response}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ApiDocs;