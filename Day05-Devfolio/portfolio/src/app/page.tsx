import Image from "next/image";
import Link from "next/link";
import { FaJs, FaNodeJs, FaReact, FaHtml5, FaCss3 } from "react-icons/fa";

export const dynamic = "force-static";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      {/* Hero Section with Animation */}
      <section className="container mx-auto px-6 pt-24 pb-16 relative">
        {/* Decorative background elements */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-100 dark:bg-purple-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="md:w-1/2 animate-fade-in-up">
            <div className="mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 text-indigo-600 dark:text-indigo-300 rounded-full text-sm font-medium inline-block mb-4 border border-indigo-100 dark:border-indigo-800 shadow-sm">
                <span className="animate-pulse inline-block mr-2 w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full"></span>
                Full-Stack Web Developer
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent leading-tight">
              Hello, I'm Ahmet Hakan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
              I'm a passionate full-stack web developer with a strong background
              in software development and a deep understanding of web
              technologies. I create elegant solutions that combine design and
              functionality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-200 dark:hover:shadow-indigo-900/50 transition-all duration-300 transform hover:-translate-y-1 flex items-center"
              >
                Contact Me
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link
                href="/projects"
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl font-medium hover:shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
              >
                My Projects
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center animate-fade-in">
            <div className="relative">
              {/* Modern hexagon frame for profile image */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-blue-500 to-purple-500 rounded-3xl transform rotate-12 blur-xl opacity-30 animate-pulse"></div>
              <div className="relative w-80 h-80 rounded-3xl p-1 bg-gradient-to-r from-indigo-500 to-blue-500 shadow-xl transform -rotate-6 hover:rotate-0 transition-all duration-500">
                <div className="w-full h-full rounded-2xl overflow-hidden bg-white dark:bg-gray-800 p-3">
                  <Image
                    src="/pp.jpeg"
                    alt="Hakan Eroğlu"
                    width={400}
                    height={400}
                    className="rounded-xl object-cover w-full h-full shadow-inner"
                    priority={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section with Icons */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent inline-block">
              Skills & Technologies
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: <FaJs className="text-yellow-400" />,
                name: "JavaScript",
              },
              { icon: <FaReact className="text-blue-500" />, name: "React" },
              {
                icon: <FaNodeJs className="text-green-600" />,
                name: "Node.js",
              },
              { icon: <FaHtml5 className="text-orange-500" />, name: "HTML5" },
              { icon: <FaCss3 className="text-blue-600" />, name: "CSS3" },
            ].map((skill, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center"
              >
                <div className="text-4xl mb-4 transition-transform duration-300 hover:scale-110">
                  {skill.icon}
                </div>
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  {skill.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section with Modern Cards */}
      <section className="py-20 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent inline-block">
              Featured Projects
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[1, 2, 3].map((project) => (
              <div
                key={project}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                <div className="h-56 bg-gradient-to-br from-indigo-100 to-blue-50 dark:from-indigo-900/40 dark:to-blue-900/40 flex items-center justify-center overflow-hidden">
                  <span className="text-indigo-300 text-6xl group-hover:scale-110 transition-transform duration-300">
                    ✨
                  </span>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <span className="bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 text-xs font-medium px-3 py-1 rounded-full">
                      Web App
                    </span>
                    <span className="ml-2 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
                      React
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Project {project}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    This is a short description of the project. Information
                    about the problems solved and the technologies used in this
                    innovative solution.
                  </p>
                  <Link
                    href={`/projects/${project}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center group-hover:translate-x-1 transition-transform duration-300"
                  >
                    See Details <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-block bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 px-8 py-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient Background */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-3xl p-12 text-center shadow-xl overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white opacity-10 rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-60 h-60 bg-white opacity-10 rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Let's Work Together!
              </h2>
              <p className="text-indigo-100 mb-10 max-w-2xl mx-auto text-lg">
                I'm always eager to learn new skills and take on new challenges.
                Let's connect and explore the possibilities together to create
                something amazing.
              </p>
              <Link
                href="/contact"
                className="bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 px-10 py-4 rounded-xl font-medium hover:shadow-lg hover:shadow-indigo-700/30 transition-all duration-300 transform hover:-translate-y-1 inline-block"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
