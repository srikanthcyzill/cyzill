// ** React Imports
import { useEffect } from 'react'

// ** React Router DOM Imports
import { useLocation, useNavigate } from 'react-router-dom'

// ** Hooks Import
import { useAuth } from '../hooks/useAuth'

const AuthGuard = props => {
  const { children, fallback } = props
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(
    () => {
      if (auth.user === null && !window.localStorage.getItem('userData')) {
        if (location.pathname !== '/') {
          navigate('/login', { state: { returnUrl: location.pathname } })
        } else {
          navigate('/login')
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  )
  if (auth.loading || auth.user === null) {
    return fallback
  }

  return <>{children}</>
}

export default AuthGuard;
