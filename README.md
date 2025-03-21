# Aplicativo Pokémon

Este é um aplicativo moderno e responsivo de catálogo de Pokémon, desenvolvido com **Ionic Framework** e **Angular**. O app permite que os usuários naveguem por uma lista de Pokémon, pesquisem por nomes específicos e visualizem informações detalhadas de cada Pokémon.

## Funcionalidades

- **Design Responsivo**: O aplicativo é totalmente responsivo e funciona perfeitamente em dispositivos móveis, tablets e desktops.
- **Barra de Pesquisa**: Uma barra de pesquisa fluída permite filtrar Pokémon por nome, com um efeito de carregamento para melhorar a experiência do usuário.
- **Detalhes dos Pokémon**: Visualize informações detalhadas de cada Pokémon, incluindo altura, peso, tipos e habilidades.
- **Navegação Suave**: Transições suaves entre as páginas utilizando animações do Ionic.
- **Consumo Otimizado da API**: Cache de dados dos Pokémon para reduzir chamadas à API e melhorar o desempenho.

## Pré-requisitos

Antes de rodar o aplicativo, certifique-se de ter os seguintes itens instalados:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Ionic CLI](https://ionicframework.com/docs/cli) (v6 ou superior)
- [Angular CLI](https://angular.io/cli) (v12 ou superior)

## Como Rodar o Aplicativo

Siga os passos abaixo para configurar e rodar o aplicativo localmente:

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/pokemon-app.git
cd pokemon-app
```

### 2. Instale as Dependências

Execute o seguinte comando para instalar as dependências necessárias:

```bash
npm install
```

### 3. Inicie o Aplicativo

Inicie o servidor de desenvolvimento com o comando:

```bash
ionic serve
```

O aplicativo será aberto no navegador padrão no endereço `http://localhost:8100`.

### 4. Build para Produção

Para gerar o build de produção, utilize o comando:

```bash
ionic build
```

Os arquivos prontos para produção estarão disponíveis no diretório `www`.

## Estrutura do Projeto

Aqui está uma visão geral dos principais arquivos e pastas do projeto:

- **src/app/pages/home**: Contém a página inicial onde os usuários podem navegar e pesquisar Pokémon.
- **src/app/pages/details**: Contém a página de detalhes onde os usuários podem visualizar informações detalhadas de um Pokémon selecionado.
- **src/app/services/pokemon.service.ts**: Gerencia as chamadas à API para buscar dados dos Pokémon.
- **src/app/app-routing.module.ts**: Configura o roteamento e a navegação do aplicativo.

## API

Este aplicativo utiliza a [PokéAPI](https://pokeapi.co/) para buscar dados dos Pokémon. Os seguintes endpoints são utilizados:

- **Listar Pokémon**: `https://pokeapi.co/api/v2/pokemon?limit=151`
- **Detalhes do Pokémon**: `https://pokeapi.co/api/v2/pokemon/{id}`

## Capturas de Tela

### Página Inicial

![Página Inicial](https://via.placeholder.com/800x400?text=Página+Inicial)

### Página de Detalhes

![Página de Detalhes](https://via.placeholder.com/800x400?text=Página+de+Detalhes)

## Contribuindo

Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Aproveite para explorar o mundo dos Pokémon! 🎉
