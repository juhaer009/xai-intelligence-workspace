import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const socialLinks = [
    { name: 'GitHub', icon: '⚡', href: '#' },
    { name: 'LinkedIn', icon: '💼', href: '#' },
    { name: 'Twitter', icon: '🐦', href: '#' },
    { name: 'Discord', icon: '💬', href: '#' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' }
  ];

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Contact', href: '#' },
    { name: 'Support', href: '#' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'GDPR', href: '#' }
  ];

  return (
    <footer className="relative bg-deep-space border-t border-light-silver/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-base-300/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-radial from-neon-blue/5 via-transparent to-transparent" />
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-cyan-glow/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-1/3 w-48 h-48 bg-soft-purple/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-neon-blue/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/images/xai_logo.png" 
                alt="Xai Logo" 
                className="w-12 h-9 object-contain"
              />
              <span className="text-2xl font-bold text-light-silver">
                Xai <span className="text-cyan-glow">.</span>
              </span>
            </div>
            <p className="text-light-silver/70 text-sm leading-relaxed mb-6">
              Transforming raw data into intelligent insights through advanced AI-powered analytics. 
              Experience the future of data intelligence.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-base-300/50 hover:bg-neon-blue/20 border border-light-silver/10 hover:border-cyan-glow/30 rounded-lg flex items-center justify-center text-light-silver/60 hover:text-cyan-glow transition-all duration-300"
                  title={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-light-silver mb-6 relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-neon-blue to-cyan-glow rounded-full" />
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  {link.href.startsWith('/') ? (
                    <Link
                      to={link.href}
                      className="text-light-silver/60 hover:text-cyan-glow transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="w-1 h-1 bg-soft-purple rounded-full mr-3 group-hover:bg-cyan-glow transition-colors duration-300" />
                      {link.name}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      className="text-light-silver/60 hover:text-cyan-glow transition-colors duration-300 text-sm flex items-center group"
                    >
                      <span className="w-1 h-1 bg-soft-purple rounded-full mr-3 group-hover:bg-cyan-glow transition-colors duration-300" />
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-light-silver mb-6 relative">
              Company
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-soft-purple to-neon-blue rounded-full" />
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-light-silver/60 hover:text-cyan-glow transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-soft-purple rounded-full mr-3 group-hover:bg-cyan-glow transition-colors duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal & Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold text-light-silver mb-6 relative">
              Legal
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-cyan-glow to-soft-purple rounded-full" />
            </h3>
            <ul className="space-y-3 mb-8">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-light-silver/60 hover:text-cyan-glow transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-soft-purple rounded-full mr-3 group-hover:bg-cyan-glow transition-colors duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div className="bg-base-300/30 border border-light-silver/10 rounded-xl p-4">
              <h4 className="text-sm font-medium text-light-silver mb-3">Stay Updated</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="flex-1 bg-deep-space/50 border border-light-silver/20 rounded-l-lg px-3 py-2 text-sm text-light-silver placeholder-light-silver/40 focus:outline-none focus:border-cyan-glow/50 transition-colors duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-neon-blue to-cyan-glow text-deep-space px-4 py-2 rounded-r-lg text-sm font-medium hover:from-cyan-glow hover:to-neon-blue transition-all duration-300"
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="pt-8 border-t border-light-silver/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-light-silver/50 text-sm">
              © 2024 Xai Intelligence Workspace. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-light-silver/50">
                Built with ❤️ using React & Three.js
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-glow rounded-full animate-pulse" />
                <span className="text-light-silver/60 text-xs">System Online</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/30 to-transparent" />
      
      {/* Geometric Overlays */}
      <div className="absolute top-8 right-8 w-16 h-16 border border-neon-blue/20 rotate-45 opacity-30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-2 border-soft-purple/20 rounded-full opacity-40" />
    </footer>
  );
};

export default Footer;