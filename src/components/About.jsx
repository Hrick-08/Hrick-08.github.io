import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaRocket, FaLightbulb } from 'react-icons/fa';

const About = () => {
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

  const interests = [
    { icon: FaCode, title: "Full-Stack Development", description: "Building end-to-end web applications", symbol: "◊" },
    { icon: FaBrain, title: "AI & Machine Learning", description: "Exploring intelligent systems", symbol: "◈" },
    { icon: FaRocket, title: "Cloud Computing", description: "Deploying scalable solutions", symbol: "▲" },
    { icon: FaLightbulb, title: "Problem Solving", description: "Creating innovative solutions", symbol: "●" }
  ];

  return (
    <section id="about" className="py-20 bg-retro-beige dark:bg-retro-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
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
            <span>About Me</span>
            <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
          </div>

          <div className="p-8">
            <motion.div
              variants={itemVariants}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Text Content */}
              <div>
                <motion.h2
                  variants={itemVariants}
                  className="font-pixel text-3xl md:text-4xl text-retro-dark dark:text-retro-cream mb-6 text-shadow-retro"
                >
                  About Me
                </motion.h2>
                
                <motion.p
                  variants={itemVariants}
                  className="font-retro text-xl text-retro-dark dark:text-retro-cream mb-6 leading-relaxed"
                >
                  I'm a CSE (AI & ML) student at Chitkara University passionate about building practical tech projects using Python, FastAPI, Django, MERN, and Next.js. I enjoy working on AI, cloud computing, and solving real-world problems with code.
                </motion.p>
                
                <motion.p
                  variants={itemVariants}
                  className="font-retro text-xl text-retro-dark dark:text-retro-cream mb-8 leading-relaxed"
                >
                  I've developed competitive programming platforms, blogging systems, and productivity tools while constantly improving my technical and problem-solving skills. My goal is to create innovative solutions that make a real impact.
                </motion.p>

                {/* Key Stats */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-2 gap-4 mb-8"
                >
                  <div className="bg-retro-blue border-2 border-retro-dark p-4 text-center">
                    <div className="font-pixel text-2xl text-retro-dark">3+</div>
                    <div className="font-retro text-sm text-retro-dark">Major Projects</div>
                  </div>
                  <div className="bg-retro-yellow border-2 border-retro-dark p-4 text-center">
                    <div className="font-pixel text-2xl text-retro-dark">5+</div>
                    <div className="font-retro text-sm text-retro-dark">Certifications</div>
                  </div>
                </motion.div>
              </div>

              {/* Interests Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4"
              >
                {interests.map((interest, index) => (
                  <motion.div
                    key={interest.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-retro-cream dark:bg-retro-dark border-2 border-retro-dark p-6 text-center hover:shadow-retro-lg transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center mb-4"
                    >
                      <div className="w-12 h-12 bg-retro-pink border-2 border-retro-dark flex items-center justify-center">
                        <span className="font-pixel text-lg text-retro-dark">{interest.symbol}</span>
                      </div>
                    </motion.div>
                    <h3 className="font-pixel text-base text-retro-dark dark:text-retro-cream mb-2">
                      {interest.title}
                    </h3>
                    <p className="font-retro text-sm text-retro-gray dark:text-retro-beige">
                      {interest.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Retro Progress Bar */}
            <motion.div
              variants={itemVariants}
              className="mt-12"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-retro text-xl text-retro-dark dark:text-retro-cream">
                  Learning Progress
                </span>
                <span className="font-pixel text-base text-retro-dark dark:text-retro-cream">
                  85%
                </span>
              </div>
              <div className="w-full bg-retro-gray border-2 border-retro-dark h-6">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "85%" }}
                  transition={{ duration: 2, delay: 0.5 }}
                  className="h-full bg-gradient-to-r from-retro-blue to-retro-green border-r-2 border-retro-dark"
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
