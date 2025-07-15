# Genus Teach App

Um aplicativo moderno de ensino construído com React, TypeScript, Vite e Tailwind CSS.

## 🚀 Tecnologias Principais

- **React 19** - Biblioteca JavaScript para construção de interfaces
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento rápido
- **Tailwind CSS** - Framework CSS utilitário
- **React Router** - Roteamento para aplicações React
- **TanStack Query** - Gerenciamento de estado do servidor
- **Axios** - Cliente HTTP para requisições API
- **Lucide React** - Ícones modernos
- **ESLint** - Linting de código
- **Prettier** - Formatação de código

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout.tsx      # Layout principal
│   ├── Header.tsx      # Cabeçalho
│   └── Footer.tsx      # Rodapé
├── pages/              # Páginas da aplicação
│   ├── HomePage.tsx    # Página inicial
│   ├── AboutPage.tsx   # Página sobre
│   ├── CoursesPage.tsx # Página de cursos
│   ├── ContactPage.tsx # Página de contato
│   └── index.ts        # Exportações das páginas
├── hooks/              # Hooks customizados
│   └── useTheme.ts     # Hook para gerenciar tema
├── services/           # Serviços e APIs
│   └── api.ts          # Configuração do Axios
├── types/              # Definições de tipos TypeScript
│   └── index.ts        # Tipos principais
├── utils/              # Funções utilitárias
│   └── index.ts        # Utilitários diversos
└── App.tsx             # Componente principal
```

## 🛠️ Instalação e Configuração

### Pré-requisitos

- Node.js (versão 22.12.0 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/MatheusMFranco/genus-teach-app.git
   cd genus-teach-app
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   ```bash
   cp .env.example .env
   ```
   Edite o arquivo `.env` com suas configurações.

4. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação:**
   Abra [http://localhost:5173](http://localhost:5173) no seu navegador.

## 📜 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Faz o build da aplicação para produção
- `npm run preview` - Visualiza o build de produção
- `npm run lint` - Executa o ESLint
- `npm run lint:fix` - Executa o ESLint e corrige automaticamente
- `npm run format` - Formata o código com Prettier
- `npm run format:check` - Verifica se o código está formatado
- `npm run type-check` - Verifica os tipos TypeScript

## 🎨 Personalização

### Cores do Tema

As cores estão definidas no arquivo `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
  }
}
```

### Componentes Customizados

O arquivo `src/index.css` inclui classes utilitárias customizadas:

- `.btn-primary` - Botão principal
- `.btn-secondary` - Botão secundário
- `.container` - Container responsivo

## 🔧 Configurações

### ESLint

O projeto usa uma configuração moderna do ESLint com:
- Suporte a TypeScript
- Regras específicas para React
- Integração com Prettier

### Prettier

Formatação de código configurada com:
- Aspas simples
- Ponto e vírgula
- Largura de linha: 80 caracteres

### Vite

Configuração otimizada para:
- Hot Module Replacement (HMR)
- Build rápido
- Suporte a TypeScript

## 🚀 Deploy

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Deploy em Netlify

1. Conecte seu repositório
2. Configure o comando de build: `npm run build`
3. Configure o diretório de publicação: `dist`

### Deploy em Vercel

1. Importe o projeto
2. As configurações são detectadas automaticamente
3. Deploy automático a cada push

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Matheus Franco** - Desenvolvimento Principal - [@MatheusMFranco](https://github.com/MatheusMFranco)

## 🙏 Agradecimentos

- React Team pelo excelente framework
- Vite Team pela ferramenta de build incrível
- Tailwind CSS pela abordagem utilitária
- Comunidade open-source pelos pacotes utilizados

---

Desenvolvido com ❤️ por [Matheus Franco](https://github.com/MatheusMFranco)
