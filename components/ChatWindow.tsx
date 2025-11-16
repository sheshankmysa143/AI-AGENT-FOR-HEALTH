import React, { useEffect, useRef } from 'react';
import type { Message } from '../types';

const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
  </svg>
);

const ModelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v1.586a.75.75 0 0 0 .5.707A9.735 9.735 0 0 0 6 7.5a9.707 9.707 0 0 0 5.25-1.533.75.75 0 0 0 0-1.434Z" />
    <path d="M12.75 4.533A9.707 9.707 0 0 1 18 3a9.735 9.735 0 0 1 3.25.555.75.75 0 0 1 .5.707v1.586a.75.75 0 0 1-.5.707A9.735 9.735 0 0 1 18 7.5a9.707 9.707 0 0 1-5.25-1.533.75.75 0 0 1 0-1.434Z" />
    <path fillRule="evenodd" d="M12 21a8.25 8.25 0 0 0 8.25-8.25c0-4.485-3.64-8.136-8.163-8.245a.75.75 0 0 0-.174 0c-4.523.109-8.163 3.76-8.163 8.245C3.75 16.28 7.39 20.891 12 21Zm0-2.25a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" clipRule="evenodd" />
  </svg>
);

const ThumbsUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.25a2.25 2.25 0 0 1-2.25-2.25v-2.5a2.25 2.25 0 0 1 2.25-2.25h1.383Z" />
    </svg>
);

const ThumbsUpIconFilled: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.375c0-1.75.599-3.358 1.603-4.686.215-.287.494-.52.793-.718a7.47 7.47 0 0 1 6.108-1.54c.297.05.592.19.852.395.26.206.474.456.638.732l.243.418-2.818 1.409a3.001 3.001 0 0 0-1.282 3.845 2.993 2.993 0 0 0 .163.28c.32.376.765.61 1.24.61h3.031a2.25 2.25 0 0 0 2.25-2.25c0-1.22-.992-2.218-2.215-2.218h-1.061a4.5 4.5 0 0 0-4.34 3.064 6 6 0 0 0-.153.945A4.5 4.5 0 0 0 12 16.5v.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-1.5a.75.75 0 0 0-.75-.75h-3.361a.75.75 0 0 1-.75-.75 2.25 2.25 0 0 1 2.25-2.25h1.06c1.668 0 3.015 1.347 3.015 3.015 0 .812-.325 1.573-.888 2.122a3.003 3.003 0 0 1-2.121.888H12.333a4.5 4.5 0 0 1-4.04-2.422 6 6 0 0 0-1.42-2.02c-.391-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414.99 1 1.628 2.38 1.72 3.839.124 1.838-.93 3.5-2.555 3.5Z" />
    </svg>
);

const ThumbsDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.867 15.75c.806 0 1.533.446 2.031 1.08a9.041 9.041 0 0 1 2.861 2.4c.723.384 1.35.956 1.653 1.715a4.498 4.498 0 0 0 .322 1.672v1.5a.75.75 0 0 1-.75.75 2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H9.332c-1.026 0-1.945-.694-2.054-1.715a11.942 11.942 0 0 1-.068-1.285c0-2.643.95-5.132 2.649-7.021.388-.482.987-.729 1.605-.729H19.5c.483 0 .964.078 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.383a2.25 2.25 0 0 1 2.25 2.25v2.5a2.25 2.25 0 0 1-2.25-2.25h-1.383Z" />
    </svg>
);

const ThumbsDownIconFilled: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.507 5.25c.425 0 .82.236.975.632A7.48 7.48 0 0 1 18 8.625c0 1.75-.599 3.358-1.603 4.686-.215.287-.494.52-.793.718a7.47 7.47 0 0 1-6.108 1.54c-.297-.05-.592-.19-.852-.395-.26-.206-.474-.456-.638-.732l-.243-.418 2.818-1.409a3.001 3.001 0 0 0 1.282-3.845 2.993 2.993 0 0 0-.163-.28c-.32-.376-.765-.61-1.24-.61H8.969a2.25 2.25 0 0 0-2.25 2.25c0 1.22.992 2.218 2.215 2.218h1.061a4.5 4.5 0 0 0 4.34-3.064 6 6 0 0 0 .153-.945A4.5 4.5 0 0 0 12 7.5v-.75c0-.414-.336-.75-.75-.75h-4.5a.75.75 0 0 0-.75.75v1.5a.75.75 0 0 0 .75.75h3.361a.75.75 0 0 1 .75.75 2.25 2.25 0 0 1-2.25 2.25h-1.06c-1.668 0-3.015-1.347-3.015-3.015 0-.812.325-1.573.888-2.122a3.003 3.003 0 0 1 2.121-.888h9.167a4.5 4.5 0 0 1 4.04 2.422 6 6 0 0 0 1.42 2.02c.391.39 1.023.39 1.414 0 .39-.39.39-1.023 0-1.414-.99-1-1.628-2.38-1.72-3.839-.124-1.838.93-3.5 2.555-3.5Z" />
    </svg>
);

const SpeakerOnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
);

const SpeakerOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6.375a9 9 0 0 1 12.728 0M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
    </svg>
);

