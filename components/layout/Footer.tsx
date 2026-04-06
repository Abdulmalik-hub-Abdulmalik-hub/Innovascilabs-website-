"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
          {/* Logo and Description */}
          <div className="flex flex-col items-start space-y-4">
            <Link href="/" className="flex items-center">
              <Image src="/logo.svg" alt="InnovaSci AI Labs" width={40} height={40} />
              <span className="ml-2 font-bold text-white text-lg">InnovaSci AI Labs</span>
            </Link>
            <p className="text-gray-400 max-w-sm">
              Center for Computational Science and AI Research Academy. Empowering learners and researchers with cutting-edge AI solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/#about" className="hover:text-blue-400">About</Link>
            <Link href="/academy" className="hover:text-blue-400">Academy</Link>
            <Link href="/blog" className="hover:text-blue-400">Blog</Link>
            <Link href="/projects" className="hover:text-blue-400">Projects</Link>
            <Link href="/marketplace" className="hover:text-blue-400">Marketplace</Link>
            <Link href="/events" className="hover:text-blue-400">Events</Link>
            <Link
              href="https://wa.me/08025098561"
              target="_blank"
              className="hover:text-green-400"
            >
              Contact (WhatsApp)
            </Link>
          </div>

          {/* Newsletter / Contact */}
          <div className="flex flex-col space-y-2">
            <h4 className="text-white font-semibold">Stay Connected</h4>
            <p className="text-gray-400">Subscribe to our newsletter for updates on AI courses, projects, and events.</p>
            <form className="flex flex-col sm:flex-row sm:space-x-2 mt-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md text-gray-900 focus:outline-none flex-1"
              />
              <button
                type="submit"
                className="mt-2 sm:mt-0 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
          &copy; {currentYear} InnovaSci AI Labs. All rights reserved.
        </div>
      </div>
    </footer>
  );
              }
