import React from "react";
import blogs from "../BlogData/blogs.json";
import "./Blog.css";

export default function Blog() {
  return (
    <div className="blog-page">
      <h1 className="page-title">Our Blogs</h1>
      <div className="blog-grid">
        {blogs.map((blog, index) => (
          <a
            key={index}
            href={blog.file} // ✅ Direct link from public folder
            target="_blank"
            rel="noopener noreferrer"
            className="blog-card"
          >
            <img src={blog.image} alt={blog.title} />
            <div className="glass-heading">{blog.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
