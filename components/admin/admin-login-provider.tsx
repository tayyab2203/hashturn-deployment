"use client"

import { useState, useEffect } from "react"
import { AdminLoginModal } from "./admin-login-modal"
import { AdminSignupModal } from "./admin-signup-modal"

export function AdminLoginProvider() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isSignupOpen, setIsSignupOpen] = useState(false)

  useEffect(() => {
    const handleOpenLogin = () => {
      setIsLoginOpen(true)
      setIsSignupOpen(false)
    }

    const handleOpenSignup = () => {
      setIsSignupOpen(true)
      setIsLoginOpen(false)
    }

    window.addEventListener('openAdminLogin', handleOpenLogin)
    window.addEventListener('openAdminSignup', handleOpenSignup)
    
    return () => {
      window.removeEventListener('openAdminLogin', handleOpenLogin)
      window.removeEventListener('openAdminSignup', handleOpenSignup)
    }
  }, [])

  const handleSignupSuccess = () => {
    setIsSignupOpen(false)
    setIsLoginOpen(true)
  }

  return (
    <>
      <AdminLoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => {
          setIsLoginOpen(false)
          setIsSignupOpen(true)
        }}
      />
      <AdminSignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onSignupSuccess={handleSignupSuccess}
      />
    </>
  )
}
