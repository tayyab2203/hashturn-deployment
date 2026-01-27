"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IoClose, IoMailOutline, IoLockClosedOutline, IoCheckmarkCircle, IoPersonOutline } from "react-icons/io5"
import { FaUserPlus } from "react-icons/fa"
import { HiSparkles } from "react-icons/hi2"

interface AdminSignupModalProps {
  isOpen: boolean
  onClose: () => void
  onSignupSuccess: () => void
}

export function AdminSignupModal({ isOpen, onClose, onSignupSuccess }: AdminSignupModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters!")
      return
    }

    setIsLoading(true)
    
    // Import registerUser dynamically to avoid build issues
    import("@/lib/auth").then(({ registerUser }) => {
      const result = registerUser(name, email, password)
      
      setIsLoading(false)
      
      if (result.success) {
        onSignupSuccess()
        onClose()
      } else {
        setError(result.message)
      }
    })
  }

  // Floating particles animation
  const particles = Array.from({ length: 20 })

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop with animated gradient */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 25%, #4facfe 50%, #00f2fe 75%, #43e97b 100%)",
              backgroundSize: "400% 400%",
              animation: "gradient-shift 15s ease infinite",
            }}
          >
            {/* Animated floating particles */}
            {particles.map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/30 rounded-full"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [null, Math.random() * window.innerHeight],
                  x: [null, Math.random() * window.innerWidth],
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            {/* Glass overlay */}
            <div className="absolute inset-0 backdrop-blur-3xl bg-white/5" />

            {/* Signup Card with 3D effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: 30, y: 50 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateX: -30, y: 50 }}
              transition={{ 
                type: "spring", 
                duration: 0.8,
                bounce: 0.4,
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto"
              style={{ perspective: "1000px" }}
            >
              {/* Animated glow rings */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-20 blur-2xl"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Glass effect card */}
              <div className="relative bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-slate-900/95 backdrop-blur-2xl border-2 border-white/40 shadow-2xl overflow-hidden">
                {/* Animated mesh gradient background */}
                <div className="absolute inset-0">
                  <motion.div
                    className="absolute inset-0 opacity-30"
                    style={{
                      background: "radial-gradient(circle at 20% 50%, rgba(240, 147, 251, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 87, 108, 0.3), transparent 50%), radial-gradient(circle at 40% 20%, rgba(67, 233, 123, 0.3), transparent 50%)",
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 90, 0],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </div>

                {/* Sparkle effects */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                ))}
                
                {/* Close button with animation */}
                <motion.button
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-gradient-to-br from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 backdrop-blur-sm transition-all border border-white/20"
                >
                  <IoClose className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                </motion.button>

                {/* Content */}
                <div className="relative p-8 pt-12">
                  {/* Enhanced Avatar with multiple animations */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180, y: -50 }}
                    animate={{ scale: 1, rotate: 0, y: 0 }}
                    transition={{ 
                      type: "spring", 
                      delay: 0.3, 
                      duration: 1,
                      bounce: 0.6 
                    }}
                    className="relative mx-auto w-28 h-28 mb-6"
                  >
                    {/* Outer rotating ring */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-transparent border-t-pink-400 border-r-purple-400 border-b-cyan-400 border-l-green-400 shadow-lg"
                      style={{ borderRadius: "50%" }}
                    />
                    
                    {/* Middle pulsing ring */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-2 bg-gradient-to-br from-pink-500/30 to-green-500/30 backdrop-blur-sm"
                      style={{ borderRadius: "50%" }}
                    />

                    {/* Avatar */}
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(240, 147, 251, 0.5)",
                          "0 0 40px rgba(67, 233, 123, 0.5)",
                          "0 0 20px rgba(240, 147, 251, 0.5)",
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-3 bg-gradient-to-br from-pink-600 via-purple-600 to-green-600 flex items-center justify-center"
                      style={{ borderRadius: "50%" }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FaUserPlus className="h-12 w-12 text-white drop-shadow-lg" />
                      </motion.div>
                    </motion.div>

                    {/* Sparkles around avatar */}
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          top: "50%",
                          left: "50%",
                        }}
                        animate={{
                          x: [0, Math.cos((i * Math.PI) / 2) * 50],
                          y: [0, Math.sin((i * Math.PI) / 2) * 50],
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        <HiSparkles className="h-4 w-4 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Animated Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="text-center mb-8"
                  >
                    <motion.h2 
                      className="text-4xl font-bold mb-2"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                      style={{
                        background: "linear-gradient(90deg, #f093fb, #f5576c, #43e97b, #4facfe, #00f2fe, #f093fb)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Create Account
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-sm text-gray-600 dark:text-gray-300 font-medium"
                    >
                      ✨ Join our admin team
                    </motion.p>
                  </motion.div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <motion.div
                      initial={{ opacity: 0, x: -50, rotateY: -20 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      <div className="relative group">
                        <motion.div
                          animate={focusedField === "name" ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          } : {}}
                          transition={{ duration: 0.5 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                        >
                          <motion.div
                            className={`transition-colors ${focusedField === "name" ? "text-green-600" : "text-gray-500"}`}
                          >
                            <IoPersonOutline className="h-5 w-5" />
                          </motion.div>
                        </motion.div>

                        <div className="relative">
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setFocusedField("name")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Full Name"
                            required
                            className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-gray-300/50 dark:border-gray-600/50 focus:border-transparent focus:ring-4 focus:ring-green-500/30 backdrop-blur-sm transition-all placeholder:text-gray-400 text-gray-900 dark:text-white font-medium shadow-lg"
                          />
                          {focusedField === "name" && (
                            <motion.div
                              layoutId="inputBorderSignup"
                              className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 pointer-events-none"
                              style={{ 
                                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude",
                                padding: "2px"
                              }}
                            />
                          )}
                        </div>

                        <AnimatePresence>
                          {name.length >= 3 && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                              <IoCheckmarkCircle className="h-5 w-5 text-green-500" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Email Input */}
                    <motion.div
                      initial={{ opacity: 0, x: -50, rotateY: -20 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      <div className="relative group">
                        <motion.div
                          animate={focusedField === "email" ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0],
                          } : {}}
                          transition={{ duration: 0.5 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                        >
                          <motion.div
                            className={`transition-colors ${focusedField === "email" ? "text-blue-600" : "text-gray-500"}`}
                          >
                            <IoMailOutline className="h-5 w-5" />
                          </motion.div>
                        </motion.div>

                        <div className="relative">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={() => setFocusedField("email")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="admin@hashturn.net"
                            required
                            className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-gray-300/50 dark:border-gray-600/50 focus:border-transparent focus:ring-4 focus:ring-blue-500/30 backdrop-blur-sm transition-all placeholder:text-gray-400 text-gray-900 dark:text-white font-medium shadow-lg"
                          />
                          {focusedField === "email" && (
                            <motion.div
                              layoutId="inputBorderSignup"
                              className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 pointer-events-none"
                              style={{ 
                                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude",
                                padding: "2px"
                              }}
                            />
                          )}
                        </div>

                        <AnimatePresence>
                          {email.includes("@") && email.includes(".") && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                              <IoCheckmarkCircle className="h-5 w-5 text-green-500" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Password Input */}
                    <motion.div
                      initial={{ opacity: 0, x: -50, rotateY: -20 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: 0.8, type: "spring" }}
                    >
                      <div className="relative group">
                        <motion.div
                          animate={focusedField === "password" ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, -10, 10, 0],
                          } : {}}
                          transition={{ duration: 0.5 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                        >
                          <motion.div
                            className={`transition-colors ${focusedField === "password" ? "text-purple-600" : "text-gray-500"}`}
                          >
                            <IoLockClosedOutline className="h-5 w-5" />
                          </motion.div>
                        </motion.div>

                        <div className="relative">
                          <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setFocusedField("password")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="••••••••"
                            required
                            className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-gray-300/50 dark:border-gray-600/50 focus:border-transparent focus:ring-4 focus:ring-purple-500/30 backdrop-blur-sm transition-all placeholder:text-gray-400 text-gray-900 dark:text-white font-medium shadow-lg"
                          />
                          {focusedField === "password" && (
                            <motion.div
                              layoutId="inputBorderSignup"
                              className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 pointer-events-none"
                              style={{ 
                                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude",
                                padding: "2px"
                              }}
                            />
                          )}
                        </div>

                        <AnimatePresence>
                          {password.length >= 6 && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                              <IoCheckmarkCircle className="h-5 w-5 text-green-500" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Confirm Password Input */}
                    <motion.div
                      initial={{ opacity: 0, x: -50, rotateY: -20 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: 0.9, type: "spring" }}
                    >
                      <div className="relative group">
                        <motion.div
                          animate={focusedField === "confirmPassword" ? {
                            scale: [1, 1.2, 1],
                            rotate: [0, -10, 10, 0],
                          } : {}}
                          transition={{ duration: 0.5 }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10"
                        >
                          <motion.div
                            className={`transition-colors ${focusedField === "confirmPassword" ? "text-pink-600" : "text-gray-500"}`}
                          >
                            <IoLockClosedOutline className="h-5 w-5" />
                          </motion.div>
                        </motion.div>

                        <div className="relative">
                          <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() => setFocusedField("confirmPassword")}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Confirm Password"
                            required
                            className="w-full pl-12 pr-4 py-4 bg-white/70 dark:bg-slate-800/70 border-2 border-gray-300/50 dark:border-gray-600/50 focus:border-transparent focus:ring-4 focus:ring-pink-500/30 backdrop-blur-sm transition-all placeholder:text-gray-400 text-gray-900 dark:text-white font-medium shadow-lg"
                          />
                          {focusedField === "confirmPassword" && (
                            <motion.div
                              layoutId="inputBorderSignup"
                              className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 pointer-events-none"
                              style={{ 
                                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude",
                                padding: "2px"
                              }}
                            />
                          )}
                        </div>

                        <AnimatePresence>
                          {confirmPassword.length >= 6 && confirmPassword === password && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              exit={{ scale: 0, rotate: 180 }}
                              className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                              <IoCheckmarkCircle className="h-5 w-5 text-green-500" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-500 text-sm text-center font-medium"
                        >
                          {error}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Signup Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                    >
                      <motion.button
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: "0 20px 60px rgba(240, 147, 251, 0.5)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isLoading}
                        className="relative w-full py-5 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-green-600"
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          style={{ backgroundSize: "200% auto" }}
                        />

                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        
                        <span className="relative flex items-center justify-center gap-3 text-white font-bold text-lg tracking-wider">
                          {isLoading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-6 h-6 border-3 border-white/30 border-t-white"
                                style={{ borderRadius: "50%" }}
                              />
                              <motion.span
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                Creating Account...
                              </motion.span>
                            </>
                          ) : (
                            <>
                              <motion.span
                                animate={{
                                  scale: [1, 1.2, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              >
                                ✨
                              </motion.span>
                              CREATE ACCOUNT
                            </>
                          )}
                        </span>

                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%)",
                          }}
                        />
                      </motion.button>
                    </motion.div>
                  </form>
                </div>

                {/* Enhanced Decorative elements */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-pink-500/40 to-cyan-500/40 blur-3xl pointer-events-none"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                  className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-green-500/40 to-purple-500/40 blur-3xl pointer-events-none"
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
