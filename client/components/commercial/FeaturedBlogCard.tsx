import React from 'react';
import Link from 'next/link';
import { FaCalendarAlt, FaRegClock } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';

interface FeaturedPost {
  image: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  author: string;
  readTime: string;
  slug: string;
}

interface FeaturedArticleProps {
  featuredPost: FeaturedPost;
  handleReadMore?: (slug: string) => void;
}

const FeaturedBlogArticle: React.FC<FeaturedArticleProps> = ({ featuredPost, handleReadMore }) => {
  return (
    <>
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-[3rem]">
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-primaryOne to-transparent"></div>
        <span className="text-sm font-semibold text-primaryTwo uppercase tracking-wider">
          Featured Article
        </span>
        <div className="h-px flex-grow bg-gradient-to-r from-transparent via-primaryOne to-transparent"></div>
      </div>

      {/* Featured Post */}
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative h-64 sm:h-80 lg:h-full overflow-hidden">
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <span className="absolute top-4 left-4 bg-primaryTwo/80 text-white px-4 py-1.5 rounded-full text-sm font-semibold">
              Featured
            </span>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="bg-gray-100 px-3 py-1 rounded-full font-medium text-primaryGray">
                {featuredPost.category}
              </span>
              <div className="flex items-center gap-1 text-textGray">
                <FaCalendarAlt className="w-4 h-4" />
                <span>{featuredPost.date}</span>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-darkBlue mb-4 group-hover:text-primaryTwo transition-colors">
              {featuredPost.title}
            </h2>

            <p className="text-primaryGray text-lg mb-6 line-clamp-3">{featuredPost.excerpt}</p>

            <div className="flex items-center justify-start group-hover:justify-between pb-4 border-b border-[#e8e8e8] transition-all duration-[1800ms] ease-[cubic-bezier(0.33,1,0.68,1)]">
              <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)]">
                <span className="text-sm text-gray-500"></span>
              </div>

              <button
                onClick={() => handleReadMore?.(featuredPost.slug)}
                className="flex items-center gap-2 text-primaryTwo font-semibold group-hover:gap-4 transition-all duration-[700ms] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer"
              >
                Read More
                <GoArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedBlogArticle;
