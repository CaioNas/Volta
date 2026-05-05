# Volta

> Constância não é sequência perfeita. É a capacidade de recomeçar.

Volta é um app pessoal de constância para registrar hábitos diários, lidar melhor com dias difíceis e acompanhar a semana — sem culpa.

---

## O problema

Apps de hábitos costumam reforçar sequências. Quando você perde um dia, a sensação de progresso desaparece junto com a motivação.

O Volta parte de outra lógica: **constância também é recomeço**. O app valoriza o mínimo possível em dias difíceis e registra quando você conseguiu aparecer por si de novo.

---

## Funcionalidades do MVP

**Registro diário**
- Cadastro local de hábitos com categorias
- Meta normal e meta reduzida para dia difícil
- Marcar e desmarcar hábitos concluídos no dia atual
- Ativar e desativar o modo dia difícil

**Cálculo de vitória**
- Modo normal: pelo menos 2 hábitos concluídos
- Modo dia difícil: pelo menos 1 hábito concluído

**Placar semanal (segunda a domingo)**
- Vitória mínima
- Parcial
- Sem registro

**Estatísticas rápidas**
- Hábitos concluídos hoje
- Vitórias mínimas na semana
- Dias com registro
- Retornos na semana

**Revisão diária**
- Nota, vitórias, bloqueios e mínimo de amanhã

**Gerenciamento de hábitos**
- Criar, pausar, reativar e remover

**Interface**
- Responsiva para mobile e desktop
- Persistência com `localStorage`

---

## O diferencial: streak de retorno

Em vez de punir a interrupção, o Volta valoriza a capacidade de recomeçar.

Um **retorno** acontece quando um dia sem vitória é seguido por um dia com vitória.

```
Segunda: vitória mínima
Terça:   sem vitória
Quarta:  vitória mínima  →  1 retorno
```

Isso muda o foco: a sequência que importa não é a de dias perfeitos, mas a de vezes que você voltou.

---

## Pilha

| Tecnologia | Uso |
|---|---|
| Next.js (App Router) | Framework principal |
| TypeScript | Tipagem |
| Tailwind CSS | Estilização |
| React | Interface |
| `localStorage` | Persistência local |

Sem backend, banco de dados ou bibliotecas de componentes no MVP.

---

## Como rodar localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

```bash
# Validar tipos
npx tsc --noEmit

# Build de produção
npm run build
```

---

## Estrutura de pastas

```
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

---

## Próximos passos

- [ ] Migração e validação dos dados do `localStorage`
- [ ] Edição de hábitos existentes
- [ ] Histórico mensal
- [ ] Visualização de retornos ao longo do tempo
- [ ] Exportar e importar dados
- [ ] Tema claro/escuro
- [ ] PWA para uso offline
- [ ] Testes para regras de vitória, semana e retornos

---

## Licença

Projeto pessoal. Uso livre para aprendizado e inspiração.
