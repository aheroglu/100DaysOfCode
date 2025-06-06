export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Devfolio",
    description: "A developer portfolio page built with Next.js.",
    longDescription:
      "This project is a portfolio page developed using Next.js and Tailwind CSS. Thanks to Static Site Generation (SSG), it offers fast loading times and SEO advantages. Its responsive design looks perfect on all devices.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/aheroglu/devfolio",
    liveUrl: "https://devfolio.vercel.app",
    featured: true,
  },
  {
    id: "2",
    title: "Todo App",
    description:
      "A task management application developed with React and Firebase.",
    longDescription:
      "This application provides a platform where users can add and edit their tasks. State management is handled using React hooks and context API. Real-time data synchronization is implemented with Firebase Firestore database.",
    technologies: ["React", "Firebase", "CSS"],
    githubUrl: "https://github.com/aheroglu/todo-app",
    liveUrl: "https://todo-app-demo.vercel.app",
    featured: true,
  },
  {
    id: "3",
    title: "Weather App",
    description: "Weather application developed with JavaScript.",
    longDescription:
      "This application displays weather information based on the user's location or searched city using the OpenWeatherMap API. It provides detailed information such as temperature, humidity, and wind speed. It can be used on mobile devices with its responsive design.",
    technologies: ["JavaScript", "HTML", "CSS", "API"],
    githubUrl: "https://github.com/aheroglu/weather-app",
    liveUrl: "https://weather-app-demo.vercel.app",
    featured: false,
  },
  {
    id: "4",
    title: "Blog Platform",
    description: "A blog platform developed with Node.js and MongoDB.",
    longDescription:
      "This platform provides an environment where users can register and share blog posts. API endpoints were created with Express.js, and data is stored with MongoDB. User authentication and authorization processes are provided by JWT.",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "React"],
    githubUrl: "https://github.com/aheroglu/blog-platform",
    liveUrl: "https://blog-platform-demo.herokuapp.com",
    featured: false,
  },
  {
    id: "5",
    title: "E-Commerce Site",
    description: "Full-stack e-commerce website.",
    longDescription:
      "This project is a comprehensive e-commerce platform where users can view and purchase products. It includes basic e-commerce features such as product filtering, cart management, and payment processing. Node.js and Express are used for the backend, and React for the frontend.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/aheroglu/e-commerce",
    liveUrl: "https://e-commerce-demo.vercel.app",
    featured: true,
  },
  {
    id: "6",
    title: "Real-time Chat App",
    description: "Real-time chat application developed with Socket.io.",
    longDescription:
      "This application provides a platform where users can message in real-time. Instant messaging functionality was added using Socket.io. Users can create private chats or join group chats.",
    technologies: ["Node.js", "Express", "Socket.io", "React"],
    githubUrl: "https://github.com/aheroglu/chat-app",
    liveUrl: "https://chat-app-demo.herokuapp.com",
    featured: false,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((projects) => projects.featured);
}
