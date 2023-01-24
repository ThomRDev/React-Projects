import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes'
import { useCheckAuth } from '../hooks'
import { JournalRoutes } from '../journal/routes/JournalRoutes'
import { AUTH_STATUS } from '../store/auth'
import { CheckingAuth } from '../ui'

export const AppRouter = () => {

  const status = useCheckAuth()

  if(status === AUTH_STATUS.CHECKING) {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        status === AUTH_STATUS.AUTHENTICATED ?
          <Route path='/*' element={<JournalRoutes />} /> : <Route path='/auth/*' element={<AuthRoutes />} /> 
      }
      <Route path='/*' element={ <Navigate to='/auth/login' />  } />
      {/* login y registro */}
      {/* <Route path='/auth/*' element={<AuthRoutes />} /> */}

      {/* JournalApp */}
      {/* <Route path='/*' element={<JournalRoutes />} /> */}

    </Routes>
  )
}
