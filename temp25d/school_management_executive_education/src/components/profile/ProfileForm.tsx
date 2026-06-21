import React, { useState } from 'react';
import { useProfileStore } from '@/hooks/useProfileStore';
import { useToast } from '@/hooks/useToast';
import { Avatar } from '../common/Avatar';
import { Camera, Save } from 'lucide-react';

export const ProfileForm: React.FC = () => {
  const { profile, updateProfile } = useProfileStore();
  const { addToast } = useToast();

  const [name, setName] = useState(profile.name);
  const [title, setTitle] = useState(profile.title);
  const [company, setCompany] = useState(profile.company);
  const [email, setEmail] = useState(profile.email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      addToast('Name cannot be empty', 'error');
      return;
    }
    updateProfile({ name, title, company, email });
  };

  const handleAvatarChange = () => {
    // Simulate updating avatar seed
    const newSeed = Math.random().toString(36).substring(7);
    const newAvatar = `https://picsum.photos/seed/${newSeed}/100/100`;
    updateProfile({ avatarUrl: newAvatar });
    addToast('Avatar updated successfully (Simulated)', 'success');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Avatar upload section */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pb-6 border-b border-gray-100">
        <div className="relative group cursor-pointer" onClick={handleAvatarChange} title="Change Profile Picture">
          <Avatar src={profile.avatarUrl} alt={profile.name} size="xl" className="rounded-full border-2 border-primary/20" />
          <div className="absolute inset-0 bg-text/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera size={20} />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-text text-base">Profile Image</h3>
          <p className="text-xs text-text/60 mb-2">Click photo to randomize mock avatar image.</p>
          <button
            type="button"
            onClick={handleAvatarChange}
            className="text-xs font-semibold text-primary hover:underline focus:outline-none"
          >
            Randomize Photo
          </button>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-text/60 uppercase tracking-wider mb-2" htmlFor="profile-name">
            Full Name
          </label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-text/60 uppercase tracking-wider mb-2" htmlFor="profile-email">
            Corporate Email
          </label>
          <input
            id="profile-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-text/60 uppercase tracking-wider mb-2" htmlFor="profile-title">
            Professional Title
          </label>
          <input
            id="profile-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-text/60 uppercase tracking-wider mb-2" htmlFor="profile-company">
            Company / Organization
          </label>
          <input
            id="profile-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-text/60 uppercase tracking-wider mb-2" htmlFor="profile-cohort">
            Cohort Enrollment (Read-Only)
          </label>
          <input
            id="profile-cohort"
            type="text"
            value={profile.cohort}
            disabled
            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-text/50 rounded-sm text-sm cursor-not-allowed"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          className="bg-primary hover:bg-[#0A365C] text-white px-5 py-2 text-sm font-semibold rounded-sm transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Save size={16} />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
};
