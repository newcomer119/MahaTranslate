import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe2, Code } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const endpoints = [
  {
    name: 'Translation',
    endpoint: '/translate',
    method: 'POST',
    description: 'Translate text between English and Hindi using MahaTranslate AI',
    request: {
      body: `{
  "q": "Hello, how are you?",
  "source": "en",
  "target": "hi",
  "X-RapidAPI-Key": "YOUR_API_KEY"
}`,
      curl: `curl --request POST \\
  --url 'https://google-translate1.p.rapidapi.com/language/translate/v2' \\
  --header 'content-type: application/x-www-form-urlencoded' \\
  --header 'X-RapidAPI-Key: YOUR_API_KEY' \\
  --header 'X-RapidAPI-Host: google-translate1.p.rapidapi.com' \\
  --data 'q=Hello%2C%20how%20are%20you%3F&source=en&target=hi'`,
      js: `const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'YOUR_API_KEY',
    'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
  },
  body: new URLSearchParams({
    q: 'Hello, how are you?',
    source: 'en',
    target: 'hi'
  })
});

const data = await response.json();
console.log(data.data.translations[0].translatedText);`
    },
    response: `{
  "data": {
    "translations": [
      {
        "translatedText": "नमस्ते, आप कैसे हैं?"
      }
    ]
  }
}`
  },
  {
    name: 'Common Translations',
    endpoint: '/common',
    method: 'GET',
    description: 'Get a list of common pre-defined translations',
    request: {
      body: 'No request body needed',
      curl: `curl --request GET \\
  --url 'https://mahatranslate.ai/api/common'`,
      js: `const commonTranslations = {
  // Greetings
  'hello': 'नमस्ते',
  'good morning': 'सुप्रभात',
  'good night': 'शुभ रात्रि',
  'thank you': 'धन्यवाद',
  'welcome': 'स्वागत है',
  
  // Common phrases
  'how are you': 'आप कैसे हैं',
  'i am fine': 'मैं ठीक हूं',
  'nice to meet you': 'आपसे मिलकर अच्छा लगा',
  // ... more translations
};`
    },
    response: `{
  "translations": {
    "hello": "नमस्ते",
    "good morning": "सुप्रभात",
    "good night": "शुभ रात्रि",
    "thank you": "धन्यवाद",
    "welcome": "स्वागत है"
    // ... more translations
  }
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
              <h1 className="text-2xl font-bold">MahaTranslate AI</h1>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Code className="w-6 h-6 text-indigo-400" />
                <h2 className="text-2xl font-bold">Getting Started</h2>
              </div>
              <p className="text-gray-400 mb-4">
                MahaTranslate AI provides a powerful translation service specifically optimized for English-Hindi translations.
                Our API combines both Google Translate's accuracy and custom pre-defined translations for common phrases.
              </p>
              <div className="bg-black/30 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-medium mb-2">Base URL</h3>
                <code className="text-indigo-400">https://google-translate1.p.rapidapi.com</code>
              </div>
              <p className="text-gray-400">
                To use the API, you'll need to:
                <ol className="list-decimal ml-6 mt-2 space-y-2">
                  <li>Sign up for a RapidAPI account</li>
                  <li>Subscribe to the Google Translate API</li>
                  <li>Use your API key in the X-RapidAPI-Key header</li>
                </ol>
              </p>
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