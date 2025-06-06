import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLanguage,
} from "react-icons/fa";

export const dynamic = "force-static";

export default function About() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Başlık - Gradient efektli */}
        <h1 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent animate-fade-in-down">
          About Me
        </h1>

        {/* Kişisel Bilgiler - Modern kartlı tasarım */}
        <section className="mb-20 relative">
          {/* Dekoratif arka plan elementleri */}
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-64 h-64 bg-blue-100 dark:bg-blue-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-64 h-64 bg-purple-100 dark:bg-purple-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

          <div className="flex flex-col md:flex-row mx-auto justify-center items-center md:items-start gap-12 relative z-10">
            <div className=" bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Ahmet Hakan Eroğlu
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg leading-relaxed">
                I am a Full-Stack Web Developer with a passion for web
                technologies. I develop user-friendly, performant, and scalable
                web applications.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg leading-relaxed">
                I have experience in every stage of the software development
                process - from frontend to backend, database design to
                deployment and maintenance. I am committed to continuous
                learning and self-improvement.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-lg shadow-sm dark:shadow-gray-900">
                  <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-indigo-700">
                    <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full">
                      <FaEnvelope className="text-indigo-600 dark:text-indigo-400" />
                    </span>
                    Contact Information
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <FaEnvelope className="text-indigo-500" />
                      <span className="font-medium dark:text-gray-300">
                        Email:
                      </span>
                      <a
                        href="mailto:ahmet@example.com"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                      >
                        ahmet@example.com
                      </a>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaMapMarkerAlt className="text-indigo-500" />
                      <span className="font-medium dark:text-gray-300">
                        Location:
                      </span>{" "}
                      <span className="dark:text-gray-300">
                        İstanbul, Türkiye
                      </span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaLanguage className="text-indigo-500" />
                      <span className="font-medium dark:text-gray-300">
                        Languages:
                      </span>{" "}
                      <span className="dark:text-gray-300">
                        Türkçe, İngilizce
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-lg shadow-sm dark:shadow-gray-900">
                  <h3 className="font-semibold text-xl mb-4 flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                    <span className="bg-indigo-100 dark:bg-indigo-900/50 p-2 rounded-full">
                      <FaGithub className="text-indigo-600 dark:text-indigo-400" />
                    </span>
                    Social Media
                  </h3>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="https://github.com/aheroglu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                      >
                        <span className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                          <FaGithub className="text-gray-700 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </span>
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://linkedin.com/in/aheroglu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                      >
                        <span className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                          <FaLinkedin className="text-gray-700 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </span>
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com/aheroglu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
                      >
                        <span className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 transition-colors">
                          <FaTwitter className="text-gray-700 dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                        </span>
                        Twitter
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Experience - Zaman çizelgesi tasarımı */}
        <section className="mb-20 dark:text-gray-300">
          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Education & Experience
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Education - Zaman çizelgesi */}
            <div>
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Education
                </h3>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:to-blue-300 dark:before:from-indigo-600 dark:before:to-blue-500">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/30 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="font-bold text-indigo-500 dark:text-indigo-400">
                      1
                    </span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-700 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                        Computer Engineering
                      </h4>
                      <time className="text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 rounded-full">
                        2018 - 2022
                      </time>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      XYZ University
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      Computer science, algorithm design, data structures and
                      software engineering education.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/30 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="font-bold text-indigo-500 dark:text-indigo-400">
                      2
                    </span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-700 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                        Web Development Certificate
                      </h4>
                      <time className="text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 rounded-full">
                        2017
                      </time>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      ABC Academy
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      Modern web technologies, frontend and backend development
                      comprehensive education.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience - Zaman çizelgesi */}
            <div>
              <div className="flex items-center align-middle justify-end mb-8">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Experience
                </h3>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-indigo-500 before:to-blue-300 dark:before:from-indigo-600 dark:before:to-blue-500">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/30 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="font-bold text-indigo-500 dark:text-indigo-400">
                      1
                    </span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-700 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                        Full-Stack Developer
                      </h4>
                      <time className="text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 rounded-full">
                        2022 - Present
                      </time>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      Tech Company
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      React, Node.js and MongoDB using to develop web
                      applications. I handle frontend and backend tasks within
                      the team.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-700 bg-indigo-50 dark:bg-indigo-900/30 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-800/50 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="font-bold text-indigo-500 dark:text-indigo-400">
                      2
                    </span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-700 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
                        Frontend Developer Intern
                      </h4>
                      <time className="text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1 rounded-full">
                        2021 - 2022
                      </time>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-1">
                      Web Agency
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      HTML, CSS and JavaScript using to develop responsive web
                      applications. I contributed to UI/UX design processes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills - Modern tasarım */}
        <section className="mb-20 relative">
          {/* Dekoratif arka plan elementleri */}
          <div className="absolute -top-10 right-20 w-64 h-64 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute -bottom-8 -right-20 w-64 h-64 bg-purple-100 dark:bg-purple-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Skills
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            {/* Technical Skills - Modern progress bar */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Technical Skills
                </h3>
              </div>

              <div className="space-y-6">
                <div className="transform transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-lg dark:text-gray-300">
                      JavaScript / TypeScript
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      90%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full relative overflow-hidden transition-all duration-1000 ease-in-out"
                      style={{ width: "90%" }}
                    >
                      <div className="absolute inset-0 opacity-30 bg-wave animate-wave"></div>
                    </div>
                  </div>
                </div>

                <div className="transform transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-lg dark:text-gray-300">
                      React / Next.js
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      85%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full relative overflow-hidden transition-all duration-1000 ease-in-out"
                      style={{ width: "85%" }}
                    >
                      <div className="absolute inset-0 opacity-30 bg-wave animate-wave"></div>
                    </div>
                  </div>
                </div>

                <div className="transform transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-lg dark:text-gray-300">
                      Node.js / Express
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      80%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full relative overflow-hidden transition-all duration-1000 ease-in-out"
                      style={{ width: "80%" }}
                    >
                      <div className="absolute inset-0 opacity-30 bg-wave animate-wave"></div>
                    </div>
                  </div>
                </div>

                <div className="transform transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-lg dark:text-gray-300">
                      HTML / CSS / Tailwind
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      95%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full relative overflow-hidden transition-all duration-1000 ease-in-out"
                      style={{ width: "95%" }}
                    >
                      <div className="absolute inset-0 opacity-30 bg-wave animate-wave"></div>
                    </div>
                  </div>
                </div>

                <div className="transform transition-all duration-300 hover:scale-105">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-lg dark:text-gray-300">
                      MongoDB / SQL
                    </span>
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      75%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 shadow-inner">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full relative overflow-hidden transition-all duration-1000 ease-in-out"
                      style={{ width: "75%" }}
                    >
                      <div className="absolute inset-0 opacity-30 bg-wave animate-wave"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Skills - Modern kartlar */}
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Other Skills
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "Project Management",
                  "UI/UX Design",
                  "Git & GitHub",
                  "Agile / Scrum",
                  "Problem Solving",
                  "Team Work",
                  "Communication",
                  "Continuous Learning",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/30 p-4 rounded-xl shadow-md text-center border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700"
                  >
                    <p className="font-medium text-gray-700 dark:text-gray-300">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Interests - Modern tasarım */}
        <section className="mb-12 relative">
          {/* Dekoratif arka plan elementleri */}
          <div className="absolute -top-10 left-20 w-64 h-64 bg-blue-100 dark:bg-blue-900/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            Interests
          </h2>

          <div className="relative z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Web Development", icon: "🌐" },
                { name: "Open Source", icon: "🔄" },
                { name: "New Technologies", icon: "🚀" },
                { name: "UI/UX Design", icon: "🎨" },
                { name: "Artificial Intelligence", icon: "🤖" },
                { name: "Mobile App Development", icon: "📱" },
                { name: "Cyber Security", icon: "🔒" },
                { name: "Blockchain", icon: "⛓️" },
              ].map((interest) => (
                <div
                  key={interest.name}
                  className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-indigo-900/30 p-6 rounded-xl shadow-md text-center border border-gray-100 dark:border-gray-700 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-700 group"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {interest.icon}
                  </div>
                  <p className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                    {interest.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mb-8 mt-20">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Let's Work Together
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              I'm always open to discussing new projects, creative ideas or
              opportunities to be part of your vision.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 font-medium px-8 py-3 rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105"
            >
              Contact Me
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