const formatContent = (content: string) => {
  const parts = content.split(/(```[\s\S]*?```|\*\*[\s\S]*?\*\*|\*[^*]+\*|---)/g);
  return parts.map((part, index) => {
    if (part === '---') {
      return <hr key={index} className="my-4 border-slate-300 dark:border-slate-600" />;
    }
    if (part.startsWith('```') && part.endsWith('```')) {
      return <pre key={index} className="bg-slate-200 dark:bg-slate-900 p-3 rounded-md overflow-x-auto text-sm my-2"><code >{part.slice(3, -3).trim()}</code></pre>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index}>{part.slice(1, -1)}</em>;
    }
    return <span key={index}>{part}</span>;
  });
};

interface MessageBubbleProps {
    message: Message;
    isSpeaking: boolean;
    onFeedback: (id: string, feedback: 'up' | 'down') => void;
    onTTS: (id: string, text: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSpeaking, onFeedback, onTTS }) => {
  const { role, content, image, sources, isError } = message;
  const isUser = role === 'user';
  const isModel = role === 'model';
  
  const bubbleClasses = isUser
    ? 'bg-cyan-500 text-white rounded-br-none'
    : isError ? 'bg-red-200 dark:bg-red-800 text-red-900 dark:text-red-100 rounded-bl-none' : 'bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none';

  const baseButtonClasses = 'p-1.5 rounded-full transition-all duration-200 ease-in-out transform hover:scale-125 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-700 active:scale-100';

  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${isUser ? 'bg-slate-300 dark:bg-slate-600' : 'bg-slate-200 dark:bg-slate-900'}`}>
        {isUser ? <UserIcon className="h-6 w-6 text-slate-600 dark:text-slate-300" /> : <ModelIcon className="h-6 w-6 text-cyan-500" />}
      </div>
      <div className={`p-4 rounded-2xl max-w-lg shadow-md ${bubbleClasses}`}>
        {isUser && image && (
            <img src={`data:image/jpeg;base64,${image}`} alt="User upload" className="mb-2 rounded-lg max-w-xs" />
        )}
        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
          {formatContent(content)}
        </div>
        {isModel && !isError && (
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-600/50">
            <button
              onClick={() => onTTS(message.id, content)}
              className={`${baseButtonClasses} ${isSpeaking ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'} focus:ring-cyan-500`}
              aria-label={isSpeaking ? "Stop speaking" : "Read aloud"}
            >
              {isSpeaking ? <SpeakerOffIcon className="h-5 w-5" /> : <SpeakerOnIcon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => onFeedback(message.id, 'up')}
              className={`${baseButtonClasses} ${message.feedback === 'up' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'} focus:ring-cyan-500`}
              aria-pressed={message.feedback === 'up'}
              aria-label="Good response"
            >
                {message.feedback === 'up' ? <ThumbsUpIconFilled className="h-5 w-5" /> : <ThumbsUpIcon className="h-5 w-5" />}
            </button>
            <button
                onClick={() => onFeedback(message.id, 'down')}
                className={`${baseButtonClasses} ${message.feedback === 'down' ? 'text-red-600 dark:text-red-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'} focus:ring-red-500`}
                aria-pressed={message.feedback === 'down'}
                aria-label="Bad response"
            >
                {message.feedback === 'down' ? <ThumbsDownIconFilled className="h-5 w-5" /> : <ThumbsDownIcon className="h-5 w-5" />}
            </button>
          </div>
        )}
        {sources && sources.length > 0 && (
            <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-600/50">
                <h4 className="font-semibold text-xs mb-1 text-slate-500 dark:text-slate-400">Sources:</h4>
                <ol className="list-decimal list-inside text-xs space-y-1">
                    {sources.map((source, i) => (
                        <li key={i} className="truncate">
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline dark:text-cyan-400">
                                {source.title || new URL(source.uri).hostname}
                            </a>
                        </li>
                    ))}
                </ol>
            </div>
        )}
      </div>
    </div>
  );
};

const LoadingIndicator: React.FC = () => (
  <div className="flex items-start gap-3 my-4">
     <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-900">
      <ModelIcon className="h-6 w-6 text-cyan-500" />
    </div>
    <div className="p-4 rounded-2xl max-w-lg bg-white dark:bg-slate-700 shadow-md">
      <div className="flex items-center space-x-2">
        <div className="h-2.5 w-2.5 bg-cyan-500 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="h-2.5 w-2.5 bg-cyan-500 rounded-full animate-pulse [animation-delay:-0.1s]"></div>
        <div className="h-2.5 w-2.5 bg-cyan-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  </div>
);


interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  speakingMessageId: string | null;
  onFeedback: (messageId: string, feedback: 'up' | 'down') => void;
  onTTS: (messageId: string, text: string) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onFeedback, onTTS, speakingMessageId }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} onFeedback={onFeedback} onTTS={onTTS} isSpeaking={speakingMessageId === msg.id} />
      ))}
      {isLoading && messages[messages.length-1]?.role === 'user' && <LoadingIndicator />}
      <div ref={scrollRef} />
    </div>
  );
};
