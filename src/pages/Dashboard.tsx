import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dumbbell, Utensils, TrendingUp, Crown, Calendar, Target, Zap } from 'lucide-react'
import { useEffect } from 'react'

export default function Dashboard() {
  const navigate = useNavigate()
  const { isPremium, userData } = useAuth()

  useEffect(() => {
    if (!isPremium) {
      navigate('/planos')
    }
  }, [isPremium, navigate])

  if (!isPremium) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Olá, {userData?.name || 'Atleta'}! 👋
          </h1>
          <p className="text-slate-400 mt-2">Bem-vindo ao seu painel premium</p>
        </div>
        <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-0 px-4 py-2">
          <Crown className="h-4 w-4 mr-1" />
          Premium
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Treinos esta semana</p>
                <p className="text-3xl font-bold text-white mt-1">4/5</p>
              </div>
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Dumbbell className="h-8 w-8 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-slate-900/50 border-green-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Calorias hoje</p>
                <p className="text-3xl font-bold text-white mt-1">2.450</p>
              </div>
              <div className="p-3 bg-green-600/20 rounded-lg">
                <Utensils className="h-8 w-8 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-slate-900/50 border-purple-800">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Progresso</p>
                <p className="text-3xl font-bold text-white mt-1">+3kg</p>
              </div>
              <div className="p-3 bg-purple-600/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-600 transition-colors cursor-pointer" onClick={() => navigate('/workouts')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-600/20 rounded-lg">
                <Dumbbell className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">Meus Treinos</CardTitle>
                <p className="text-slate-400 text-sm mt-1">Acesse seu plano de treino personalizado</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Ver Treinos Completos
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 hover:border-green-600 transition-colors cursor-pointer" onClick={() => navigate('/nutrition')}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-600/20 rounded-lg">
                <Utensils className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-2xl text-white">Plano Alimentar</CardTitle>
                <p className="text-slate-400 text-sm mt-1">Dieta personalizada para seu objetivo</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Ver Dieta Completa
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Workout of the Day */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-2xl text-white">Treino de Hoje</CardTitle>
            </div>
            <Badge className="bg-blue-600">Dia 1 - Push</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {['Supino Reto - 4x8-12', 'Supino Inclinado - 3x10-12', 'Desenvolvimento - 4x8-12', 'Elevação Lateral - 3x12-15', 'Tríceps Testa - 3x10-12'].map((exercise, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span className="text-white">{exercise}</span>
                </div>
                <Zap className="h-5 w-5 text-slate-500" />
              </div>
            ))}
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/workouts')}>
            Iniciar Treino
          </Button>
        </CardContent>
      </Card>

      {/* Goal Progress */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-purple-500" />
            <CardTitle className="text-2xl text-white">Seu Objetivo</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Meta: {userData?.goal?.replace('_', ' ')}</span>
              <span className="text-white font-semibold">75%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
          <p className="text-slate-300 text-sm">
            Você está progredindo muito bem! Continue assim e alcançará seu objetivo em breve.
          </p>
          <Button variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800" onClick={() => navigate('/progress')}>
            Ver Progresso Detalhado
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
