import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart, FaCode, FaRocket } from 'react-icons/fa';

const Footer = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/Hrick-08",
      label: "GitHub",
      color: "retro-blue"
    },
    {
      icon: FaLinkedin,
      href: "https://www.linkedin.com/in/hritabrata-das-913460326/",
      label: "LinkedIn",
      color: "retro-green"
    },
    {
      icon: FaEnvelope,
      href: "mailto:hritabratadas8@gmail.com",
      label: "Email",
      color: "retro-pink"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-retro-dark text-retro-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="bg-retro-beige dark:bg-retro-gray border-2 border-retro-dark shadow-retro-lg"
        >
          {/* Window Title Bar */}
          <div className="bg-retro-blue dark:bg-retro-dark text-retro-dark dark:text-retro-cream font-pixel text-xs px-3 py-2 border-b-2 border-retro-dark flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-retro-red border border-retro-dark"></div>
              <div className="w-3 h-3 bg-retro-yellow border border-retro-dark"></div>
              <div className="w-3 h-3 bg-retro-green border border-retro-dark"></div>
            </div>
            <span>Hrick-08 Portfolio</span>
            <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
          </div>

          <div className="p-8">
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Brand Section */}
              <motion.div variants={itemVariants} className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-retro-blue border-2 border-retro-dark flex items-center justify-center">
                    <span className="font-pixel text-lg text-retro-dark">H</span>
                  </div>
                  <div>
                    <h3 className="font-pixel text-xl text-retro-dark">Hritabrata Das</h3>
                    <p className="font-retro text-sm text-retro-dark">Full-Stack Developer</p>
                  </div>
                </div>
                <p className="font-retro text-base text-retro-dark leading-relaxed mb-4">
                  Passionate about building innovative solutions with modern technologies.
                </p>
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <div className="w-2 h-2 bg-retro-green border border-retro-dark animate-pulse"></div>
                  <span className="font-retro text-sm text-retro-dark">Available for opportunities</span>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants} className="text-center md:text-right">
                <h4 className="font-pixel text-lg text-retro-dark mb-4">Connect With Me</h4>
                <div className="flex justify-center md:justify-end space-x-4 mb-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-12 h-12 bg-${social.color} border-2 border-retro-dark shadow-retro flex items-center justify-center hover:shadow-retro-lg hover:bg-retro-yellow transition-all duration-200`}
                      aria-label={social.label}
                    >
                      <social.icon className="text-retro-dark" size={20} />
                    </motion.a>
                  ))}
                </div>
                <p className="font-retro text-sm text-retro-dark">
                  Let's build something amazing together!
                </p>
              </motion.div>
            </div>

            {/* Divider */}
            <motion.div
              variants={itemVariants}
              className="border-t-2 border-retro-dark mb-6"
            ></motion.div>

            {/* Bottom Section - Simplified */}
            <motion.div
              variants={itemVariants}
              className="text-center space-y-3"
            >
              <div className="flex items-center justify-center space-x-2">
                <FaCode className="text-retro-pink" size={14} />
                <span className="font-retro text-sm text-retro-dark">
                  Built with React, Vite & TailwindCSS
                </span>
              </div>
              
              <div className="flex items-center justify-center space-x-2">
                <span className="font-retro text-sm text-retro-dark">
                  Made with
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FaHeart className="text-retro-pink" size={12} />
                </motion.div>
                <span className="font-retro text-sm text-retro-dark">
                  by Hritabrata Das
                </span>
              </div>

              <div className="flex items-center justify-center space-x-2">
                <FaRocket className="text-retro-green" size={14} />
                <span className="font-retro text-sm text-retro-dark">
                  © {currentYear} All rights reserved
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
