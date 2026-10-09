# 📖 Manual Descomplicado: O Dublê de Cinema e as Simulações com Cypress

> **Para quem é este manual?**  
> Este documento foi escrito para pessoas leigas que querem entender o que significa "mockar dados", interceptar a internet e testar sites modernos usando o Cypress, sem complicação e com exemplos divertidos!

---

## 🎬 A Analogia do Dublê de Cinema: O que é Mockar (`cy.intercept`)?

Imagine que um diretor de cinema precisa filmar uma cena onde um helicóptero explode e cai em um lago:

```text
  [ O DIRETOR / TESTADOR ]               [ O DUBLÊ / MOCK ]             [ A TELA DE CINEMA ]
  "Quero ver como o ator reage"  ====>  Usa um efeito especial falso  ====>  O público vê a cena
                                         em vez de explodir um              perfeita sem ninguém
                                         helicóptero de verdade!              se machucar!
```

Na programação de testes, isso se chama **Mock** (uma imitação ou simulação):
- Em vez de depender de um servidor de verdade que pode estar lento, sem internet ou fora do ar, **o robô do Cypress intercepta a conversa no ar**.
- O site pede: *"Servidor, me dê a lista de notícias!"*
- O Cypress entra no meio do caminho como um dublê e diz: *"Toma aqui essa lista de notícias de mentira que eu mesmo preparei!"*

👉 **Por que isso é genial?**  
Porque podemos testar situações extremas com segurança:
- E se o servidor quebrar e der **Erro 500**? A tela fica branca e trava ou mostra um aviso educado para o usuário?
- E se não houver nenhuma notícia publicada hoje? A tela fica bonita com a mensagem *"Nenhum artigo encontrado"*?

---

## 🗺️ Mapa do Projeto: O que faz cada pasta e arquivo?

```text
03-web-cypress/
├── cypress/
│   ├── e2e/                     ➡️ "Os Cenários de Teste no Blog Conduit"
│   │   ├── auth.cy.ts           ➡️ Testes de Entrada e Login
│   │   ├── article-crud.cy.ts   ➡️ Publicação e Leitura de Artigos
│   │   └── api-mock.cy.ts       ➡️ O Laboratório de Simulações e Efeitos Especiais
│   ├── fixtures/                ➡️ "A Gaveta de Cenários Prontos (Textos Falsos)"
│   │   ├── users.json           ➡️ Documentos e crachás de mentira
│   │   └── articles.json        ➡️ Textos de artigos e etiquetas simuladas
│   └── support/                 ➡️ "Os Atalhos Mágicos do Robô"
│       ├── commands.ts          ➡️ Comandos inventados para facilitar a vida
│       └── e2e.ts               ➡️ Configurações de sobrevivência do robô
├── cypress.config.ts            ➡️ "A Central de Comando do Cypress"
└── package.json                 ➡️ "As Peças e Ferramentas Instaladas"
```

---

## 🔍 Entendendo os Arquivos em Detalhes

### 1. `cypress/fixtures/` — A Gaveta de Cenários Prontos
Imagine uma caixa cheia de roteiros de teatro prontos:
- **`users.json`:** Guarda o perfil de um usuário perfeito com nome, foto e crachá VIP simulado.
- **`articles.json`:** Guarda o texto de uma matéria pronta sobre tecnologia, para o robô não precisar digitar um artigo inteiro do zero todas as vezes.

---

### 2. `cypress/support/commands.ts` — Os Atalhos Mágicos
Em vez de ensinar o robô a clicar em 10 lugares toda vez que ele quiser fazer login, nós criamos um "atalho mágico" chamado `cy.loginViaSession()`.  
Com apenas uma palavra, o robô já pula a catraca da entrada e cai direto logado dentro do site, economizando tempo precioso!

---

### 3. `cypress/e2e/auth.cy.ts` — A Portaria do Blog
Testa se a tela de login se comporta bem:
- O robô digita senha errada ➡️ O Cypress simula a recusa do servidor e confere se a tela mostra a caixinha vermelha dizendo que a senha não confere.
- O robô digita a senha certa ➡️ O Cypress simula o sucesso e confere se o nome do autor aparece no topo do site.

---

### 4. `cypress/e2e/article-crud.cy.ts` — O Escritor de Matérias
Testa o fluxo de publicação do blog:
1. O robô clica em **"New Article"** (Novo Artigo).
2. Digita o título, o resumo, o corpo do texto e adiciona etiquetas (como `#cypress`, `#automation`).
3. Clica em publicar e confere se a página final abre com o texto formatado e a área de comentários pronta para receber opiniões.

---

### 5. `cypress/e2e/api-mock.cy.ts` — O Laboratório de Efeitos Especiais
Este é o arquivo mais impressionante do projeto! Ele testa situações que seriam quase impossíveis de reproduzir manualmente:
- **Simulação 1 (Etiquetas Falsas):** O robô troca as palavras mais lidas do site por etiquetas personalizadas (`playwright`, `cypress`, `k6`) e confere se elas aparecem certinhas na barra lateral.
- **Simulação 2 (O Servidor em Chamas - Erro 500):** O robô finge que o servidor explodiu com erro 500. Ele confere se o site continua de pé, sem sumir com o menu de navegação e sem dar tela branca de susto no cliente!
- **Simulação 3 (Blog Vazio):** O robô finge que não existe nenhuma notícia no banco de dados e confere se a tela exibe a frase simpática: *"No articles are here... yet."* (Nenhum artigo por aqui... ainda).
