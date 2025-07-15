import React from 'react';
import { Target, Users, Lightbulb, Heart } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About Genus Teach
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're passionate about transforming education through innovative
          technology that connects teachers and students in meaningful ways.
        </p>
      </section>

      {/* Mission Section */}
      <section className="bg-white rounded-xl shadow-lg p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              To democratize quality education by providing educators with
              powerful, intuitive tools that enhance the learning experience and
              foster student engagement.
            </p>
            <p className="text-gray-600">
              We believe that every student deserves access to exceptional
              education, and every teacher deserves the tools to deliver it
              effectively.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-primary-100 rounded-full">
              <Target className="h-16 w-16 text-primary-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Lightbulb className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
            <p className="text-gray-600">
              We continuously innovate to stay ahead of educational trends and
              technology advancements.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Community</h3>
            <p className="text-gray-600">
              We foster a supportive community where educators can share,
              collaborate, and grow together.
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Passion</h3>
            <p className="text-gray-600">
              We're passionate about education and dedicated to making a
              positive impact on learning outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 rounded-xl p-8 md:p-12">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Sarah Johnson
            </h3>
            <p className="text-primary-600 mb-2">CEO & Founder</p>
            <p className="text-gray-600 text-sm">
              Former educator with 15 years of teaching experience and a passion
              for educational technology.
            </p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Michael Chen
            </h3>
            <p className="text-primary-600 mb-2">CTO</p>
            <p className="text-gray-600 text-sm">
              Software architect with expertise in educational platforms and
              scalable web applications.
            </p>
          </div>

          <div className="text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Emily Rodriguez
            </h3>
            <p className="text-primary-600 mb-2">Head of Education</p>
            <p className="text-gray-600 text-sm">
              Curriculum specialist focused on creating engaging and effective
              learning experiences.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
