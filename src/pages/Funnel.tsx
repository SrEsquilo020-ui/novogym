import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useAuth } from '@/contexts/AuthContext'
import { Target, Dumbbell, Calendar, User, Weight, Ruler, Trophy, Pill } from 'lucide-react'

export default function Funnel() {
  const navigate = useNavigate()
  const { setUserData } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    frequency: '',
    level: '',
    workoutPreference: '',
    supplements: [] as string[]
  })

  const handleNext = () => {
    if (step < 9) {
      setStep(step + 1)
    } else {
      // Salvar dados e ir para resultado
      setUserData({
        name: formData.name,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        height: parseFloat(formData.height),
        goal: formData.goal,
        frequency: formData.frequency,
        level: formData.level,
        workoutPreference: formData.workoutPreference,
        supplements: formData.supplements
      })
      navigate('/resultado')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const toggleSupplement = (supplement: string) => {
    setFormData(prev => ({
      ...prev,
      supplements: prev.supplements.includes(supplement)
        ? prev.supplements.filter(s => s !== supplement)
        : [...prev.supplements, supplement]
    }))
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== ''
      case 2:
        return formData.age !== '' && parseInt(formData.age) > 0 && parseInt(formData.age) < 120
      case 3:
        return formData.weight !== '' && parseFloat(formData.weight) > 0
      case 4:
        return formData.height !== '' && parseFloat(formData.height) > 0
      case 5:
        return formData.goal !== ''
      case 6:
        return formData.frequency !== ''
      case 7:
        return formData.level !== ''
      case 8:
        return formData.workoutPreference !== ''
      case 9:
        return true // Suplementos são opcionais
      default:
        return false
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white">Monte seu Plano Personalizado</h1>
        <p className="text-slate-400">Responda 9 perguntas rápidas para criar seu programa ideal</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-3">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
          style={{ width: `${(step / 9) * 100}%` }}
        />
      </div>

      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            {step === 1 && 'Qual é o seu nome?'}
            {step === 2 && 'Qual é a sua idade?'}
            {step === 3 && 'Qual é o seu peso?'}
            {step === 4 && 'Qual é a sua altura?'}
            {step === 5 && 'Qual é o seu objetivo principal?'}
            {step === 6 && 'Quantas vezes por semana você pode treinar?'}
            {step === 7 && 'Qual é o seu nível de experiência?'}
            {step === 8 && 'Qual sua preferência de treino?'}
            {step === 9 && 'Você usa algum suplemento?'}
          </CardTitle>
          <CardDescription className="text-slate-400">
            Pergunta {step} de 9
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Step 1: Nome */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <User className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Seu nome completo</Label>
                <Input
                  id="name"
                  placeholder="Ex: João Silva"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white text-lg p-6"
                />
              </div>
            </div>
          )}

          {/* Step 2: Idade */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <User className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age" className="text-white">Sua idade</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Ex: 25"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white text-lg p-6"
                />
              </div>
            </div>
          )}

          {/* Step 3: Peso */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Weight className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-white">Seu peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="Ex: 75.5"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white text-lg p-6"
                />
              </div>
            </div>
          )}

          {/* Step 4: Altura */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Ruler className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height" className="text-white">Sua altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Ex: 175"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white text-lg p-6"
                />
              </div>
            </div>
          )}

          {/* Step 5: Objetivo */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Target className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <RadioGroup value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                <div className="space-y-3">
                  {['Perder gordura', 'Ganhar massa muscular', 'Definição muscular', 'Ganhar força', 'Manter forma'].map((goal) => (
                    <div key={goal} className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                      <RadioGroupItem value={goal} id={goal} />
                      <Label htmlFor={goal} className="cursor-pointer flex-1 text-white text-lg">
                        {goal}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 6: Frequência */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Calendar className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <RadioGroup value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
                <div className="space-y-3">
                  {['3x por semana', '4x por semana', '5x por semana', '6x por semana'].map((freq) => (
                    <div key={freq} className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                      <RadioGroupItem value={freq} id={freq} />
                      <Label htmlFor={freq} className="cursor-pointer flex-1 text-white text-lg">
                        {freq}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 7: Nível */}
          {step === 7 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Trophy className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <RadioGroup value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                <div className="space-y-3">
                  {[
                    { value: 'Iniciante', desc: '0-6 meses de treino' },
                    { value: 'Intermediário', desc: '6 meses - 2 anos' },
                    { value: 'Avançado', desc: 'Mais de 2 anos' }
                  ].map((level) => (
                    <div key={level.value} className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                      <RadioGroupItem value={level.value} id={level.value} />
                      <Label htmlFor={level.value} className="cursor-pointer flex-1">
                        <div className="text-white text-lg">{level.value}</div>
                        <div className="text-slate-400 text-sm">{level.desc}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 8: Preferência de Treino */}
          {step === 8 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Dumbbell className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <RadioGroup value={formData.workoutPreference} onValueChange={(value) => setFormData({ ...formData, workoutPreference: value })}>
                <div className="space-y-3">
                  {[
                    { value: 'Full Body', desc: 'Corpo inteiro em cada treino' },
                    { value: 'ABC', desc: 'Divisão em 3 grupos musculares' },
                    { value: 'A/B', desc: 'Divisão em 2 grupos' },
                    { value: 'PPL', desc: 'Push/Pull/Legs' },
                    { value: 'Sem preferência', desc: 'Deixe-nos escolher o melhor para você' }
                  ].map((pref) => (
                    <div key={pref.value} className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                      <RadioGroupItem value={pref.value} id={pref.value} />
                      <Label htmlFor={pref.value} className="cursor-pointer flex-1">
                        <div className="text-white text-lg">{pref.value}</div>
                        <div className="text-slate-400 text-sm">{pref.desc}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 9: Suplementos */}
          {step === 9 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Pill className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-slate-300 text-center mb-4">Selecione os suplementos que você usa ou pretende usar</p>
                {['Whey Protein', 'Creatina', 'Pré-treino', 'Nenhum'].map((supp) => (
                  <div key={supp} className="flex items-center space-x-3 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700" onClick={() => toggleSupplement(supp)}>
                    <Checkbox
                      id={supp}
                      checked={formData.supplements.includes(supp)}
                      onCheckedChange={() => toggleSupplement(supp)}
                    />
                    <Label htmlFor={supp} className="cursor-pointer flex-1 text-white text-lg">
                      {supp}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 pt-4">
            {step > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 border-slate-700 text-white hover:bg-slate-800"
              >
                Voltar
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {step === 9 ? 'Ver Meu Plano' : 'Próxima'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
