export interface UserProfile {
  age?: string;
  sex?: 'male' | 'female' | 'other' | '';
  allergies?: string;
  conditions?: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  image?: string; // base64 encoded image
  sources?: { title: string; uri: string }[];
  isError?: boolean;
  feedback?: 'up' | 'down' | null;
}

export interface Conversation {
  id: string;
  title: string;
  agentId: AgentType;
  messages: Message[];
}

export type AgentType = 'symptomChecker' | 'medicalResearcher' | 'carePlanAssistant' | 'documentationAgent' | 'patientCommunicationAgent';

export interface Agent {
  id: AgentType;
  title: string;
  description: string;
  icon: string; // Emoji
  agentRole: string; // e.g., 'Sequential Agent', 'Loop Agent'
  acceptsImage?: boolean;
}

export interface Suggestion {
  title: string;
  description: string;
  prompt?: string;
  icon: string; // Emoji
  subSuggestions?: Suggestion[];
}
