import { ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Dumbbell, LayoutDashboard, Flame, TrendingUp, Crown, Home, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { isPremium, resetUserData } = useAuth()

  // Navegação premium (apenas para quem pagou)
  const premiumNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/workouts', label: 'Treinos', icon: Dumbbell },
    { path: '/nutrition', label: 'Nutrição', icon: Flame },
    { path: '/progress', label: 'Progresso', icon: TrendingUp }
  ]

  const handleLogout = () => {
    resetUserData()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">GymFocus</span>
            </Link>

            {isPremium && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full">
                  <Crown className="h-4 w-4 text-white" />
                  <span className="text-white text-sm font-semibold">Premium</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-white"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Navigation - Apenas para Premium */}
      {isPremium && (
        <nav className="border-b border-slate-800 bg-slate-900/30 backdrop-blur-sm sticky top-[73px] z-40">
          <div className="container mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2">
              {premiumNavItems.map((item) => {
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
      )}

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
                <li><Link to="/planos" className="text-slate-400 hover:text-blue-400">Planos</Link></li>
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
