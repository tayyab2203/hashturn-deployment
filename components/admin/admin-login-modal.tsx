"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { IoClose, IoMailOutline, IoLockClosedOutline, IoCheckmarkCircle } from "react-icons/io5"
import { FaUserShield } from "react-icons/fa"
import { HiSparkles } from "react-icons/hi2"
import { validateLogin, setAuthSession } from "@/lib/auth"

interface AdminLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToSignup: () => void
}

export function AdminLoginModal({ isOpen, onClose, onSwitchToSignup }: AdminLoginModalProps) {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    // Simulate network delay
    setTimeout(() => {
      const isValid = validateLogin(email, password)
      
      if (isValid) {
        setAuthSession(email)
        setIsLoading(false)
        onClose()
        router.push("/admin/dashboard")
      } else {
        setError("Invalid email or password!")
        setIsLoading(false)
      }
    }, 1500)
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
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)",
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
            {/* Login Card with 3D effect */}
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
              className="relative w-full max-w-md"
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
                      background: "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 105, 180, 0.3), transparent 50%), radial-gradient(circle at 40% 20%, rgba(138, 43, 226, 0.3), transparent 50%)",
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
                      className="absolute inset-0 border-4 border-transparent border-t-cyan-400 border-r-purple-400 border-b-pink-400 border-l-blue-400 shadow-lg"
                      style={{ borderRadius: "50%" }}
                    />
                    
                    {/* Middle pulsing ring */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.15, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-2 bg-gradient-to-br from-blue-500/30 to-purple-500/30 backdrop-blur-sm"
                      style={{ borderRadius: "50%" }}
                    />

                    {/* Avatar */}
                    <motion.div
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(59, 130, 246, 0.5)",
                          "0 0 40px rgba(168, 85, 247, 0.5)",
                          "0 0 20px rgba(59, 130, 246, 0.5)",
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-3 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center"
                      style={{ borderRadius: "50%" }}
                    >
                      <motion.div
                        animate={{ 
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <FaUserShield className="h-12 w-12 text-white drop-shadow-lg" />
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
                        background: "linear-gradient(90deg, #667eea, #764ba2, #f093fb, #4facfe, #00f2fe, #667eea)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Admin Login
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-sm text-gray-600 dark:text-gray-300 font-medium"
                    >
                      🔐 Enter your credentials to access the dashboard
                    </motion.p>
                  </motion.div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input with enhanced animation */}
                    <motion.div
                      initial={{ opacity: 0, x: -50, rotateY: -20 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      <div className="relative group">
                        {/* Animated icon container */}
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

                        {/* Input with animated border */}
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
                          {/* Animated border gradient */}
                          {focusedField === "email" && (
                            <motion.div
                              layoutId="inputBorder"
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

                        {/* Success checkmark */}
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

                    {/* Password Input with enhanced animation */}
                    <motion.div
                      initial={{ opacity: 0, x: -50, rotateY: -20 }}
                      animate={{ opacity: 1, x: 0, rotateY: 0 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      <div className="relative group">
                        {/* Animated icon container */}
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

                        {/* Input with animated border */}
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
                          {/* Animated border gradient */}
                          {focusedField === "password" && (
                            <motion.div
                              layoutId="inputBorder"
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

                        {/* Success checkmark */}
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

                    {/* Remember me & Forgot password */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-center justify-between text-sm"
                    >
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 accent-blue-600 cursor-pointer"
                        />
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors">
                          Remember me
                        </span>
                      </label>
                      <button
                        type="button"
                        className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </motion.div>

                    {/* Enhanced Login Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 30, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.9, type: "spring" }}
                    >
                      <motion.button
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: "0 20px 60px rgba(59, 130, 246, 0.5)",
                        }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={isLoading}
                        className="relative w-full py-5 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl"
                      >
                        {/* Animated gradient background */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
                          animate={{
                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          style={{ backgroundSize: "200% auto" }}
                        />

                        {/* Multiple shimmer effects */}
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
                        
                        {/* Button content */}
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
                                Authenticating...
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
                                🔐
                              </motion.span>
                              LOGIN TO DASHBOARD
                            </>
                          )}
                        </span>

                        {/* Glow effect */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: "radial-gradient(circle at center, rgba(255,255,255,0.2), transparent 70%)",
                          }}
                        />
                      </motion.button>
                    </motion.div>
                  </form>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm text-center font-medium bg-red-50 dark:bg-red-900/20 py-3 px-4 border border-red-200 dark:border-red-800 mt-4"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sign up link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400"
                  >
                    Don't have an account yet?{" "}
                    <button 
                      type="button"
                      onClick={onSwitchToSignup}
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                    >
                      Sign up now
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Enhanced Decorative elements */}
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br from-blue-500/40 to-cyan-500/40 blur-3xl pointer-events-none"
              />
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-32 -left-32 w-64 h-64 bg-gradient-to-br from-purple-500/40 to-pink-500/40 blur-3xl pointer-events-none"
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
