import { createContext, useState } from 'react'

const initialAppContext = {
  isAuthtenticated: false,
}

export const AppContext = createContext(initialAppContext)

export const AppProvider = ({ children }) => {
  const [isAuthtenticated, setIsAuthtenticated] = useState(false)

  return <AppContext.Provider value={{ isAuthtenticated }}>{children}</AppContext.Provider>
}
