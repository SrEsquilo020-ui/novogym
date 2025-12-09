import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lock, Sparkles, Dumbbell, Utensils, TrendingUp } from 'lucide-react'
import { useEffect } from 'react'

export default function Result() {
  const navigate = useNavigate()
  const { userData, isPremium } = useAuth()

  useEffect(() => {
    if (!userData) {
      navigate('/funil')
    }
  }, [userData, navigate])

  if (!userData) {
    return null
  }

  // Se já é premium, redireciona para o conteúdo completo
  if (isPremium) {
    navigate('/dashboard')
    return null
  }

  const getWorkoutPreview = () => {
    if (userData.goal === 'ganho_massa') {
      return {
        type: 'Push/Pull/Legs',
        description: 'Treino focado em hipertrofia e ganho de massa muscular',
        exercises: ['Supino Reto', 'Desenvolvimento', 'Tríceps Testa'],
        image: '🏋️'
      }
    } else if (userData.goal === 'emagrecimento') {
      return {
        type: 'Treino Metabólico',
        description: 'Treino de alta intensidade para queima de gordura',
        exercises: ['Circuito HIIT', 'Agachamento Jump', 'Burpees'],
        image: '🔥'
      }
    } else if (userData.goal === 'definicao') {
      return {
        type: 'Treino de Definição',
        description: 'Combinação de musculação e cardio para definir',
        exercises: ['Supino Inclinado', 'Rosca Direta', 'Cardio Intervalado'],
        image: '💪'
      }
    } else {
      return {
        type: 'Treino Funcional',
        description: 'Treino para condicionamento físico geral',
        exercises: ['Agachamento', 'Flexões', 'Prancha'],
        image: '⚡'
      }
    }
  }

  const workout = getWorkoutPreview()

  const getDietPreview = () => {
    if (userData.goal === 'ganho_massa') {
      return {
        calories: '3000-3500',
        protein: '150-180g',
        meals: ['Café da manhã rico em proteína', 'Almoço com carboidratos', 'Jantar balanceado']
      }
    } else if (userData.goal === 'emagrecimento') {
      return {
        calories: '1800-2200',
        protein: '120-150g',
        meals: ['Café leve e nutritivo', 'Almoço com vegetais', 'Jantar leve']
      }
    } else {
      return {
        calories: '2200-2500',
        protein: '130-160g',
        meals: ['Café completo', 'Almoço balanceado', 'Jantar moderado']
      }
    }
  }

  const diet = getDietPreview()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white">
          Olá, {userData.name}! 👋
        </h1>
        <p className="text-xl text-slate-300">
          Seu treino personalizado está pronto!
        </p>
      </div>

      {/* User Info */}
      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-slate-800">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-slate-400 text-sm">Objetivo</p>
              <p className="text-white font-semibold capitalize">{userData.goal.replace('_', ' ')}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">Nível</p>
              <p className="text-white font-semibold capitalize">{userData.level}</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">Frequência</p>
              <p className="text-white font-semibold">{userData.frequency}x/semana</p>
            </div>
            <div className="text-center">
              <p className="text-slate-400 text-sm">Sexo</p>
              <p className="text-white font-semibold capitalize">{userData.gender}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workout Preview */}
      <Card className="bg-slate-900/50 border-slate-800 relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <Badge className="bg-yellow-600 text-white">
            <Lock className="h-3 w-3 mr-1" />
            Prévia
          </Badge>
        </div>
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="text-4xl">{workout.image}</div>
            <div>
              <CardTitle className="text-2xl text-white">{workout.type}</CardTitle>
              <p className="text-slate-400 text-sm mt-1">{workout.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Dumbbell className="h-5 w-5 text-blue-500" />
              <p className="text-white font-semibold">Exercícios inclusos:</p>
            </div>
            {workout.exercises.map((exercise, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg">
                <span className="text-blue-500">•</span>
                <span className="text-white">{exercise}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2 backdrop-blur-sm relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Lock className="h-8 w-8 text-slate-400 mx-auto" />
                <p className="text-slate-300 font-semibold">Conteúdo Bloqueado</p>
              </div>
            </div>
            <p className="text-slate-500 blur-sm">• Séries e repetições detalhadas</p>
            <p className="text-slate-500 blur-sm">• Tempo de descanso</p>
            <p className="text-slate-500 blur-sm">• Técnicas de execução</p>
            <p className="text-slate-500 blur-sm">• Vídeos demonstrativos</p>
            <p className="text-slate-500 blur-sm">• Progressão de carga</p>
          </div>
        </CardContent>
      </Card>

      {/* Diet Preview */}
      <Card className="bg-slate-900/50 border-slate-800 relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <Badge className="bg-yellow-600 text-white">
            <Lock className="h-3 w-3 mr-1" />
            Prévia
          </Badge>
        </div>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Utensils className="h-8 w-8 text-green-500" />
            <CardTitle className="text-2xl text-white">Plano Alimentar</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-slate-400 text-sm">Calorias diárias</p>
              <p className="text-white font-semibold text-lg">{diet.calories}</p>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <p className="text-slate-400 text-sm">Proteína</p>
              <p className="text-white font-semibold text-lg">{diet.protein}</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-white font-semibold">Refeições incluídas:</p>
            {diet.meals.map((meal, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg">
                <span className="text-green-500">•</span>
                <span className="text-white">{meal}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-2 backdrop-blur-sm relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 flex items-center justify-center">
              <div className="text-center space-y-2">
                <Lock className="h-8 w-8 text-slate-400 mx-auto" />
                <p className="text-slate-300 font-semibold">Conteúdo Bloqueado</p>
              </div>
            </div>
            <p className="text-slate-500 blur-sm">• Receitas completas</p>
            <p className="text-slate-500 blur-sm">• Lista de compras</p>
            <p className="text-slate-500 blur-sm">• Horários das refeições</p>
            <p className="text-slate-500 blur-sm">• Opções de substituição</p>
          </div>
        </CardContent>
      </Card>

      {/* Features Preview */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <CardTitle className="text-2xl text-white">Também Incluído</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg space-y-2">
              <p className="text-white font-semibold">📊 Acompanhamento de Progresso</p>
              <p className="text-slate-400 text-sm">Registre seus treinos e evolução</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg space-y-2">
              <p className="text-white font-semibold">💊 Calculadora de Suplementos</p>
              <p className="text-slate-400 text-sm">Whey, Creatina e muito mais</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg space-y-2">
              <p className="text-white font-semibold">🎥 Vídeos Demonstrativos</p>
              <p className="text-slate-400 text-sm">Aprenda a execução correta</p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg space-y-2">
              <p className="text-white font-semibold">📱 Suporte Exclusivo</p>
              <p className="text-slate-400 text-sm">Tire dúvidas com especialistas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA Button */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
        <CardContent className="pt-6 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Desbloqueie Seu Treino Completo Agora!
          </h2>
          <p className="text-blue-100">
            Acesse treinos detalhados, planos alimentares completos e muito mais
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/planos')}
            className="bg-white text-blue-600 hover:bg-slate-100 text-lg px-8 py-6 font-bold"
          >
            Ver Planos e Desbloquear
          </Button>
          <p className="text-blue-100 text-sm">
            ⚡ Oferta especial: Primeiro mês com desconto
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
