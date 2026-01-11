"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "kepala_dinas" | "walikota" | "staff" | "masyarakat"
  department: string
  nik: string
  phone: string
  address: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  login: (credentials: LoginCredentials) => Promise<boolean>
  logout: () => void
  register: (userData: RegisterData) => Promise<boolean>
  isLoading: boolean
  hasPermission: (permission: string) => boolean
  canAccessDepartment: (department: string) => boolean
  setAuthenticatedUser: (user: User) => void
}

interface LoginCredentials {
  identifier: string // email only
  password: string
}

interface RegisterData {
  nik: string
  name: string
  birthDate: string
  province: string
  city: string
  district: string
  village: string
  rt: string
  rw: string
  postalCode: string
  address: string
  phone: string
  email: string
  username: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users data with role-based permissions
// Mock users removed - using real backend


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Helper to map role to permissions
  const getPermissionsForRole = (role: string): string[] => {
    switch (role) {
      case "walikota":
        return ["view_all_departments", "view_aggregated_stats", "view_city_reports", "view_mayor_dashboard", "view_strategic_insights"]
      case "kepala_dinas":
        return ["view_department_data", "view_department_stats", "view_department_reports"]
      case "staff":
        return ["view_basic_data"]
      case "masyarakat":
        return ["view_public_services"]
      default:
        return []
    }
  }

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Dynamic import to avoid SSR issues if necessary, though next-auth/react is client safe
        const { getSession } = await import("next-auth/react")
        const session = await getSession()

        if (session?.user) {
          const role = session.user.role || "masyarakat"

          setUser({
            ...session.user,
            id: session.user.id || "",
            name: session.user.name || "",
            email: session.user.email || "",
            role: role,

            department: session.user.department || "",

            nik: session.user.nik || "",

            phone: session.user.phone || "",

            address: session.user.address || "",

            permissions: getPermissionsForRole(role),
          } as User)
        }
      } catch (error) {
        console.error("Failed to fetch session:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true)
    try {
      const { signIn } = await import("next-auth/react")
      const result = await signIn("credentials", {
        redirect: false,
        email: credentials.identifier, // Assuming the form passes identifier as email. If it's username/nik, auth.ts needs to handle it.
        password: credentials.password,
      })

      if (result?.error) {
        console.error("Login failed:", result.error)
        setIsLoading(false)
        return false
      }

      // Refresh session to get user data
      const { getSession } = await import("next-auth/react")
      const session = await getSession()
      if (session?.user) {
        const role = session.user.role || "masyarakat"

        setUser({
          ...session.user,
          id: session.user.id || "",
          name: session.user.name || "",
          email: session.user.email || "",
          role: role,

          department: session.user.department || "",

          nik: session.user.nik || "",

          phone: session.user.phone || "",

          address: session.user.address || "",

          permissions: getPermissionsForRole(role),
        } as User)
        setIsLoading(false)
        return true
      }

      setIsLoading(false)
      return true // Login successful even if session fetch weird
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const data = await response.json()
        console.error("Registration failed:", data.error)
        setIsLoading(false)
        return false
      }

      // Do we auto-login? The requirement says "user dapat melakukan login". 
      // So returning true here lets the page redirect to login/dashboard.

      setIsLoading(false)
      return true
    } catch (error) {
      console.error("Registration error:", error)
      setIsLoading(false)
      return false
    }
  }

  const logout = async () => {
    const { signOut } = await import("next-auth/react")
    await signOut({ redirect: false })
    setUser(null)
    localStorage.removeItem("pdg-user") // Clean up legacy
  }

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false
  }

  const canAccessDepartment = (department: string): boolean => {
    if (!user) return false
    if (user.role === "walikota") return true
    return user.department === department || user.department === "all"
  }

  const setAuthenticatedUser = (user: User) => {
    setUser(user)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading, hasPermission, canAccessDepartment, setAuthenticatedUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
