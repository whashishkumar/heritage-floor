"use client";
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { FiShare2 } from "react-icons/fi";
import { LuFacebook } from "react-icons/lu";
import { RiTwitterXLine } from "react-icons/ri";
import { FiLinkedin } from "react-icons/fi";
import { CiMail } from "react-icons/ci";
import { MdChevronRight } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";
import BlogCard from "@/components/commercial/BlogCard";
import TableOfContents from "./Blog/TableOfContent";
import { useRouter } from "next/navigation";

const BlogDetail = ({ blogsDetail, slugPath }: any) => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tableOfContents, setTableOfContents] = useState<
    { id: string; title: string; level: number }[]
  >([]);
  const { related, data } = blogsDetail;
  const { author, category, date, excerpt, image, readTime, title, tags } =
    data || {};

  const content = `<article class="blog-article">
  <h2>Introduction to Tile Textures</h2>
  <p>
    When it comes to selecting tiles for commercial spaces, texture plays a crucial role that goes far beyond mere aesthetics. The surface texture of a tile affects everything from slip resistance and maintenance requirements to the overall ambiance of a space. Understanding the science behind tile textures can help you make informed decisions that balance beauty, safety, and functionality.
  </p>
  <p>
    In recent years, advances in manufacturing technology have revolutionized the tile industry, allowing designers to create increasingly sophisticated textures that mimic natural materials while offering superior performance characteristics. From subtle matte finishes to deeply embossed patterns, today's textured tiles offer unprecedented versatility for commercial applications.
  </p>

  <div class="quote-box">
    <p class="quote">
      "The right tile texture can transform a space from ordinary to extraordinary, while providing essential safety features that protect your investment and your customers."
    </p>
    <p class="quote-author">— Heritage Indol Design Team</p>
  </div>

  <h2>The Science Behind Textures</h2>
  <p>
    Tile texture is created through various manufacturing processes, each producing distinct surface characteristics. The most common methods include pressing, embossing, and digital printing techniques. These processes manipulate the clay body or surface coating to create raised or recessed patterns that affect both the visual and tactile qualities of the finished tile.
  </p>

  <div class="image-grid">
    <div class="image-item">
      <img src="/fallback.jpg" alt="Tile texture close-up" />
      <p class="caption">Microscopic view of embossed texture</p>
    </div>
    <div class="image-item">
      <img src="/fallback.jpg" alt="Manufacturing process" />
      <p class="caption">Digital printing technology</p>
    </div>
  </div>

  <h2>Types of Tile Textures</h2>
  <p>
    Understanding the different types of tile textures available helps you select the best option for your specific application. Each texture type offers unique benefits and considerations.
  </p>

  <div class="texture-types">
    <div class="texture-card">
      <h3>Matte Finish</h3>
      <p>
        Matte textures provide a sophisticated, non-reflective surface that hides wear and fingerprints effectively. Ideal for high-traffic commercial areas where maintenance is a priority.
      </p>
    </div>

    <div class="texture-card">
      <h3>Polished Finish</h3>
      <p>
        Highly reflective surfaces that create an elegant, upscale appearance. Best suited for lobbies and showrooms where visual impact is paramount.
      </p>
    </div>

    <div class="texture-card">
      <h3>Textured / Structured</h3>
      <p>
        Deeply embossed patterns that provide excellent slip resistance and visual interest. Perfect for outdoor areas and spaces requiring enhanced safety features.
      </p>
    </div>
  </div>

  <h2>Commercial Applications</h2>
  <p>
    Different commercial environments require specific texture considerations. Retail spaces benefit from polished or semi-polished finishes that create a premium feel, while restaurants and hospitality venues need textured surfaces for safety in wet areas. Office buildings often utilize matte finishes that maintain a professional appearance with minimal maintenance.
  </p>

  <div class="full-image">
    <img src="/fallback.jpg" alt="Commercial space with textured tiles" />
  </div>

  <h2>Selection Guide</h2>
  <p>
    Choosing the right tile texture involves evaluating multiple factors including foot traffic patterns, maintenance capabilities, aesthetic goals, and budget constraints. Start by assessing your space's specific requirements, then narrow down options based on performance ratings and design preferences.
  </p>

  <div class="key-considerations">
    <h3>Key Considerations</h3>
    <ul>
      <li>Slip resistance ratings (R9-R13) for safety compliance</li>
      <li>Maintenance requirements and cleaning protocols</li>
      <li>Durability ratings for expected traffic levels</li>
      <li>Visual impact and design cohesion</li>
    </ul>
  </div>

  <h2>Maintenance Tips</h2>
  <p>
    Proper maintenance preserves the appearance and performance of textured tiles. Regular cleaning with pH-neutral products prevents buildup in textured surfaces. For deeply textured tiles, periodic deep cleaning with appropriate equipment ensures longevity. Always follow manufacturer guidelines for specific products and avoid harsh chemicals that can damage surface treatments.
  </p>
</article>`;

  const [generatedContent, setGeneratedContent] = useState(content);

  useEffect(() => {
    // Parse HTML string
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    const headings = Array.from(tempDiv.querySelectorAll("h2, h3"));
    const tocItems = headings.map((heading) => {
      const title = heading.textContent?.trim() || "";
      const id = title
        .toLowerCase()
        .replace(/[^\w]+/g, "-") // create slug-like id
        .replace(/^-|-$/g, ""); // trim - from start/end
      const level = heading.tagName === "H2" ? 2 : 3;

      // Assign the id directly in the actual content DOM element
      heading.setAttribute("id", id);

      return { id, title, level };
    });

    // Update HTML content with IDs
    setGeneratedContent(tempDiv.innerHTML);
    setTableOfContents(tocItems);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Update active section based on scroll position
      const sections = document.querySelectorAll("h2[id]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tableOfContent = [
    { id: "introduction", title: "Introduction to Tile Textures" },
    { id: "science", title: "The Science Behind Textures" },
    { id: "types", title: "Types of Tile Textures" },
    { id: "commercial", title: "Commercial Applications" },
    { id: "selection", title: "Selection Guide" },
    { id: "maintenance", title: "Maintenance Tips" },
  ];

  const relatedPosts = [
    {
      id: 1,
      title: "Tile Tips: The Science of Tile Texture",
      excerpt:
        "Discover how tile texture impacts both aesthetics and functionality in your commercial spaces. Learn about the latest innovations in tile design.",
      image: "/images/commercial/blog/1.png",
      category: "Product Guides",
      date: "October 25, 2025",
      readTime: "5 min read",
      author: "Sarah Johnson",
      featured: true,
    },
    {
      id: 2,
      title: "Ready To Revamp Your House With Pantone Colours of 2025?",
      excerpt:
        "Explore how this year's trending colors can transform your flooring choices and create stunning interior designs.",
      image: "/images/commercial/blog/2.png",
      category: "Design Trends",
      date: "October 22, 2025",
      readTime: "7 min read",
      author: "Michael Chen",
    },
    {
      id: 3,
      title: "Sustainable Flooring: The Future of Commercial Spaces",
      excerpt:
        "Learn about eco-friendly flooring options that don't compromise on style or durability for your business.",
      image: "/images/commercial/blog/3.png",
      category: "Industry News",
      date: "October 18, 2025",

      readTime: "6 min read",
      author: "Emma Williams",
    },
  ];

  // const scrollToSection = (id: any) => {
  //   const element = document.getElementById(id);
  //   if (element) {
  //     const offset = 100;
  //     const elementPosition = element.getBoundingClientRect().top;
  //     const offsetPosition = elementPosition + window.scrollY - offset;
  //     window.scrollTo({ top: offsetPosition, behavior: "smooth" });
  //   }
  // };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleReadMoreCard = (slug?: string) => {
    router.push(`/${slugPath}/blog/${slug}`);
  };

  return (
    <div className="min-h-screen poppins-font">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-amber-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-[#e8e8e8] sticky top-0 z-40">
        <div className="wrapper mx-auto ">
          <div className="flex items-center justify-between h-16">
            <button
              className="flex items-center text-gray-600 hover:text-primaryTwo transition-colors cursor-pointer"
              onClick={() => router.back()}
            >
              <FaArrowLeftLong className="w-5 h-5 mr-2" />
              <span className="font-medium">Back to Blog</span>
            </button>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FiShare2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white">
        <div className="wrapper mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <span className="inline-block px-4 py-1.5 bg-primaryTwo/10 text-primaryTwo text-base font-medium rounded-full ">
              {category || "Design Trends"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-darkBlue mb-6 leading-tight inter-font">
            {title}
          </h1>

          <p className="text-xl text-primaryGray mb-8 leading-relaxed">
            {excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-primaryGray mb-8">
            <div className="flex items-center gap-2">
              <CiUser className="w-5 h-5" />
              <span className="font-medium">{author || "Sarah Mitchell"}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="w-5 h-5" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegClock className="w-5 h-5" />
              <span>{readTime || "8 min read"}</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center gap-3 pb-8 border-b border-[#e8e8e8]">
            <span className="text-sm font-medium text-gray-600">
              Socila Links:
            </span>
            <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
              <LuFacebook className="w-5 h-5 text-darkBlue" />
            </button>
            <button className="p-2 hover:bg-sky-50 rounded-full transition-colors">
              <RiTwitterXLine className="w-5 h-5 text-darkBlue" />
            </button>
            <button className="p-2 hover:bg-blue-50 rounded-full transition-colors">
              <FiLinkedin className="w-5 h-5 text-darkBlue" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <CiMail className="w-5 h-5 text-darkBlue" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="wrapper mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl not-only:h-[400px] md:h-[500px] lg:h-[600px] relative">
          {image && (
            <Image
              src={image}
              alt="Tile Texture Science"
              fill
              className="object-cover"
              unoptimized
              quality={100}
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="wrapper mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar - Table of Contents */}
          <aside className="md:col-span-3 hidden md:block">
            {/* <div className="sticky top-24">
              <h3 className="text-lg font-bold text-darkBlue mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {tableOfContents.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-2 rounded-lg text-base transition-all ${
                      activeSection === item.id
                        ? "bg-primaryOne/10 text-primaryTwo font-medium"
                        : "text-gray-600 hover:bg-primaryOne/10"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </nav>

            </div> */}
            <TableOfContents
              tableOfContents={tableOfContents}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              authorInfo={data}
            />
          </aside>

          {/* Article Content */}
          <article className="md:col-span-9">
            <div className="prose prose-lg max-w-none">
              <div
                className="blog-article"
                dangerouslySetInnerHTML={{ __html: generatedContent }}
              />
            </div>
          </article>
        </div>

        {/* Tags */}
        <div className="max-w-5xl mx-auto mt-12 pt-8 border-t border-[#e8e8e8]">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium text-gray-600">Tags:</span>
            {tags?.map((tag: any) => (
              <button
                key={tag}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-primaryGray transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-8 bg-gray-900 rounded-xl text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Transform Your Space?
          </h3>
          <p className="text-gray-300 mb-6">
            Explore our extensive collection of textured tiles or consult with
            our design experts to find the perfect solution for your commercial
            project.
          </p>
          <button className="px-8 py-3 bg-primaryTwo hover:bg-primaryOne rounded-lg font-semibold transition-colors cursor-pointer">
            Browse Our Collection
          </button>
        </div>

        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-darkBlue mb-8">
            Related Articles
          </h2>
          <div className="lg:grid  lg:grid-cols-3 gap-8">
            {related?.map((post: any, index: any) => (
              <div
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                key={index}
              >
                <BlogCard
                  post={post}
                  index={index}
                  handleReadMoreCard={handleReadMoreCard}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        {/* <div className="wrapper mx-auto mt-16">
          <div className="bg-white rounded-xl border border-[#e8e8e8] p-8">
            <h2 className="text-2xl font-bold text-darkBlue mb-6 flex items-center gap-2">
              <LuMessageSquare className="w-6 h-6" />
              Comments (12)
            </h2>

            <div className="mb-8">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryTwo focus:border-transparent resize-none"
              />
              <button className="mt-4 px-6 py-3 bg-primaryOne hover:bg-primaryTwo text-white rounded-lg font-semibold transition-colors cursor-pointer">
                Post Comment
              </button>
            </div>

            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex gap-4 pb-6 border-b border-[#e8e8e8] last:border-0"
                >
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-darkBlue">
                        John Doe
                      </span>
                      <span className="text-sm text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-primaryGray">
                      Great article! Very informative about tile textures. We
                      recently installed textured tiles in our showroom and they
                      look amazing.
                    </p>
                    <button className="text-sm text-primaryTwo hover:text-amber-700 font-medium mt-2">
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BlogDetail;
