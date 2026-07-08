# Bulma Admin / Buefy

[Read in English](./README.md)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE) ![Free](https://img.shields.io/badge/price-free-brightgreen)

Bulma Admin / Buefy é um template de painel administrativo construído com Vue 3, Buefy e Bulma. Traz 25 views (dashboard, fluxo de autenticação, apps, páginas utilitárias e uma landing page pública), tema claro e escuro, três idiomas e autenticação simulada, então dá para navegar pelo produto inteiro antes de escrever qualquer backend. O estado fica em stores Pinia, as rotas no Vue Router, e tudo é tipado com TypeScript.

Preview ao vivo: https://template.dev.br/preview/bulma-admin-buefy/

## Views incluídas

25 views de rota em `src/views/`:

- Landing: página pública de marketing com hero, seções de recursos e preços
- Login: formulário de acesso com validação e credenciais de demonstração
- Register: formulário de criação de conta
- Forgot password: solicitação de link de redefinição de senha
- Reset password: definição de nova senha
- Dashboard: cards de KPI com sparklines, gráficos e atividade recente
- Charts: página de analytics com gráficos de barra, área e rosca (ApexCharts)
- Forms: inputs, selects, date picker, dropzone de arquivos e validação inline (VeeValidate + Yup)
- Tables: tabela de dados com ordenação, filtros, paginação e seleção de linhas (TanStack Table)
- Components: catálogo dos componentes base de UI
- UI advanced: modais, abas, toasts e outros widgets compostos
- Typography: escala tipográfica, títulos e utilitários de texto
- Integrations: cards de serviços de terceiros com toggles
- Profile: página do usuário com dados pessoais e atividade
- Pricing: comparação de planos
- Settings: preferências da aplicação, tema e idioma
- Inbox: tela estilo cliente de e-mail com pastas e lista de mensagens
- File manager: listagem de arquivos com pastas e ações
- Gallery: grade de imagens
- Invoice: detalhe de fatura pronto para impressão
- Billing: formas de pagamento e histórico de faturas
- Documentation: página de referência do template dentro do app
- Maintenance: página avulsa de manutenção
- Coming soon: página avulsa de pré-lançamento
- Not found: página de erro 404

## Stack

- Vue 3.5 com `<script setup>` e TypeScript 5.7
- Buefy 3.0 (Buefy para Vue 3) sobre Bulma 1.0.4
- Vite 6 com `vite-plugin-pwa` 1.3 (PWA instalável, cache offline)
- Pinia 3.0 com `pinia-plugin-persistedstate` 4.2
- Vue Router 4.4
- vue-i18n 11.4 (locales en, es, pt-BR)
- ApexCharts 5 via vue3-apexcharts 1.11
- TanStack Vue Table 8.21
- Editor de texto rico Tiptap 3.23
- Validação de formulários com VeeValidate 4.15 + Yup 1.7
- Material Design Icons (@mdi/font 7.4)
- Sass 1.83

## Requisitos

- Node.js 18 ou mais novo
- npm

## Como rodar

```bash
npm install
npm run dev
```

O Vite sobe um servidor de desenvolvimento com hot reload. A autenticação é simulada na store de auth do Pinia, sem backend. Credenciais de demonstração:

- `admin@template.com` / `admin123`
- `user@template.com` / `user123`

## Build de produção

```bash
npm run build
```

Roda a checagem de tipos com `vue-tsc` e gera o bundle de produção em `dist/`. Para inspecionar o build localmente use `npm run preview`.

## Estrutura do projeto

```
src/
├── assets/styles/     app.scss, variables.css, dark.css
├── components/
│   ├── landing/       seções da landing page pública
│   ├── layout/        header, sidebar, footer
│   └── ui/            DataTable, StatsCard, ApexChart, RichTextEditor, FileDropzone, ...
├── composables/       funções de composição compartilhadas
├── i18n/locales/      en.json, es.json, pt-BR.json
├── router/            definição de rotas e guards
├── stores/            auth.ts, menu.ts, ui.ts (Pinia)
└── views/             25 views de rota
```

O arquivo `components.md` na raiz do repositório lista os componentes Buefy usados pelo template, agrupados por categoria.

## Tema e customização

As variáveis Sass do Bulma ficam no topo de `src/assets/styles/app.scss`, antes do `@use 'bulma/bulma'`: `$primary` (#485fc7), `$family-sans-serif` (Inter) e `$radius`. Os tokens de runtime são custom properties CSS com prefixo `--tx-` em `variables.css`: cores semânticas, dimensões de sidebar e header e uma escala de espaçamento. O `dark.css` sobrescreve esses tokens para o tema escuro, que a store de UI alterna em tempo de execução. Para trocar a marca, ajuste `--tx-primary` e `$primary` juntos.

## Internacionalização

Três locales em `src/i18n/locales/`: inglês, espanhol e português do Brasil. O componente `LanguageSwitcher` no header troca o idioma e a escolha fica persistida.

## O mesmo layout em outras stacks

Este repositório é uma das cinco implementações do mesmo layout admin em Bulma. Todas têm as mesmas 25 views e a mesma identidade visual:

- React 19: https://github.com/danilo62x/bulma-admin-react
- Angular 19: https://github.com/danilo62x/bulma-admin-angular
- Laravel 11 + Blade: https://github.com/danilo62x/bulma-admin-laravel
- HTML estático: https://github.com/danilo62x/bulma-admin-html

O catálogo completo de templates gratuitos e pagos está em https://template.dev.br

## Apoie o projeto

Este template é gratuito e licenciado sob MIT. Se ele economizou seu tempo, você pode apoiar o trabalho com uma doação em https://template.dev.br/doar?template=bulma-admin-buefy

## Licença

[MIT](./LICENSE), copyright 2026 Danilo Quinelato.
