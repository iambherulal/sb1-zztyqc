import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';
import { blogPosts } from '../../data/blog-posts';
import { Breadcrumbs } from '../../components/ui/Breadcrumbs';

export const BlogList = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs />
      
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Blog</h1>
        <p className="mt-2 text-lg text-gray-600">
          Discover the latest trends, tips, and insights
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link to={`/blog/${post.slug}`}>
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
            </Link>

            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {post.author.name}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime} min read
                  </div>
                </div>
              </div>

              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-600 mb-4">{post.excerpt}</p>

              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
};