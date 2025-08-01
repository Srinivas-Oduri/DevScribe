import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PenTool, BookOpen, Users, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: PenTool,
      title: 'Easy Writing',
      description: 'Create and edit blog posts with our intuitive editor. Rich text formatting made simple.',
    },
    {
      icon: BookOpen,
      title: 'Beautiful Reading',
      description: 'Your readers will enjoy a clean, distraction-free reading experience.',
    },
    {
      icon: Users,
      title: 'Category System',
      description: 'Organize your content with customizable categories and tags.',
    },
    {
      icon: Zap,
      title: 'Fast & Reliable',
      description: 'Built with modern technologies for optimal performance and reliability.',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2 text-blue-800 text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              <span>Modern Blog Platform</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Share Your Stories
            <span className="text-blue-600 block">With the World</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            A beautiful, modern blog platform built with React and Supabase. 
            Create, manage, and share your content with ease.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/blog"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group"
            >
              <span>Explore Blog</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/admin"
              className="w-full sm:w-auto bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border border-blue-200 hover:bg-blue-50 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you create and manage your blog content effortlessly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Writing?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of writers who trust our platform to share their stories.
          </p>
          <Link
            to="/admin/create"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors space-x-2 group"
          >
            <PenTool className="h-5 w-5" />
            <span>Create Your First Post</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;