import React from 'react';
import type { Conversation } from '../types';

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
    </svg>
);

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.006a.75.75 0 0 1-.749.654H5.25a.75.75 0 0 1-.749-.654L3.495 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.9h1.368c1.603 0 2.816 1.336 2.816 2.9ZM5.25 7.5h13.5v13.5H5.25V7.5Z" clipRule="evenodd" />
    </svg>
);

interface HistorySidebarProps {
    conversations: Conversation[];
    currentId: string | null;
    onNewChat: () => void;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ conversations, currentId, onNewChat, onSelect, onDelete }) => {
    return (
        <aside className="w-64 bg-slate-50 dark:bg-slate-900 flex flex-col border-r border-slate-200 dark:border-slate-700 flex-shrink-0">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                <button onClick={onNewChat} className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    <PlusIcon className="h-5 w-5" />
                    New Chat
                </button>
            </div>
            <div className="flex-1 overflow-y-auto">
                <nav className="p-2">
                    {conversations.map(convo => (
                        <a
                            key={convo.id}
                            href="#"
                            onClick={(e) => { e.preventDefault(); onSelect(convo.id); }}
                            className={`group flex items-center justify-between p-3 rounded-md text-sm font-medium transition-colors ${
                                currentId === convo.id 
                                ? 'bg-cyan-100 text-cyan-900 dark:bg-cyan-900/50 dark:text-cyan-100' 
                                : 'text-slate-700 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800'
                            }`}
                        >
                            <span className="truncate flex-1 pr-2">{convo.title}</span>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onDelete(convo.id); }} 
                                className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-200 dark:hover:bg-red-900/50 text-red-500"
                                aria-label="Delete chat"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </a>
                    ))}
                </nav>
            </div>
        </aside>
    );
};
