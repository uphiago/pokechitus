# Pokecheetos

Aplicação web de Pokédex (1ª geração) construída com React + TypeScript, com busca, filtros, paginação, tela de detalhes e favoritos persistidos em `localStorage`.

## Funcionalidades

- Catálogo dos 151 Pokémons originais.
- Busca por nome com atualização imediata da lista.
- Filtro por tipo.
- Paginação com preservação do estado na URL (`q`, `type`, `page`).
- Tela de detalhe por Pokémon (`/pokemon/:id`) com cadeia evolutiva, matchup de tipos (fraquezas, resistências e imunidades), flavor text e marcação de lendário/mítico.
- Favoritar/desfavoritar tanto na lista quanto no detalhe.
- Persistência de favoritos no navegador com aviso quando a persistência falha.
- Estados de UX para carregamento, erro recuperável, vazio e parcial/degradado.

## Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Vitest + Testing Library
- ESLint

## Estrutura

- `src/api/`: chamadas HTTP para PokeAPI.
- `src/adapters/`: normalização dos payloads externos.
- `src/domain/`: tipos e regras de domínio.
- `src/state/`: hooks de query e stores locais (sessão de busca e favoritos).
- `src/ui/`: componentes e páginas.
- `src/routes/`: definição de rotas.
- `tests/unit/`: testes unitários.
- `tests/integration/`: fluxos de integração da UI.
- `specs/001-pokemon-search-details/`: especificação, plano, tarefas e checklist da feature.

## Como rodar

Pré-requisitos:

- Node.js 20+
- npm 10+

Instalação e execução:

```bash
npm install
npm run dev
```

O Vite exibirá a URL local (normalmente `http://localhost:5173`).

## Variáveis de ambiente

Copie o arquivo de exemplo e ajuste se necessário:

```bash
cp .env.example .env
```

Variável disponível:

- `VITE_POKEAPI_BASE_URL` (default: `https://pokeapi.co/api/v2`)

## Qualidade e validação

```bash
npm run test:run
npm run lint
npm run build
```

Cobertura atual de testes:

- Integração: fluxo de browse (render, filtro e favoritos), detalhe e favoritos.
- Unidade: adapters e selectors de sessão/persistência.
- Budget placeholder: metas base de tamanho de rota/render para acompanhamento.

## Referências úteis

- Especificação da feature: `specs/001-pokemon-search-details/spec.md`
- Quickstart da feature: `specs/001-pokemon-search-details/quickstart.md`
- Ownership de módulos `src/`: `src/README.md`
