"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaCode,
  FaStar,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

export default function Projects() {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Tüm teknolojileri topla
  const allTechnologies = [
    "All",
    ...new Set(projects.flatMap((project) => project.technologies)),
  ];

  // Filtreleme fonksiyonu
  useEffect(() => {
    let result = projects;

    // Arama terimi filtresi
    if (searchTerm) {
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Teknoloji filtresi
    if (selectedTech !== "All") {
      result = result.filter((project) =>
        project.technologies.includes(selectedTech)
      );
    }

    // Öne çıkan projeler filtresi
    if (showFeaturedOnly) {
      result = result.filter((project) => project.featured);
    }

    setFilteredProjects(result);
  }, [searchTerm, selectedTech, showFeaturedOnly]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-7xl relative">
        {/* Dekoratif arka plan elementleri */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-100 dark:bg-purple-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

        {/* Başlık - Gradient efektli */}
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent animate-fade-in-down">
          My Projects
        </h1>

        <p className="text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto mb-10 text-lg">
          Here are some of my recent projects. Each project is built with modern
          technologies and best practices.
        </p>

        {/* Filtreleme Araçları */}
        <div className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            {/* Arama Kutusu */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:bg-white dark:focus:bg-gray-600 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Teknoloji Filtresi */}
            <div className="md:w-64">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaFilter className="text-gray-400" />
                </div>
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent bg-gray-50 dark:bg-gray-700 dark:text-gray-200 focus:bg-white dark:focus:bg-gray-600 transition-all appearance-none"
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                >
                  {allTechnologies.map((tech) => (
                    <option key={tech} value={tech}>
                      {tech}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Öne Çıkan Projeler Filtresi */}
            <div className="md:w-auto">
              <label className="inline-flex items-center cursor-pointer bg-gray-50 dark:bg-gray-700 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 mr-2"
                  checked={showFeaturedOnly}
                  onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Featured Projects Only
                </span>
              </label>
            </div>
          </div>

          {/* Filtreleme Sonuçları */}
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projeler Listesi */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <FaSearch className="text-gray-400 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-indigo-900/20 transition-all duration-500 transform hover:-translate-y-1 group"
              >
                {/* Proje Görseli - Gradient arka plan */}
                <div className="h-48 bg-gradient-to-br from-indigo-500/90 to-blue-600/90 relative overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center p-6 text-center">
                    <div className="transform transition-all duration-500 group-hover:scale-110">
                      <FaCode className="text-white/80 text-5xl mb-3 mx-auto" />
                      <h3 className="text-xl font-bold text-white">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Öne çıkan proje rozeti */}
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 font-medium px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                      <FaStar className="text-amber-500" />
                      <span>Featured</span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  {/* Proje Açıklaması */}
                  <p className="text-gray-600 dark:text-gray-400 mb-5 h-16 overflow-hidden">
                    {project.description}
                  </p>

                  {/* Teknolojiler */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-300 text-xs px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-700/50 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                    {/* Detay Linki */}
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center group-hover:underline transition-all"
                    >
                      View Details
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>

                    {/* Linkler */}
                    <div className="flex space-x-3">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 hover:text-indigo-600 transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <FaGithub className="text-xl" />
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                          aria-label="Live Demo"
                        >
                          <FaExternalLinkAlt className="text-lg" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Bölümü */}
        <div className="mt-20 bg-gradient-to-r from-indigo-600 to-blue-600 dark:from-indigo-800 dark:to-blue-900 rounded-2xl shadow-xl overflow-hidden relative z-10">
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10">
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E\")",
              }}
            ></div>
          </div>
          <div className="px-8 py-12 md:py-16 md:px-16 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Do you need a project?
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                I'm here to help you bring your ideas to life! Whether you need
                a new website, mobile app, or custom software development,
                let's work together to make your vision a reality.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/contact"
                className="inline-block bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium px-6 py-3 rounded-xl shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transform transition-transform hover:scale-105 hover:shadow-xl"
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
