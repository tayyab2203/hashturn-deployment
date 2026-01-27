// Simple authentication helper
// In production, this should use a proper backend with secure password hashing

interface User {
  email: string
  password: string
  name: string
}

// Default admin credentials
const DEFAULT_ADMIN: User = {
  email: "hashturn@gmail.com",
  password: "hashturn123",
  name: "HashTurn Admin"
}

// Store additional users (in production, this would be in a database)
let users: User[] = [DEFAULT_ADMIN]

export function validateLogin(email: string, password: string): boolean {
  const user = users.find(u => u.email === email && u.password === password)
  return !!user
}

export function registerUser(name: string, email: string, password: string): { success: boolean; message: string } {
  // Check if user already exists
  const existingUser = users.find(u => u.email === email)
  if (existingUser) {
    return { success: false, message: "User already exists" }
  }

  // Add new user
  users.push({ name, email, password })
  return { success: true, message: "User registered successfully" }
}

export function getUser(email: string): User | undefined {
  return users.find(u => u.email === email)
}

// Simple session management using localStorage
export function setAuthSession(email: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_session', email)
  }
}

export function getAuthSession(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_session')
  }
  return null
}

export function clearAuthSession(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_session')
  }
}

export function isAuthenticated(): boolean {
  return !!getAuthSession()
}
