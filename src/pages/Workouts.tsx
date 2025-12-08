import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dumbbell, Clock, Calendar, Users, Zap } from 'lucide-react'

export default function Workouts() {
  const workouts = [
    {
      id: 'fullbody',
      title: 'Fullbody',
      description: 'Treino de corpo inteiro em uma sessão',
      frequency: '1-3x por semana',
      duration: '60-90 min',
      level: 'Iniciante',
      benefits: ['Ideal para iniciantes', 'Menos frequência', 'Trabalha corpo todo']
    },
    {
      id: 'abc',
      title: 'ABC',
      description: 'Divisão em 3 grupos musculares',
      frequency: '3-6x por semana',
      duration: '50-70 min',
      level: 'Intermediário',
      benefits: ['Mais volume por grupo', 'Flexível', 'Boa recuperação']
    },
    {
      id: 'abcd',
      title: 'ABCD',
      description: 'Divisão em 4 grupos musculares',
      frequency: '4-6x por semana',
      duration: '45-60 min',
      level: 'Intermediário',
      benefits: ['Alto volume', 'Foco específico', 'Mais frequência']
    },
    {
      id: 'ppl',
      title: 'Push/Pull/Legs',
      description: 'Empurrar, puxar e pernas',
      frequency: '3-6x por semana',
      duration: '60-80 min',
      level: 'Intermediário',
      benefits: ['Muito popular', 'Balanceado', 'Alta frequência']
    },
    {
      id: 'feminine',
      title: 'Treino Feminino',
      description: 'Ênfase em glúteos e pernas',
      frequency: '4-5x por semana',
      duration: '50-70 min',
      level: 'Todos',
      benefits: ['Foco inferior', 'Desenvolve glúteos', 'Tonificação']
    },
    {
      id: 'quick',
      title: 'Treinos Rápidos',
      description: 'Sessões otimizadas para pouco tempo',
      frequency: '3-5x por semana',
      duration: '30-40 min',
      level: 'Todos',
      benefits: ['Economia de tempo', 'Alta intensidade', 'Eficiente']
    }
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return 'bg-green-600'
      case 'Intermediário':
        return 'bg-blue-600'
      case 'Avançado':
        return 'bg-purple-600'
      default:
        return 'bg-slate-600'
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Escolha seu Treino</h1>
        <p className="text-xl text-slate-400">
          Encontre o programa de treino ideal para seu objetivo e disponibilidade
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout) => (
          <Link key={workout.id} to={`/workouts/${workout.id}`}>
            <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-blue-600 transition-all hover:scale-105 cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Dumbbell className="h-8 w-8 text-blue-500" />
                  <Badge className={getLevelColor(workout.level)}>
                    {workout.level}
                  </Badge>
                </div>
                <CardTitle className="text-2xl text-white">{workout.title}</CardTitle>
                <CardDescription className="text-slate-400">
                  {workout.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Calendar className="h-4 w-4" />
                    <span>{workout.frequency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span>{workout.duration}</span>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-2">
                  <p className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Benefícios:
                  </p>
                  <ul className="space-y-1">
                    {workout.benefits.map((benefit, index) => (
                      <li key={index} className="text-sm text-slate-400 flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-slate-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Users className="h-6 w-6 text-blue-500 mt-1" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Não sabe qual escolher?</h3>
              <p className="text-slate-300">
                <strong>Iniciantes:</strong> Comece com Fullbody ou Treinos Rápidos<br />
                <strong>Intermediários:</strong> ABC ou Push/Pull/Legs são ótimas opções<br />
                <strong>Pouco tempo:</strong> Treinos Rápidos são perfeitos para você
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
