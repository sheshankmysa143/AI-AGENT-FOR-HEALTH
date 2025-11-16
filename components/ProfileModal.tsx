import React, { useState } from 'react';
import type { UserProfile } from '../types';

interface ProfileModalProps {
    profile: UserProfile;
    onSave: (profile: UserProfile) => void;
    onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ profile, onSave, onClose }) => {
    const [formData, setFormData] = useState<UserProfile>(profile);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">User Profile</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">This optional info helps the AI provide more personalized responses.</p>
                </div>
                <div className="p-6 space-y-4">
                     <div>
                        <label htmlFor="age" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Age</label>
                        <input type="text" name="age" id="age" value={formData.age || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-white dark:bg-slate-700" />
                    </div>
                     <div>
                        <label htmlFor="sex" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Biological Sex</label>
                        <select name="sex" id="sex" value={formData.sex || ''} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-white dark:bg-slate-700">
                            <option value="">Prefer not to say</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="allergies" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Known Allergies</label>
                        <textarea name="allergies" id="allergies" value={formData.allergies || ''} onChange={handleChange} rows={2} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-white dark:bg-slate-700" placeholder="e.g., Penicillin, Peanuts"></textarea>
                    </div>
                     <div>
                        <label htmlFor="conditions" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Chronic Conditions</label>
                        <textarea name="conditions" id="conditions" value={formData.conditions || ''} onChange={handleChange} rows={2} className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 sm:text-sm bg-white dark:bg-slate-700" placeholder="e.g., Type 2 Diabetes, Hypertension"></textarea>
                    </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 flex justify-end space-x-3 rounded-b-2xl">
                    <button onClick={onClose} className="py-2 px-4 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-700 text-sm font-medium transition-colors">Cancel</button>
                    <button onClick={handleSave} className="py-2 px-4 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-medium transition-colors">Save</button>
                </div>
            </div>
        </div>
    );
};
