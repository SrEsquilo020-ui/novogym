import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Pill, Info, TrendingUp, Calendar } from 'lucide-react'

export default function Creatine() {
  const [weight, setWeight] = useState('')
  const [useSaturation, setUseSaturation] = useState(false)
  const [result, setResult] = useState<any>(null)

  const calculateCreatine = () => {
    const w = parseFloat(weight)

    if (!w || w <= 0) {
      return
    }

    // Cálculo: peso × 0.07 (limitado entre 3g e 5g)
    let dailyDose = w * 0.07

    // Limitar entre 3g e 5g
    if (dailyDose < 3) dailyDose = 3
    if (dailyDose > 5) dailyDose = 5

    dailyDose = Math.round(dailyDose * 10) / 10 // Arredondar para 1 casa decimal

    // Dose de saturação (se ativada)
    const saturationDose = dailyDose * 4 // 20g dividido em 4 doses
    const saturationDays = 7

    setResult({
      dailyDose,
      saturationDose: Math.round(saturationDose * 10) / 10,
      saturationDays
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-purple-600/20 rounded-full">
            <Pill className="h-12 w-12 text-purple-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white">Calculadora de Creatina</h1>
        <p className="text-xl text-slate-400">
          Descubra a dose ideal de creatina para você
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calculadora */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Pill className="h-5 w-5 text-purple-500" />
              Calcular Dose
            </CardTitle>
            <CardDescription>Informe seu peso corporal</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso Corporal (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="saturation" className="text-base">
                  Fase de Saturação
                </Label>
                <p className="text-sm text-slate-400">
                  Carregar creatina mais rápido (opcional)
                </p>
              </div>
              <Switch
                id="saturation"
                checked={useSaturation}
                onCheckedChange={setUseSaturation}
              />
            </div>

            <Button
              onClick={calculateCreatine}
              className="w-full bg-purple-600 hover:bg-purple-700"
              disabled={!weight}
            >
              Calcular Dose
            </Button>
          </CardContent>
        </Card>

        {/* Resultados */}
        {result && (
          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Sua Dose Recomendada
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 bg-slate-900/50 rounded-lg text-center">
                <p className="text-sm text-slate-400 mb-2">Dose Diária de Manutenção</p>
                <p className="text-6xl font-bold text-white">{result.dailyDose}g</p>
                <p className="text-sm text-slate-500 mt-2">por dia</p>
              </div>

              {useSaturation && (
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-purple-400" />
                    <h3 className="font-semibold text-white">Fase de Saturação</h3>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <p>
                      <strong className="text-white">Dose:</strong> {result.saturationDose}g, 4x por dia
                    </p>
                    <p>
                      <strong className="text-white">Duração:</strong> 7 dias
                    </p>
                    <p className="text-xs text-slate-400 mt-2">
                      Após 7 dias, volte para a dose de manutenção ({result.dailyDose}g/dia)
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3 text-sm text-slate-300 bg-slate-900/30 p-4 rounded-lg">
                <p><strong className="text-white">Dicas de Uso:</strong></p>
                <p>• Pode tomar a qualquer hora do dia</p>
                <p>• Misture com água, suco ou shake</p>
                <p>• Tome todos os dias, inclusive sem treinar</p>
                <p>• Não é necessário ciclar</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Informações sobre Creatina */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Info className="h-5 w-5 text-blue-500" />
              O que é Creatina?
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-300">
            <p>
              A creatina é um dos suplementos mais estudados e eficazes para ganho de força e massa muscular.
            </p>
            <p>
              <strong className="text-white">Benefícios:</strong>
            </p>
            <ul className="space-y-1 ml-4">
              <li>• Aumenta força e potência</li>
              <li>• Melhora performance em exercícios</li>
              <li>• Auxilia no ganho de massa muscular</li>
              <li>• Acelera recuperação</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Como Usar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Dose Padrão (Recomendado)</h4>
              <p className="text-sm">
                3-5g por dia, todos os dias. Simples e eficaz.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Fase de Saturação (Opcional)</h4>
              <p className="text-sm">
                20g por dia dividido em 4 doses durante 7 dias, depois volta para 3-5g/dia.
                Resultados mais rápidos, mas não é obrigatório.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-blue-900/20 border-blue-800">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm text-slate-300">
              <p><strong className="text-white">Importante:</strong></p>
              <p>
                • A creatina monohidratada é a forma mais estudada e eficaz<br />
                • Beba bastante água ao usar creatina (2-3L por dia)<br />
                • É segura para uso contínuo - não precisa fazer pausas<br />
                • Resultados aparecem após 2-4 semanas de uso consistente<br />
                • Pode causar retenção hídrica (normal e desejável)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-800">
        <CardContent className="pt-6 text-center">
          <div className="space-y-3">
            <Badge className="bg-purple-600">
              Suplemento Mais Estudado
            </Badge>
            <p className="text-slate-300">
              A creatina é um dos únicos suplementos com eficácia comprovada cientificamente
              para ganho de força e massa muscular. É seguro, barato e funciona!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
