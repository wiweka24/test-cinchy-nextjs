"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import NavbarItem from "./navbar-item";
import logo from "@/public/cinchy-logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full z-50 font-base bg-white border-gray-20 flex justify-center sticky top-0 left-0 right-0 text-darkgreen">
      <div className="w-full max-w-[1440px] flex flex-wrap items-center justify-between p-4 md:py-2 md:px-12 xl:px-[120px]">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Cinchy - Bali Motor Rental" />
        </Link>

        {/* Menu */}
        <div className="items-center hidden lg:flex w-auto gap-4">
          <ul className="font-medium text-lg flex flex-col lg:flex-row">
            <NavbarItem href="#about-us">About Us</NavbarItem>
            <NavbarItem href="#pricing">Pricing</NavbarItem>
            <NavbarItem href="#faq">FAQ</NavbarItem>
            <NavbarItem href="#my-booking">MyBooking</NavbarItem>
          </ul>
          <button className="font-par px-5 py-3 text-lg border hover:bg-darkgreen focus:bg-darkgreen hover:text-white focus:text-white border-darkgreen font-medium text-center transition duration-300 rounded-md hover:from-cust-orange-light/80 hover:to-cust-orange-dark/80 ease bg-gradient-to-b from-cust-orange-light to-cust-orange-dark md:w-auto">
            Login
          </button>
        </div>

        {/* Hamburger Button */}
        <button
          className="lg:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoClose className="w-7 h-7" /> : <FaBars className="w-7 h-7" />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden w-full justify-end z-20">
            <ul className="space-y-3 font-semibold pt-4 pb-0 md:py-4 text-end">
              <li>
                <Link href="#about-us">About Us</Link>
              </li>
              <li>
                <Link href="#pricing">Pricing</Link>
              </li>
              <li>
                <Link href="#faq">FAQ</Link>
              </li>
              <li>
                <Link href="#my-booking">MyBooking</Link>
              </li>
              <button className="px-2 py-1 text-lg border hover:bg-darkgreen focus:bg-darkgreen hover:text-white focus:text-white border-darkgreen font-medium text-center transition duration-300 rounded-md hover:from-cust-orange-light/80 hover:to-cust-orange-dark/80 md:w-auto">
                Login
              </button>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
