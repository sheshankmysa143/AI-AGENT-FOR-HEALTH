
import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
// FIX: Corrected the import from the deprecated `GoogleGenerativeAI` to `GoogleGenAI`.
import { GoogleGenAI, Chat } from "@google/genai";
import { Header } from './components/Header';
import { ChatWindow } from './components/ChatWindow';
import { ChatInput } from './components/ChatInput';
import { FeatureSuggestions } from './components/FeatureSuggestions';
import { Auth } from './components/Auth';
import { sendMessageStream } from './services/geminiService';
import type { Message, Agent, AgentType, Conversation, UserProfile } from './types';
import { HistorySidebar } from './components/HistorySidebar';
import { ProfileModal } from './components/ProfileModal';


const agents: Agent[] = [
  {
    id: 'symptomChecker',
    title: 'Symptom Checker',
    description: 'Interprets patient symptoms to provide triage advice and possible diagnoses.',
    icon: '🩺',
    agentRole: 'Sequential Agent',
    acceptsImage: true,
  },
  {
    id: 'medicalResearcher',
    title: 'Medical Researcher',
    description: 'Gathers, curates, and summarizes up-to-date medical literature and research.',
    icon: '🔬',
    agentRole: 'Loop Agent'
  },
  {
    id: 'carePlanAssistant',
    title: 'Care Plan Assistant',
    description: 'Creates personalized health, wellness, and treatment plans.',
    icon: '🧘',
    agentRole: 'Loop Agent'
  },
  {
    id: 'documentationAgent',
    title: 'Documentation Agent',
    description: 'Generates medical reports, patient notes, and referral letters.',
    icon: '📝',
    agentRole: 'Editor Agent'
  },
  {
    id: 'patientCommunicationAgent',
    title: 'Patient Communication',
    description: 'Crafts reminders, health tips, and educational content for patients.',
    icon: '💬',
    agentRole: 'Marketing Agent'
  }
];

const agentPlaceholders: Record<AgentType, string> = {
    symptomChecker: 'Describe your symptoms, e.g., "I have a sharp pain in my chest..."',
    medicalResearcher: 'Ask a research question, e.g., "Summarize recent findings on GLP-1 agonists."',
    carePlanAssistant: 'Ask for a plan, e.g., "Create a post-surgery recovery plan for a knee replacement."',
    documentationAgent: 'Request a document, e.g., "Draft a referral letter for a patient with..."',
    patientCommunicationAgent: 'Request a patient message, e.g., "Write a reminder for an upcoming flu shot clinic."'
};

