# Volta

Volta é um app pessoal de constância para registrar hábitos diários, lidar melhor com dias difíceis e acompanhar a semana sem culpa.

A ideia central não é criar uma sequência perfeita. É ajudar a pessoa a voltar quando o dia não saiu como planejado.

## Problema Que Resolve

Apps de hábitos costumam reforçar sequências rígidas. Quando a pessoa perde um dia, a sensação de progresso pode desaparecer junto com a motivação.

O Volta parte de outra lógica: constância também é recomeço. O app valoriza o mínimo possível em dias difíceis e mostra quando a pessoa conseguiu aparecer por si de novo.

## Funcionalidades Do MVP

- Cadastro local de hábitos.
- Categorias de hábitos.
- Meta mínima normal.
- Meta reduzida para dia difícil.
- Marcar e desmarcar hábitos concluídos no dia atual.
- Ativar e desativar o modo dia difícil.
- Cálculo de vitória do dia:
  - modo normal: pelo menos 2 hábitos concluídos;
  - modo dia difícil: pelo menos 1 hábito concluído.
- Placar semanal de segunda a domingo.
- Status por dia:
  - Vitória mínima;
  - Parcial;
  - Sem registro.
- Estatísticas rápidas:
  - hábitos feitos hoje;
  - vitórias mínimas na semana;
  - dias com registro;
  - retornos na semana.
- Revisão diária com nota, vitórias, bloqueios e mínimo de amanhã.
- Gerenciamento de hábitos:
  - criar;
  - pausar;
  - reativar;
  - remover.
- Persistência inicial com `localStorage`.
- Interface responsiva para mobile e desktop.

## Stack Usada

- Next.js com App Router
- TypeScript
- Tailwind CSS
- React
- `localStorage` para persistência local

Não há backend, banco de dados ou bibliotecas de componentes no MVP.

## Como Rodar Localmente

Instale as dependências:

```bash
npm install
```

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador:

```text
http://localhost:3000
```

Para validar os tipos:

```bash
npx tsc --noEmit
```

Para gerar build de produção:

```bash
npm run build
```

## Estrutura De Pastas

```text
app/
  globals.css
  layout.tsx
  page.tsx

src/
  components/
    AppShell.tsx
    BadDayModeCard.tsx
    DailyReviewForm.tsx
    HabitCard.tsx
    HabitManager.tsx
    Header.tsx
    StatsCards.tsx
    TodayDashboard.tsx
    WeeklyScore.tsx

  hooks/
    useVoltaApp.ts

  lib/
    date.ts
    storage.ts

  types/
    app.ts
    habit.ts
```

## Diferencial: Streak De Retorno

O diferencial do Volta é trocar a obsessão por streak perfeito por um streak de retorno.

Um retorno acontece quando existe um dia sem vitória seguido por um dia com vitória. Isso muda o foco: em vez de punir a interrupção, o app valoriza a capacidade de recomeçar.

Exemplo:

```text
Segunda: vitória mínima
Terça: sem vitória
Quarta: vitória mínima
```

Resultado: 1 retorno.

## Próximos Passos Planejados

- Migrar dados antigos do storage inicial, se necessário.
- Melhorar validação dos dados carregados do `localStorage`.
- Permitir edição de hábitos existentes.
- Criar histórico mensal.
- Adicionar visualização de retornos ao longo do tempo.
- Permitir exportar e importar dados.
- Criar tema claro/escuro.
- Transformar em PWA para uso offline mais confortável.
- Adicionar testes para regras de vitória, semana e retornos.
