import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface UserData {
  name: string
  age: number
  weight: number
  height: number
  goal: string
  frequency: string
  level: string
  workoutPreference: string
  supplements: string[]
}

interface AuthContextType {
  isPremium: boolean
  userData: UserData | null
  setUserData: (data: UserData) => void
  activatePremium: () => void
  resetUserData: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isPremium, setIsPremium] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('gymfocus_premium') === 'true'
    }
    return false
  })

  const [userData, setUserDataState] = useState<UserData | null>(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem('gymfocus_userdata')
      if (savedData) {
        try {
          return JSON.parse(savedData)
        } catch (e) {
          console.error('Erro ao carregar dados do usuário')
        }
      }
    }
    return null
  })

  const setUserData = (data: UserData) => {
    setUserDataState(data)
    if (typeof window !== 'undefined') {
      localStorage.setItem('gymfocus_userdata', JSON.stringify(data))
    }
  }

  const activatePremium = () => {
    setIsPremium(true)
    if (typeof window !== 'undefined') {
      localStorage.setItem('gymfocus_premium', 'true')
    }
  }

  const resetUserData = () => {
    setUserDataState(null)
    setIsPremium(false)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('gymfocus_userdata')
      localStorage.removeItem('gymfocus_premium')
    }
  }

  return (
    <AuthContext.Provider value={{ isPremium, userData, setUserData, activatePremium, resetUserData }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
