import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Clock,
  Calendar,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { blogPosts } from "../../data/blog-posts";
import { Breadcrumbs } from "../../components/ui/Breadcrumbs";

export const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
        <Link to="/blog" className="mt-4 text-blue-600 hover:text-blue-700">
          Return to blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <Breadcrumbs />

      <Link
        to="/blog"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mt-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to blog
      </Link>

      <article className="mt-8 max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              {post.readTime} min read
            </div>
          </div>
        </header>

        <div className="aspect-w-16 aspect-h-9 mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="mb-6 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <footer className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-600">Author</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
            </div>
          </div>
        </footer>
      </article>
    </motion.div>
  );
};
