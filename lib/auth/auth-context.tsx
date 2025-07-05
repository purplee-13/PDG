"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "kepala_dinas" | "walikota" | "staff"
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
}

interface LoginCredentials {
  identifier: string // email, username, or NIK
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
const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Budi Santoso",
    email: "budi.santoso@parepare.go.id",
    role: "kepala_dinas",
    department: "kesehatan",
    nik: "7315041234567890",
    phone: "08123456789",
    address: "Jl. Jenderal Sudirman No. 45",
    permissions: ["view_department_data", "view_department_stats", "view_department_reports"],
  },
  {
    id: "2",
    name: "Siti Nurhaliza, S.Pd",
    email: "siti.nurhaliza@parepare.go.id",
    role: "kepala_dinas",
    department: "pendidikan",
    nik: "7315040987654321",
    phone: "08234567890",
    address: "Jl. Bau Massepe No. 23",
    permissions: ["view_department_data", "view_department_stats", "view_department_reports"],
  },
  {
    id: "3",
    name: "Ahmad Rizki",
    email: "ahmad.rizki@parepare.go.id",
    role: "kepala_dinas",
    department: "perdagangan",
    nik: "7315041111222333",
    phone: "08345678901",
    address: "Jl. Andi Makkasau No. 12",
    permissions: ["view_department_data", "view_department_stats", "view_department_reports"],
  },
  {
    id: "4",
    name: "Maya Sari",
    email: "maya.sari@parepare.go.id",
    role: "kepala_dinas",
    department: "keuangan",
    nik: "7315044444555666",
    phone: "08456789012",
    address: "Jl. Karaeng Burane No. 8",
    permissions: ["view_department_data", "view_department_stats", "view_department_reports"],
  },
  {
    id: "5",
    name: "H. Muhammad Taufan Pawe",
    email: "walikota@parepare.go.id",
    role: "walikota",
    department: "all",
    nik: "7315050000000001",
    phone: "08111000001",
    address: "Kantor Walikota Parepare",
    permissions: [
      "view_all_departments",
      "view_aggregated_stats",
      "view_city_reports",
      "view_mayor_dashboard",
      "view_strategic_insights",
    ],
  },
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("pdg-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find user by email, username, or NIK
    const foundUser = mockUsers.find(
      (user) =>
        user.email === credentials.identifier ||
        user.email.split("@")[0] === credentials.identifier ||
        user.nik === credentials.identifier,
    )

    if (foundUser && credentials.password === "password123") {
      setUser(foundUser)
      localStorage.setItem("pdg-user", JSON.stringify(foundUser))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if user already exists
    const existingUser = mockUsers.find((user) => user.nik === userData.nik || user.email === userData.email)

    if (existingUser) {
      setIsLoading(false)
      return false
    }

    // Create new user with staff role
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: "staff",
      department: "umum",
      nik: userData.nik,
      phone: userData.phone,
      address: userData.address,
      permissions: ["view_basic_data"],
    }

    mockUsers.push(newUser)
    setUser(newUser)
    localStorage.setItem("pdg-user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("pdg-user")
  }

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false
  }

  const canAccessDepartment = (department: string): boolean => {
    if (!user) return false
    if (user.role === "walikota") return true
    return user.department === department || user.department === "all"
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isLoading, hasPermission, canAccessDepartment }}>
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
