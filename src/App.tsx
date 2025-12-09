import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Funnel from '@/pages/Funnel'
import Result from '@/pages/Result'
import Premium from '@/pages/Premium'
import Dashboard from '@/pages/Dashboard'
import Workouts from '@/pages/Workouts'
import WorkoutDetail from '@/pages/WorkoutDetail'
import Nutrition from '@/pages/Nutrition'
import Progress from '@/pages/Progress'

// Componente de proteção de rotas premium
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isPremium } = useAuth()

  if (!isPremium) {
    return <Navigate to="/planos" replace />
  }

  return children
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/funil" element={<Funnel />} />
        <Route path="/resultado" element={<Result />} />
        <Route path="/planos" element={<Premium />} />

        {/* Rotas Premium (Protegidas) */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/workouts" element={
          <ProtectedRoute>
            <Workouts />
          </ProtectedRoute>
        } />
        <Route path="/workouts/:type" element={
          <ProtectedRoute>
            <WorkoutDetail />
          </ProtectedRoute>
        } />
        <Route path="/nutrition" element={
          <ProtectedRoute>
            <Nutrition />
          </ProtectedRoute>
        } />
        <Route path="/progress" element={
          <ProtectedRoute>
            <Progress />
          </ProtectedRoute>
        } />

        {/* Redirecionar rotas antigas para planos */}
        <Route path="/goals" element={<Navigate to="/funil" replace />} />
        <Route path="/creatine" element={<Navigate to="/planos" replace />} />
        <Route path="/whey" element={<Navigate to="/planos" replace />} />
        <Route path="/premium" element={<Navigate to="/planos" replace />} />

        {/* 404 - Redirecionar para home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="gymfocus-theme">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
