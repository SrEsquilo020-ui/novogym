import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calculator, TrendingUp, TrendingDown, Minus, Apple, Egg, Fish } from 'lucide-react'

export default function Nutrition() {
  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [goal, setGoal] = useState('')
  const [activityLevel, setActivityLevel] = useState('')
  const [result, setResult] = useState<any>(null)

  const calculateNutrition = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseFloat(age)

    if (!w || !h || !a || !gender || !goal || !activityLevel) {
      return
    }

    // Cálculo de TMB (Taxa Metabólica Basal) - Fórmula de Mifflin-St Jeor
    let tmb = 0
    if (gender === 'male') {
      tmb = 10 * w + 6.25 * h - 5 * a + 5
    } else {
      tmb = 10 * w + 6.25 * h - 5 * a - 161
    }

    // Fator de atividade física
    const activityFactors: Record<string, number> = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    }

    const tdee = tmb * activityFactors[activityLevel]

    // Ajuste baseado no objetivo
    let calories = tdee
    let proteinPerKg = 1.6
    let goalText = ''
    let goalIcon = Minus

    if (goal === 'mass') {
      calories = tdee + 300 // Superávit de 300 calorias
      proteinPerKg = 2.0
      goalText = 'Ganho de Massa'
      goalIcon = TrendingUp
    } else if (goal === 'lose') {
      calories = tdee - 500 // Déficit de 500 calorias
      proteinPerKg = 2.2
      goalText = 'Emagrecimento'
      goalIcon = TrendingDown
    } else if (goal === 'definition') {
      calories = tdee - 300 // Déficit moderado
      proteinPerKg = 2.4
      goalText = 'Definição'
      goalIcon = TrendingDown
    } else {
      goalText = 'Manutenção'
      goalIcon = Minus
    }

    const protein = Math.round(w * proteinPerKg)
    const proteinCalories = protein * 4
    const fat = Math.round((calories * 0.25) / 9) // 25% das calorias em gordura
    const fatCalories = fat * 9
    const carbs = Math.round((calories - proteinCalories - fatCalories) / 4)

    setResult({
      calories: Math.round(calories),
      protein,
      carbs,
      fat,
      goalText,
      goalIcon,
      tdee: Math.round(tdee)
    })
  }

  const foods = [
    { name: 'Frango (100g)', protein: 31, calories: 165, icon: '🍗' },
    { name: 'Ovo (unidade)', protein: 6, calories: 70, icon: '🥚' },
    { name: 'Arroz (100g cozido)', protein: 3, calories: 130, icon: '🍚' },
    { name: 'Feijão (100g)', protein: 9, calories: 127, icon: '🫘' },
    { name: 'Aveia (50g)', protein: 7, calories: 185, icon: '🥣' },
    { name: 'Batata-doce (100g)', protein: 2, calories: 86, icon: '🍠' },
    { name: 'Sardinha lata (100g)', protein: 25, calories: 208, icon: '🐟' },
    { name: 'Banana (unidade)', protein: 1, calories: 105, icon: '🍌' }
  ]

  const meals = [
    {
      name: 'Café da Manhã',
      items: ['3 ovos mexidos', '2 fatias de pão integral', '1 banana', 'Café com leite']
    },
    {
      name: 'Almoço',
      items: ['150g frango grelhado', '100g arroz', '100g feijão', 'Salada verde']
    },
    {
      name: 'Lanche da Tarde',
      items: ['50g aveia', '1 scoop whey protein', '1 banana', '200ml leite']
    },
    {
      name: 'Jantar',
      items: ['150g peixe ou frango', '150g batata-doce', 'Legumes cozidos']
    }
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Calculadora Nutricional</h1>
        <p className="text-xl text-slate-400">
          Descubra suas necessidades calóricas e de macronutrientes
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculadora */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Calculator className="h-5 w-5 text-blue-500" />
              Seus Dados
            </CardTitle>
            <CardDescription>Preencha suas informações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="175"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Sexo</Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Objetivo</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione seu objetivo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mass">Ganhar Massa Muscular</SelectItem>
                  <SelectItem value="lose">Emagrecer</SelectItem>
                  <SelectItem value="definition">Definição</SelectItem>
                  <SelectItem value="maintain">Manutenção</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity">Nível de Atividade</Label>
              <Select value={activityLevel} onValueChange={setActivityLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentário (pouco exercício)</SelectItem>
                  <SelectItem value="light">Leve (1-3x/semana)</SelectItem>
                  <SelectItem value="moderate">Moderado (3-5x/semana)</SelectItem>
                  <SelectItem value="active">Ativo (6-7x/semana)</SelectItem>
                  <SelectItem value="veryActive">Muito Ativo (2x/dia)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={calculateNutrition}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Calcular
            </Button>
          </CardContent>
        </Card>

        {/* Resultados */}
        {result && (
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <result.goalIcon className="h-5 w-5 text-blue-500" />
                Seus Resultados - {result.goalText}
              </CardTitle>
              <CardDescription>Metas diárias recomendadas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-slate-900/50 rounded-lg text-center">
                <p className="text-sm text-slate-400 mb-2">Calorias Diárias</p>
                <p className="text-5xl font-bold text-white">{result.calories}</p>
                <p className="text-xs text-slate-500 mt-2">
                  TMB: {result.tdee} kcal
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-900/30 rounded-lg text-center">
                  <p className="text-sm text-slate-400 mb-1">Proteína</p>
                  <p className="text-2xl font-bold text-white">{result.protein}g</p>
                </div>
                <div className="p-4 bg-green-900/30 rounded-lg text-center">
                  <p className="text-sm text-slate-400 mb-1">Carboidratos</p>
                  <p className="text-2xl font-bold text-white">{result.carbs}g</p>
                </div>
                <div className="p-4 bg-yellow-900/30 rounded-lg text-center">
                  <p className="text-sm text-slate-400 mb-1">Gordura</p>
                  <p className="text-2xl font-bold text-white">{result.fat}g</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-300 bg-slate-900/30 p-4 rounded-lg">
                <p><strong className="text-white">Dica:</strong></p>
                <p>• Distribua as calorias em 4-6 refeições</p>
                <p>• Beba pelo menos 2L de água por dia</p>
                <p>• Ajuste conforme seu progresso</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Alimentos Acessíveis */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Apple className="h-5 w-5 text-green-500" />
            Alimentos Acessíveis e Ricos em Proteína
          </CardTitle>
          <CardDescription>Opções baratas e fáceis de encontrar</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {foods.map((food, index) => (
              <div
                key={index}
                className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <div className="text-3xl mb-2">{food.icon}</div>
                <h3 className="font-semibold text-white mb-2">{food.name}</h3>
                <div className="flex gap-2">
                  <Badge className="bg-blue-900/50 text-blue-300 border-blue-700">
                    {food.protein}g proteína
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-2">{food.calories} kcal</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sugestões de Refeições */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Fish className="h-5 w-5 text-orange-500" />
            Sugestões de Refeições Simples
          </CardTitle>
          <CardDescription>Ideias práticas para o dia a dia</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meals.map((meal, index) => (
              <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                <h3 className="font-semibold text-white mb-3">{meal.name}</h3>
                <ul className="space-y-2">
                  {meal.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-slate-400 flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
