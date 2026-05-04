import React from 'react';
import NewsBlogs from '../components/Home/NewsBlogs';

export default function Blog() {
  return (
    <div className="pt-10">
      <div className="text-center py-12 bg-primary/5">
        <h1 className="text-3xl md:text-5xl font-bold text-text-main mb-4">Spiritual Blog</h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">Deep dive into the philosophies and lifestyle taught by Jainism.</p>
      </div>
      <NewsBlogs />
    </div>
  );
}
