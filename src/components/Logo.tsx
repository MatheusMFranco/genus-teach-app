import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <BookOpen className="h-8 w-8 text-primary-600" />
      <span className="text-xl font-bold text-gray-900">
        Genus Teach
      </span>
    </Link>
  );
};
