import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Dumbbell, Zap } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const { isPremium } = useAuth()

  // Se já é premium, vai pro dashboard
  useEffect(() => {
    if (isPremium) {
      navigate('/dashboard')
    }
  }, [isPremium, navigate])

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-4xl mx-auto text-center space-y-12 px-4">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full shadow-2xl">
            <Dumbbell className="h-20 w-20 text-white" />
          </div>
        </div>

        {/* Título Principal */}
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight">
            Tudo que você precisa
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              em um só lugar
            </span>
          </h1>

          <p className="text-2xl text-slate-300 max-w-2xl mx-auto">
            Treino personalizado + dieta completa + suplementação inteligente
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-8">
          <Button
            size="lg"
            onClick={() => navigate('/funil')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl px-12 py-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
          >
            <Zap className="mr-3 h-6 w-6" />
            Começar Minha Jornada
          </Button>
        </div>

        {/* Benefícios Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-blue-500">100%</div>
            <div className="text-slate-300">Personalizado</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-purple-500">2 min</div>
            <div className="text-slate-300">Para começar</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-500">+5000</div>
            <div className="text-slate-300">Alunos ativos</div>
          </div>
        </div>
      </div>
    </div>
  )
}
