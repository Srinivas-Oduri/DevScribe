import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag } from 'lucide-react';
import { Post } from '../../context/BlogContext';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 group">
      {/* Featured Image */}
      {post.featured_image && (
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      )}

      <div className="p-6">
        {/* Category Badge */}
        {post.categories && (
          <div className="mb-3">
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${post.categories.color}20`,
                color: post.categories.color,
              }}
            >
              <Tag className="h-3 w-3 mr-1" />
              {post.categories.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          <Link to={`/blog/${post.id}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{post.tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(post.created_at)}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {getReadingTime(post.content)}
            </div>
          </div>
          
          <Link
            to={`/blog/${post.id}`}
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;