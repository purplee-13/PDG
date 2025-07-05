"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth/auth-context"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  ShoppingCart,
  Building2,
  TrendingUp,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout, hasPermission } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024)
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar")
      const menuButton = document.getElementById("menu-button")

      if (
        isMobile &&
        sidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, sidebarOpen])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  // Role-based navigation items
  const getNavigationItems = () => {
    const baseItems = [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        current: pathname === "/dashboard",
        permission: "view_department_data",
      },
      {
        name: "Layanan Saya",
        href: "/dashboard/services",
        icon: LayoutDashboard,
        current: pathname === "/dashboard/services",
        permission: "view_department_data",
      },
      {
        name: "Statistik",
        href: "/dashboard/statistics",
        icon: BarChart3,
        current: pathname === "/dashboard/statistics",
        permission: "view_department_stats",
      },
      {
        name: "Pengguna",
        href: "/dashboard/users",
        icon: Users,
        current: pathname === "/dashboard/users",
        permission: "view_users",
      },
      {
        name: "Pengaturan",
        href: "/dashboard/settings",
        icon: Settings,
        current: pathname === "/dashboard/settings",
        permission: "view_settings",
      },
    ]

    // Add role-specific items
    if (user?.role === "walikota") {
      baseItems.push(
        {
          name: "Perbandingan Dinas",
          href: "/dashboard/departments",
          icon: Building2,
          current: pathname === "/dashboard/departments",
          permission: "view_all_departments",
        },
        {
          name: "Insight Strategis",
          href: "/dashboard/strategic",
          icon: TrendingUp,
          current: pathname === "/dashboard/strategic",
          permission: "view_strategic_insights",
        },
      )
    }

    if (user?.role === "kepala_dinas" && user?.department === "perdagangan") {
      baseItems.push({
        name: "Data Perdagangan",
        href: "/dashboard/mayor-trade",
        icon: ShoppingCart,
        current: pathname === "/dashboard/mayor-trade",
        permission: "view_department_data",
        highlight: true,
      })
    }

    // Add help for all roles
    baseItems.push({
      name: "Bantuan",
      href: "/dashboard/help",
      icon: HelpCircle,
      current: pathname === "/dashboard/help",
      permission: "view_department_data",
    })

    return baseItems.filter((item) => hasPermission(item.permission))
  }

  const navigationItems = getNavigationItems()

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "walikota":
        return "Walikota"
      case "kepala_dinas":
        return "Kepala Dinas"
      default:
        return "Staff"
    }
  }

  const getDepartmentDisplayName = (department: string) => {
    const departments: Record<string, string> = {
      kesehatan: "Kesehatan",
      pendidikan: "Pendidikan",
      perdagangan: "Perdagangan",
      keuangan: "Keuangan",
      umum: "Umum",
      all: "Semua Dinas",
    }
    return departments[department] || department
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isMobile && sidebarOpen && <div className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity" />}

      {/* Sidebar */}
      <div
        id="sidebar"
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <div>
                <span className="text-lg font-semibold text-gray-900">Parepare</span>
                <p className="text-xs text-gray-500">
                  {user?.role === "walikota"
                    ? "Dashboard Walikota"
                    : `Dinas ${getDepartmentDisplayName(user?.department || "")}`}
                </p>
              </div>
            </div>
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* User info section */}
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">{user?.name?.charAt(0) || "U"}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-xs text-gray-500">{getRoleDisplayName(user?.role || "")}</p>
                {user?.role !== "walikota" && (
                  <p className="text-xs text-green-600">{getDepartmentDisplayName(user?.department || "")}</p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.highlight
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : item.current
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${isMobile ? "ml-0" : "ml-64"}`}>
        {/* Top navigation */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  id="menu-button"
                  onClick={toggleSidebar}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}

              {/* Search bar - only for data viewing */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari data..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-500">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
              </button>

              {/* Role indicator */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-green-700">
                  {user?.role === "walikota" ? "Mode Walikota" : "Mode Kepala Dinas"}
                </span>
              </div>

              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                Kembali ke Website
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
