import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { Target, Dumbbell, Calendar, User } from 'lucide-react'

export default function Funnel() {
  const navigate = useNavigate()
  const { setUserData } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    goal: '',
    level: '',
    frequency: '',
    gender: ''
  })

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      // Salvar dados e ir para resultado
      setUserData(formData)
      navigate('/resultado')
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.trim() !== ''
      case 2:
        return formData.goal !== ''
      case 3:
        return formData.level !== ''
      case 4:
        return formData.frequency !== ''
      case 5:
        return formData.gender !== ''
      default:
        return false
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-white">Monte seu Treino Personalizado</h1>
        <p className="text-slate-400">Responda algumas perguntas para criarmos o treino perfeito para você</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-2xl text-white">
            {step === 1 && 'Qual é o seu nome?'}
            {step === 2 && 'Qual é o seu objetivo?'}
            {step === 3 && 'Qual é o seu nível?'}
            {step === 4 && 'Quantas vezes por semana você pode treinar?'}
            {step === 5 && 'Qual é o seu sexo?'}
          </CardTitle>
          <CardDescription className="text-slate-400">
            Passo {step} de 5
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
                <Label htmlFor="name" className="text-white">Seu nome</Label>
                <Input
                  id="name"
                  placeholder="Digite seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
            </div>
          )}

          {/* Step 2: Objetivo */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Target className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <RadioGroup value={formData.goal} onValueChange={(value) => setFormData({ ...formData, goal: value })}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="ganho_massa" id="ganho_massa" />
                    <Label htmlFor="ganho_massa" className="cursor-pointer flex-1 text-white">
                      Ganho de Massa Muscular
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="emagrecimento" id="emagrecimento" />
                    <Label htmlFor="emagrecimento" className="cursor-pointer flex-1 text-white">
                      Emagrecimento
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="definicao" id="definicao" />
                    <Label htmlFor="definicao" className="cursor-pointer flex-1 text-white">
                      Definição Muscular
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="saude" id="saude" />
                    <Label htmlFor="saude" className="cursor-pointer flex-1 text-white">
                      Saúde e Condicionamento
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 3: Nível */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Dumbbell className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <RadioGroup value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="iniciante" id="iniciante" />
                    <Label htmlFor="iniciante" className="cursor-pointer flex-1 text-white">
                      Iniciante (0-6 meses)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="intermediario" id="intermediario" />
                    <Label htmlFor="intermediario" className="cursor-pointer flex-1 text-white">
                      Intermediário (6 meses - 2 anos)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="avancado" id="avancado" />
                    <Label htmlFor="avancado" className="cursor-pointer flex-1 text-white">
                      Avançado (2+ anos)
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 4: Frequência */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <Calendar className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <RadioGroup value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="3" id="3x" />
                    <Label htmlFor="3x" className="cursor-pointer flex-1 text-white">
                      3x por semana
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="4" id="4x" />
                    <Label htmlFor="4x" className="cursor-pointer flex-1 text-white">
                      4x por semana
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="5" id="5x" />
                    <Label htmlFor="5x" className="cursor-pointer flex-1 text-white">
                      5x por semana
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="6" id="6x" />
                    <Label htmlFor="6x" className="cursor-pointer flex-1 text-white">
                      6x por semana
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 5: Sexo */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-blue-600/20 rounded-full">
                  <User className="h-12 w-12 text-blue-500" />
                </div>
              </div>
              <RadioGroup value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="masculino" id="masculino" />
                    <Label htmlFor="masculino" className="cursor-pointer flex-1 text-white">
                      Masculino
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700">
                    <RadioGroupItem value="feminino" id="feminino" />
                    <Label htmlFor="feminino" className="cursor-pointer flex-1 text-white">
                      Feminino
                    </Label>
                  </div>
                </div>
              </RadioGroup>
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
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              {step === 5 ? 'Ver Meu Treino' : 'Próximo'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
