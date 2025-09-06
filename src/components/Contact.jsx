import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane, FaUser, FaComment } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "hritabratadas8@gmail.com",
      link: "mailto:hritabratadas8@gmail.com",
      color: "retro-blue"
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91-9382058536",
      link: "tel:+919382058536",
      color: "retro-green"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Punjab, India",
      link: null,
      color: "retro-pink"
    },
    {
      icon: FaGithub,
      label: "GitHub",
      value: "Hrick-08",
      link: "https://github.com/Hrick-08",
      color: "retro-yellow"
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: "hritabrata-das",
      link: "https://www.linkedin.com/in/hritabrata-das-913460326/",
      color: "retro-blue"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-retro-cream dark:bg-retro-dark">
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
            Get In Touch
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="font-retro text-2xl text-retro-gray dark:text-retro-beige max-w-3xl mx-auto"
          >
            Ready to collaborate on your next project? Let's connect and build something amazing together!
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="window-retro"
          >
            <div className="window-title-bar">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-retro-red border border-retro-dark"></div>
                <div className="w-3 h-3 bg-retro-yellow border border-retro-dark"></div>
                <div className="w-3 h-3 bg-retro-green border border-retro-dark"></div>
              </div>
              <span>Contact Information</span>
              <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
            </div>

            <div className="p-8">
              <motion.div
                variants={itemVariants}
                className="space-y-6"
              >
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-12 h-12 bg-${info.color} border-2 border-retro-dark flex items-center justify-center flex-shrink-0`}
                    >
                      <info.icon className="text-retro-dark" size={20} />
                    </motion.div>
                    <div>
                      <h3 className="font-pixel text-base text-retro-dark dark:text-retro-cream">
                        {info.label}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.link.startsWith('http') ? '_blank' : '_self'}
                          rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                          className="font-retro text-base text-retro-gray dark:text-retro-beige hover:text-retro-pink transition-colors duration-200"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="font-retro text-base text-retro-gray dark:text-retro-beige">
                          {info.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Availability Status */}
              <motion.div
                variants={itemVariants}
                className="mt-8 p-4 bg-retro-green border-2 border-retro-dark"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-retro-dark animate-pulse"></div>
                  <span className="font-pixel text-base text-retro-dark">Status</span>
                </div>
                <p className="font-retro text-base text-retro-dark">
                  Available for new opportunities and collaborations
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="window-retro"
          >
            <div className="window-title-bar">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-retro-red border border-retro-dark"></div>
                <div className="w-3 h-3 bg-retro-yellow border border-retro-dark"></div>
                <div className="w-3 h-3 bg-retro-green border border-retro-dark"></div>
              </div>
              <span>Send Message</span>
              <div className="w-4 h-4 bg-retro-gray border border-retro-dark"></div>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={itemVariants}>
                  <label className="block font-pixel text-base text-retro-dark dark:text-retro-cream mb-2">
                    <FaUser className="inline mr-2" />
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="input-retro w-full"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block font-pixel text-base text-retro-dark dark:text-retro-cream mb-2">
                    <FaEnvelope className="inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-retro w-full"
                    placeholder="your.email@example.com"
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block font-pixel text-base text-retro-dark dark:text-retro-cream mb-2">
                    <FaComment className="inline mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="input-retro w-full resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full btn-retro flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-retro-dark border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-retro-green border-2 border-retro-dark text-center"
                  >
                    <p className="font-retro text-base text-retro-dark">
                      ✅ Message sent successfully! I'll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
