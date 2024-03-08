export const saveAccessToken = (access_token) => {
  localStorage.setItem('access_token', access_token)
}

export const getAccessToken = () => localStorage.getItem('access_token') || ''

export const saveProfile = (profile) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfile = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : {}
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
}
