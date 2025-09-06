import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-retro-cream via-retro-beige to-retro-pink dark:from-retro-dark dark:via-retro-gray dark:to-retro-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Profile Image Placeholder */}
          <motion.div
            variants={itemVariants}
            className="mb-8 flex justify-center"
          >
            <motion.div
              variants={floatingVariants}
              animate="float"
              className="w-48 h-48 bg-retro-blue border-4 border-retro-dark shadow-retro-lg flex items-center justify-center relative"
            >
              <div className="w-40 h-40 bg-retro-yellow border-2 border-retro-dark flex items-center justify-center">
                <span className="font-pixel text-6xl text-retro-dark"><img src="./me.jpg" alt="H" style={{width: '100vw', height: '20vh', objectFit: 'cover'}}/></span>
              </div>
              {/* Retro decoration elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-retro-pink border-2 border-retro-dark"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-retro-green border-2 border-retro-dark"></div>
            </motion.div>
          </motion.div>

          {/* Name and Title */}
          <motion.h1
            variants={itemVariants}
            className="font-pixel text-4xl md:text-6xl text-retro-dark dark:text-retro-cream mb-4 text-shadow-retro-lg"
          >
            Hritabrata Das
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="font-retro text-2xl md:text-3xl text-retro-gray dark:text-retro-beige mb-8"
          >
            Full-Stack Developer | AI & ML Enthusiast | IoT Innovator
          </motion.h2>

          {/* Contact Info */}
          <motion.div
            variants={itemVariants}
            className="mb-8 space-y-2"
          >
            <div className="flex items-center justify-center space-x-2 text-retro-dark dark:text-retro-cream">
              <FaMapMarkerAlt className="text-retro-pink" />
              <span className="font-retro text-xl">Punjab, India</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-retro-dark dark:text-retro-cream">
              <FaEnvelope className="text-retro-pink" />
              <span className="font-retro text-xl">hritabratadas8@gmail.com</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-retro-dark dark:text-retro-cream">
              <FaPhone className="text-retro-pink" />
              <span className="font-retro text-xl">+91-9382058536</span>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-6 mb-8"
          >
            <motion.a
              href="https://github.com/Hrick-08"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-retro-blue border-2 border-retro-dark shadow-retro flex items-center justify-center hover:shadow-retro-lg hover:bg-retro-yellow transition-all duration-200"
            >
              <FaGithub className="text-retro-dark" size={24} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/hritabrata-das-913460326/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-12 h-12 bg-retro-blue border-2 border-retro-dark shadow-retro flex items-center justify-center hover:shadow-retro-lg hover:bg-retro-yellow transition-all duration-200"
            >
              <FaLinkedin className="text-retro-dark" size={24} />
            </motion.a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="btn-retro"
            >
              View My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn-retro-dark"
            >
              Get In Touch
            </motion.button>
          </motion.div>

          {/* Retro decorative elements */}
          <motion.div
            variants={itemVariants}
            className="mt-16 flex justify-center space-x-8"
          >
            <div className="w-8 h-8 bg-retro-pink border-2 border-retro-dark animate-pulse flex items-center justify-center">
              <span className="font-pixel text-xs text-retro-dark">★</span>
            </div>
            <div className="w-6 h-6 bg-retro-green border-2 border-retro-dark animate-pulse flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
              <span className="font-pixel text-xs text-retro-dark">●</span>
            </div>
            <div className="w-10 h-10 bg-retro-yellow border-2 border-retro-dark animate-pulse flex items-center justify-center" style={{ animationDelay: '1s' }}>
              <span className="font-pixel text-xs text-retro-dark">◆</span>
            </div>
            <div className="w-4 h-4 bg-retro-blue border-2 border-retro-dark animate-pulse flex items-center justify-center" style={{ animationDelay: '1.5s' }}>
              <span className="font-pixel text-xs text-retro-dark">■</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
