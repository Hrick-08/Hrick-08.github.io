import { motion } from 'framer-motion';
import { FaPython, FaJs, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaAws, FaDocker } from 'react-icons/fa';
import { SiFastapi, SiDjango, SiMongodb, SiExpress, SiTailwindcss, SiBootstrap, SiNumpy, SiPandas, SiScikitlearn, SiVercel, SiRailway, SiRender } from 'react-icons/si';
import { TbBrandCpp } from 'react-icons/tb';
import { FaJava } from 'react-icons/fa';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
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

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Python", icon: FaPython, level: 90 },
        { name: "JavaScript", icon: FaJs, level: 85 },
        { name: "C++", icon: TbBrandCpp, level: 80 },
        { name: "Java", icon: FaJava, level: 75 },
        { name: "HTML5", icon: FaHtml5, level: 95 },
        { name: "CSS3", icon: FaCss3Alt, level: 90 }
      ]
    },
    {
      title: "Frameworks & Libraries",
      skills: [
        { name: "FastAPI", icon: SiFastapi, level: 85 },
        { name: "Django", icon: SiDjango, level: 80 },
        { name: "React", icon: FaReact, level: 85 },
        { name: "Express.js", icon: SiExpress, level: 75 },
        { name: "TailwindCSS", icon: SiTailwindcss, level: 90 },
        { name: "Bootstrap", icon: SiBootstrap, level: 85 }
      ]
    },
    {
      title: "Data & AI",
      skills: [
        { name: "NumPy", icon: SiNumpy, level: 80 },
        { name: "Pandas", icon: SiPandas, level: 85 },
        { name: "Scikit-learn", icon: SiScikitlearn, level: 75 }
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Git", icon: FaGitAlt, level: 90 },
        { name: "MongoDB", icon: SiMongodb, level: 80 },
        { name: "JWT", icon: FaGitAlt, level: 85 },
        { name: "WebSockets", icon: FaGitAlt, level: 75 },
        { name: "Vercel", icon: SiVercel, level: 85 },
        { name: "Railway", icon: SiRailway, level: 80 },
        { name: "Render", icon: SiRender, level: 75 }
      ]
    }
  ];

  const SkillBadge = ({ skill, index }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-retro-cream dark:bg-retro-dark border-2 border-retro-dark p-4 text-center hover:shadow-retro-lg transition-all duration-300 group"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-3"
      >
        <skill.icon className="text-retro-pink group-hover:text-retro-blue transition-colors duration-300" size={32} />
      </motion.div>
      <h3 className="font-pixel text-base text-retro-dark dark:text-retro-cream mb-2">
        {skill.name}
      </h3>
      <div className="w-full bg-retro-gray border border-retro-dark h-3 mb-2">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, delay: index * 0.1 }}
          className="h-full bg-gradient-to-r from-retro-blue to-retro-green"
        ></motion.div>
      </div>
      <span className="font-retro text-sm text-retro-gray dark:text-retro-beige">
        {skill.level}%
      </span>
    </motion.div>
  );

  return (
    <section id="skills" className="py-20 bg-retro-cream dark:bg-retro-dark">
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
            Skills & Technologies
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-retro text-2xl text-retro-gray dark:text-retro-beige max-w-3xl mx-auto"
          >
            A comprehensive overview of my technical skills and expertise across various technologies and platforms.
          </motion.p>
        </motion.div>

        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="window-retro"
            >
              {/* Window Title Bar */}
              <div className="window-title-bar">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-retro-red border border-retro-dark"></div>
                  <div className="w-3 h-3 bg-retro-yellow border border-retro-dark"></div>
                  <div className="w-3 h-3 bg-retro-green border border-retro-dark"></div>
                </div>
                <span>{category.title}</span>
                <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
              </div>

              <div className="p-8">
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
                >
                  {category.skills.map((skill, index) => (
                    <SkillBadge key={skill.name} skill={skill} index={index} />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills */}
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
            <span>Additional Skills</span>
            <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
          </div>

          <div className="p-8">
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                "REST API Development",
                "Responsive UI/UX Design",
                "Cloud Deployment",
                "Database Design",
                "Version Control",
                "Agile Development",
                "Problem Solving",
                "Team Collaboration"
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="bg-retro-yellow border-2 border-retro-dark p-4 text-center hover:shadow-retro transition-all duration-300"
                >
                  <span className="font-retro text-base text-retro-dark">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
