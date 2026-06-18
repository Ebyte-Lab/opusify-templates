import React, { useState } from 'react';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { MaintenanceRequestModal } from '../components/modals/MaintenanceRequestModal';
import { events as defaultEvents } from '../data/events';
import { clubs } from '../data/clubs';
import { MapPin, Calendar, Users, Home, ExternalLink } from 'lucide-react';

export const CampusLifePage = () => {
  const [events, setEvents] = useState(defaultEvents.map(e => ({ ...e, rsvp: false })));
  const [isMaintenanceOpen, setIsMaintenanceOpen] = useState(false);

  const handleRSVPToggle = (eventId) => {
    setEvents(prev =>
      prev.map(evt => (evt.id === eventId ? { ...evt, rsvp: !evt.rsvp } : evt))
    );
  };

  const handleMaintenanceSubmit = (ticket) => {
    alert(`Maintenance request submitted successfully!\nRoom: ${ticket.room}\nCategory: ${ticket.issueType}\nDescription: ${ticket.description}`);
  };

  const diningMenu = [
    { day: 'Monday', option1: 'Lemon Herb Chicken', option2: 'Pasta Primavera', option3: 'Vegan Bowl' },
    { day: 'Tuesday', option1: 'BBQ Beef Brisket', option2: 'Veggie Tacos', option3: 'Stir Fry Station' },
    { day: 'Wednesday', option1: 'Roast Turkey', option2: 'Cheese Ravioli', option3: 'Indian Curry Special' },
    { day: 'Thursday', option1: 'Grilled Salmon', option2: 'Mac & Cheese', option3: 'Mediterranean Mezze' },
    { day: 'Friday', option1: 'Fish & Chips', option2: 'Mushroom Risotto', option3: 'Falafel Wrap' }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Clubs Joined" value="3" sub="Philosophy, WiC, Volleyball" />
        <StatCard label="Events Attended" value="7" sub="This Semester" />
        <StatCard label="Housing" value="Maple Hall" sub="Room 214B (Double)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Events + Clubs + Dining (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Events */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-text">Upcoming Campus Events</h3>
            
            <div className="space-y-3">
              {events.map((evt) => (
                <div key={evt.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/5 border border-primary/10 text-primary font-bold text-center px-3 py-2 rounded-lg flex-shrink-0 w-16">
                      <span className="text-xs uppercase block">{evt.date.split(' ')[0]}</span>
                      <span className="text-lg block -mt-1">{evt.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <Badge label={evt.category} color={evt.badgeColor} />
                        <span className="text-xs text-muted font-medium">{evt.time} · {evt.location}</span>
                      </div>
                      <h4 className="font-heading text-lg font-bold text-text">{evt.title}</h4>
                      <p className="text-xs text-muted font-medium mt-0.5">{evt.description}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleRSVPToggle(evt.id)}
                    className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors shadow-xs w-full sm:w-auto text-center focus:outline-none ${
                      evt.rsvp
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-primary text-white hover:bg-blue-900'
                    }`}
                  >
                    {evt.rsvp ? 'Attending ✓' : 'RSVP'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* My Clubs */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-text">My Joined Clubs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {clubs.map((club) => (
                <div key={club.id} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-text leading-snug">{club.name}</h4>
                    <p className="text-xs text-muted font-semibold mt-1">Advisor: {club.advisor}</p>
                    <div className="mt-3.5 flex items-center justify-between">
                      <Badge label={club.role} color={club.roleColor} />
                      <span className="text-xs text-muted font-medium">{club.schedule}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => alert(`Details for ${club.name} (UI Demo)`)}
                    className="w-full mt-4 text-center border border-gray-200 hover:border-gray-300 text-text font-semibold py-1.5 rounded text-xs transition-colors focus:outline-none"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Dining Menu */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50/50">
              <h3 className="font-heading text-xl font-bold text-text">Dining Hall Weekly Menu</h3>
              <p className="text-xs text-muted">Commons Cafeteria daily choices</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm" aria-label="Dining hall menu this week">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-muted font-bold">
                    <th className="p-4 pl-6">Day</th>
                    <th className="p-4">Main Course</th>
                    <th className="p-4">Vegetarian Option</th>
                    <th className="p-4">Specialty Station</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {diningMenu.map((item) => (
                    <tr key={item.day} className="hover:bg-gray-50/35 transition-colors">
                      <td className="p-4 pl-6 font-bold text-text">{item.day}</td>
                      <td className="p-4 text-muted font-medium">{item.option1}</td>
                      <td className="p-4 text-muted font-medium">{item.option2}</td>
                      <td className="p-4 text-muted font-medium">{item.option3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Housing + Campus Map (1/3 width) */}
        <div className="space-y-6">
          
          {/* Housing Info Card */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-text border-b border-gray-100 pb-2 mb-4">
              Housing Assignment
            </h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Residence Hall</span>
                <h4 className="font-heading text-xl font-bold text-text mt-0.5">Maple Hall, Room 214B</h4>
                <p className="text-xs text-muted mt-0.5">Double Occupancy Room</p>
              </div>

              <div className="space-y-2.5 text-xs text-text border-t border-gray-100 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted">Roommate:</span>
                  <span className="font-semibold text-text">Tahani Al-Jamil</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">RA:</span>
                  <span className="font-semibold text-primary">Jordan Davis (jordan.d@)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Check-In Date:</span>
                  <span className="font-semibold text-text">Aug 22, 2025</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted">Contract Ends:</span>
                  <span className="font-semibold text-text">May 10, 2026</span>
                </div>
              </div>

              <button
                onClick={() => setIsMaintenanceOpen(true)}
                className="w-full mt-4 bg-primary hover:bg-blue-900 text-white font-medium py-2 rounded transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-sm"
              >
                Submit Maintenance Request
              </button>
            </div>
          </div>

          {/* Campus Map */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-text border-b border-gray-100 pb-2 mb-4">
              Campus Map
            </h3>
            <div className="w-full border-2 border-primary rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center p-2">
              <svg className="w-full h-auto max-h-[260px] pointer-events-none" viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Grid roads */}
                <path d="M 0 60 L 320 60" stroke="#CBD5E1" strokeWidth="6" />
                <path d="M 0 160 L 320 160" stroke="#CBD5E1" strokeWidth="6" />
                <path d="M 100 0 L 100 240" stroke="#CBD5E1" strokeWidth="6" />
                <path d="M 220 0 L 220 240" stroke="#CBD5E1" strokeWidth="6" />

                {/* Science Building */}
                <rect x="10" y="10" width="80" height="40" rx="3" fill="#1E3A8A" fillOpacity="0.8" stroke="#1E3A8A" strokeWidth="1" />
                <text x="50" y="34" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Science Bldg</text>

                {/* Library */}
                <rect x="110" y="10" width="100" height="40" rx="3" fill="#1E3A8A" fillOpacity="0.8" stroke="#1E3A8A" strokeWidth="1" />
                <text x="160" y="34" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Library</text>

                {/* Humanities */}
                <rect x="230" y="10" width="80" height="40" rx="3" fill="#1E3A8A" fillOpacity="0.8" stroke="#1E3A8A" strokeWidth="1" />
                <text x="270" y="34" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Humanities</text>

                {/* Innovation Lab */}
                <rect x="10" y="70" width="80" height="80" rx="3" fill="#1E3A8A" fillOpacity="0.8" stroke="#1E3A8A" strokeWidth="1" />
                <text x="50" y="114" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Innovation Lab</text>

                {/* Cafeteria */}
                <rect x="110" y="70" width="100" height="40" rx="3" fill="#1E3A8A" fillOpacity="0.8" stroke="#1E3A8A" strokeWidth="1" />
                <text x="160" y="94" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Cafeteria</text>

                {/* Rec Center */}
                <rect x="230" y="70" width="80" height="80" rx="3" fill="#1E3A8A" fillOpacity="0.8" stroke="#1E3A8A" strokeWidth="1" />
                <text x="270" y="114" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Rec Center</text>

                {/* Maple Hall (Highlighted in amber!) */}
                <rect x="110" y="170" width="200" height="60" rx="3" fill="#F59E0B" fillOpacity="0.9" stroke="#D97706" strokeWidth="2" />
                <text x="210" y="200" fill="#000000" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Maple Hall (Dorm)</text>
                <text x="210" y="215" fill="#451A03" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="Inter, sans-serif">Your Assignment</text>
              </svg>
            </div>
          </div>

        </div>
      </div>

      {/* Maintenance Request Form Modal */}
      <MaintenanceRequestModal
        isOpen={isMaintenanceOpen}
        onClose={() => setIsMaintenanceOpen(false)}
        onSubmit={handleMaintenanceSubmit}
        defaultRoom="Maple Hall, Room 214B"
      />
    </div>
  );
};

export default CampusLifePage;
