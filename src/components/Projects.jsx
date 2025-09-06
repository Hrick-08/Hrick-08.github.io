import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaServer, FaDatabase, FaRocket } from 'react-icons/fa';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const projects = [
    {
      title: "BeatCode",
      subtitle: "Competitive Programming Platform",
      description: "Real-time 1v1 coding battles with algorithmic challenges under time pressure. Features AI-powered post-match code reviews and comprehensive leaderboards.",
      features: [
        "Real-time 1v1 coding battles",
        "AI-powered code reviews",
        "Algorithmic challenges",
        "Time pressure mechanics",
        "Leaderboards & rankings"
      ],
      tech: ["FastAPI", "Next.js 15", "Judge0 API", "SQLAlchemy", "WebSockets"],
      github: "https://github.com/Hrick-08/BeatCode",
      demo: null,
      image: "◊"
    },
    {
      title: "Writoria",
      subtitle: "Blogging Platform",
      description: "Django-based blogging system with comprehensive features including user authentication, social interactions, and markdown support with responsive design.",
      features: [
        "User authentication & profiles",
        "Like, comment & bookmark system",
        "Category organization",
        "Markdown support",
        "Dark/light themes"
      ],
      tech: ["Django", "Python", "SQLite", "Bootstrap", "JavaScript"],
      github: "https://github.com/Hrick-08/Writoria_Django",
      demo: null,
      image: "◈"
    },
    {
      title: "E-shop",
      subtitle: "MERN E-commerce Platform",
      description: "Full-stack e-commerce application built with the MERN stack, featuring complete CRUD operations, shopping cart functionality, and responsive design.",
      features: [
        "Product catalog & search",
        "Shopping cart functionality",
        "User authentication",
        "Order management",
        "Responsive design"
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      github: "https://github.com/Hrick-08/e-shop",
      demo: null,
      image: "▲"
    }
  ];

  const ProjectCard = ({ project, index }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10, scale: 1.02 }}
      className="window-retro h-full"
    >
      {/* Window Title Bar */}
      <div className="window-title-bar">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-retro-red border border-retro-dark"></div>
          <div className="w-3 h-3 bg-retro-yellow border border-retro-dark"></div>
          <div className="w-3 h-3 bg-retro-green border border-retro-dark"></div>
        </div>
        <span>{project.title}</span>
        <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
      </div>

      <div className="p-6 h-full flex flex-col">
        {/* Project Icon */}
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-retro-blue border-2 border-retro-dark flex items-center justify-center mx-auto mb-2">
            <span className="font-pixel text-2xl text-retro-dark">{project.image}</span>
          </div>
          <h3 className="font-pixel text-xl text-retro-dark dark:text-retro-cream mb-1">
            {project.title}
          </h3>
          <p className="font-retro text-sm text-retro-gray dark:text-retro-beige">
            {project.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="font-retro text-base text-retro-dark dark:text-retro-cream mb-4 flex-grow">
          {project.description}
        </p>

        {/* Features */}
        <div className="mb-4">
          <h4 className="font-pixel text-sm text-retro-dark dark:text-retro-cream mb-2">
            Key Features:
          </h4>
          <ul className="space-y-1">
            {project.features.map((feature, idx) => (
              <li key={idx} className="font-retro text-sm text-retro-gray dark:text-retro-beige flex items-center">
                <span className="w-2 h-2 bg-retro-green border border-retro-dark mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="font-pixel text-sm text-retro-dark dark:text-retro-cream mb-2">
            Tech Stack:
          </h4>
          <div className="flex flex-wrap gap-1">
            {project.tech.map((tech, idx) => (
              <span
                key={idx}
                className="bg-retro-blue border border-retro-dark px-2 py-1 font-retro text-sm text-retro-dark"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-auto">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-retro-blue border-2 border-retro-dark shadow-retro hover:shadow-retro-lg hover:bg-retro-yellow transition-all duration-200 flex items-center justify-center py-2 px-3"
          >
            <FaGithub className="text-retro-dark mr-2" size={14} />
            <span className="font-pixel text-sm text-retro-dark">Code</span>
          </motion.a>
          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 bg-retro-green border-2 border-retro-dark shadow-retro hover:shadow-retro-lg hover:bg-retro-yellow transition-all duration-200 flex items-center justify-center py-2 px-3"
            >
              <FaExternalLinkAlt className="text-retro-dark mr-2" size={14} />
              <span className="font-pixel text-sm text-retro-dark">Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" className="py-20 bg-retro-beige dark:bg-retro-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="font-pixel text-4xl md:text-5xl text-retro-dark dark:text-retro-cream mb-4 text-shadow-retro-lg"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-retro text-2xl text-retro-gray dark:text-retro-beige max-w-3xl mx-auto"
          >
            A showcase of my major projects that demonstrate my skills in full-stack development, AI integration, and modern web technologies.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </motion.div>

        {/* Project Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 window-retro"
        >
          <div className="window-title-bar">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-retro-red border border-retro-dark"></div>
              <div className="w-3 h-3 bg-retro-yellow border border-retro-dark"></div>
              <div className="w-3 h-3 bg-retro-green border border-retro-dark"></div>
            </div>
            <span>Project Statistics</span>
            <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
          </div>

          <div className="p-8">
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-retro-green border-2 border-retro-dark flex items-center justify-center mx-auto mb-2">
                  <span className="font-pixel text-lg text-retro-dark">▲</span>
                </div>
                <div className="font-pixel text-2xl text-retro-dark dark:text-retro-cream">3+</div>
                <div className="font-retro text-base text-retro-gray dark:text-retro-beige">Major Projects</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-retro-blue border-2 border-retro-dark flex items-center justify-center mx-auto mb-2">
                  <span className="font-pixel text-lg text-retro-dark">◊</span>
                </div>
                <div className="font-pixel text-2xl text-retro-dark dark:text-retro-cream">10+</div>
                <div className="font-retro text-base text-retro-gray dark:text-retro-beige">Technologies</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-retro-yellow border-2 border-retro-dark flex items-center justify-center mx-auto mb-2">
                  <span className="font-pixel text-lg text-retro-dark">★</span>
                </div>
                <div className="font-pixel text-2xl text-retro-dark dark:text-retro-cream">100%</div>
                <div className="font-retro text-base text-retro-gray dark:text-retro-beige">Open Source</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-retro-pink border-2 border-retro-dark flex items-center justify-center mx-auto mb-2">
                  <span className="font-pixel text-lg text-retro-dark">●</span>
                </div>
                <div className="font-pixel text-2xl text-retro-dark dark:text-retro-cream">Active</div>
                <div className="font-retro text-base text-retro-gray dark:text-retro-beige">Development</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
