# 🌲 03-web-cypress | Automação Web E2E com Cypress, TypeScript & Network Mocking

Módulo de testes automatizados Web End-to-End (E2E) estruturado com **Cypress**, **TypeScript**, **App Actions** e uso extensivo de interceptação de tráfego de rede via **`cy.intercept()`** para testes resilientes, independentes de instabilidade de backend e com validação de erros 500 e mock de dados.

---

## 🎯 Aplicação Alvo
- **Nome:** Conduit RealWorld App (Medium Clone)
- **URL Base:** `https://demo.realworld.io/`

---

## 🏗️ Arquitetura do Projeto

```text
03-web-cypress/
├── cypress/
│   ├── e2e/                      # Cenários de teste E2E
│   │   ├── auth.cy.ts            # Autenticação com interceptação de requisições de login
│   │   ├── article-crud.cy.ts    # Fluxos de publicação e leitura de artigos
│   │   └── api-mock.cy.ts        # Mocks avançados (tags, feed, erro 500 e estado vazio)
│   ├── fixtures/                 # Massas estáticas e contratos simulados
│   │   ├── users.json            # Credenciais e respostas mockadas de usuário
│   │   └── articles.json         # Payloads de artigos e listas de tags
│   └── support/                  # Configurações globais e comandos customizados
│       ├── commands.ts           # Custom commands (cy.login, cy.loginViaSession, intercept helpers)
│       └── e2e.ts                # Inicialização do Cypress e tratamento de exceções
├── cypress.config.ts             # Configurações do Cypress (baseUrl, timeouts, retries)
├── tsconfig.json                 # Configurações de tipagem TypeScript para Cypress
├── package.json                  # Scripts e dependências
└── README.md                     # Documentação técnica do módulo
```

---

## 💡 Destaques de Engenharia e Boas Práticas (SDET)

1. **Network Interception & Mocking (`cy.intercept()`):**
   - Não depende da disponibilidade de bancos de dados voláteis de aplicações demo públicas.
   - Simulação precisa de códigos de status de erro (ex: `422 Unprocessable Entity` e `500 Internal Server Error`).
   - Mocking de tags na sidebar e de feeds customizados diretamente via fixtures.
2. **App Actions & Session Injection:**
   - Possibilidade de autenticação rápida injetando dados de sessão/token no `localStorage`, reduzindo tempo de execução e eliminando passos repetitivos em telas de login.
3. **Resiliência e Tratamento de Exceções:**
   - Tratamento de exceções não críticas de scripts de terceiros via manipulador `uncaught:exception`.

---

## 📋 Cenários de Teste Cobertos

### 🔐 Autenticação (`cypress/e2e/auth.cy.ts`)
| ID | Cenário | Objetivo |
|---|---|---|
| **TC-AUTH01** | Tela de Login | Valida renderização dos campos de email, senha e botão de submissão |
| **TC-AUTH02** | Credenciais Inválidas | Intercepta `POST /api/users/login`, simula status 422 e valida exibição da mensagem de erro |
| **TC-AUTH03** | Login com Sucesso | Simula autenticação com sucesso, valida redirecionamento e exibição do usuário na navbar |

### 📝 Gestão de Artigos (`cypress/e2e/article-crud.cy.ts`)
| ID | Cenário | Objetivo |
|---|---|---|
| **TC-ART01** | Criação de Artigo | Preenchimento do formulário de criação com tags, intercepta `POST /api/articles` e valida payload e visualização |
| **TC-ART02** | Leitura de Artigo | Visualização de artigo com tags, corpo em markdown e área de comentários |

### 🧪 Mocking e Interceptação (`cypress/e2e/api-mock.cy.ts`)
| ID | Cenário | Objetivo |
|---|---|---|
| **TC-MCK01** | Mock de Popular Tags | Intercepta `GET /api/tags`, injeta tags personalizadas (`cypress`, `k6`, `sdet`) e valida renderização |
| **TC-MCK02** | Mock de Feed Global | Injeta artigos simulados a partir de fixture e valida integridade dos cards na tela |
| **TC-MCK03** | Simulação de Erro 500 | Simula falha crítica no backend e garante que a UI degrada graciosamente sem travar a tela |
| **TC-MCK04** | Mock de Feed Vazio | Valida renderização da mensagem amigável de estado vazio |

---

## 🚀 Como Executar

### 1. Instalação das Dependências
```bash
cd 03-web-cypress
npm install
```

### 2. Execução dos Testes
- **Executar todos os testes em modo headless:**
  ```bash
  npm test
  # ou
  npm run cypress:run
  ```

- **Abrir a interface interativa do Cypress (Test Runner):**
  ```bash
  npm run cypress:open
  ```
