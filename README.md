<div align="center">

# Paylytics

**Real-time payment analytics SaaS dashboard for fintech operations**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql&logoColor=white)](https://neon.tech)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

Plataforma SaaS de monitoramento e análise de transações financeiras em tempo real.
Inspirada em produtos como **Stripe**, **Brex** e **Ramp** — visual premium, arquitetura
escalável e auth de nível de produção.

</div>

---

## ✨ Highlights

- 🔐 **Auth real de produção** — bcrypt (12 rounds) + JWT assinado (HS256, `jose`) em cookie **httpOnly + SameSite=Lax**, com middleware Edge protegendo rotas.
- 📊 **Dashboard com dados reais** — KPIs, séries temporais, share por método/país e insights gerados dinamicamente a partir do banco.
- 🗄️ **PostgreSQL + Prisma** — schema completo (`User`, `Transaction`, `Analytics`), migrations versionadas, seed determinístico com 280 transações.
- ⚡ **Server Components + cache em camadas** — `React.cache()` para dedupe por request e `unstable_cache` com revalidate 30s para agregações pesadas.
- 🎨 **Design system dark premium** — glassmorphism, animações sutis, tipografia Inter, 100% responsivo.
- 🏗 **Arquitetura clara** — separação física `frontend/` (UI client) e `backend/` (dados, auth, lib server), `app/` para rotas do Next.

---

## 🧱 Stack

| Camada      | Tecnologia |
|-------------|------------|
| Framework   | **Next.js 14** (App Router, RSC, Edge middleware) + React 18 |
| Linguagem   | **TypeScript** com `strict: true` |
| Estilo      | **Tailwind CSS** + `tailwind-merge` + `clsx` |
| Gráficos    | **Recharts** |
| Ícones      | **Lucide React** |
| Formulários | **React Hook Form** + **Zod** |
| ORM         | **Prisma 5** |
| Banco       | **PostgreSQL** (Neon serverless, region `sa-east-1`) |
| Auth        | **bcryptjs** + **jose** (JWT HS256) + httpOnly cookies |
| Datas       | **date-fns** com locale `pt-BR` |

---

## 🗂 Estrutura do projeto

```
paylytics/
├── app/                          # Next.js App Router (rotas)
│   ├── (auth)/                   # Login & Signup (route group, sem auth)
│   ├── (dashboard)/              # Dashboard / Analytics / Transactions / Settings
│   │   ├── layout.tsx            # Server: verifica sessão, busca user
│   │   └── loading.tsx           # Skeleton compartilhado
│   ├── api/
│   │   ├── auth/                 # login / signup / logout / me
│   │   ├── transactions/         # GET com filtros server-side
│   │   └── analytics/            # GET agregações pre-computadas
│   ├── icon.svg                  # Favicon (gradient + bars)
│   ├── layout.tsx                # Root layout (Inter font, dark theme)
│   └── page.tsx                  # Landing page
│
├── frontend/                     # UI / Client
│   ├── components/
│   │   ├── ui/                   # Button, Card, Badge, Input, Table, Avatar, Skeleton
│   │   ├── charts/               # Area, Approval, PaymentMethods, MonthlyTrends
│   │   ├── dashboard/            # KpiCard, InsightCard, CountryList, RecentTransactions
│   │   ├── transactions/         # TransactionsTable (busca + filtros + paginação)
│   │   ├── analytics/            # PeriodFilter
│   │   ├── settings/             # SettingsSections (perfil, prefs, segurança, etc.)
│   │   ├── layout/               # AppShell, Sidebar, Topbar, PageHeader
│   │   ├── landing/              # LandingNav, DashboardPreview
│   │   └── brand/                # Logo
│   └── hooks/
│       └── use-session.ts        # Hook cliente que consulta /api/auth/me
│
├── backend/                      # Servidor / Dados / Auth
│   ├── lib/
│   │   ├── auth/
│   │   │   ├── jwt.ts            # sign/verify JWT (Edge-compatible)
│   │   │   ├── password.ts       # bcryptjs hash/compare
│   │   │   └── session.ts        # getCurrentUser (React.cache), cookies
│   │   ├── data/
│   │   │   ├── transactions.ts   # Queries + unstable_cache
│   │   │   └── dashboard.ts      # Agregações + unstable_cache
│   │   ├── prisma.ts             # Prisma client singleton
│   │   ├── auth-schemas.ts       # Zod schemas (login/signup)
│   │   ├── mock-data.ts          # Gerador determinístico (só pro seed)
│   │   └── utils.ts              # cn, formatters
│   ├── prisma/
│   │   ├── schema.prisma         # User, Transaction, Analytics
│   │   ├── migrations/           # Versionadas
│   │   └── seed.ts               # 280 transações + 12 meses de analytics
│   └── types/
│       └── index.ts              # Tipos de domínio compartilhados
│
├── middleware.ts                 # Edge: protege rotas + redireciona auth
├── tailwind.config.ts            # Brand tokens, animações, glassmorphism
├── tsconfig.json                 # Path aliases @/components → frontend/, @/lib → backend/, etc.
└── next.config.mjs
```

---

## 🔐 Como funciona a autenticação

```
                    POST /api/auth/login
                    { email, password }
                            │
                            ▼
                  ┌───────────────────┐
                  │ Zod validate body │
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ prisma.user.find  │
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ bcrypt.compare    │
                  └─────────┬─────────┘
                            ▼
                  ┌───────────────────┐
                  │ jose: sign JWT    │  payload: { sub, iat, exp }
                  └─────────┬─────────┘
                            ▼
                  Set-Cookie: paylytics_session=<JWT>;
                              HttpOnly; SameSite=Lax;
                              Secure (prod); 7 days
```

A cada navegação para rota protegida:

1. **Middleware Edge** lê o cookie, valida a assinatura JWT com `jose`. Sem cookie/inválido → redirect para `/login?next=<rota>`.
2. **Layout server component** chama `getCurrentUser()` (envolvido em `React.cache()` — 1 query por request, não importa quantas vezes seja chamado).
3. **Pages** recebem o user via prop ou via `getCurrentUser()` direto.
4. **Logout** zera o cookie via `Set-Cookie` com `Max-Age=0`.

JWT contém **apenas o user id** (`sub`) — nome/email/role vêm do banco a cada request via `cache()`, garantindo que mudanças de perfil reflitam imediatamente sem precisar re-emitir tokens.

---

## ⚡ Estratégia de performance

| Camada | Mecanismo | Efeito |
|--------|-----------|--------|
| Per-request | `React.cache()` em `getCurrentUser` | Dedupe — layout + page chamando = 1 query |
| Cross-request | `unstable_cache` (revalidate 30s) em agregações | Próximas 30s servidas em memória (~5ms) |
| UI feedback | `loading.tsx` no route group | Skeleton instantâneo enquanto o server processa |
| Network | Pages como Server Components com Prisma direto | Sem round-trip extra para `/api` interno |

> 📌 Cold start do Neon free tier (~1-3s após idle) é o único limite real — paid plan ou Vercel Postgres elimina.

---

## 🚀 Setup local

**Pré-requisitos:** Node 20+, npm, conta no [Neon](https://neon.tech) (free tier serve).

```bash
# 1. Clone + instale
git clone https://github.com/Murilo-Alvim/Paylytics.git
cd Paylytics
npm install

# 2. Variáveis de ambiente
cp .env.example .env
# Edite com sua DATABASE_URL do Neon
# Gere um JWT_SECRET seguro:
#   node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"

# 3. Migrations + seed
npx prisma migrate dev --name init
npm run db:seed

# 4. Dev server
npm run dev
# → http://localhost:3000
```

### Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Servidor de desenvolvimento (hot reload) |
| `npm run build` | Build de produção |
| `npm start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run prisma:generate` | Gera Prisma client |
| `npm run prisma:migrate` | Aplica migrations em dev |
| `npm run prisma:studio` | Abre Prisma Studio em :5555 |
| `npm run db:seed` | Popula o banco (280 tx + 12 meses analytics) |

---

## 🧪 Conta demo

Após rodar o seed:

```
e-mail:  muriloalvim16@gmail.com
senha:   Demo1234
```

Ou crie sua própria conta em `/signup` (Zod exige 8+ chars, 1 maiúscula, 1 número).

---

## 🌍 Deploy

### Vercel (recomendado)

1. Push para o GitHub (este repo).
2. Importe em [vercel.com/new](https://vercel.com/new) → seleciona o repo.
3. Configure as env vars:
   - `DATABASE_URL` (pooled connection do Neon)
   - `DIRECT_URL` (direct connection — para migrations)
   - `JWT_SECRET` (string aleatória de 48+ bytes)
   - `NEXT_PUBLIC_APP_URL` (URL do deploy)
4. Build command: padrão (`next build`). Vercel detecta Next.js.
5. Deploy.

### Neon (PostgreSQL)

1. Crie projeto em [neon.tech](https://neon.tech) — região recomendada: `AWS sa-east-1` (São Paulo).
2. Copie as duas connection strings (**pooled** e **direct**) e cole nas env vars.
3. Rode `npx prisma migrate deploy` no Vercel build hook ou localmente.

---

## 🛣 Roadmap

- [ ] OAuth (Google/GitHub) via NextAuth.js ou Lucia
- [ ] 2FA com TOTP
- [ ] Reset de senha por e-mail (Resend)
- [ ] Webhooks com verificação HMAC
- [ ] Exportação CSV/PDF dos relatórios
- [ ] Filtros server-side com URL state em `/transactions`
- [ ] Detalhes da transação em drawer com timeline
- [ ] Rate limit (Upstash Redis) nas API routes
- [ ] Testes (Vitest + Playwright)
- [ ] Insights via LLM com tool use (analisando agregados)
- [ ] i18n com `next-intl`

---

## 🎨 Design tokens

| Token | Valor |
|-------|-------|
| `background.DEFAULT` | `#05070d` |
| `background.surface` | `#0a0e1a` |
| `background.elevated` | `#0f1525` |
| `brand.500` | `#3b63f5` (primary blue) |
| `info.DEFAULT` | `#06b6d4` (cyan accent) |
| `success` / `warning` / `danger` | semáforo de status |
| Tipografia | Inter (variable, latin) |
| Raio padrão | `xl` (12px) / `2xl` (16px) |
| Glassmorphism | `bg-background-surface/70` + `backdrop-blur-xl` |

---

<div align="center">

**Feito por [Murilo Alvim](https://github.com/Murilo-Alvim)** · Projeto pessoal de portfólio

</div>