const AgentSelector: React.FC<{ onSelect: (agent: Agent) => void }> = ({ onSelect }) => (
    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <h2 className="text-3xl font-bold mb-2 text-slate-700 dark:text-slate-200">Choose an Assistant</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 max-w-lg">Select a specialized agent to help with your health query. Each assistant is tailored for a specific task.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
            {agents.map((agent) => (
                <button
                    key={agent.id}
                    onClick={() => onSelect(agent)}
                    className="relative bg-white dark:bg-slate-700 p-6 rounded-2xl shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all flex flex-col items-center space-y-4 border border-transparent hover:border-cyan-500 text-center"
                >
                    <div className="absolute top-4 right-4 bg-cyan-100 text-cyan-800 text-xs font-semibold px-2.5 py-0.5 rounded-full dark:bg-cyan-900 dark:text-cyan-300">{agent.agentRole}</div>
                    <div className="text-5xl">{agent.icon}</div>
                    <div>
                        <h3 className="font-semibold text-xl text-slate-800 dark:text-slate-100">{agent.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">{agent.description}</p>
                    </div>
                </button>
            ))}
        </div>
    </div>
);


const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const currentConversation = useMemo(() => 
    conversations.find(c => c.id === currentConversationId),
    [conversations, currentConversationId]
  );
  
  const currentAgent = useMemo(() =>
    agents.find(a => a.id === currentConversation?.agentId),
    [currentConversation]
  );

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedConvos = localStorage.getItem('healthAiConversations');
      const savedProfile = localStorage.getItem('healthAiUserProfile');
      if (savedConvos) setConversations(JSON.parse(savedConvos));
      if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    } catch (e) {
      console.error("Failed to load from local storage", e);
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('healthAiConversations', JSON.stringify(conversations));
    } catch (e) {
      console.error("Failed to save conversations to local storage", e);
    }
  }, [conversations]);
  
  useEffect(() => {
    try {
        localStorage.setItem('healthAiUserProfile', JSON.stringify(userProfile));
    } catch (e) {
        console.error("Failed to save profile to local storage", e);
    }
  }, [userProfile]);

  const updateMessages = (conversationId: string, updater: (messages: Message[]) => Message[]) => {
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId ? { ...c, messages: updater(c.messages) } : c
      )
    );
  };

  const handleAuthSuccess = useCallback(() => setIsAuthenticated(true), []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentConversationId(null);
  }, []);
  
  const handleNewChat = (agent: Agent) => {
    const newConversation: Conversation = {
      id: crypto.randomUUID(),
      title: `New ${agent.title} Chat`,
      agentId: agent.id,
      messages: [],
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
  };
  
  const handleDeleteConversation = useCallback((id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (currentConversationId === id) {
      setCurrentConversationId(null);
    }
  }, [currentConversationId]);

  const handleSendMessage = async (text: string, image?: string) => {
    if (isLoading || !text.trim() || !currentConversation || !currentAgent) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: text, ...(image && { image }) };
    updateMessages(currentConversation.id, messages => [...messages, userMessage]);
    setIsLoading(true);
    setError(null);
    
    const modelMessageId = crypto.randomUUID();
    const modelMessage: Message = { id: modelMessageId, role: 'model', content: '' };
    updateMessages(currentConversation.id, messages => [...messages, modelMessage]);

    try {
      const stream = sendMessageStream(currentAgent.id, currentConversation.messages.slice(0, -1), text, image, userProfile);
      
      let finalContent = '';
      let sources: any[] = [];
      
      for await (const chunk of stream) {
        if (typeof chunk === 'string') {
          finalContent += chunk;
          updateMessages(currentConversation.id, messages =>
            messages.map(msg => msg.id === modelMessageId ? { ...msg, content: finalContent } : msg)
          );
        } else if (chunk.groundingMetadata) {
            sources = chunk.groundingMetadata.groundingChunks
              ?.map((c: any) => c.web)
              .filter(Boolean) ?? [];
        }
      }

      updateMessages(currentConversation.id, messages =>
        messages.map(msg => msg.id === modelMessageId ? { ...msg, content: finalContent, sources } : msg)
      );

      // Auto-update title for first message
      if (currentConversation.messages.length === 2) {
          const title = finalContent.split('\n')[0].replace(/[*#]/g, '').slice(0, 50);
          setConversations(prev => prev.map(c => c.id === currentConversation.id ? {...c, title} : c));
      }

    } catch (e: any) {
      const errorMessage = 'An error occurred. Please try again.';
      setError(errorMessage);
      updateMessages(currentConversation.id, messages => 
        messages.map(msg => msg.id === modelMessageId ? { ...msg, content: errorMessage, isError: true } : msg)
      );
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFeedback = useCallback((messageId: string, feedback: 'up' | 'down') => {
    if (!currentConversationId) return;
    updateMessages(currentConversationId, messages =>
        messages.map(msg =>
            msg.id === messageId ? { ...msg, feedback: msg.feedback === feedback ? null : feedback } : msg
        )
    );
  }, [currentConversationId]);

  const handleCopy = useCallback(() => {
    if (currentConversation) {
      const textToCopy = currentConversation.messages
        .map(msg => `**${msg.role === 'user' ? 'You' : 'AI'}:**\n${msg.content}`)
        .join('\n\n---\n\n');
      navigator.clipboard.writeText(textToCopy);
      // Optional: Show a toast notification
    }
  }, [currentConversation]);

  const handleTTS = useCallback((messageId: string, text: string) => {
    if (speakingMessageId === messageId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setSpeakingMessageId(null);
      setSpeakingMessageId(messageId);
      window.speechSynthesis.speak(utterance);
    }
  }, [speakingMessageId]);

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }
  
  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
      <HistorySidebar
        conversations={conversations}
        currentId={currentConversationId}
        onNewChat={() => setCurrentConversationId(null)}
        onSelect={setCurrentConversationId}
        onDelete={handleDeleteConversation}
      />
      <main className="flex-1 flex flex-col">
          {currentConversation && currentAgent ? (
            <div className="flex flex-col h-full">
              <Header 
                agentTitle={currentAgent.title}
                onLogout={handleLogout}
                onCopy={handleCopy}
                onProfile={() => setIsProfileModalOpen(true)}
              />
              <div className="flex-1 overflow-y-auto p-4 md:p-6">
                  {error && (
                      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                          <strong className="font-bold">Error: </strong>
                          <span className="block sm:inline">{error}</span>
                      </div>
                  )}
                  {currentConversation.messages.length === 0 && !isLoading && <FeatureSuggestions onSuggestionClick={handleSendMessage} agentType={currentAgent.id} />}
                  <ChatWindow messages={currentConversation.messages} isLoading={isLoading} onFeedback={handleFeedback} onTTS={handleTTS} speakingMessageId={speakingMessageId} />
              </div>
              <div className="p-4 md:p-6 bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                  <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} placeholder={agentPlaceholders[currentAgent.id]} acceptsImage={currentAgent.acceptsImage} />
              </div>
            </div>
          ) : (
             <div className="flex flex-col h-full">
                <Header onLogout={handleLogout} onProfile={() => setIsProfileModalOpen(true)} />
                <div className="flex-1">
                    <AgentSelector onSelect={handleNewChat} />
                </div>
            </div>
          )}
      </main>
      {isProfileModalOpen && (
        <ProfileModal 
            profile={userProfile}
            onSave={setUserProfile}
            onClose={() => setIsProfileModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;