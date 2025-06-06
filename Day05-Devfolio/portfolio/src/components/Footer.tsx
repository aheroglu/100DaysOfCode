import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 pt-16 pb-8">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              aheroglu.dev
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Full-stack web developer specializing in modern web technologies and creating elegant, user-friendly solutions.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/aheroglu"
                className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl" />
              </Link>
              <Link
                href="https://linkedin.com/in/aheroglu"
                className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </Link>
              <Link
                href="https://twitter.com/aherogludev"
                className="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="text-xl" />
              </Link>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Me", path: "/about" },
                { name: "My Projects", path: "/projects" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    href={link.path}
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contact@aheroglu.dev"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 flex items-center"
                >
                  <FaEnvelope className="mr-2" />
                  contact@aheroglu.dev
                </a>
              </li>
              <li className="flex items-center text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="mr-2" />
                Istanbul, Turkey
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Stay Updated</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Subscribe to my newsletter for the latest updates.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-700 focus:border-transparent w-full"
                required
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 rounded-r-lg hover:shadow-md transition-shadow duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Ahmet Hakan Eroğlu. All rights reserved.
          </p>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            <span>Designed with ❤️ by Ahmet Hakan Eroğlu</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
