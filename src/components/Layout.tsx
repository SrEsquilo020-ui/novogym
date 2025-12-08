import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Dumbbell, Target, Flame, Pill, TrendingUp, Crown, Home } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/goals', label: 'Objetivos', icon: Target },
    { path: '/workouts', label: 'Treinos', icon: Dumbbell },
    { path: '/nutrition', label: 'Nutrição', icon: Flame },
    { path: '/creatine', label: 'Creatina', icon: Pill },
    { path: '/whey', label: 'Whey', icon: Pill },
    { path: '/progress', label: 'Progresso', icon: TrendingUp },
    { path: '/premium', label: 'Premium', icon: Crown }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">GymFocus</span>
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/30 backdrop-blur-sm sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Sobre o GymFocus</h3>
              <p className="text-slate-400 text-sm">
                Seu aplicativo completo para treinos de academia, nutrição e suplementação inteligente.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-slate-400 hover:text-blue-400">Início</Link></li>
                <li><Link to="/premium" className="text-slate-400 hover:text-blue-400">Premium</Link></li>
                <li><a href="#" className="text-slate-400 hover:text-blue-400">Privacidade</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Contato</h3>
              <p className="text-slate-400 text-sm mb-2">contato@gymfocus.com</p>
              <div className="flex gap-3">
                <a href="#" className="text-slate-400 hover:text-blue-400">Instagram</a>
                <a href="#" className="text-slate-400 hover:text-blue-400">Twitter</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            © 2025 GymFocus. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
