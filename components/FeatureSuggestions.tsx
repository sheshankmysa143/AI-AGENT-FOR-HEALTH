import React, { useState, useEffect } from 'react';
import type { AgentType, Suggestion } from '../types';

interface FeatureSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
  agentType: AgentType;
}

const suggestions: Record<AgentType, Suggestion[]> = {
  symptomChecker: [
    {
      title: 'Check Symptoms',
      description: 'Select a symptom to get information.',
      icon: '🩺',
      subSuggestions: [
        { title: 'Cough', description: 'Persistent coughing', icon: '😷', prompt: 'I have a persistent cough. What could be causing it?' },
        { title: 'Fever', description: 'High body temperature', icon: '🤒', prompt: 'I have a fever and body aches. What should I do?' },
        { title: 'Headache', description: 'Pain in the head', icon: '🤕', prompt: 'I have a severe headache behind my eyes.' },
        { title: 'Sore Throat', description: 'Pain or irritation in the throat', icon: '🥴', prompt: 'My sore throat has lasted for 3 days.' },
      ]
    },
    {
      title: 'First Aid',
      description: 'Ask for first aid information.',
      prompt: 'What are the first aid steps for a minor burn?',
      icon: '🩹'
    },
    {
      title: 'Medication Side Effects',
      description: 'Ask about potential side effects.',
      prompt: 'What are the common side effects of amoxicillin?',
      icon: '💊'
    },
    {
      title: 'Allergy Questions',
      description: 'Ask about allergy symptoms.',
      prompt: 'What are the differences between a cold and seasonal allergies?',
      icon: '🤧'
    }
  ],
  medicalResearcher: [
    {
      title: 'Latest Research',
      description: 'Ask for summaries of recent studies.',
      prompt: 'What is the latest research on treating Alzheimer\'s disease?',
      icon: '🔬'
    },
    {
      title: 'Explain a Condition',
      description: 'Get a technical overview of a medical condition.',
      prompt: 'Explain the pathophysiology of Type 2 Diabetes.',
      icon: '🧬'
    },
    {
      title: 'Compare Treatments',
      description: 'Ask for a research-based comparison.',
      prompt: 'Compare the efficacy of mRNA vaccines vs. traditional vaccines for influenza.',
      icon: '📊'
    },
    {
      title: 'Drug Mechanisms',
      description: 'Understand how a medication works.',
      prompt: 'What is the mechanism of action for statin medications?',
      icon: '🧪'
    }
  ],
  carePlanAssistant: [
    {
      title: 'Healthy Diet Plan',
      description: 'Get a sample meal plan.',
      prompt: 'Create a 7-day heart-healthy meal plan.',
      icon: '🥗'
    },
    {
      title: 'Beginner Workout',
      description: 'Outline a fitness routine.',
      prompt: 'Design a 4-week workout plan for a beginner focused on weight loss.',
      icon: '🏋️'
    },
    {
      title: 'Stress Management',
      description: 'Get tips for reducing stress.',
      prompt: 'What are some effective techniques for managing daily stress?',
      icon: '🧘'
    },
    {
      title: 'Improve Sleep',
      description: 'Ask for tips on better sleep hygiene.',
      prompt: 'What are 5 tips for improving sleep quality?',
      icon: '😴'
    }
  ],
  documentationAgent: [
    {
      title: 'Draft SOAP Note',
      description: 'Create a patient encounter note.',
      prompt: 'Draft a SOAP note for a 45-year-old male with hypertension and a chief complaint of chest pain.',
      icon: '📝'
    },
    {
      title: 'Referral Letter',
      description: 'Write a referral to a specialist.',
      prompt: 'Write a referral letter to a cardiologist for a patient with newly diagnosed atrial fibrillation.',
      icon: '✉️'
    },
    {
      title: 'Discharge Summary',
      description: 'Summarize a hospital stay.',
      prompt: 'Create a discharge summary for a patient admitted for pneumonia, now stable for discharge.',
      icon: '📄'
    },
    {
      title: 'Patient Instructions',
      description: 'Write clear instructions for a patient.',
      prompt: 'Write post-operative instructions for a patient after an appendectomy.',
      icon: '📋'
    }
  ],
  patientCommunicationAgent: [
    {
      title: 'Appointment Reminder',
      description: 'Craft a friendly reminder.',
      prompt: 'Write an SMS appointment reminder for a patient named John Doe, seeing Dr. Smith tomorrow at 10 AM.',
      icon: '🗓️'
    },
    {
      title: 'Medication Adherence',
      description: 'Encourage a patient to take their meds.',
      prompt: 'Craft a supportive message to remind a patient to take their daily blood pressure medication.',
      icon: '💊'
    },
    {
      title: 'Health Tip',
      description: 'Share a useful health tip.',
      prompt: 'Write a short, encouraging message about the benefits of a 30-minute daily walk.',
      icon: '💡'
    },
    {
      title: 'Educational Content',
      description: 'Explain a health topic simply.',
      prompt: 'Write a brief, easy-to-understand explanation of what cholesterol is for a patient.',
      icon: '🧠'
    }
  ]
};

const BackIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
    </svg>
);


export const FeatureSuggestions: React.FC<FeatureSuggestionsProps> = ({ onSuggestionClick, agentType }) => {
  const initialSuggestions = suggestions[agentType] || [];
  const [suggestionStack, setSuggestionStack] = useState<Suggestion[][]>([initialSuggestions]);
  
  // Reset when agent changes
  useEffect(() => {
    setSuggestionStack([suggestions[agentType] || []]);
  }, [agentType]);

  const currentSuggestions = suggestionStack[suggestionStack.length - 1];
  const isRoot = suggestionStack.length === 1;

  const handleSuggestionClick = (suggestion: Suggestion) => {
    if (suggestion.subSuggestions) {
      setSuggestionStack(prev => [...prev, suggestion.subSuggestions as Suggestion[]]);
    } else if (suggestion.prompt) {
      onSuggestionClick(suggestion.prompt);
    }
  };

  const handleBack = () => {
    if (!isRoot) {
      setSuggestionStack(prev => prev.slice(0, -1));
    }
  };
  
  return (
    <div className="text-center p-4">
        <div className="flex items-center justify-center mb-2 relative">
            {!isRoot && (
                <button 
                    onClick={handleBack} 
                    className="absolute left-0 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label="Go back"
                >
                    <BackIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
                </button>
            )}
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-200">How can I help you today?</h2>
        </div>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Select an option below or type your own question.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {currentSuggestions.map((suggestion) => (
            <button
                key={suggestion.title}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-1 transition-all text-left flex items-start space-x-4"
            >
                <div className="text-3xl">{suggestion.icon}</div>
                <div>
                    <h3 className="font-semibold text-lg text-slate-800 dark:text-slate-100">{suggestion.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400">{suggestion.description}</p>
                </div>
            </button>
            ))}
        </div>
    </div>
  );
};
