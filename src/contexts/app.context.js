import { createContext, useState } from 'react'
import { getAccessToken, getProfile } from '~/utils/auth'

const initialAppContext = {
  isAuththenticated: Boolean(getAccessToken()),
  profile: getProfile(),
  setPorfile: () => {},
  setIsAuthenticated: () => {},
  userId: '',
  setUserId: () => {},
}

export const AppContext = createContext(initialAppContext)

export const AppProvider = ({ children }) => {
  const [isAuththenticated, setIsAuthenticated] = useState(initialAppContext.isAuththenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)
  const [userId, setUserId] = useState('')

  return (
    <AppContext.Provider
      value={{ isAuththenticated, setIsAuthenticated, profile, setProfile, userId, setUserId }}
    >
      {children}
    </AppContext.Provider>
  )
}
