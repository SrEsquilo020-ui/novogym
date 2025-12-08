import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Milk, TrendingUp, Info, Calculator, Sparkles } from 'lucide-react'

export default function Whey() {
  const [weight, setWeight] = useState('')
  const [goal, setGoal] = useState('')
  const [foodProtein, setFoodProtein] = useState('')
  const [wheyType, setWheyType] = useState('')
  const [result, setResult] = useState<any>(null)

  const wheyTypes = [
    { value: 'concentrate', label: 'Whey Concentrado (20g/scoop)', protein: 20, description: 'Mais barato, boa opção' },
    { value: 'isolate', label: 'Whey Isolado (24g/scoop)', protein: 24, description: 'Menos lactose, mais puro' },
    { value: 'pure', label: 'Whey 100% (30g/scoop)', protein: 30, description: 'Máxima concentração' }
  ]

  const calculateWhey = () => {
    const w = parseFloat(weight)
    const foodProt = parseFloat(foodProtein)

    if (!w || !goal || foodProt === undefined || !wheyType) {
      return
    }

    // Proteína necessária por kg baseada no objetivo
    const proteinPerKg: Record<string, number> = {
      maintain: 1.2,
      mass: 2.0,
      lose: 2.2,
      definition: 2.4
    }

    const totalProteinNeeded = Math.round(w * proteinPerKg[goal])
    const proteinDeficit = totalProteinNeeded - foodProt

    // Se não há déficit, não precisa de whey
    if (proteinDeficit <= 0) {
      setResult({
        totalProteinNeeded,
        proteinDeficit: 0,
        scoopsNeeded: 0,
        noNeed: true
      })
      return
    }

    // Encontrar tipo de whey selecionado
    const selectedWhey = wheyTypes.find((w) => w.value === wheyType)
    if (!selectedWhey) return

    // Calcular scoops necessários
    const scoops = Math.ceil(proteinDeficit / selectedWhey.protein)

    setResult({
      totalProteinNeeded,
      proteinDeficit,
      scoopsNeeded: scoops,
      proteinPerScoop: selectedWhey.protein,
      wheyLabel: selectedWhey.label,
      noNeed: false
    })
  }

  const getGoalProtein = (goalValue: string) => {
    const rates: Record<string, string> = {
      maintain: '1.2g/kg',
      mass: '2.0g/kg',
      lose: '2.2g/kg',
      definition: '2.4g/kg'
    }
    return rates[goalValue] || ''
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-blue-600/20 rounded-full">
            <Milk className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white">Calculadora de Whey Protein</h1>
        <p className="text-xl text-slate-400">
          Descubra quanto whey você realmente precisa
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculadora */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calculator className="h-5 w-5 text-blue-500" />
              Calcular Necessidade
            </CardTitle>
            <CardDescription>Preencha suas informações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso Corporal (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Seu Objetivo</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="maintain">Manutenção (1.2g/kg)</SelectItem>
                  <SelectItem value="mass">Ganhar Massa (2.0g/kg)</SelectItem>
                  <SelectItem value="lose">Emagrecer (2.2g/kg)</SelectItem>
                  <SelectItem value="definition">Definição (2.4g/kg)</SelectItem>
                </SelectContent>
              </Select>
              {goal && (
                <p className="text-xs text-slate-400">
                  Taxa recomendada: {getGoalProtein(goal)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodProtein">
                Proteína que você já consome na alimentação (g/dia)
              </Label>
              <Input
                id="foodProtein"
                type="number"
                placeholder="Ex: 80"
                value={foodProtein}
                onChange={(e) => setFoodProtein(e.target.value)}
              />
              <p className="text-xs text-slate-400">
                Conte carnes, ovos, laticínios, etc.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wheyType">Tipo de Whey</Label>
              <Select value={wheyType} onValueChange={setWheyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {wheyTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {wheyType && (
                <p className="text-xs text-slate-400">
                  {wheyTypes.find((w) => w.value === wheyType)?.description}
                </p>
              )}
            </div>

            <Button
              onClick={calculateWhey}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Calcular
            </Button>
          </CardContent>
        </Card>

        {/* Resultados */}
        {result && (
          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Resultado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {result.noNeed ? (
                <div className="p-6 bg-green-900/30 rounded-lg border border-green-800 text-center">
                  <Sparkles className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Você não precisa de whey!
                  </h3>
                  <p className="text-slate-300">
                    Sua alimentação já fornece proteína suficiente ({foodProtein}g)
                    para seu objetivo ({result.totalProteinNeeded}g necessários).
                  </p>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-900/50 rounded-lg">
                      <p className="text-sm text-slate-400 mb-1">Proteína Total Necessária</p>
                      <p className="text-3xl font-bold text-white">{result.totalProteinNeeded}g/dia</p>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-lg">
                      <p className="text-sm text-slate-400 mb-1">Você consome da alimentação</p>
                      <p className="text-2xl font-bold text-slate-300">{foodProtein}g/dia</p>
                    </div>

                    <div className="p-4 bg-red-900/30 rounded-lg border border-red-800">
                      <p className="text-sm text-slate-400 mb-1">Falta atingir</p>
                      <p className="text-2xl font-bold text-red-300">{result.proteinDeficit}g/dia</p>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg text-center">
                    <p className="text-sm text-blue-100 mb-2">Você precisa de</p>
                    <p className="text-6xl font-bold text-white mb-2">
                      {result.scoopsNeeded}
                    </p>
                    <p className="text-lg text-blue-100">
                      {result.scoopsNeeded === 1 ? 'scoop' : 'scoops'} por dia
                    </p>
                    <p className="text-xs text-blue-200 mt-3">
                      {result.wheyLabel}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm text-slate-300 bg-slate-900/30 p-4 rounded-lg">
                    <p><strong className="text-white">Dicas:</strong></p>
                    <p>• Tome após o treino ou entre refeições</p>
                    <p>• Pode misturar com água, leite ou frutas</p>
                    <p>• Distribua os scoops ao longo do dia</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Comparação de Tipos */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Info className="h-5 w-5 text-cyan-500" />
            Tipos de Whey Protein
          </CardTitle>
          <CardDescription>Entenda as diferenças</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border-2 border-yellow-900/50">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-yellow-600">Econômico</Badge>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Whey Concentrado
              </h3>
              <p className="text-sm text-slate-400 mb-3">~20g proteína por scoop</p>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Mais barato</li>
                <li>• 70-80% proteína</li>
                <li>• Contém lactose</li>
                <li>• Boa absorção</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border-2 border-blue-900/50">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-blue-600">Popular</Badge>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Whey Isolado
              </h3>
              <p className="text-sm text-slate-400 mb-3">~24g proteína por scoop</p>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Preço médio</li>
                <li>• 90%+ proteína</li>
                <li>• Baixa lactose</li>
                <li>• Absorção rápida</li>
              </ul>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border-2 border-purple-900/50">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-purple-600">Premium</Badge>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Whey 100% Puro
              </h3>
              <p className="text-sm text-slate-400 mb-3">~30g proteína por scoop</p>
              <ul className="space-y-1 text-sm text-slate-300">
                <li>• Mais caro</li>
                <li>• 95%+ proteína</li>
                <li>• Sem lactose</li>
                <li>• Máxima pureza</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informações Importantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Info className="h-5 w-5 text-blue-500" />
              Quando Tomar?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-300 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-1">Pós-Treino</h4>
              <p>Momento ideal para absorção rápida</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Café da Manhã</h4>
              <p>Se não conseguir comer proteína suficiente</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Entre Refeições</h4>
              <p>Para atingir sua meta diária</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Antes de Dormir</h4>
              <p>Isolado ou caseína para recuperação noturna</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Vale a Pena?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-300 text-sm">
            <p>
              <strong className="text-white">Whey é conveniente, mas não obrigatório!</strong>
            </p>
            <p>
              Você pode atingir suas metas de proteína apenas com alimentação.
              Whey é útil quando:
            </p>
            <ul className="space-y-1 ml-4">
              <li>• Difícil atingir meta com comida</li>
              <li>• Praticidade pós-treino</li>
              <li>• Falta tempo para cozinhar</li>
              <li>• Viagens e correria</li>
            </ul>
            <p className="text-xs text-slate-400 mt-3">
              Priorize sempre comida de verdade primeiro!
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-900/20 border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong className="text-white">Lembre-se:</strong></p>
              <p>
                Whey protein é apenas um suplemento de conveniência. Ele não é mágico e não constrói músculo sozinho.
                O mais importante é: treinar bem, comer proteína suficiente (de qualquer fonte) e descansar adequadamente.
                Se você consegue atingir sua meta de proteína com comida, não precisa de whey!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
