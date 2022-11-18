import { GlobalStyle } from './styles/GlobalStyle'
import AppRoutes from './routes'
import { ProfileProvider } from './hooks/perfil'

export function App() {
  return (
    <>
      <ProfileProvider>
        <AppRoutes />
        <GlobalStyle />
      </ProfileProvider>

    </>
  )
}