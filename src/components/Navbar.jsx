import { useState } from 'react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar bg-deep-space/95 backdrop-blur-md shadow-lg px-4 lg:px-8 border-b border-neon-blue/20">
      <div className="navbar-start">
        {/* Mobile menu button */}
        <div className="dropdown lg:hidden mr-2">
          <div 
            tabIndex={0} 
            role="button" 
            className="btn btn-ghost btn-circle text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10"
            onClick={toggleMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          {isMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 border border-neon-blue/20 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
            >
              <li>
                <Link 
                  to="/" 
                  className={`text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10 ${
                    location.pathname === '/' ? 'text-cyan-glow bg-neon-blue/10' : ''
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className={`text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10 ${
                    location.pathname === '/dashboard' ? 'text-cyan-glow bg-neon-blue/10' : ''
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li><a href="#projects" className="text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10">Projects</a></li>
              <li><a href="#analytics" className="text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10">Analytics</a></li>
              <li><a href="#settings" className="text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10">Settings</a></li>
            </ul>
          )}
        </div>

        {/* Logo/Title */}
        <Link 
          to="/" 
          className="btn btn-ghost text-xl font-bold text-light-silver hover:text-cyan-glow transition-colors duration-300 flex items-center gap-3"
        >
          <img 
            src="/images/xai_logo.png" 
            alt="Xai Logo" 
            className="w-22 h-15 object-contain"
          />
          <span className="hidden sm:inline">
            Xai <span className="text-cyan-glow">.</span> Intelligence Workspace
          </span>
          <span className="sm:hidden">Xai</span>
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link 
              to="/" 
              className={`text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10 transition-all duration-300 ${
                location.pathname === '/' ? 'text-cyan-glow bg-neon-blue/10' : ''
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard" 
              className={`text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10 transition-all duration-300 ${
                location.pathname === '/dashboard' ? 'text-cyan-glow bg-neon-blue/10' : ''
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li><a href="#projects" className="text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10 transition-all duration-300">Projects</a></li>
          <li><a href="#analytics" className="text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10 transition-all duration-300">Analytics</a></li>
          <li><a href="#settings" className="text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10 transition-all duration-300">Settings</a></li>
        </ul>
      </div>

      {/* Right side actions */}
      <div className="navbar-end">
        
        {/* Notifications */}
        <div className="dropdown dropdown-end ml-2">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-5 5v-5zM10.5 3.75a6 6 0 0 1 6 6v2.25l2.25 2.25v2.25H2.25v-2.25L4.5 12V9.75a6 6 0 0 1 6-6z"
                />
              </svg>
              <span className="badge badge-xs bg-cyan-glow text-deep-space indicator-item"></span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card compact dropdown-content bg-base-300 border border-neon-blue/20 rounded-box z-[1] w-64 shadow-xl"
          >
            <div tabIndex={0} className="card-body">
              <span className="font-bold text-lg text-light-silver">Notifications</span>
              <span className="text-cyan-glow text-sm">New AI model available</span>
              <span className="text-soft-purple text-sm">Project deployment complete</span>
            </div>
          </div>
        </div>

        {/* Profile dropdown */}
        <div className="dropdown dropdown-end ml-2">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full bg-gradient-to-br from-neon-blue to-soft-purple">
              <div className="w-full h-full flex items-center justify-center font-bold text-light-silver">
                AI
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 border border-neon-blue/20 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
          >
            <li>
              <a className="justify-between text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10">
                Profile
                <span className="badge bg-soft-purple text-light-silver">New</span>
              </a>
            </li>
            <li><a className="text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10">Settings</a></li>
            <li><a className="text-light-silver hover:text-cyan-glow hover:bg-neon-blue/10">Logout</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;