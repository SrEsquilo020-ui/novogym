import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Weight, Ruler, Dumbbell, Calendar, Plus, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface ProgressEntry {
  id: string
  date: string
  weight?: number
  chest?: number
  waist?: number
  arm?: number
  thigh?: number
  squat?: number
  bench?: number
  deadlift?: number
}

export default function Progress() {
  const [entries, setEntries] = useState<ProgressEntry[]>([])
  const [newEntry, setNewEntry] = useState<Partial<ProgressEntry>>({})
  const { toast } = useToast()

  // Carregar dados do localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gymfocus-progress')
    if (saved) {
      setEntries(JSON.parse(saved))
    }
  }, [])

  // Salvar dados no localStorage
  const saveEntries = (newEntries: ProgressEntry[]) => {
    setEntries(newEntries)
    localStorage.setItem('gymfocus-progress', JSON.stringify(newEntries))
  }

  const addEntry = () => {
    if (!newEntry.weight && !newEntry.chest && !newEntry.waist) {
      toast({
        title: "Preencha pelo menos um campo",
        description: "Adicione pelo menos uma medida antes de salvar.",
        variant: "destructive"
      })
      return
    }

    const entry: ProgressEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...newEntry
    }

    const updated = [entry, ...entries]
    saveEntries(updated)
    setNewEntry({})

    toast({
      title: "Progresso registrado!",
      description: "Suas medidas foram salvas com sucesso."
    })
  }

  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id)
    saveEntries(updated)

    toast({
      title: "Registro removido",
      description: "O registro foi excluído."
    })
  }

  const getLatestValue = (field: keyof ProgressEntry) => {
    for (const entry of entries) {
      if (entry[field]) return entry[field]
    }
    return null
  }

  const getChange = (field: keyof ProgressEntry) => {
    if (entries.length < 2) return null

    const latest = entries[0][field] as number | undefined
    const previous = entries[1][field] as number | undefined

    if (!latest || !previous) return null

    const change = latest - previous
    const percentage = ((change / previous) * 100).toFixed(1)

    return { change, percentage }
  }

  const latestEntry = entries[0]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-white">Acompanhamento de Progresso</h1>
        <p className="text-xl text-slate-400">
          Registre suas medidas e acompanhe sua evolução
        </p>
      </div>

      {/* Resumo Atual */}
      {latestEntry && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {latestEntry.weight && (
            <Card className="bg-blue-900/30 border-blue-800">
              <CardContent className="pt-6 text-center">
                <Weight className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Peso</p>
                <p className="text-2xl font-bold text-white">{latestEntry.weight} kg</p>
                {getChange('weight') && (
                  <Badge
                    variant="outline"
                    className={`mt-2 ${
                      getChange('weight')!.change > 0
                        ? 'bg-green-900/30 border-green-700 text-green-300'
                        : 'bg-red-900/30 border-red-700 text-red-300'
                    }`}
                  >
                    {getChange('weight')!.change > 0 ? '+' : ''}
                    {getChange('weight')!.change.toFixed(1)} kg
                  </Badge>
                )}
              </CardContent>
            </Card>
          )}

          {latestEntry.chest && (
            <Card className="bg-purple-900/30 border-purple-800">
              <CardContent className="pt-6 text-center">
                <Ruler className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Peitoral</p>
                <p className="text-2xl font-bold text-white">{latestEntry.chest} cm</p>
                {getChange('chest') && (
                  <Badge
                    variant="outline"
                    className="mt-2 bg-purple-900/30 border-purple-700 text-purple-300"
                  >
                    {getChange('chest')!.change > 0 ? '+' : ''}
                    {getChange('chest')!.change.toFixed(1)} cm
                  </Badge>
                )}
              </CardContent>
            </Card>
          )}

          {latestEntry.arm && (
            <Card className="bg-green-900/30 border-green-800">
              <CardContent className="pt-6 text-center">
                <Dumbbell className="h-6 w-6 text-green-500 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Braço</p>
                <p className="text-2xl font-bold text-white">{latestEntry.arm} cm</p>
                {getChange('arm') && (
                  <Badge
                    variant="outline"
                    className="mt-2 bg-green-900/30 border-green-700 text-green-300"
                  >
                    {getChange('arm')!.change > 0 ? '+' : ''}
                    {getChange('arm')!.change.toFixed(1)} cm
                  </Badge>
                )}
              </CardContent>
            </Card>
          )}

          {latestEntry.bench && (
            <Card className="bg-orange-900/30 border-orange-800">
              <CardContent className="pt-6 text-center">
                <TrendingUp className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                <p className="text-sm text-slate-400">Supino</p>
                <p className="text-2xl font-bold text-white">{latestEntry.bench} kg</p>
                {getChange('bench') && (
                  <Badge
                    variant="outline"
                    className="mt-2 bg-orange-900/30 border-orange-700 text-orange-300"
                  >
                    {getChange('bench')!.change > 0 ? '+' : ''}
                    {getChange('bench')!.change.toFixed(1)} kg
                  </Badge>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Formulário de Novo Registro */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Plus className="h-5 w-5 text-blue-500" />
            Adicionar Nova Medição
          </CardTitle>
          <CardDescription>Registre suas medidas atuais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Peso e Medidas Corporais */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Weight className="h-5 w-5 text-blue-500" />
                Peso e Medidas
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="70.5"
                    value={newEntry.weight || ''}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, weight: parseFloat(e.target.value) || undefined })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chest">Peitoral (cm)</Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    placeholder="95"
                    value={newEntry.chest || ''}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, chest: parseFloat(e.target.value) || undefined })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Cintura (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    placeholder="80"
                    value={newEntry.waist || ''}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, waist: parseFloat(e.target.value) || undefined })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="arm">Braço (cm)</Label>
                  <Input
                    id="arm"
                    type="number"
                    step="0.1"
                    placeholder="35"
                    value={newEntry.arm || ''}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, arm: parseFloat(e.target.value) || undefined })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="thigh">Coxa (cm)</Label>
                  <Input
                    id="thigh"
                    type="number"
                    step="0.1"
                    placeholder="55"
                    value={newEntry.thigh || ''}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, thigh: parseFloat(e.target.value) || undefined })
                    }
                  />
                </div>
              </div>
            </div>

            {/* PRs de Academia */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Dumbbell className="h-5 w-5 text-orange-500" />
                Cargas Máximas (PR)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="squat">Agachamento (kg)</Label>
                  <Input
                    id="squat"
                    type="number"
                    step="2.5"
                    placeholder="100"
                    value={newEntry.squat || ''}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, squat: parseFloat(e.target.value) || undefined })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bench">Supino (kg)</Label>
                  <Input
                    id="bench"
                    type="number"
                    step="2.5"
                    placeholder="80"
                    value={newEntry.bench || ''}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, bench: parseFloat(e.target.value) || undefined })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadlift">Levantamento Terra (kg)</Label>
                  <Input
                    id="deadlift"
                    type="number"
                    step="2.5"
                    placeholder="120"
                    value={newEntry.deadlift || ''}
                    onChange={(e) =>
                      setNewEntry({ ...newEntry, deadlift: parseFloat(e.target.value) || undefined })
                    }
                  />
                </div>
              </div>
            </div>

            <Button onClick={addEntry} className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              Salvar Registro
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Histórico */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Calendar className="h-5 w-5 text-purple-500" />
            Histórico de Medições
          </CardTitle>
          <CardDescription>
            {entries.length === 0
              ? 'Nenhum registro ainda. Adicione sua primeira medição acima!'
              : `${entries.length} ${entries.length === 1 ? 'registro' : 'registros'} salvos`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Comece registrando suas medidas para acompanhar seu progresso!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-400">
                        {new Date(entry.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteEntry(entry.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                    {entry.weight && (
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Peso</p>
                        <p className="text-sm font-semibold text-white">{entry.weight} kg</p>
                      </div>
                    )}
                    {entry.chest && (
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Peitoral</p>
                        <p className="text-sm font-semibold text-white">{entry.chest} cm</p>
                      </div>
                    )}
                    {entry.waist && (
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Cintura</p>
                        <p className="text-sm font-semibold text-white">{entry.waist} cm</p>
                      </div>
                    )}
                    {entry.arm && (
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Braço</p>
                        <p className="text-sm font-semibold text-white">{entry.arm} cm</p>
                      </div>
                    )}
                    {entry.thigh && (
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Coxa</p>
                        <p className="text-sm font-semibold text-white">{entry.thigh} cm</p>
                      </div>
                    )}
                    {entry.squat && (
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Agachamento</p>
                        <p className="text-sm font-semibold text-white">{entry.squat} kg</p>
                      </div>
                    )}
                    {entry.bench && (
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Supino</p>
                        <p className="text-sm font-semibold text-white">{entry.bench} kg</p>
                      </div>
                    )}
                    {entry.deadlift && (
                      <div className="text-center">
                        <p className="text-xs text-slate-500 mb-1">Terra</p>
                        <p className="text-sm font-semibold text-white">{entry.deadlift} kg</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
