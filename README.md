# 🎮 TesteBSN Pokémon API

> **Aplicação Ionic + Angular** que consome dados da PokéAPI para listar, visualizar detalhes e gerenciar favoritos de Pokémon

## 🚀 Funcionalidades

- 📄 **Listagem paginada** de Pokémon (20 por página)
- 🔍 **Busca por nome** em tempo real
- 📋 **Detalhes completos** com 6+ informações
- 🎬 **Slideshow cinematográfico** dos sprites
- 🌈 **Cores dinâmicas** baseadas na espécie
- ⭐ **Sistema de favoritos** com persistência local
- 📱 **100% responsivo** (mobile-first)
- ⚡ **Performance otimizada** com cache

## 🛠️ Tecnologias

- **Ionic 7.x** - Framework mobile-first
- **Angular 16.x** - Framework frontend
- **TypeScript 5.x** - Linguagem principal
- **PokéAPI** - API de dados Pokémon

## 📦 Instalação

```bash
# Clone e instale
git clone git@github.com:joaofilhox/TesteBSNPokeAPI.git
cd TesteBSNPokeAPI
npm install

# Execute
ionic serve
```

**Acesse:** `http://localhost:8100` 🌐

## 🎯 Como Usar

### 🏠 **Página Inicial**
- Visualize a lista paginada de Pokémon
- Use a barra de busca para encontrar Pokémon
- Clique em um card para ver os detalhes

### 📋 **Detalhes do Pokémon**
- Navegue pelos sprites com controles cinematográficos
- Visualize estatísticas em gráficos de barras
- Adicione/remova dos favoritos
- Explore informações completas

### ⭐ **Favoritos**
- Acesse via botão no header
- Gerencie sua lista de Pokémon favoritos
- Remova itens com um clique

## 🏗️ Estrutura

```
src/app/
├── home/                 # 🏠 Página principal
├── pokemon-details/      # 📋 Detalhes do Pokémon
├── pokemon-favorites/    # ⭐ Lista de favoritos
├── models/              # 📊 Interfaces TypeScript
└── services/            # 🔧 Serviços Angular
```

## 🔧 Serviços

- **PokemonService** - Consome PokéAPI, gerencia paginação e cache
- **FavoritesService** - Gerencia favoritos com localStorage

## 🧪 Testes

### ✅ **Cobertura Completa**
- **44 testes** executados com sucesso
- **100% das funcionalidades** testadas
- **Isolamento completo** entre testes

### 📊 **Módulos Testados**
- **🏠 Home Page** (12 testes) - Listagem, busca, paginação
- **📋 Pokemon Details** (15 testes) - Detalhes, slideshow, cores
- **⭐ Pokemon Favorites** (6 testes) - CRUD, navegação
- **🔧 Serviços** (11 testes) - HTTP, localStorage

### 🚀 **Executar Testes**
```bash
npm test           # Executar todos os testes
npm run test:watch # Modo watch
```

## 🚀 Scripts

```bash
# Desenvolvimento
npm start          # Servidor de desenvolvimento
ionic serve        # Servidor Ionic

# Build
npm run build      # Build de produção

# Testes
npm test           # Executar testes
npm run lint       # Linting
```

## 🎯 API Utilizada

### **Endpoints**
- `GET /pokemon` - Lista paginada
- `GET /pokemon/{id}` - Detalhes completos
- `GET /pokemon-species/{id}` - Dados de espécie

### **Dados Obtidos**
- 📊 Estatísticas base
- 🎨 Cores de espécie
- 🖼️ Sprites (front/back, shiny)
- 📝 Informações detalhadas

## 🎨 Design

- 🎨 **Cores dinâmicas** baseadas no tipo do Pokémon
- 🌈 **Gradientes automáticos** sem flash
- 📱 **Mobile-first** design responsivo
- 🎭 **Animações suaves** e transições
- ⚡ **Loading states** e tratamento de erros

## 🐛 Troubleshooting

### **Erro de Build**
```bash
npm run clean
rm -rf node_modules
npm install
```

### **Problemas de API**
- Verifique conexão com internet
- API pode estar temporariamente indisponível

### **Problemas nos Testes**
```bash
npm run test:clean
npm install
npm test -- --watch=false
```

## 🤝 Contribuição

1. 🍴 Fork o projeto
2. 🌿 Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. 💾 Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. 📤 Push para a branch (`git push origin feature/nova-funcionalidade`)
5. 🔄 Abra um Pull Request

### **Padrões de Teste**
- ✅ Adicione testes para novas funcionalidades
- ✅ Mantenha isolamento entre testes
- ✅ Execute `npm test` antes do commit

## 👨‍💻 Autor

**joaofilhox** - Desenvolvimento de aplicações web e mobile

---

## 🎉 Pronto para usar!

Aplicação Pokémon completa, funcional e **100% testada**! 🚀

```bash
ionic serve
```

*Desenvolvido com ❤️ usando Ionic + Angular + PokéAPI* 
