import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt, FaMicrosoft, FaUniversity, FaShieldAlt } from 'react-icons/fa';

const Certifications = () => {
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

  const certifications = [
    {
      title: "Microsoft AI Fundamentals",
      issuer: "Microsoft",
      icon: FaMicrosoft,
      color: "retro-blue",
      url: "https://www.credly.com/badges/6455ba0b-6457-48ab-b33a-7490785ca1cb/linked_in_profile",
      description: "Fundamental understanding of artificial intelligence concepts, machine learning, and AI services.",
      skills: ["AI Concepts", "Machine Learning", "Azure AI Services", "Cognitive Services"]
    },
    {
      title: "Microsoft Azure Fundamentals",
      issuer: "Microsoft",
      icon: FaMicrosoft,
      color: "retro-blue",
      url: "https://www.credly.com/badges/da97194b-1180-465d-bd80-0f6759628284/linked_in_profile",
      description: "Core understanding of cloud services and how those services are provided with Microsoft Azure.",
      skills: ["Cloud Computing", "Azure Services", "Virtual Machines", "Storage Solutions"]
    },
    {
      title: "Microsoft Azure Data Fundamentals",
      issuer: "Microsoft",
      icon: FaMicrosoft,
      color: "retro-blue",
      url: "https://www.credly.com/badges/eba2c1d6-3b90-492a-ad5b-7132bcbd44e6/linked_in_profile",
      description: "Understanding of core data concepts and how they're implemented using Microsoft Azure data services.",
      skills: ["Data Concepts", "Azure Data Services", "Data Analytics", "Database Management"]
    },
    {
      title: "Design Thinking Specialization",
      issuer: "University of Virginia",
      icon: FaUniversity,
      color: "retro-green",
      url: "https://www.coursera.org/account/accomplishments/specialization/TS4012GW0MI3",
      description: "Comprehensive understanding of design thinking methodology for innovative problem-solving.",
      skills: ["Design Thinking", "Innovation", "Problem Solving", "User-Centered Design"]
    },
    {
      title: "Introduction to Cyber Security",
      issuer: "Microsoft",
      icon: FaShieldAlt,
      color: "retro-pink",
      url: "https://www.credly.com/badges/cd3d17b0-0436-4814-9b3d-81a001e661e3/linked_in_profile",
      description: "Fundamental knowledge of cybersecurity concepts, threats, and protection mechanisms.",
      skills: ["Cybersecurity", "Threat Protection", "Security Fundamentals", "Risk Management"]
    }
  ];

  const CertificationCard = ({ cert, index }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className="window-retro h-full"
    >
      {/* Window Title Bar */}
      <div className="window-title-bar">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-retro-red border border-retro-dark"></div>
          <div className="w-3 h-3 bg-retro-yellow border border-retro-dark"></div>
          <div className="w-3 h-3 bg-retro-green border border-retro-dark"></div>
        </div>
        <span>{cert.issuer}</span>
        <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
      </div>

      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`w-12 h-12 bg-${cert.color} border-2 border-retro-dark flex items-center justify-center flex-shrink-0`}
          >
            <cert.icon className="text-retro-dark" size={20} />
          </motion.div>
          
          <div className="flex-grow">
            <h3 className="font-pixel text-base text-retro-dark dark:text-retro-cream mb-1 leading-tight">
              {cert.title}
            </h3>
            <p className="font-retro text-sm text-retro-gray dark:text-retro-beige">
              {cert.issuer}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="font-retro text-sm text-retro-dark dark:text-retro-cream mb-4 flex-grow leading-relaxed">
          {cert.description}
        </p>

        {/* Skills */}
        <div className="mb-4">
          <h4 className="font-pixel text-sm text-retro-dark dark:text-retro-cream mb-2">
            Skills Covered:
          </h4>
          <div className="flex flex-wrap gap-1">
            {cert.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-retro-yellow border border-retro-dark px-2 py-1 font-retro text-sm text-retro-dark"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* View Certificate Button */}
        <motion.a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-retro-green border-2 border-retro-dark shadow-retro hover:shadow-retro-lg hover:bg-retro-yellow transition-all duration-200 flex items-center justify-center py-2 px-3 mt-auto"
        >
          <FaCertificate className="text-retro-dark mr-2" size={12} />
          <span className="font-pixel text-sm text-retro-dark">View Certificate</span>
          <FaExternalLinkAlt className="text-retro-dark ml-2" size={10} />
        </motion.a>
      </div>
    </motion.div>
  );

  return (
    <section id="certifications" className="py-20 bg-retro-beige dark:bg-retro-gray">
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
            Certifications
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-retro text-2xl text-retro-gray dark:text-retro-beige max-w-3xl mx-auto"
          >
            Professional certifications that validate my expertise in cloud computing, AI, and cybersecurity.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.title} cert={cert} index={index} />
          ))}
        </motion.div>

        {/* Certification Stats */}
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
            <span>Certification Overview</span>
            <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
          </div>

          <div className="p-8">
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-retro-yellow border-2 border-retro-dark flex items-center justify-center mx-auto mb-2">
                  <span className="font-pixel text-lg text-retro-dark">★</span>
                </div>
                <div className="font-pixel text-2xl text-retro-dark dark:text-retro-cream">5</div>
                <div className="font-retro text-base text-retro-gray dark:text-retro-beige">Certifications</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-retro-blue border-2 border-retro-dark flex items-center justify-center mx-auto mb-2">
                  <span className="font-pixel text-lg text-retro-dark">◊</span>
                </div>
                <div className="font-pixel text-2xl text-retro-dark dark:text-retro-cream">3</div>
                <div className="font-retro text-base text-retro-gray dark:text-retro-beige">Microsoft Azure</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-retro-green border-2 border-retro-dark flex items-center justify-center mx-auto mb-2">
                  <span className="font-pixel text-lg text-retro-dark">◈</span>
                </div>
                <div className="font-pixel text-2xl text-retro-dark dark:text-retro-cream">1</div>
                <div className="font-retro text-base text-retro-gray dark:text-retro-beige">University Course</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-retro-pink border-2 border-retro-dark flex items-center justify-center mx-auto mb-2">
                  <span className="font-pixel text-lg text-retro-dark">●</span>
                </div>
                <div className="font-pixel text-2xl text-retro-dark dark:text-retro-cream">1</div>
                <div className="font-retro text-base text-retro-gray dark:text-retro-beige">Cybersecurity</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;
