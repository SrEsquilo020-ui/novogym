import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Dumbbell, Utensils, Activity, Flame, Droplet } from 'lucide-react'
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

  // Se já é premium, redireciona para o dashboard
  if (isPremium) {
    navigate('/dashboard')
    return null
  }

  // Cálculos
  const heightInMeters = userData.height / 100
  const imc = (userData.weight / (heightInMeters * heightInMeters)).toFixed(1)

  // TMB (Taxa Metabólica Basal) - Fórmula Mifflin-St Jeor
  // Para simplificar, usando uma estimativa média (normalmente precisa do sexo)
  const tmb = Math.round(10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5)

  // Proteína diária (2g por kg para ganho de massa, 1.8g para outros objetivos)
  const proteinMultiplier = userData.goal === 'Ganhar massa muscular' ? 2 : 1.8
  const dailyProtein = Math.round(userData.weight * proteinMultiplier)

  // Creatina: 3-5g por dia (padrão)
  const creatine = '3-5g'

  // Whey: baseado na proteína diária
  const wheyServings = Math.round(dailyProtein / 25) // 25g de proteína por dose
  const wheyAmount = `${wheyServings} dose${wheyServings > 1 ? 's' : ''} (${wheyServings * 30}g)`

  // Determinar tipo de treino baseado na preferência
  const getWorkoutType = () => {
    if (userData.workoutPreference !== 'Sem preferência') {
      return userData.workoutPreference
    }
    // Sugestão automática
    if (userData.frequency === '3x por semana') return 'Full Body'
    if (userData.frequency === '4x por semana') return 'A/B'
    if (userData.frequency === '5x por semana') return 'ABC'
    return 'PPL'
  }

  const workoutType = getWorkoutType()

  // Classificação IMC
  const getIMCStatus = (imc: number) => {
    if (imc < 18.5) return { label: 'Abaixo do peso', color: 'text-yellow-400' }
    if (imc < 25) return { label: 'Peso normal', color: 'text-green-400' }
    if (imc < 30) return { label: 'Sobrepeso', color: 'text-orange-400' }
    return { label: 'Obesidade', color: 'text-red-400' }
  }

  const imcStatus = getIMCStatus(parseFloat(imc))

  // Plano alimentar baseado no objetivo
  const getDietSummary = () => {
    if (userData.goal === 'Perder gordura') {
      return {
        calories: `${tmb - 500} kcal`,
        description: 'Déficit calórico para perda de gordura sustentável',
        meals: '5-6 refeições pequenas ao longo do dia'
      }
    } else if (userData.goal === 'Ganhar massa muscular') {
      return {
        calories: `${tmb + 500} kcal`,
        description: 'Superávit calórico para ganho de massa muscular',
        meals: '5-6 refeições com foco em proteínas'
      }
    } else if (userData.goal === 'Definição muscular') {
      return {
        calories: `${tmb - 300} kcal`,
        description: 'Déficit leve para definição mantendo massa muscular',
        meals: '5-6 refeições balanceadas'
      }
    } else {
      return {
        calories: `${tmb} kcal`,
        description: 'Manutenção calórica para seus objetivos',
        meals: '4-5 refeições balanceadas'
      }
    }
  }

  const diet = getDietSummary()

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full">
            <Sparkles className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white">
          Perfeito, {userData.name}! 🎉
        </h1>
        <p className="text-xl text-slate-300">
          Seu plano personalizado está pronto. Veja o resumo:
        </p>
      </div>

      {/* Métricas de Saúde */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/50 to-slate-900/50 border-blue-800">
          <CardContent className="pt-6 text-center">
            <Activity className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Seu IMC</p>
            <p className="text-3xl font-bold text-white mt-1">{imc}</p>
            <p className={`text-sm mt-1 ${imcStatus.color}`}>{imcStatus.label}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-slate-900/50 border-orange-800">
          <CardContent className="pt-6 text-center">
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Taxa Metabólica Basal</p>
            <p className="text-3xl font-bold text-white mt-1">{tmb}</p>
            <p className="text-slate-300 text-sm mt-1">kcal/dia</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-slate-900/50 border-green-800">
          <CardContent className="pt-6 text-center">
            <Droplet className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">Proteína Diária</p>
            <p className="text-3xl font-bold text-white mt-1">{dailyProtein}g</p>
            <p className="text-slate-300 text-sm mt-1">por dia</p>
          </CardContent>
        </Card>
      </div>

      {/* Plano de Treino */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Dumbbell className="h-8 w-8 text-blue-500" />
              <div>
                <CardTitle className="text-2xl text-white">Seu Treino: {workoutType}</CardTitle>
                <p className="text-slate-400 text-sm mt-1">{userData.frequency} • Nível {userData.level}</p>
              </div>
            </div>
            <Badge className="bg-blue-600">Personalizado</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-800/50 rounded-lg p-6 space-y-3">
            <h3 className="text-white font-semibold text-lg">Exemplo de Exercícios:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {['Supino Reto', 'Agachamento Livre', 'Remada Curvada', 'Desenvolvimento', 'Rosca Direta', 'Leg Press'].map((ex, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>{ex}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-lg p-6 backdrop-blur-sm border border-slate-700 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 rounded-lg flex items-center justify-center">
              <p className="text-white font-semibold text-lg">🔒 Séries, repetições e técnicas completas no plano premium</p>
            </div>
            <div className="blur-sm space-y-2 select-none">
              <p className="text-slate-400">• Séries: 4x8-12</p>
              <p className="text-slate-400">• Descanso: 60-90s</p>
              <p className="text-slate-400">• Técnicas avançadas de execução</p>
              <p className="text-slate-400">• Progressão de carga semanal</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plano Alimentar */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Utensils className="h-8 w-8 text-green-500" />
            <div>
              <CardTitle className="text-2xl text-white">Plano Alimentar</CardTitle>
              <p className="text-slate-400 text-sm mt-1">{diet.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm">Calorias Alvo</p>
              <p className="text-2xl font-bold text-white">{diet.calories}</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm">Proteínas</p>
              <p className="text-2xl font-bold text-white">{dailyProtein}g</p>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-slate-400 text-sm">Refeições</p>
              <p className="text-lg font-bold text-white">{diet.meals}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800/50 to-slate-800/30 rounded-lg p-6 backdrop-blur-sm border border-slate-700 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/90 rounded-lg flex items-center justify-center">
              <p className="text-white font-semibold text-lg">🔒 Cardápio completo com receitas no plano premium</p>
            </div>
            <div className="blur-sm space-y-2 select-none">
              <p className="text-slate-400">• Café da manhã: Ovos e aveia</p>
              <p className="text-slate-400">• Almoço: Frango com batata doce</p>
              <p className="text-slate-400">• Jantar: Peixe com legumes</p>
              <p className="text-slate-400">• Lanches: Frutas e castanhas</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suplementação */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            💊 Suplementação Recomendada
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userData.supplements.includes('Whey Protein') && (
              <div className="bg-slate-800/50 rounded-lg p-5">
                <h3 className="text-white font-semibold mb-2">Whey Protein</h3>
                <p className="text-slate-300 text-lg font-bold">{wheyAmount}</p>
                <p className="text-slate-400 text-sm mt-1">Divididas ao longo do dia</p>
              </div>
            )}

            {userData.supplements.includes('Creatina') && (
              <div className="bg-slate-800/50 rounded-lg p-5">
                <h3 className="text-white font-semibold mb-2">Creatina</h3>
                <p className="text-slate-300 text-lg font-bold">{creatine}</p>
                <p className="text-slate-400 text-sm mt-1">Diariamente, qualquer horário</p>
              </div>
            )}

            {userData.supplements.includes('Pré-treino') && (
              <div className="bg-slate-800/50 rounded-lg p-5">
                <h3 className="text-white font-semibold mb-2">Pré-treino</h3>
                <p className="text-slate-300 text-lg font-bold">1 dose</p>
                <p className="text-slate-400 text-sm mt-1">30 min antes do treino</p>
              </div>
            )}

            {userData.supplements.includes('Nenhum') && (
              <div className="bg-slate-800/50 rounded-lg p-5 md:col-span-2">
                <h3 className="text-white font-semibold mb-2">Sugestão de Início</h3>
                <p className="text-slate-300">Recomendamos começar com <strong>Whey Protein</strong> e <strong>Creatina</strong> para melhores resultados.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* CTA Final */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-2xl">
        <CardContent className="pt-8 pb-8 text-center space-y-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-white">
              Desbloqueie Seu Plano Completo Agora!
            </h2>
            <p className="text-xl text-blue-50">
              ✓ Treinos detalhados dia a dia<br />
              ✓ Cardápio completo com receitas<br />
              ✓ Planilhas de acompanhamento<br />
              ✓ Suporte especializado
            </p>
          </div>

          <Button
            size="lg"
            onClick={() => navigate('/planos')}
            className="bg-white text-blue-600 hover:bg-slate-100 text-xl px-12 py-8 font-bold shadow-xl"
          >
            Ver Treino Completo
          </Button>

          <p className="text-blue-50 text-sm">
            ⚡ Mais de 5.000 alunos já transformaram seus corpos
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
