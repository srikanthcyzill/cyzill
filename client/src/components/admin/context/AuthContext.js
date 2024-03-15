// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** React Router DOM Imports
import { useLocation, useNavigate } from 'react-router-dom'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)

  // ** Hooks
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        try {
          const response = await fetch(authConfig.meEndpoint, {
            headers: {
              Authorization: storedToken
            }
          })
          const data = await response.json()
          setLoading(false)
          setUser({ ...data.userData })
        } catch (error) {
          localStorage.removeItem('userData')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('accessToken')
          setUser(null)
          setLoading(false)
          if (authConfig.onTokenExpiration === 'logout' && !location.pathname.includes('login')) {
            navigate('/login')
          }
        }
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (params, errorCallback) => {
    try {
      const response = await fetch(authConfig.loginEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
      })
      const data = await response.json()
      if (params.rememberMe) {
        window.localStorage.setItem(authConfig.storageTokenKeyName, data.accessToken)
      }
      const returnUrl = location.state?.returnUrl
      setUser({ ...data.userData })
      if (params.rememberMe) {
        window.localStorage.setItem('userData', JSON.stringify(data.userData))
      }
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      navigate(redirectURL)
    } catch (err) {
      if (errorCallback) errorCallback(err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    navigate('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
