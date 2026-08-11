# Portfólio — Flavio Siqueira

Site em Next.js com o currículo, portfólio de projetos e um assistente de IA
que responde perguntas de recrutadores com base nos seus dados reais.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

O site funciona sem nenhuma configuração extra — só o **chat com IA** precisa
de uma chave de API pra responder (veja abaixo). Sem ela, o resto do site
funciona 100% normalmente.

## Editar seus dados

Tudo que aparece no site (nome, resumo, stack, experiências, projetos,
links de contato) vem de um único arquivo:

```
lib/config.js
```

Abra esse arquivo, troque os valores e salve. Não precisa tocar em mais nada.

**Pendências que você ainda precisa preencher:**
- `linkedin` e `github` — hoje estão como placeholder
- `instituicao` — nome da sua faculdade
- `ingles` — seu nível de inglês
- O 1º bullet da experiência na Mukutu está genérico — ajuste quando tiver
  os detalhes de IA e números que quer destacar

O PDF do currículo faz download do arquivo em `public/curriculo-flavio-siqueira.pdf`.
Se quiser trocar por uma versão mais nova, é só substituir esse arquivo
(mantendo o mesmo nome, ou ajustando `curriculoPdf` em `lib/config.js`).

## Ativar o chat com IA

O chat chama a rota `app/api/chat/route.js`, que faz a chamada à API da
Anthropic **do lado do servidor** — a chave nunca é exposta no navegador de
quem visita o site. Isso é diferente (e mais seguro) do que embutir a chave
direto no HTML.

1. Crie uma chave em **https://console.anthropic.com/settings/keys**
   (conta separada da sua conta do Claude.ai — cobra por uso, geralmente
   centavos por conversa).
2. Copie `.env.local.example` para `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```
3. Cole sua chave real dentro de `.env.local`.
4. Reinicie o servidor (`npm run dev`). O chat já vai responder.

**Nunca** suba o `.env.local` pro GitHub — o `.gitignore` já bloqueia isso
por padrão, mas vale checar antes do primeiro commit.

## Publicar (deploy)

A forma mais simples é a **Vercel** (criadora do Next.js, tem plano grátis):

1. Suba este projeto para um repositório no GitHub (sem o `.env.local`).
2. Entre em **vercel.com** → **Add New Project** → selecione o repositório.
3. Antes de clicar em Deploy, abra **Environment Variables** e adicione:
   - `ANTHROPIC_API_KEY` = sua chave real
4. Clique em **Deploy**. Em ~1 minuto você recebe uma URL pública
   (ex: `flavio-portfolio.vercel.app`), com o chat já funcionando de verdade
   para qualquer visitante.

Se preferir GitHub Pages, Netlify ou outro host: eles não rodam a rota de
API (`app/api/chat`) da mesma forma simples que a Vercel, porque não é um
site 100% estático — precisa de um ambiente que execute Node.js no servidor
(a própria Vercel, Netlify Functions, ou Cloudflare Pages com Functions,
por exemplo).

## Estrutura do projeto

```
app/
  page.js              → página principal (junta todos os componentes)
  layout.js            → fontes e metadata do site
  globals.css          → todo o sistema visual (cores, tipografia, layout)
  api/chat/route.js    → endpoint que fala com a Anthropic (chave protegida)
components/            → um arquivo por seção do site
lib/config.js          → ⚙️ seus dados — edite aqui
public/                → PDF do currículo
```
