"use client"

import { ChevronDown, Menu, X, User as UserIcon, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/lib/auth/auth-context";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [topicsDropdownOpen, setTopicsDropdownOpen] = useState(false);
  const [layananSubmenuOpen, setLayananSubmenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [layananMobileOpen, setLayananMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const layananPublikSubmenu = [
    { title: "Pengawasan", href: "/pengawasan" },
    { title: "Perdagangan", href: "/trading" },
    { title: "Pendidikan", href: "/services/category/pendidikan" },
    { title: "Keuangan", href: "/services/category/keuangan" },
    { title: "Kesehatan", href: "/services/category/kesehatan" },
    { title: "Kependudukan", href: "/kependudukan" },
    { title: "Pengawasan", href: "/Pengawasan" },
    { title: "Tenaga Kerja", href: "/tenagaKerja" },
    { title: "Telekomunikasi", href: "/telekomunikasi" },
    { title: "Industri", href: "/industri" },
    { title: "Pariwisata", href: "/pariwisata" },
    { title: "Geografis", href: "/geografis" },
    { title: "Pemerintahan", href: "/pemerintahan" },
    { title: "Sosial", href: "/sosial" },
    { title: "Transportasi", href: "/transportasi" },
    { title: "Pertanian", href: "/pertanian" },
  ]
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-green-700">
            <Image src="/images/logoParepare.png" alt="Logo" width={30} height={30} />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <div className="bg-green-500 text-white px-8 py-2 rounded-full flex items-center space-x-6">
                <div className="relative">
                  <button
                    onClick={() => setTopicsDropdownOpen(!topicsDropdownOpen)}
                    className="flex items-center space-x-1 hover:text-green-100 transition-colors"
                  >
                    <span>Topik</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  {topicsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {/* Layanan Publik Submenu */}
                      <div
                        className="relative group px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
                        onMouseEnter={() => setLayananSubmenuOpen(true)}
                        onMouseLeave={() => setLayananSubmenuOpen(false)}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Layanan Publik</span>
                          <ChevronDown className="w-3 h-3" />
                        </div>
                        {layananSubmenuOpen && (
                          <div className="absolute left-full top-0 ml-2 w-96 bg-white shadow-lg rounded-md border border-gray-200 z-50 p-2 grid grid-cols-2 gap-2">
                            {layananPublikSubmenu.map((item, index) => (
                              <Link
                                key={index}
                                href={item.href}
                                className="block px-2 py-1 text-gray-700 hover:bg-gray-100 rounded-md text-sm"
                              >
                                {item.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Destinasi Wisata */}
                      <Link
                        href="/destinations"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
                      >
                        Destinasi Wisata
                      </Link>

                      {/* Data Kota */}
                      <Link
                        href="/data"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors rounded-md"
                      >
                        Data Kota
                      </Link>
                    </div>
                  )}
                </div>

                {/* Static Links */}
                <Link href="/news" className="hover:text-green-100 transition-colors">
                  Berita
                </Link>
                <Link href="/faq" className="hover:text-green-100 transition-colors">
                  FAQ
                </Link>
                <Link href="/support" className="hover:text-green-100 transition-colors">
                  Support
                </Link>
              </div>
            </div>
          </div>

          {/* Login Button or User Profile */}
          <div className="hidden md:block">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                    <UserIcon className="w-5 h-5 text-green-700" />
                  </div>
                  <span className="font-medium max-w-[150px] truncate">{user.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>

                    {user.role !== "masyarakat" && (
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}

                    <Link
                      href="/dashboard/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Profil Saya
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <div className="px-3 py-2 text-gray-700 font-medium">Topik</div>

            {/* Dropdown Toggle Layanan Publik */}
            <button
              className="flex justify-between items-center w-full px-6 py-2 text-gray-700 font-medium hover:bg-gray-100"
              onClick={() => setLayananMobileOpen(!layananMobileOpen)}
            >
              <span>Layanan Publik</span>
              <ChevronDown className={`w-4 h-4 transform transition-transform ${layananMobileOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Mobile Submenu */}
            {layananMobileOpen && (
              <div className="pl-8">
                {layananPublikSubmenu.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block px-2 py-1 text-gray-600 hover:text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/destinations"
              className="block px-6 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Destinasi Wisata
            </Link>

            <Link
              href="/data"
              className="block px-6 py-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Data Kota
            </Link>

            <Link
              href="/news"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Berita
            </Link>
            <Link
              href="/faq"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/support"
              className="block px-3 py-2 text-gray-700 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Support
            </Link>
            {user ? (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="px-3 py-2 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center border border-green-200">
                    <UserIcon className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>

                {user.role !== "masyarakat" && (
                  <Link
                    href="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-gray-900 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  href="/dashboard/profile"
                  className="block px-3 py-2 text-gray-700 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profil Saya
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="block w-full text-left bg-orange-500 text-white px-3 py-2 rounded-lg mt-2 text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
