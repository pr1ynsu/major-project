import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-10 text-black">
      {/* Top Row */}
      <div className="flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex flex-col">
          <div className="bg-white text-white px-6 py-2 font-serif text-lg tracking-wider">
            CITYWATCH
          </div>
          <span className="text-xs tracking-widest mt-1 ml-1">TECHNOLOGY</span>
        </div>

        {/* Sign up / Log in button */}
        <Link to="/login">
        <button className="px-6 py-2 text-lg border border-black rounded-full bg-pink-100 shadow-md hover:bg-pink-200">
            sign up/ log in
        </button>
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex justify-center">
        <ul className="flex justify-between w-3/4 max-w-4xl py-2 font-serif font-medium text-lg">
          <li><a href="#">HOME</a></li>
          <li><a href="#">BLOG</a></li>
          <li><a href="#">GALLERY</a></li>
          <li><a href="#">ABOUT</a></li>
          <li><a href="#">PARTNER</a></li>
          <li><a href="#">COMMUNITY</a></li>
          <li><a href="#">CONTACT</a></li>
        </ul>
      </div>

      {/* Empty transparent space */}
      <div className="h-16"></div>

    </nav>
  );
}
