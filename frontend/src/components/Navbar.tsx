import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Shield, Lock, Terminal, Menu, X } from "lucide-react";

const Navbar = () => {
  const user = useSelector(
    (state: RootState) =>
      state.auth.user as { username: string; level: number; score: number } | null
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-cyber-dark/70 backdrop-blur-md border-b border-cyber-neon/20 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyber-neon to-blue-500 flex items-center justify-center shadow-lg shadow-cyber-neon/40">
              <Shield className="text-cyber-dark w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyber-neon to-blue-500 text-transparent bg-clip-text tracking-wider">
              CyberSafe
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/courses"
              className="flex items-center space-x-1 text-gray-300 hover:text-cyber-neon transition-colors"
            >
              <Terminal className="w-4 h-4" /> <span>Courses</span>
            </Link>
            <Link
              to="/quizzes"
              className="flex items-center space-x-1 text-gray-300 hover:text-cyber-neon transition-colors"
            >
              <Lock className="w-4 h-4" /> <span>Quizzes</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center space-x-1 text-gray-300 hover:text-cyber-neon transition-colors"
            >
              <Shield className="w-4 h-4" /> <span>Leaderboard</span>
            </Link>
          </div>

          {/* User / Auth */}
          <div className="hidden md:flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-300 text-right">
                  <p className="font-semibold">Level {user.level}</p>
                  <p className="text-cyber-neon">{user.score} pts</p>
                </div>
                <Link to="/profile">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyber-neon to-blue-500 flex items-center justify-center text-cyber-dark font-bold shadow-lg shadow-cyber-neon/40">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                </Link>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-cyber-neon transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-cyber-neon to-blue-500 text-cyber-dark px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-cyber-neon/40 transition-shadow"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-cyber-neon focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-cyber-dark/90 backdrop-blur-md border-t border-cyber-neon/20 px-4 py-6 space-y-4">
          <Link
            to="/courses"
            className="block text-gray-300 hover:text-cyber-neon transition-colors"
          >
            Courses
          </Link>
          <Link
            to="/quizzes"
            className="block text-gray-300 hover:text-cyber-neon transition-colors"
          >
            Quizzes
          </Link>
          <Link
            to="/leaderboard"
            className="block text-gray-300 hover:text-cyber-neon transition-colors"
          >
            Leaderboard
          </Link>

          {user ? (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-300">
                <p className="font-semibold">Level {user.level}</p>
                <p className="text-cyber-neon">{user.score} pts</p>
              </div>
              <Link to="/profile">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyber-neon to-blue-500 flex items-center justify-center text-cyber-dark font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </Link>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-cyber-neon transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-cyber-neon to-blue-500 text-cyber-dark px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-cyber-neon/40 transition-shadow"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
