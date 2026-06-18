import React, { useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { EmptyState } from '../components/ui/EmptyState';
import { checkedOutBooks as defaultCheckedOut, recommendedBooks, borrowingHistory } from '../data/libraryBooks';
import { researchDatabases as databaseList } from '../data/researchDatabases';
import { Search, ChevronDown, ChevronUp, Clock, Phone, Mail, Book, RefreshCw } from 'lucide-react';

export const LibraryPage = () => {
  const [checkedOut, setCheckedOut] = useState(defaultCheckedOut);
  const [searchQuery, setSearchQuery] = useState('');
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  const handleRenew = (id) => {
    setCheckedOut(prev =>
      prev.map(book => {
        if (book.id === id && book.renewals < 2) {
          // Add 14 days logic (represented simply as string manipulation for UI demo)
          const parts = book.dueDate.split(' ');
          const month = parts[0];
          const currentDay = parseInt(parts[1].replace(',', ''));
          const year = parts[2];
          
          let newDay = currentDay + 14;
          let newMonth = month;
          // Simple month overflow check
          if (month === 'Nov' && newDay > 30) {
            newDay = newDay - 30;
            newMonth = 'Dec';
          } else if (month === 'Dec' && newDay > 31) {
            newDay = newDay - 31;
            newMonth = 'Jan';
          }
          
          return {
            ...book,
            dueDate: `${newMonth} ${newDay}, ${year}`,
            daysRemaining: book.daysRemaining + 14,
            renewals: book.renewals + 1
          };
        }
        return book;
      })
    );
  };

  const filteredBooks = recommendedBooks.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Library Summary Banner */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-muted text-xs font-semibold uppercase tracking-wider block">Library Account</span>
          <h2 className="font-heading text-2xl font-bold text-text mt-1">Eleanor Shellstrop</h2>
          <p className="text-xs text-muted mt-0.5">Library Card: LIB-9482015</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted">Checked Out:</span>
            <span className="font-bold text-primary">{checkedOut.length} Items</span>
          </div>
          <span className="hidden md:inline text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <span className="text-muted">Fines:</span>
            <span className="font-bold text-green-700">No Fines</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search recommended books by title, author, or section..."
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-text font-medium shadow-xs"
        />
      </div>

      {/* Recommended for You List */}
      <div className="space-y-4">
        <h3 className="font-heading text-xl font-bold text-text">Recommended for You</h3>
        
        {filteredBooks.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {filteredBooks.map((book) => {
              // Color themes for covers
              const covers = [
                'bg-blue-800 text-blue-100',
                'bg-emerald-800 text-emerald-100',
                'bg-amber-800 text-amber-100',
                'bg-indigo-800 text-indigo-100',
                'bg-rose-800 text-rose-100'
              ];
              const coverColor = covers[book.id % covers.length];

              return (
                <div key={book.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between w-60 flex-shrink-0 hover:shadow-md transition-shadow">
                  <div>
                    {/* Cover Placeholder */}
                    <div className={`w-full h-36 rounded-md mb-4 flex items-center justify-center font-heading text-2xl font-bold ${coverColor}`}>
                      {book.initials}
                    </div>
                    <Badge
                      label={book.availability}
                      color={book.availability === 'Available' ? 'green' : 'red'}
                    />
                    <h4 className="font-heading text-lg font-bold text-text mt-2.5 leading-snug line-clamp-2">
                      {book.title}
                    </h4>
                    <p className="text-xs text-muted font-medium mt-1">{book.author}</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted font-semibold mt-4 block border-t border-gray-100 pt-2">
                    {book.section}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState
            title="No Books Found"
            message={`We couldn't find any recommended books matching "${searchQuery}". Try editing your query.`}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Checked Out + Research Databases + History (2/3 width) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Currently Checked Out */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50/50">
              <h3 className="font-heading text-xl font-bold text-text">Currently Checked Out</h3>
              <p className="text-xs text-muted">Active library book loans</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm" aria-label="Currently checked out books">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-wider text-muted font-bold">
                    <th className="p-4 pl-6">Title</th>
                    <th className="p-4">Section</th>
                    <th className="p-4 text-center">Due Date</th>
                    <th className="p-4 text-center pr-6">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {checkedOut.map((book) => {
                    const isDueSoon = book.daysRemaining <= 3;
                    return (
                      <tr
                        key={book.id}
                        className={`transition-colors ${
                          isDueSoon ? 'bg-amber-50/40 hover:bg-amber-50/60' : 'hover:bg-gray-50/30'
                        }`}
                      >
                        <td className="p-4 pl-6">
                          <div className="flex items-center gap-3">
                            <Book className={`w-5 h-5 flex-shrink-0 ${isDueSoon ? 'text-amber-600' : 'text-primary'}`} />
                            <div>
                              <span className="font-bold text-text block leading-tight">{book.title}</span>
                              <span className="text-xs text-muted">{book.author}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-muted font-medium">{book.section}</td>
                        <td className="p-4 text-center">
                          <div>
                            <span className={`font-bold block ${isDueSoon ? 'text-amber-700' : 'text-text'}`}>
                              {book.dueDate}
                            </span>
                            <span className="text-[10px] text-muted block mt-0.5">
                              {isDueSoon ? `⚠️ Due in ${book.daysRemaining} days` : '✓ On Time'}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 text-center pr-6">
                          <button
                            onClick={() => handleRenew(book.id)}
                            disabled={book.renewals >= 2}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                              book.renewals >= 2
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-primary text-white hover:bg-blue-900 shadow-xs'
                            }`}
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                            <span>Renew ({book.renewals}/2)</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Research Databases */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl font-bold text-text">Research Databases</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {databaseList.map((db) => (
                <div key={db.name} className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div>
                    <h4 className="font-heading text-lg font-bold text-primary">{db.name}</h4>
                    <p className="text-xs text-muted font-medium mt-1 leading-relaxed">{db.description}</p>
                  </div>
                  <a
                    href={db.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-primary hover:text-blue-800 text-xs font-bold flex items-center gap-1 focus:outline-none"
                  >
                    <span>Access Database</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible Borrowing History */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <button
              onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
              className="w-full flex justify-between items-center p-6 bg-gray-50/50 hover:bg-gray-50 transition-colors focus:outline-none"
              aria-expanded={isHistoryExpanded}
            >
              <div className="text-left">
                <h3 className="font-heading text-xl font-bold text-text">Borrowing History</h3>
                <p className="text-xs text-muted">Past books returned to the library</p>
              </div>
              {isHistoryExpanded ? <ChevronUp className="w-5 h-5 text-muted" /> : <ChevronDown className="w-5 h-5 text-muted" />}
            </button>

            {isHistoryExpanded && (
              <div className="border-t border-gray-100 divide-y divide-gray-100">
                {borrowingHistory.map((book) => (
                  <div key={book.id} className="p-4 pl-6 flex justify-between items-center hover:bg-gray-50/30 transition-colors">
                    <div>
                      <span className="font-bold text-text block text-sm leading-tight">{book.title}</span>
                      <span className="text-xs text-muted">{book.author}</span>
                    </div>
                    <div className="text-right pr-6">
                      <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded">
                        Returned {book.returnedDate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column: Hours & Contact (1/3 width) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-heading text-lg font-bold text-text border-b border-gray-100 pb-2 mb-4">
              Library Info & Hours
            </h3>
            
            <div className="space-y-5">
              <div>
                <span className="text-xs font-semibold text-muted uppercase tracking-wider block mb-2">Operating Hours</span>
                <ul className="space-y-2 text-xs text-text font-medium">
                  <li className="flex justify-between items-center">
                    <span className="text-muted">Monday – Thursday:</span>
                    <span>7:30 AM – 11:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-muted">Friday:</span>
                    <span>7:30 AM – 9:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-muted">Saturday:</span>
                    <span>9:00 AM – 8:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-muted">Sunday:</span>
                    <span>10:00 AM – 11:00 PM</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider block">Contact Information</span>
                
                <div className="flex items-center gap-3 text-xs text-text font-medium">
                  <Phone className="w-4 h-4 text-muted flex-shrink-0" />
                  <span>Reference Desk: (555) 300-4400</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-text font-medium">
                  <Mail className="w-4 h-4 text-muted flex-shrink-0" />
                  <span>library@university.edu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
