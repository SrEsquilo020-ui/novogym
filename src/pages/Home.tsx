import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dumbbell, Target, Calculator, TrendingUp, Zap, Crown } from 'lucide-react'
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
  const features = [
    {
      icon: Dumbbell,
      title: 'Treinos Personalizados',
      description: 'Fullbody, ABC, PPL e muito mais'
    },
    {
      icon: Calculator,
      title: 'Cálculos Inteligentes',
      description: 'Calorias, proteínas e suplementos'
    },
    {
      icon: Target,
      title: 'Objetivos Claros',
      description: 'Ganho de massa, emagrecimento ou definição'
    },
    {
      icon: TrendingUp,
      title: 'Acompanhamento',
      description: 'Registre seu progresso e evolução'
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-12">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-600/20 rounded-full">
            <Dumbbell className="h-16 w-16 text-blue-500" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-white">
          Bem-vindo ao <span className="text-blue-500">GymFocus</span>
        </h1>

        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Treinos de academia + nutrição básica + cálculo inteligente de suplementos.
        </p>

        <div className="flex gap-4 justify-center pt-4">
          <Button
            size="lg"
            onClick={() => navigate('/funil')}
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
          >
            <Zap className="mr-2 h-5 w-5" />
            Começar Agora
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate('/planos')}
            className="text-lg px-8 py-6 border-slate-600 text-white hover:bg-slate-800"
          >
            <Crown className="mr-2 h-5 w-5" />
            Ver Planos
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center text-white">
          Tudo que você precisa em um só lugar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-slate-900/50 border-slate-800 hover:border-blue-600 transition-colors">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="flex justify-center">
                    <div className="p-3 bg-blue-600/20 rounded-lg">
                      <Icon className="h-8 w-8 text-blue-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Como Funciona */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Como Funciona</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-slate-800">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-2xl font-bold text-white">Responda o Funil</h3>
              <p className="text-slate-300">Conte-nos seus objetivos e preferências</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/50 to-slate-900/50 border-slate-800">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-2xl font-bold text-white">Veja a Prévia</h3>
              <p className="text-slate-300">Receba uma amostra do seu treino personalizado</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 border-slate-800">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-2xl font-bold text-white">Desbloqueie Tudo</h3>
              <p className="text-slate-300">Assine e tenha acesso completo</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-12 text-center space-y-6 border border-slate-800">
        <Target className="h-16 w-16 text-blue-500 mx-auto" />
        <h2 className="text-3xl font-bold text-white">
          Pronto para transformar seu corpo?
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Crie seu treino personalizado em menos de 2 minutos
        </p>
        <Button
          size="lg"
          onClick={() => navigate('/funil')}
          className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
        >
          <Zap className="mr-2 h-5 w-5" />
          Começar Agora Grátis
        </Button>
      </section>
    </div>
  )
}
