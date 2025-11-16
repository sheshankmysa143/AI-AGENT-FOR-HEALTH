
import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string, image?: string) => void;
  isLoading: boolean;
  placeholder: string;
  acceptsImage?: boolean;
}

const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
  </svg>
);

const PaperClipIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3.375 3.375 0 0 1 19.5 7.372l-10.94 10.94a2.25 2.25 0 0 1-3.182-3.182l7.693-7.693a.75.75 0 0 1 1.06 1.06l-7.693 7.693a1.125 1.125 0 0 0 1.591 1.591l10.94-10.94a2.25 2.25 0 0 0-3.182-3.182L5.25 12.739a3.375 3.375 0 0 0 4.773 4.773l7.693-7.693a.75.75 0 0 1 1.06-1.06l-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3.375 3.375 0 0 1 19.5 7.372l-10.94 10.94a2.25 2.25 0 0 1-3.182-3.182l7.693-7.693" />
    </svg>
);

const MicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m12 0v-1.5a6 6 0 0 0-6-6v0a6 6 0 0 0-6 6v1.5m12 0v-1.5a6 6 0 0 0-6-6v0a6 6 0 0 0-6 6v1.5m-6 0h12v-1.5a6 6 0 0 0-6-6v0a6 6 0 0 0-6 6v1.5" />
    </svg>
);

const XCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" >
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 0 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
    </svg>
);


export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, placeholder, acceptsImage }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState<{b64: string, preview: string} | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  // FIX: Changed type of recognitionRef to `any` to avoid errors with the non-standard SpeechRecognition API.
  const recognitionRef = useRef<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // FIX: Cast `window` to `any` to access browser-specific, non-standard SpeechRecognition APIs without TypeScript errors.
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.onstart = () => setIsRecording(true);
      recognitionRef.current.onend = () => setIsRecording(false);
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setText(prev => prev ? `${prev} ${transcript}` : transcript);
      };
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() || image) {
      onSendMessage(text, image?.b64);
      setText('');
      setImage(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImage({ b64: base64String, preview: URL.createObjectURL(file) });
      };
      reader.readAsDataURL(file);
    }
  };
  
  return (
    <div className="space-y-3">
       {image && (
        <div className="relative w-fit">
          <img src={image.preview} alt="Upload preview" className="h-24 w-24 object-cover rounded-lg" />
          <button onClick={() => setImage(null)} className="absolute -top-2 -right-2 bg-slate-600 rounded-full text-white hover:bg-slate-800">
            <XCircleIcon className="h-6 w-6" />
          </button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 md:space-x-4">
        <div className="flex-1 relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full p-4 pr-16 rounded-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none resize-none transition-shadow"
            rows={1}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || (!text.trim() && !image)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            <SendIcon className="h-6 w-6" />
          </button>
        </div>
        {acceptsImage && (
          <>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Attach image">
                <PaperClipIcon className="h-6 w-6 text-slate-500" />
            </button>
          </>
        )}
        {recognitionRef.current && (
           <button type="button" onClick={handleMicClick} className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-500 text-white animate-pulse' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`} aria-label={isRecording ? 'Stop recording' : 'Start recording'}>
                <MicIcon className={`h-6 w-6 ${isRecording ? '' : 'text-slate-500'}`} />
            </button>
        )}
      </form>
    </div>
  );
};