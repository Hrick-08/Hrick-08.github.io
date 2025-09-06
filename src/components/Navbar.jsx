import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-retro-beige/90 dark:bg-retro-dark/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 bg-retro-blue border-2 border-retro-dark flex items-center justify-center">
              <span className="font-pixel text-xs text-retro-dark">H</span>
            </div>
            <span className="font-pixel text-lg text-retro-dark dark:text-retro-cream">
              Hrick-08
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="font-retro text-lg text-retro-dark dark:text-retro-cream hover:text-retro-pink transition-colors duration-200"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Social Links & Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.a
              href="https://github.com/Hrick-08"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="text-retro-dark dark:text-retro-cream hover:text-retro-pink transition-colors duration-200"
            >
              <FaGithub size={20} />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/hritabrata-das-913460326/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="text-retro-dark dark:text-retro-cream hover:text-retro-pink transition-colors duration-200"
            >
              <FaLinkedin size={20} />
            </motion.a>
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.2, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-retro-blue dark:bg-retro-dark border-2 border-retro-dark dark:border-retro-cream shadow-retro hover:shadow-retro-lg transition-all duration-200"
            >
              {isDark ? <FaSun className="text-retro-cream" /> : <FaMoon className="text-retro-dark" />}
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <motion.button
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-retro-blue dark:bg-retro-dark border-2 border-retro-dark dark:border-retro-cream shadow-retro"
            >
              {isDark ? <FaSun className="text-retro-cream" size={16} /> : <FaMoon className="text-retro-dark" size={16} />}
            </motion.button>
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-retro-blue dark:bg-retro-dark border-2 border-retro-dark dark:border-retro-cream shadow-retro"
            >
              {isOpen ? <FaTimes className="text-retro-dark dark:text-retro-cream" size={16} /> : <FaBars className="text-retro-dark dark:text-retro-cream" size={16} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-retro-beige dark:bg-retro-gray border-2 border-retro-dark shadow-retro-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ x: 10 }}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left font-retro text-lg text-retro-dark dark:text-retro-cream hover:text-retro-pink transition-colors duration-200 py-2 px-3"
                >
                  {item.name}
                </motion.button>
              ))}
              <div className="flex space-x-4 pt-4 px-3">
                <motion.a
                  href="https://github.com/Hrick-08"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="text-retro-dark dark:text-retro-cream hover:text-retro-pink transition-colors duration-200"
                >
                  <FaGithub size={20} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/hritabrata-das-913460326/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="text-retro-dark dark:text-retro-cream hover:text-retro-pink transition-colors duration-200"
                >
                  <FaLinkedin size={20} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
