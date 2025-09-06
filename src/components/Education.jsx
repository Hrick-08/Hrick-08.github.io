import { motion } from 'framer-motion';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Education = () => {
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

  const educationData = [
    {
      degree: "B.E. in Computer Science & Engineering (AI/ML)",
      institution: "Chitkara University",
      location: "Punjab, India",
      status: "Ongoing",
      year: "2024 - Present",
      description: "Pursuing specialized education in Artificial Intelligence and Machine Learning with focus on practical applications and real-world problem solving.",
      highlights: [
        "Specialized AI/ML curriculum",
        "Hands-on project experience",
        "Industry-relevant coursework",
        "Research opportunities"
      ],
      icon: FaUniversity,
      color: "retro-blue"
    },
    {
      degree: "CISCE Curriculum",
      institution: "The G.V.E.A.",
      location: "Balurghat, West Bengal",
      status: "Completed",
      year: "2008 - 2024",
      description: "Completed comprehensive education from primary through higher secondary with focus on science and mathematics, laying strong foundation for technical studies.",
      highlights: [
        "Science stream focus",
        "Strong mathematical foundation",
        "Academic excellence",
        "Leadership activities"
      ],
      icon: FaGraduationCap,
      color: "retro-green"
    }
  ];

  const EducationCard = ({ education, index }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5, scale: 1.02 }}
      className="window-retro"
    >
      {/* Window Title Bar */}
      <div className="window-title-bar">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-retro-red border border-retro-dark"></div>
          <div className="w-3 h-3 bg-retro-yellow border border-retro-dark"></div>
          <div className="w-3 h-3 bg-retro-green border border-retro-dark"></div>
        </div>
        <span>{education.institution}</span>
        <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start space-x-4 mb-4">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
            className={`w-16 h-16 bg-${education.color} border-2 border-retro-dark flex items-center justify-center flex-shrink-0`}
          >
            <education.icon className="text-retro-dark" size={24} />
          </motion.div>
          
          <div className="flex-grow">
            <h3 className="font-pixel text-xl text-retro-dark dark:text-retro-cream mb-1">
              {education.degree}
            </h3>
            <div className="flex items-center space-x-2 text-retro-gray dark:text-retro-beige mb-2">
              <FaMapMarkerAlt size={14} />
              <span className="font-retro text-base">{education.location}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <FaCalendarAlt size={14} className="text-retro-pink" />
                <span className="font-retro text-base text-retro-gray dark:text-retro-beige">
                  {education.year}
                </span>
              </div>
              <div className={`px-2 py-1 border border-retro-dark ${
                education.status === 'Ongoing' 
                  ? 'bg-retro-yellow text-retro-dark' 
                  : 'bg-retro-green text-retro-dark'
              }`}>
                <span className="font-pixel text-sm">{education.status}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="font-retro text-base text-retro-dark dark:text-retro-cream mb-4 leading-relaxed">
          {education.description}
        </p>

        {/* Highlights */}
        <div>
          <h4 className="font-pixel text-sm text-retro-dark dark:text-retro-cream mb-2">
            Key Highlights:
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {education.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center">
                <span className="w-2 h-2 bg-retro-pink border border-retro-dark mr-2 flex-shrink-0"></span>
                <span className="font-retro text-sm text-retro-gray dark:text-retro-beige">
                  {highlight}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="education" className="py-20 bg-retro-cream dark:bg-retro-dark">
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
            Education
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-retro text-2xl text-retro-gray dark:text-retro-beige max-w-3xl mx-auto"
          >
            My educational journey focused on computer science, artificial intelligence, and machine learning.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8"
        >
          {educationData.map((education, index) => (
            <EducationCard key={education.institution} education={education} index={index} />
          ))}
        </motion.div>

        {/* Academic Achievements */}
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
            <span>Academic Achievements</span>
            <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
          </div>

          <div className="p-8">
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-retro-yellow border-2 border-retro-dark p-4">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-retro-dark flex items-center justify-center mr-2">
                    <span className="font-pixel text-xs text-retro-yellow">★</span>
                  </div>
                  <h4 className="font-pixel text-base text-retro-dark">
                    Technical Events
                  </h4>
                </div>
                <p className="font-retro text-sm text-retro-dark">
                  Won multiple intra-college technical competitions and coding contests, demonstrating practical problem-solving skills.
                </p>
              </div>
              <div className="bg-retro-green border-2 border-retro-dark p-4">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-retro-dark flex items-center justify-center mr-2">
                    <span className="font-pixel text-xs text-retro-green">◈</span>
                  </div>
                  <h4 className="font-pixel text-base text-retro-dark">
                    Cultural Programs
                  </h4>
                </div>
                <p className="font-retro text-sm text-retro-dark">
                  Actively participated in debates, cultural programs, and non-technical events, showcasing well-rounded development.
                </p>
              </div>
              <div className="bg-retro-blue border-2 border-retro-dark p-4">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-retro-dark flex items-center justify-center mr-2">
                    <span className="font-pixel text-xs text-retro-blue">◊</span>
                  </div>
                  <h4 className="font-pixel text-base text-retro-dark">
                    Coding Contests
                  </h4>
                </div>
                <p className="font-retro text-sm text-retro-dark">
                  Regular participation in competitive programming contests and hackathons, continuously improving algorithmic thinking.
                </p>
              </div>
              <div className="bg-retro-pink border-2 border-retro-dark p-4">
                <div className="flex items-center mb-2">
                  <div className="w-6 h-6 bg-retro-dark flex items-center justify-center mr-2">
                    <span className="font-pixel text-xs text-retro-pink">●</span>
                  </div>
                  <h4 className="font-pixel text-base text-retro-dark">
                    Leadership
                  </h4>
                </div>
                <p className="font-retro text-sm text-retro-dark">
                  Demonstrated leadership skills through project management and team collaboration in various academic activities.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
