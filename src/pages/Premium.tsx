import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Crown, Check, Sparkles, Zap, TrendingUp, Users, Lock } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

export default function Premium() {
  const navigate = useNavigate()
  const { activatePremium, isPremium } = useAuth()
  const { toast } = useToast()

  const handleSubscribe = () => {
    // Simulação de pagamento - aqui você integraria com Stripe, Mercado Pago, etc
    toast({
      title: "Processando pagamento...",
      description: "Aguarde um momento"
    })

    // Simular processamento
    setTimeout(() => {
      activatePremium()
      toast({
        title: "Bem-vindo ao Premium! 🎉",
        description: "Seu acesso completo foi liberado!"
      })
      navigate('/dashboard')
    }, 2000)
  }
  const features = [
    {
      icon: Sparkles,
      title: 'Treinos Personalizados',
      description: 'Treinos customizados baseados em seus objetivos e nível'
    },
    {
      icon: TrendingUp,
      title: 'Plano Nutricional Completo',
      description: 'Cardápio semanal personalizado com receitas'
    },
    {
      icon: Users,
      title: 'Acompanhamento de Personal',
      description: 'Suporte direto com profissionais de educação física'
    },
    {
      icon: Zap,
      title: 'Análise de Progresso Avançada',
      description: 'Gráficos detalhados e insights sobre sua evolução'
    }
  ]

  const plans = [
    {
      name: '1 Mês',
      price: 'R$ 49,90',
      period: 'por mês',
      totalPrice: 'R$ 49,90 total',
      savings: null,
      popular: false
    },
    {
      name: '6 Meses',
      price: 'R$ 39,90',
      period: 'por mês',
      totalPrice: 'R$ 239,40 total',
      savings: 'Economize R$ 59,40',
      popular: true
    },
    {
      name: '1 Ano',
      price: 'R$ 29,90',
      period: 'por mês',
      totalPrice: 'R$ 358,80 total',
      savings: 'Economize R$ 240,00',
      popular: false
    }
  ]

  const premiumFeatures = [
    'Treinos 100% personalizados para seu objetivo',
    'Exercícios detalhados com séries e repetições',
    'Plano alimentar completo e personalizado',
    'Receitas saudáveis e práticas',
    'Calculadora de suplementos (Whey, Creatina)',
    'Acompanhamento de progresso',
    'Ajustes automáticos de treino',
    'Suporte especializado',
    'Acesso vitalício ao conteúdo'
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-full">
            <Crown className="h-12 w-12 text-white" />
          </div>
        </div>
        <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-0">
          GYMFOCUS PREMIUM
        </Badge>
        <h1 className="text-5xl font-bold text-white">
          Alcance seus objetivos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">mais rápido</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Acesso completo a treinos avançados, nutrição personalizada e suporte profissional
        </p>
      </div>

      {/* Planos de Assinatura */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={cn(
              "relative overflow-hidden transition-all hover:scale-105",
              plan.popular
                ? "bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-600 shadow-2xl"
                : "bg-slate-900/50 border-slate-800"
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-1 text-sm font-semibold">
                MAIS POPULAR
              </div>
            )}

            <CardHeader className={plan.popular ? "pt-8" : ""}>
              <CardTitle className="text-2xl text-white text-center">{plan.name}</CardTitle>
              {plan.savings && (
                <Badge className="mx-auto bg-green-600 mt-2">{plan.savings}</Badge>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-center py-6 bg-slate-900/30 rounded-lg">
                <p className="text-5xl font-bold text-white">{plan.price}</p>
                <p className="text-slate-400 mt-2">{plan.period}</p>
                <p className="text-slate-500 text-sm mt-2">{plan.totalPrice}</p>
              </div>

              <div className="space-y-3">
                {premiumFeatures.slice(0, 6).map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className={cn(
                      "h-5 w-5 mt-0.5 flex-shrink-0",
                      plan.popular ? "text-yellow-500" : "text-green-500"
                    )} />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSubscribe}
                disabled={isPremium}
                className={cn(
                  "w-full text-lg py-6",
                  plan.popular
                    ? "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                    : "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {isPremium ? 'Você já é Premium!' : 'Assinar Agora'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Garantias */}
      <Card className="bg-slate-900/50 border-slate-800 mt-8">
        <CardContent className="pt-6 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-2xl">✓</p>
              <p className="text-white font-semibold">Acesso Imediato</p>
              <p className="text-slate-400 text-sm">Comece hoje mesmo</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl">🔒</p>
              <p className="text-white font-semibold">Pagamento Seguro</p>
              <p className="text-slate-400 text-sm">Dados protegidos</p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl">🎁</p>
              <p className="text-white font-semibold">Garantia 7 dias</p>
              <p className="text-slate-400 text-sm">Satisfação garantida</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recursos Premium em Destaque */}
      <div className="space-y-6 mt-16">
        <h2 className="text-3xl font-bold text-white text-center">
          O que você ganha com o Premium?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-slate-900/50 border-slate-800 hover:border-yellow-600 transition-colors">
                <CardHeader>
                  <div className="p-3 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-lg w-fit">
                    <Icon className="h-8 w-8 text-yellow-500" />
                  </div>
                  <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recursos Bloqueados */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lock className="h-5 w-5 text-yellow-500" />
            Recursos Premium em Breve
          </CardTitle>
          <CardDescription>Funcionalidades que estamos desenvolvendo para você</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-yellow-900/30">
              <h3 className="font-semibold text-white mb-2">App Mobile</h3>
              <p className="text-sm text-slate-400">
                Aplicativo iOS e Android para treinar em qualquer lugar
              </p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-yellow-900/30">
              <h3 className="font-semibold text-white mb-2">Vídeos de Exercícios</h3>
              <p className="text-sm text-slate-400">
                Biblioteca completa com execução correta de cada exercício
              </p>
            </div>
            <div className="p-4 bg-slate-800/50 rounded-lg border border-yellow-900/30">
              <h3 className="font-semibold text-white mb-2">Comunidade</h3>
              <p className="text-sm text-slate-400">
                Conecte-se com outros membros e compartilhe seu progresso
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Depoimentos */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white text-center">
          O que nossos usuários dizem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-slate-300 mb-4">
                "O Premium mudou minha vida! Já perdi 8kg em 2 meses seguindo os treinos e cardápio personalizado."
              </p>
              <p className="text-sm text-slate-400">— João Silva, 28 anos</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-slate-300 mb-4">
                "Melhor investimento que fiz! O suporte do personal é incrível e os treinos são muito bem estruturados."
              </p>
              <p className="text-sm text-slate-400">— Maria Santos, 32 anos</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-500">★</span>
                ))}
              </div>
              <p className="text-slate-300 mb-4">
                "Finalmente consegui ganhar massa muscular de forma consistente. Os gráficos me motivam muito!"
              </p>
              <p className="text-sm text-slate-400">— Pedro Costa, 24 anos</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Final */}
      <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-800">
        <CardContent className="pt-8 pb-8 text-center space-y-6">
          <Crown className="h-16 w-16 text-yellow-500 mx-auto" />
          <h2 className="text-3xl font-bold text-white">
            Pronto para transformar seu corpo?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já alcançaram resultados incríveis com o GymFocus Premium
          </p>
          <Button
            onClick={handleSubscribe}
            disabled={isPremium}
            className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white text-lg px-12 py-6"
          >
            <Crown className="mr-2 h-5 w-5" />
            {isPremium ? 'Você já é Premium!' : 'Começar Agora'}
          </Button>
          <p className="text-sm text-slate-400">
            Satisfação garantida ou seu dinheiro de volta em 7 dias
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
