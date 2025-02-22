import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HfInference } from '@huggingface/inference';
import { Globe2, Copy, ArrowLeft, RotateCcw, Languages, Mic, StopCircle } from 'lucide-react';
import { useReactMediaRecorder } from 'react-media-recorder';

const hf = new HfInference(import.meta.env.VITE_HF_API_KEY);

const languages = [
  { code: 'mr', name: 'Marathi' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ur', name: 'Urdu' },
  { code: 'en', name: 'English' },
];

function TranslationInterface() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('mr');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const handleTranslation = useCallback(async (text?: string) => {
    const inputText = text || sourceText;
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await hf.translation({
        model: 'facebook/mbart-large-50-many-to-many-mmt',
        inputs: inputText,
        parameters: {
          src_lang: sourceLang,
          tgt_lang: targetLang,
        },
      });
      setTranslatedText(result.translation_text);
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

      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const audioData = base64data.split(',')[1];

        try {
          const result = await hf.automaticSpeechRecognition({
            model: 'openai/whisper-base',
            data: Buffer.from(audioData, 'base64'),
          });
          
          setSourceText(result.text);
          handleTranslation(result.text);
        } catch (err) {
          setError('Failed to transcribe audio. Please try again.');
          console.error('Transcription error:', err);
        } finally {
          setIsTranscribing(false);
        }
      };
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