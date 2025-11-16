import React from 'react';

const StethoscopeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.012 4.162A8.75 8.75 0 0 1 12 2.5a8.75 8.75 0 0 1 5.988 1.662l-2.05 2.05a5.25 5.25 0 0 0-7.876 7.876l-2.05 2.05A8.75 8.75 0 0 1 6.012 4.162ZM17.988 19.838A8.75 8.75 0 0 1 12 21.5a8.75 8.75 0 0 1-5.988-1.662l2.05-2.05a5.25 5.25 0 0 0 7.876-7.876l2.05-2.05a8.75 8.75 0 0 1-5.988 11.976ZM13.06 13.06l5.25-5.25a.75.75 0 0 0-1.06-1.06l-5.25 5.25a.75.75 0 0 0 1.06 1.06ZM8.94 8.94l-5.25 5.25a.75.75 0 0 0 1.06 1.06l5.25-5.25a.75.75 0 0 0-1.06-1.06Z" />
    <path fillRule="evenodd" d="M12 22.5a10.5 10.5 0 1 0 0-21 10.5 10.5 0 0 0 0 21ZM12 3.75a8.25 8.25 0 1 0 0 16.5 8.25 8.25 0 0 0 0-16.5Z" clipRule="evenodd" />
  </svg>
);

const CopyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
);

const UserCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);


interface HeaderProps {
    agentTitle?: string;
    onLogout?: () => void;
    onCopy?: () => void;
    onProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ agentTitle, onLogout, onCopy, onProfile }) => {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm p-4 flex items-center justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
      <div className="flex items-center space-x-3">
        <StethoscopeIcon className="h-8 w-8 text-cyan-500" />
        <h1 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 truncate">
          {agentTitle ? <span className="text-cyan-500 font-semibold">{agentTitle}</span> : 'Health AI Assistant'}
        </h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-3">
        {onCopy && (
             <button onClick={onCopy} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Copy conversation">
                <CopyIcon className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </button>
        )}
        {onProfile && (
            <button onClick={onProfile} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Open profile settings">
                <UserCircleIcon className="h-6 w-6 text-slate-500 dark:text-slate-400" />
            </button>
        )}
        {onLogout && (
             <button
                onClick={onLogout}
                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
            >
                Logout
            </button>
        )}
      </div>
    </header>
  );
};
