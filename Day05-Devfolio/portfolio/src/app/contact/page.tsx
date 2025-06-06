export const dynamic = "force-static";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaPaperPlane
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-6xl relative">
      {/* Dekoratif arka plan elementleri */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-100 dark:bg-purple-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      
      {/* Başlık - Gradient efektli */}
      <h1 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent animate-fade-in-down">
        Get In Touch
      </h1>
      
      <div className="grid md:grid-cols-2 gap-12 relative z-10">
        {/* Contact Information - Modern tasarım */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl dark:hover:shadow-indigo-900/20">
          <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent flex items-center">
            <span className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-full mr-4 shadow-md">
              <FaEnvelope className="text-white text-xl" />
            </span>
            Contact Information
          </h2>

          <div className="space-y-6">
            <div className="flex items-center p-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-700">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4 rounded-full mr-4 shadow-md">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Email</p>
                <a
                  href="mailto:ahmet@example.com"
                  className="text-lg font-semibold hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 transition-colors"
                >
                  ahmet@example.com
                </a>
              </div>
            </div>

            <div className="flex items-center p-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-700">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4 rounded-full mr-4 shadow-md">
                <FaPhone className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Phone</p>
                <a
                  href="tel:+905551234567"
                  className="text-lg font-semibold hover:text-indigo-600 dark:text-gray-200 dark:hover:text-indigo-400 transition-colors"
                >
                  +90 555 123 45 67
                </a>
              </div>
            </div>

            <div className="flex items-center p-4 rounded-xl hover:bg-indigo-50 dark:hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-indigo-100 dark:hover:border-indigo-700">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-4 rounded-full mr-4 shadow-md">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <div>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Location</p>
                <p className="text-lg font-semibold dark:text-gray-200">İstanbul, Türkiye</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mt-10 mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">Connect With Me</h3>
          <div className="flex space-x-4">
            <a
              href="https://github.com/aheroglu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              aria-label="GitHub"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href="https://linkedin.com/in/aheroglu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href="https://twitter.com/aheroglu"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter className="text-xl" />
            </a>
          </div>
        </div>

        {/* Contact Form - Modern tasarım */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:shadow-xl dark:hover:shadow-indigo-900/20">
          <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent flex items-center">
            <span className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-full mr-4 shadow-md">
              <FaPaperPlane className="text-white text-xl" />
            </span>
            Send Message
          </h2>

          <form className="space-y-6">
            <div className="group">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300"
                  placeholder="Name"
                  required
                />
                <div className="absolute inset-0 rounded-xl border border-indigo-300 dark:border-indigo-500 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300"
                  placeholder="Email"
                  required
                />
                <div className="absolute inset-0 rounded-xl border border-indigo-300 dark:border-indigo-500 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                Subject
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300"
                  placeholder="Subject"
                  required
                />
                <div className="absolute inset-0 rounded-xl border border-indigo-300 dark:border-indigo-500 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="group">
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2 font-medium group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
                Message
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-5 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:bg-white dark:focus:bg-gray-600 transition-all duration-300"
                  placeholder="Message"
                  required
                ></textarea>
                <div className="absolute inset-0 rounded-xl border border-indigo-300 dark:border-indigo-500 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-300"></div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 w-full shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 transform hover:translate-y-[-2px]"
            >
              <span>Send</span>
              <FaPaperPlane className="text-white" />
            </button>
          </form>
        </div>
      </div>
      
      {/* Harita ve İletişim Alt Bilgisi */}
      <section className="mt-20 mb-10 relative z-10">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <h2 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Find Me Here
          </h2>
          
          {/* Harita - iframe ile gömülü Google Maps */}
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg mb-8 border border-gray-200 dark:border-gray-700">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385398.5897809314!2d28.731994235531288!3d41.00498228699284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1623152442076!5m2!1str!2str" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy"
              title="Google Maps"
              className="rounded-xl"
            ></iframe>
          </div>
          
          {/* Alt Bilgi */}
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For business partnerships, project proposals, or just to say hello, feel free to contact me.
              I'll get back to you as soon as possible.
            </p>
            <div className="flex justify-center space-x-6 mt-6">
              <a 
                href="mailto:ahmet@example.com" 
                className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="text-2xl" />
              </a>
              <a 
                href="https://github.com/aheroglu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-800 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a 
                href="https://linkedin.com/in/aheroglu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
