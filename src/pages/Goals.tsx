import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, TrendingUp, Flame, Dumbbell, Check } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type Goal = 'mass' | 'lose' | 'definition' | 'strength'

export default function Goals() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const navigate = useNavigate()
  const { toast } = useToast()

  const goals = [
    {
      id: 'mass' as Goal,
      icon: TrendingUp,
      title: 'Ganhar Massa Muscular',
      description: 'Aumentar volume muscular e força',
      color: 'from-blue-600 to-blue-800',
      borderColor: 'border-blue-600'
    },
    {
      id: 'lose' as Goal,
      icon: Flame,
      title: 'Emagrecer',
      description: 'Perder gordura corporal',
      color: 'from-red-600 to-red-800',
      borderColor: 'border-red-600'
    },
    {
      id: 'definition' as Goal,
      icon: Target,
      title: 'Definição',
      description: 'Definir músculos e perder gordura',
      color: 'from-purple-600 to-purple-800',
      borderColor: 'border-purple-600'
    },
    {
      id: 'strength' as Goal,
      icon: Dumbbell,
      title: 'Força',
      description: 'Aumentar força máxima',
      color: 'from-orange-600 to-orange-800',
      borderColor: 'border-orange-600'
    }
  ]

  const handleSelectGoal = (goalId: Goal) => {
    setSelectedGoal(goalId)
  }

  const handleContinue = () => {
    if (!selectedGoal) {
      toast({
        title: "Selecione um objetivo",
        description: "Por favor, escolha seu objetivo principal antes de continuar.",
        variant: "destructive"
      })
      return
    }

    // Salvar objetivo no localStorage
    localStorage.setItem('gymfocus-goal', selectedGoal)

    toast({
      title: "Objetivo salvo!",
      description: "Vamos personalizar sua experiência com base nisso."
    })

    // Redirecionar para treinos
    setTimeout(() => {
      navigate('/workouts')
    }, 1000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Qual é seu objetivo principal?</h1>
        <p className="text-xl text-slate-400">
          Vamos personalizar treinos e nutrição com base na sua meta
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const Icon = goal.icon
          const isSelected = selectedGoal === goal.id

          return (
            <Card
              key={goal.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                isSelected
                  ? `border-2 ${goal.borderColor} bg-gradient-to-br ${goal.color}/20`
                  : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
              }`}
              onClick={() => handleSelectGoal(goal.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${goal.color}`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  {isSelected && (
                    <div className="p-1 bg-green-600 rounded-full">
                      <Check className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-2xl text-white mt-4">{goal.title}</CardTitle>
                <CardDescription className="text-slate-400 text-base">
                  {goal.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-slate-400">
                  {goal.id === 'mass' && (
                    <>
                      <p>• Treinos com foco em hipertrofia</p>
                      <p>• Superávit calórico</p>
                      <p>• Alta ingestão de proteínas</p>
                    </>
                  )}
                  {goal.id === 'lose' && (
                    <>
                      <p>• Treinos combinados com cardio</p>
                      <p>• Déficit calórico controlado</p>
                      <p>• Manutenção de massa muscular</p>
                    </>
                  )}
                  {goal.id === 'definition' && (
                    <>
                      <p>• Treinos de alta intensidade</p>
                      <p>• Déficit calórico moderado</p>
                      <p>• Alta proteína para preservar músculos</p>
                    </>
                  )}
                  {goal.id === 'strength' && (
                    <>
                      <p>• Treinos com cargas pesadas</p>
                      <p>• Foco em exercícios compostos</p>
                      <p>• Descanso adequado entre séries</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={!selectedGoal}
          className="bg-blue-600 hover:bg-blue-700 text-lg px-12 py-6"
        >
          Continuar
        </Button>
      </div>

      {selectedGoal && (
        <Card className="bg-blue-900/20 border-blue-800">
          <CardContent className="pt-6">
            <p className="text-center text-slate-300">
              <strong className="text-blue-400">Dica:</strong> Seu objetivo pode ser ajustado a qualquer momento.
              Vamos usar isso para recomendar os melhores treinos e cálculos nutricionais para você!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
