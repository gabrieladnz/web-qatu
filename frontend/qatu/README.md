# Documentação do Frontend - Qatu

Esse documento fornece instruções detalhadas para configurar e executar o frontend do projeto Qatu.

## Índice
- [Requisitos de Software](#requisitos-de-software)
- [Instalação](#instalação)
- [Configuração do ambiente](#configuração-do-ambiente)
- [Comandos para executar o Front-End](#comandos-para-executar-o-frontend)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Solução de problemas](#solução-de-problemas)

## Requisitos de Software

Para que o Front-End funcione corretamente, é necessário ter os seguintes softwares instalados:

| Requisito | Versão | Descrição |
|-----------|--------|-----------|
| Node.js   | 16.x ou superior | Ambiente de execução JavaScript |
| npm       | 8.x ou superior | Gerenciador de pacotes do Node |
| Angular CLI | 16.x ou superior | Framework e ferramentas CLI |
| TypeScript | 5.0 ou superior | Linguagem de programação |

## Instalação

Siga eses passos para configurar o ambiente do Front:

1. Clone o repositório:
   ```bash
   git clone https://gitlab.com/jala-university1/cohort-2/oficial-pt-desenvolvimento-de-software-4-cssd-245.ga.t1.25.m2/se-o-b/capstones/grupo-4.git

   cd frontend/qatu
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Instale o Angular CLI globalmente (se não tiver):
   ```bash
   npm install -g @angular/cli
   ```

## Configuração do ambiente

1. Verifique o arquivo `src/app/environments/environment.ts` para configurações de desenvolvimento:
   ```typescript
   export const environment = {
     production: false,
     baseUrl: 'http://localhost:5000/api',
   };
   ```

## Comandos para executar o Front-End

### Ambiente de desenvolvimento

Para iniciar o servidor:

```bash
# Método padrão
ng serve

# OU
npm run start
```

Acesse o aplicativo em `http://localhost:4200/`.

### Executando testes

Para executar os testes unitários:

```bash
# Executa testes com Karma
ng test

# OU
npm run test
```

### Outros comandos úteis

```bash
# Gerar componentes, serviços, etc
ng generate component nome-do-componente
ng generate service nome-do-servico
ng generate module nome-do-modulo

# Verificar a versão do Angular CLI
ng version
```

## Estrutura do projeto

```
qatu/
├── angular.json          # Configuração do Angular
├── package.json          # Dependências e scripts
├── package-lock.json     # Versões exatas das dependências
├── public                # Arquivos públicos
├── README.md             # Essa documentação
├── tsconfig.json         # Configuração do TypeScript
├── tsconfig.app.json     # Configuração do TypeScript pra a aplicação
├── tsconfig.spec.json    # Configuração do TypeScript pra testes
└── src/                  # Código-fonte da aplicação
    ├── app/              # Componentes e lógica da aplicação
    │   ├── app.component.html    # Template componente principal
    │   ├── app.component.scss    # Estilos do componente principal
    │   ├── app.component.ts      # Lógica do componente principal
    │   ├── app.component.spec.ts # Testes do componente principal
    │   ├── app.config.ts         # Configurações da aplicação
    │   ├── app.routes.ts         # Rotas da aplicação
    │   ├── core                  # Funcionalidades centrais
    │   ├── environments          # Configurações de ambiente
    │   ├── pages                 # Componentes de páginas
    │   └── shared                # Componentes compartilhados
    ├── index.html        # Página principal HTML
    ├── main.ts           # Ponto de entrada da aplicação
    └── styles.scss       # Estilos globais
```
