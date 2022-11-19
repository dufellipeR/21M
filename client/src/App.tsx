import { GlobalStyle } from './styles/GlobalStyle'
import AppRoutes from './routes'
import { ProfileProvider } from './hooks/perfil'
import { FormatProvider } from './hooks/format'
import { CurrencyProvider } from './hooks/currency'

export function App() {
  return (
    <>
      <ProfileProvider>
        <CurrencyProvider>
        <FormatProvider>
          <AppRoutes />
          <GlobalStyle />
        </FormatProvider>
        </CurrencyProvider>
      </ProfileProvider>

    </>
  )
}