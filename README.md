# Portfólio Profissional

Site de portfólio profissional construído com **Next.js 14**, **Tailwind CSS** e **Framer Motion**.

## Início Rápido

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Acessar em http://localhost:3000
```

## Personalização (em 5 minutos!)

**Todo o conteúdo do site está em um único arquivo:** [`lib/data.ts`](lib/data.ts)

Edite esse arquivo para:
- Seu nome, título e bio
- Links de redes sociais
- Seus projetos (com imagens, links, descrições)
- Seus serviços
- Estatísticas (projetos entregues, clientes, etc.)

### Adicionando sua foto

1. Coloque sua foto em `public/avatar.jpg`
2. No arquivo `components/Hero.tsx`, localize o comentário `When you add your photo` e siga as instruções

### Adicionando screenshots dos projetos

1. Coloque as imagens em `public/projects/nome-do-projeto.png`
2. Atualize o campo `image` em cada projeto no `lib/data.ts`
3. No `components/Projects.tsx`, descomente o componente `<Image>` e remova o placeholder

### Configurando o formulário de contato (EmailJS)

1. Crie uma conta gratuita em [emailjs.com](https://www.emailjs.com/)
2. Crie um serviço e um template de e-mail
3. Cole as credenciais no `lib/data.ts` (campos `emailjs`)

## Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Suba a pasta .next para o Netlify
```

## Estrutura do Projeto

```
├── app/
│   ├── globals.css      # Estilos globais e utilitários
│   ├── layout.tsx       # Layout principal (SEO, fontes)
│   └── page.tsx         # Página principal
├── components/
│   ├── Navbar.tsx       # Barra de navegação responsiva
│   ├── Hero.tsx         # Seção inicial com animações
│   ├── About.tsx        # Sobre mim + habilidades
│   ├── Projects.tsx     # Portfólio com filtros
│   ├── Services.tsx     # Serviços oferecidos
│   ├── Contact.tsx      # Formulário + redes sociais
│   ├── Footer.tsx       # Rodapé
│   └── ThemeProvider.tsx
├── hooks/
│   └── useTypingEffect.ts  # Hook de efeito de digitação
├── lib/
│   ├── data.ts          # ⭐ ARQUIVO PRINCIPAL DE CONFIGURAÇÃO
│   └── utils.ts
└── public/
    ├── avatar.jpg       # Sua foto (adicionar)
    └── projects/        # Screenshots dos projetos
```

## Tecnologias

- **Next.js 14** — Framework React com App Router
- **Tailwind CSS** — Estilização utility-first
- **Framer Motion** — Animações fluidas
- **next-themes** — Dark/Light mode
- **EmailJS** — Formulário de contato sem backend
- **Lucide React** — Ícones modernos
