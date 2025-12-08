import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Dumbbell, Target, Calculator, TrendingUp, Zap, Users } from 'lucide-react'

export default function Home() {
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
          <Link to="/goals">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
              <Zap className="mr-2 h-5 w-5" />
              Começar Agora
            </Button>
          </Link>

          <Link to="/premium">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-slate-600 text-white hover:bg-slate-800">
              Ver Premium
            </Button>
          </Link>
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

      {/* Quick Access */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-white">Acesso Rápido</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/workouts">
            <Card className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-slate-800 hover:border-blue-600 transition-all hover:scale-105 cursor-pointer">
              <CardContent className="pt-6 text-center space-y-3">
                <Dumbbell className="h-12 w-12 text-blue-500 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Treinos</h3>
                <p className="text-slate-300">Encontre o treino ideal para você</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/nutrition">
            <Card className="bg-gradient-to-br from-green-900/50 to-slate-900/50 border-slate-800 hover:border-green-600 transition-all hover:scale-105 cursor-pointer">
              <CardContent className="pt-6 text-center space-y-3">
                <Calculator className="h-12 w-12 text-green-500 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Nutrição</h3>
                <p className="text-slate-300">Calcule suas calorias e proteínas</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/progress">
            <Card className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 border-slate-800 hover:border-purple-600 transition-all hover:scale-105 cursor-pointer">
              <CardContent className="pt-6 text-center space-y-3">
                <TrendingUp className="h-12 w-12 text-purple-500 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Progresso</h3>
                <p className="text-slate-300">Acompanhe sua evolução</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-12 text-center space-y-6 border border-slate-800">
        <Users className="h-16 w-16 text-blue-500 mx-auto" />
        <h2 className="text-3xl font-bold text-white">
          Pronto para transformar seu corpo?
        </h2>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Junte-se a milhares de pessoas que já alcançaram seus objetivos com o GymFocus
        </p>
        <Link to="/goals">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6">
            Começar Minha Jornada
          </Button>
        </Link>
      </section>
    </div>
  )
}
