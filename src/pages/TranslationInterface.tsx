import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe2, Copy, ArrowLeft, RotateCcw, Languages, Mic, StopCircle } from 'lucide-react';
import { useReactMediaRecorder } from 'react-media-recorder';

const TRANSLATE_API = 'https://google-translate1.p.rapidapi.com/language/translate/v2';
const RAPID_API_KEY = 'faee1a9b8amsh52f248656814113p1817dcjsndd88faa9b6d1';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' }
];

// Add this type definition
type TranslationDictionary = {
  [key: string]: string;
};

// Update the commonTranslations declaration with the type
const commonTranslations: TranslationDictionary = {
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
  'what is your name': 'आपका नाम क्या है',
  'my name is': 'मेरा नाम है',
  
  // Basic words
  'water': 'पानी',
  'food': 'खाना',
  'house': 'घर',
  'friend': 'दोस्त',
  'family': 'परिवार',
  
  // Numbers
  'one': 'एक',
  'two': 'दो',
  'three': 'तीन',
  'four': 'चार',
  'five': 'पांच',
  
  // Time-related
  'today': 'आज',
  'tomorrow': 'कल',
  'yesterday': 'कल',
  'time': 'समय',
  'day': 'दिन',
};

function TranslationInterface() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleTranslation = useCallback(async (text?: string) => {
    const inputText = (text || sourceText).toLowerCase().trim();
    if (!inputText) return;

    setIsLoading(true);
    setError(null);

    try {
      // Now TypeScript will recognize this properly
      if (inputText in commonTranslations) {
        setTranslatedText(commonTranslations[inputText]);
        setIsLoading(false);
        return;
      }

      // If no hardcoded translation, use the API
      const response = await fetch(TRANSLATE_API, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': RAPID_API_KEY,
          'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        },
        body: new URLSearchParams({
          q: inputText,
          source: sourceLang,
          target: targetLang
        })
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      const data = await response.json();
      setTranslatedText(data.data.translations[0].translatedText);
    } catch (err) {
      setError('Translation failed. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [sourceText, sourceLang, targetLang]);

  const handleAudioStop = async (blobUrl: string) => {
    try {
      setIsTranscribing(true);
      const response = await fetch(blobUrl);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('audio', blob);
      formData.append('language', sourceLang);

      // Note: This is a placeholder. We'll implement speech recognition later
      setError('Speech recognition will be implemented soon.');
      setIsTranscribing(false);
    } catch (err) {
      setError('Failed to process audio. Please try again.');
      console.error('Audio processing error:', err);
      setIsTranscribing(false);
    }
  };

  const {
    status,
    startRecording,
    stopRecording,
  } = useReactMediaRecorder({
    audio: true,
    onStop: handleAudioStop,
  });

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const resetTranslation = () => {
    setSourceText('');
    setTranslatedText('');
    setError(null);
  };

  // Add this function to show example translations
  const addExampleTranslation = (text: string) => {
    setSourceText(text);
    setTranslatedText(commonTranslations[text.toLowerCase()]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="flex items-center gap-2">
              <Globe2 className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">MahaTranslate</h1>
            </div>
          </div>

          {/* Add this new section for example translations */}
          <div className="mb-6 bg-white rounded-xl p-4 shadow-md">
            <h2 className="text-lg font-semibold mb-3 text-indigo-600">Quick Examples:</h2>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => addExampleTranslation('Hello')}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
              >
                Hello
              </button>
              <button
                onClick={() => addExampleTranslation('Thank you')}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
              >
                Thank you
              </button>
              <button
                onClick={() => addExampleTranslation('Good morning')}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
              >
                Good morning
              </button>
              <button
                onClick={() => addExampleTranslation('How are you')}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
              >
                How are you
              </button>
              <button
                onClick={() => addExampleTranslation('Nice to meet you')}
                className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100"
              >
                Nice to meet you
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-indigo-600" />
                    <select
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="border rounded-lg px-3 py-2"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(sourceText)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                      title="Copy text"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                    <button
                      onClick={status === 'recording' ? stopRecording : startRecording}
                      className={`p-2 rounded-full ${
                        status === 'recording' 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                          : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                      }`}
                      title={status === 'recording' ? 'Stop recording' : 'Start recording'}
                    >
                      {status === 'recording' ? (
                        <StopCircle className="w-5 h-5" />
                      ) : (
                        <Mic className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    onKeyUp={() => {
                      if (sourceText.trim()) handleTranslation();
                    }}
                    placeholder="Enter text to translate or click the microphone to record..."
                    className="w-full h-64 p-4 border rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    aria-label="Source text"
                  />
                  {isTranscribing && (
                    <div className="absolute inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center rounded-lg">
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
                        <p className="text-gray-600">Transcribing audio...</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>{sourceText.length} characters</span>
                  <button
                    onClick={resetTranslation}
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Languages className="w-5 h-5 text-indigo-600" />
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="border rounded-lg px-3 py-2"
                    >
                      {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={() => copyToClipboard(translatedText)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    title="Copy translation"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative">
                  <textarea
                    value={translatedText}
                    readOnly
                    className="w-full h-64 p-4 bg-gray-50 border rounded-lg resize-none"
                    aria-label="Translated text"
                  />
                  {isLoading && (
                    <div className="absolute inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center rounded-lg">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    </div>
                  )}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {translatedText.length} characters
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TranslationInterface;