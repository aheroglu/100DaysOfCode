import { getProjectById, projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaCode,
  FaStar,
} from "react-icons/fa";

export const dynamic = "force-static";

export function generateStaticParams() {
  return projects.map((project) => {
    return {
      id: project.id,
    };
  });
}

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 max-w-6xl relative">
        {/* Dekoratif arka plan elementleri */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-100 dark:bg-indigo-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-blue-100 dark:bg-blue-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-purple-100 dark:bg-purple-900/40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        {/* Geri dönüş bağlantısı */}
        <Link
          href="/projects"
          className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mb-8 group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-2 px-4 rounded-full shadow-sm hover:shadow transition-all relative z-10"
        >
          <FaArrowLeft className="transform transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>

        {/* Proje detay kartı */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 relative z-10">
          {/* Proje görseli - Gradient arka plan */}
          <div className="h-80 bg-gradient-to-br from-indigo-600 to-blue-600 dark:from-indigo-800 dark:to-blue-900 relative overflow-hidden">
            <div className="w-full h-full flex items-center justify-center p-8">
              <div className="text-center">
                <FaCode className="text-white/80 text-6xl mb-6 mx-auto" />
                <h1 className="text-4xl font-bold text-white mb-4">
                  {project.title}
                </h1>
                {project.featured && (
                  <div className="inline-flex items-center space-x-2 bg-white/20 dark:bg-gray-800/30 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                    <FaStar className="text-amber-300" />
                    <span>Öne Çıkan Proje</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Teknolojiler */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-100 dark:border-indigo-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Proje açıklaması */}
            <div className="prose max-w-none mb-8">
              <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-semibold mb-2 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Project Description
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">
                  {project.description}
                </p>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                  Details
                </h2>
                <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex flex-wrap gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white px-6 py-3 rounded-xl font-medium inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <FaGithub className="mr-2" />
                <span>GitHub Repo</span>
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Diğer projeler bölümü */}
        <div className="mt-20 relative z-10">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent inline-block">
            Other Projects
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-indigo-900/20 transition-all duration-500 transform hover:-translate-y-1 group"
                >
                  {/* Proje görseli - Gradient arka plan */}
                  <div className="h-40 bg-gradient-to-br from-indigo-500/90 to-blue-600/90 relative overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center p-4 text-center">
                      <div className="transform transition-all duration-500 group-hover:scale-110">
                        <FaCode className="text-white/80 text-3xl mb-2 mx-auto" />
                        <h3 className="text-lg font-bold text-white">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                    {p.featured && (
                      <div className="absolute top-2 right-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-indigo-600 dark:text-indigo-400 text-xs font-medium px-2 py-1 rounded-full shadow-md flex items-center space-x-1">
                        <FaStar className="text-amber-500 text-xs" />
                        <span>Featured</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-3">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {p.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-full text-xs font-medium border border-indigo-100 dark:border-indigo-700/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {p.technologies.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-0.5">
                          +{p.technologies.length - 3} daha
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <span className="text-indigo-600 text-sm font-medium group-hover:underline flex items-center">
                        Detayları Gör
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 ml-1 transform transition-transform group-hover:translate-x-1"
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
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* CTA Bölümü */}
        <div className="mt-20 mb-10 bg-gradient-to-r from-indigo-500 via-indigo-600 to-blue-600 dark:from-indigo-700 dark:via-indigo-800 dark:to-blue-900 rounded-2xl shadow-xl overflow-hidden relative z-10">
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
                Do you have a project?
              </h2>
              <p className="text-white/80 text-lg max-w-xl">
                Let's discuss your project! Whether you need a new website,
                mobile app, or custom software development, let's work
                together to make your vision a reality.
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
