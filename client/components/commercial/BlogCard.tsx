import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime?: string;
  author?: string;
  featured?: boolean;
  slug?: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
  handleReadMoreCard?: (slug?: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index, handleReadMoreCard }: BlogCardProps) => {
  return (
    <div key={post.id}>
      <div className="relative h-[20rem] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span className="bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-700">
            {post.category}
          </span>
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" />
            <span>{post.date}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-darkBlue mb-3 line-clamp-2 group-hover:text-primaryTwo transition-colors h-full">
          {post.title}
        </h3>

        <p className="text-primaryGray text-sm mb-4 line-clamp-2">{post.excerpt}</p>

        <div
          onClick={() => handleReadMoreCard?.(post.slug)}
          className="flex items-center justify-start group-hover:justify-between pt-4 border-t border-[#e8e8e8] transition-all  duration-[5000] ease-in-out cursor-pointer"
        >
          <button className="text-base text-gray-500 pr-4">Read More</button>

          <button className="text-primaryOne hover:text-shadow-primaryGray transition-colors ">
            <FaArrowRightLong
              size={20}
              className=" group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
