import React from 'react';
import { Clock, Users, Star, ArrowRight } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  rating: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  image: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    description: 'Learn the fundamentals of React and build your first web applications.',
    instructor: 'John Smith',
    duration: '8 weeks',
    students: 1250,
    rating: 4.8,
    level: 'Beginner',
    image: '/api/placeholder/400/200'
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Master TypeScript with advanced patterns and best practices.',
    instructor: 'Jane Doe',
    duration: '6 weeks',
    students: 890,
    rating: 4.9,
    level: 'Advanced',
    image: '/api/placeholder/400/200'
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend applications with Node.js and Express.',
    instructor: 'Mike Johnson',
    duration: '10 weeks',
    students: 675,
    rating: 4.7,
    level: 'Intermediate',
    image: '/api/placeholder/400/200'
  },
  {
    id: '4',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn the principles of user interface and user experience design.',
    instructor: 'Sarah Wilson',
    duration: '5 weeks',
    students: 2100,
    rating: 4.6,
    level: 'Beginner',
    image: '/api/placeholder/400/200'
  },
  {
    id: '5',
    title: 'Database Design & SQL',
    description: 'Master database design principles and SQL query optimization.',
    instructor: 'David Brown',
    duration: '7 weeks',
    students: 543,
    rating: 4.8,
    level: 'Intermediate',
    image: '/api/placeholder/400/200'
  },
  {
    id: '6',
    title: 'DevOps & Cloud Computing',
    description: 'Learn modern DevOps practices and cloud deployment strategies.',
    instructor: 'Lisa Chen',
    duration: '9 weeks',
    students: 432,
    rating: 4.9,
    level: 'Advanced',
    image: '/api/placeholder/400/200'
  }
];

export const CoursesPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = React.useState<string>('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredCourses = courses.filter(course => {
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Courses</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our comprehensive collection of courses designed to help you
          master new skills and advance your career.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedLevel === level
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <div className="w-full md:w-auto">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Course Image</span>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{course.rating}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {course.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {course.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students.toLocaleString()} students
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                by {course.instructor}
              </p>
              
              <button className="w-full btn-primary flex items-center justify-center">
                Enroll Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No courses found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};
