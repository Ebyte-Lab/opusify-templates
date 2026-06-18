import React from 'react';
import { Card } from '../../ui/Card';
import { Avatar } from '../../ui/Avatar';
import { Badge } from '../../ui/Badge';
import { MapPin, Clock, Calendar, CheckSquare } from 'lucide-react';
import { Subject } from '../../../types/schedule';

interface ClassCardProps {
  subject: Subject;
}

export const ClassCard: React.FC<ClassCardProps> = ({ subject }) => {
  return (
    <Card className="flex flex-col h-full hoverable">
      {/* Teacher Profile and Room */}
      <div className="flex items-start gap-4 mb-6 border-b border-gray-100 pb-4">
        <Avatar src={subject.teacherAvatar} alt={subject.teacher} size="lg" />
        <div className="flex flex-col min-w-0">
          <h3 className="font-heading font-bold text-xl text-text leading-tight truncate">{subject.name}</h3>
          <p className="text-sm font-semibold text-gray-500 truncate">{subject.teacher}</p>
          <div className="flex items-center gap-1 text-xs text-gray-400 font-semibold mt-1">
            <MapPin size={12} />
            <span>{subject.room}</span>
          </div>
        </div>
      </div>

      {/* Schedule */}
      <div className="flex items-start gap-2.5 mb-5 text-sm">
        <Clock size={16} className="text-primary mt-0.5 shrink-0" />
        <div>
          <span className="font-bold text-gray-700 block">Weekly Schedule</span>
          <span className="text-gray-500 font-semibold text-xs leading-relaxed">{subject.schedule}</span>
        </div>
      </div>

      {/* Current Unit */}
      <div className="flex items-start gap-2.5 mb-5 text-sm">
        <Calendar size={16} className="text-blue-500 mt-0.5 shrink-0" />
        <div>
          <span className="font-bold text-gray-700 block">Current Topic</span>
          <span className="text-gray-500 font-semibold text-xs leading-relaxed">{subject.currentUnit}</span>
        </div>
      </div>

      {/* Materials Needed */}
      <div className="mb-6 flex-grow">
        <div className="flex items-center gap-2 mb-2">
          <CheckSquare size={16} className="text-green-500 shrink-0" />
          <span className="font-bold text-gray-700 text-sm">Materials Needed</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pl-6">
          {subject.materialsNeeded.map((material, idx) => (
            <Badge key={idx} variant="blue" className="text-[10px]">
              {material}
            </Badge>
          ))}
        </div>
      </div>

      {/* Teacher Note */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs font-semibold text-gray-600 italic leading-relaxed">
        <p className="not-italic font-bold text-text mb-1">Note from Teacher:</p>
        "{subject.teacherNote}"
      </div>
    </Card>
  );
};
export default ClassCard;
