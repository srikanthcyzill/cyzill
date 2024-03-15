// ** React Imports
import { useEffect } from 'react'

// ** React Router DOM Imports
import { useLocation, useNavigate } from 'react-router-dom'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import { Spinner } from "@nextui-org/react";
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from '../hooks/useAuth'

// ** Util Import
import getHomeRoute from 'src/layouts/components/acl/getHomeRoute'

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  // ** Hooks
  const auth = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // ** Vars
  let ability
  useEffect(() => {
    if (auth.user && auth.user.role && !guestGuard && location.pathname === '/') {
      const homeRoute = getHomeRoute(auth.user.role)
      navigate(homeRoute)
    }
  }, [auth.user, guestGuard, location])

  // User is logged in, build ability for the user based on his role
  if (auth.user && !ability) {
    ability = buildAbilityFor(auth.user.role, aclAbilities.subject)
    if (location.pathname === '/') {
      return <Spinner />
    }
  }

  // If guest guard or no guard is true or any error page
  if (guestGuard || location.pathname === '/404' || location.pathname === '/500' || !authGuard) {
    // If user is logged in and his ability is built
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    } else {
      // If user is not logged in (render pages like login, register etc..)
      return <>{children}</>
    }
  }

  // Check the access of current user and render pages
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    if (location.pathname === '/') {
      return <Spinner />
    }

    return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard;
