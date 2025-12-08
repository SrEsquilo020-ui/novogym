import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'
import Goals from '@/pages/Goals'
import Workouts from '@/pages/Workouts'
import WorkoutDetail from '@/pages/WorkoutDetail'
import Nutrition from '@/pages/Nutrition'
import Creatine from '@/pages/Creatine'
import Whey from '@/pages/Whey'
import Progress from '@/pages/Progress'
import Premium from '@/pages/Premium'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="gymfocus-theme">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/workouts/:type" element={<WorkoutDetail />} />
            <Route path="/nutrition" element={<Nutrition />} />
            <Route path="/creatine" element={<Creatine />} />
            <Route path="/whey" element={<Whey />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/premium" element={<Premium />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
