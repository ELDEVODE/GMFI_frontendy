import React from "react";
import { FaTwitter, FaEnvelope, FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 text-blue-400">GMFI</h3>
            <p className="text-gray-300 max-w-md">
              Empowering gamers through financial intelligence. Learn, play, and
              grow your financial knowledge.
            </p>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-blue-400">
              Connect With Us
            </h4>
            <div className="flex justify-center md:justify-end space-x-6">
              <a
                href="https://x.com/teamsparksui?t=ycf5JwKwa_3L5kUfhCFSRg&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={28} />
              </a>
              <a
                href="mailto:teamspark.sui@gmail.com"
                className="text-gray-300 hover:text-white transition duration-300"
                aria-label="Email"
              >
                <FaEnvelope size={28} />
              </a>
              <a
                href="https://github.com/yourgithub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={28} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} GMFI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
