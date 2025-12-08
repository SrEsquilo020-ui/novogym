import { useParams, Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Info } from 'lucide-react'

export default function WorkoutDetail() {
  const { type } = useParams<{ type: string }>()

  const workoutData: Record<string, any> = {
    fullbody: {
      title: 'Treino Fullbody',
      description: 'Treino completo de corpo inteiro',
      days: [
        {
          name: 'Treino A - Corpo Inteiro',
          exercises: [
            { name: 'Agachamento Livre', sets: '4x', reps: '8-12', notes: 'Exercício composto principal' },
            { name: 'Supino Reto', sets: '4x', reps: '8-12', notes: 'Peito, ombros e tríceps' },
            { name: 'Puxada Frontal', sets: '4x', reps: '8-12', notes: 'Costas e bíceps' },
            { name: 'Desenvolvimento com Halteres', sets: '3x', reps: '10-12', notes: 'Ombros' },
            { name: 'Rosca Direta', sets: '3x', reps: '10-12', notes: 'Bíceps' },
            { name: 'Tríceps Pulley', sets: '3x', reps: '10-12', notes: 'Tríceps' },
            { name: 'Prancha', sets: '3x', reps: '30-60s', notes: 'Core/abdômen' }
          ]
        }
      ]
    },
    abc: {
      title: 'Treino ABC',
      description: 'Divisão em 3 grupos musculares',
      days: [
        {
          name: 'Treino A - Peito e Tríceps',
          exercises: [
            { name: 'Supino Reto', sets: '4x', reps: '8-12', notes: 'Exercício principal' },
            { name: 'Supino Inclinado', sets: '3x', reps: '10-12', notes: 'Parte superior do peito' },
            { name: 'Crucifixo', sets: '3x', reps: '12-15', notes: 'Isolamento do peito' },
            { name: 'Tríceps Testa', sets: '3x', reps: '10-12', notes: 'Tríceps' },
            { name: 'Tríceps Corda', sets: '3x', reps: '12-15', notes: 'Tríceps' }
          ]
        },
        {
          name: 'Treino B - Costas e Bíceps',
          exercises: [
            { name: 'Barra Fixa', sets: '4x', reps: '6-10', notes: 'Ou puxada frontal' },
            { name: 'Remada Curvada', sets: '4x', reps: '8-12', notes: 'Costas' },
            { name: 'Remada Cavalinho', sets: '3x', reps: '10-12', notes: 'Costas média' },
            { name: 'Rosca Direta', sets: '3x', reps: '10-12', notes: 'Bíceps' },
            { name: 'Rosca Martelo', sets: '3x', reps: '10-12', notes: 'Bíceps e antebraço' }
          ]
        },
        {
          name: 'Treino C - Pernas e Ombros',
          exercises: [
            { name: 'Agachamento Livre', sets: '4x', reps: '8-12', notes: 'Exercício principal' },
            { name: 'Leg Press', sets: '3x', reps: '10-15', notes: 'Pernas' },
            { name: 'Cadeira Extensora', sets: '3x', reps: '12-15', notes: 'Quadríceps' },
            { name: 'Cadeira Flexora', sets: '3x', reps: '12-15', notes: 'Posteriores' },
            { name: 'Desenvolvimento', sets: '4x', reps: '8-12', notes: 'Ombros' },
            { name: 'Elevação Lateral', sets: '3x', reps: '12-15', notes: 'Ombros laterais' }
          ]
        }
      ]
    },
    abcd: {
      title: 'Treino ABCD',
      description: 'Divisão em 4 grupos musculares',
      days: [
        {
          name: 'Treino A - Peito',
          exercises: [
            { name: 'Supino Reto', sets: '4x', reps: '8-12', notes: '' },
            { name: 'Supino Inclinado', sets: '4x', reps: '8-12', notes: '' },
            { name: 'Crucifixo Inclinado', sets: '3x', reps: '12-15', notes: '' },
            { name: 'Crossover', sets: '3x', reps: '12-15', notes: '' }
          ]
        },
        {
          name: 'Treino B - Costas',
          exercises: [
            { name: 'Barra Fixa', sets: '4x', reps: '6-10', notes: '' },
            { name: 'Remada Curvada', sets: '4x', reps: '8-12', notes: '' },
            { name: 'Puxada Frontal', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Remada Cavalinho', sets: '3x', reps: '10-12', notes: '' }
          ]
        },
        {
          name: 'Treino C - Pernas',
          exercises: [
            { name: 'Agachamento Livre', sets: '4x', reps: '8-12', notes: '' },
            { name: 'Leg Press', sets: '4x', reps: '10-15', notes: '' },
            { name: 'Cadeira Extensora', sets: '3x', reps: '12-15', notes: '' },
            { name: 'Cadeira Flexora', sets: '3x', reps: '12-15', notes: '' },
            { name: 'Panturrilha', sets: '4x', reps: '15-20', notes: '' }
          ]
        },
        {
          name: 'Treino D - Ombros e Braços',
          exercises: [
            { name: 'Desenvolvimento', sets: '4x', reps: '8-12', notes: 'Ombros' },
            { name: 'Elevação Lateral', sets: '3x', reps: '12-15', notes: 'Ombros' },
            { name: 'Rosca Direta', sets: '3x', reps: '10-12', notes: 'Bíceps' },
            { name: 'Rosca Martelo', sets: '3x', reps: '10-12', notes: 'Bíceps' },
            { name: 'Tríceps Testa', sets: '3x', reps: '10-12', notes: 'Tríceps' },
            { name: 'Tríceps Corda', sets: '3x', reps: '12-15', notes: 'Tríceps' }
          ]
        }
      ]
    },
    ppl: {
      title: 'Push/Pull/Legs',
      description: 'Empurrar, puxar e pernas',
      days: [
        {
          name: 'Push - Peito, Ombros e Tríceps',
          exercises: [
            { name: 'Supino Reto', sets: '4x', reps: '8-12', notes: '' },
            { name: 'Supino Inclinado', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Desenvolvimento', sets: '4x', reps: '8-12', notes: '' },
            { name: 'Elevação Lateral', sets: '3x', reps: '12-15', notes: '' },
            { name: 'Tríceps Testa', sets: '3x', reps: '10-12', notes: '' }
          ]
        },
        {
          name: 'Pull - Costas e Bíceps',
          exercises: [
            { name: 'Barra Fixa', sets: '4x', reps: '6-10', notes: '' },
            { name: 'Remada Curvada', sets: '4x', reps: '8-12', notes: '' },
            { name: 'Puxada Frontal', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Rosca Direta', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Rosca Martelo', sets: '3x', reps: '10-12', notes: '' }
          ]
        },
        {
          name: 'Legs - Pernas Completo',
          exercises: [
            { name: 'Agachamento Livre', sets: '4x', reps: '8-12', notes: '' },
            { name: 'Leg Press', sets: '4x', reps: '10-15', notes: '' },
            { name: 'Cadeira Extensora', sets: '3x', reps: '12-15', notes: '' },
            { name: 'Cadeira Flexora', sets: '3x', reps: '12-15', notes: '' },
            { name: 'Panturrilha', sets: '4x', reps: '15-20', notes: '' }
          ]
        }
      ]
    },
    feminine: {
      title: 'Treino Feminino',
      description: 'Ênfase em glúteos e pernas',
      days: [
        {
          name: 'Treino A - Glúteos e Pernas',
          exercises: [
            { name: 'Agachamento Sumo', sets: '4x', reps: '10-15', notes: 'Ênfase glúteos' },
            { name: 'Hip Thrust', sets: '4x', reps: '10-15', notes: 'Principal para glúteos' },
            { name: 'Leg Press Pés Altos', sets: '3x', reps: '12-15', notes: '' },
            { name: 'Cadeira Abdutora', sets: '3x', reps: '15-20', notes: '' },
            { name: 'Stiff', sets: '3x', reps: '10-12', notes: 'Posteriores' }
          ]
        },
        {
          name: 'Treino B - Superior',
          exercises: [
            { name: 'Supino Reto', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Puxada Frontal', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Desenvolvimento', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Rosca Direta', sets: '3x', reps: '12-15', notes: '' },
            { name: 'Tríceps Pulley', sets: '3x', reps: '12-15', notes: '' }
          ]
        },
        {
          name: 'Treino C - Glúteos Intensivo',
          exercises: [
            { name: 'Hip Thrust', sets: '5x', reps: '10-12', notes: 'Com carga' },
            { name: 'Agachamento Búlgaro', sets: '4x', reps: '10-12', notes: 'Cada perna' },
            { name: 'Cadeira Abdutora', sets: '4x', reps: '15-20', notes: '' },
            { name: 'Elevação Pélvica', sets: '3x', reps: '15-20', notes: '' },
            { name: 'Panturrilha', sets: '4x', reps: '15-20', notes: '' }
          ]
        }
      ]
    },
    quick: {
      title: 'Treinos Rápidos',
      description: 'Sessões de 30-40 minutos',
      days: [
        {
          name: 'Treino 1 - Upper',
          exercises: [
            { name: 'Supino Reto', sets: '3x', reps: '8-12', notes: 'Composto' },
            { name: 'Remada Curvada', sets: '3x', reps: '8-12', notes: 'Composto' },
            { name: 'Desenvolvimento', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Rosca Direta', sets: '2x', reps: '10-12', notes: '' },
            { name: 'Tríceps Pulley', sets: '2x', reps: '10-12', notes: '' }
          ]
        },
        {
          name: 'Treino 2 - Lower',
          exercises: [
            { name: 'Agachamento', sets: '4x', reps: '8-12', notes: 'Principal' },
            { name: 'Leg Press', sets: '3x', reps: '10-15', notes: '' },
            { name: 'Stiff', sets: '3x', reps: '10-12', notes: 'Posteriores' },
            { name: 'Panturrilha', sets: '3x', reps: '15-20', notes: '' }
          ]
        },
        {
          name: 'Treino 3 - Full',
          exercises: [
            { name: 'Agachamento', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Supino', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Puxada Frontal', sets: '3x', reps: '10-12', notes: '' },
            { name: 'Desenvolvimento', sets: '2x', reps: '10-12', notes: '' },
            { name: 'Prancha', sets: '3x', reps: '30-45s', notes: '' }
          ]
        }
      ]
    }
  }

  const workout = workoutData[type || '']

  if (!workout) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Treino não encontrado</h1>
        <Link to="/workouts">
          <Button>Voltar para Treinos</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Link to="/workouts">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-white">{workout.title}</h1>
          <p className="text-slate-400 mt-1">{workout.description}</p>
        </div>
      </div>

      <Card className="bg-blue-900/20 border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-400 mt-0.5" />
            <div className="space-y-1 text-sm text-slate-300">
              <p><strong>Dicas importantes:</strong></p>
              <p>• Faça aquecimento antes de começar (5-10 min)</p>
              <p>• Mantenha boa forma de execução</p>
              <p>• Descanse 60-90s entre séries</p>
              <p>• Aumente a carga progressivamente</p>
              <p>• Alongue após o treino</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {workout.days.map((day: any, dayIndex: number) => (
          <Card key={dayIndex} className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{day.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {day.exercises.map((exercise: any, exIndex: number) => (
                  <div
                    key={exIndex}
                    className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{exercise.name}</h3>
                      {exercise.notes && (
                        <p className="text-sm text-slate-400 mt-1">{exercise.notes}</p>
                      )}
                    </div>
                    <div className="flex gap-4">
                      <Badge variant="outline" className="bg-blue-900/30 border-blue-700 text-blue-300">
                        {exercise.sets}
                      </Badge>
                      <Badge variant="outline" className="bg-purple-900/30 border-purple-700 text-purple-300">
                        {exercise.reps}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
