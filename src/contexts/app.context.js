import { createContext, useState } from 'react'
import { getAccessToken, getProfile } from '~/utils/auth'

const initialAppContext = {
  isAuththenticated: Boolean(getAccessToken()),
  profile: getProfile(),
  setPorfile: () => {},
  setIsAuthenticated: () => {},
}

export const AppContext = createContext(initialAppContext)

export const AppProvider = ({ children }) => {
  const [isAuththenticated, setIsAuthenticated] = useState(initialAppContext.isAuththenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)

  return (
    <AppContext.Provider value={{ isAuththenticated, setIsAuthenticated, profile, setProfile }}>
      {children}
    </AppContext.Provider>
  )
}
