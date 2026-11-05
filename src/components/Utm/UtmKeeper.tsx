import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { ensureDefaultUtms } from '@/helpers/utm'

/**
 * Mantém os parâmetros utm_* presentes na URL em toda a navegação do site.
 */
const UtmKeeper = () => {
  const location = useLocation()

  useEffect(() => {
    ensureDefaultUtms()
  }, [location.pathname, location.search])

  return null
}

export default UtmKeeper
