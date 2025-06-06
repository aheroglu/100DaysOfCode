import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">404 - Project Not Found</h1>
      <p className="text-gray-600 mb-8">
        The project you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/projects"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium"
      >
        Back to Projects
      </Link>
    </div>
  );
}
