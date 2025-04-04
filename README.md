# Documentação sobre Commits e Pull Requests

## Padrão de Nomenclatura das Branches

Para manter organização no fluxo de desenvolvimento, utilizaremos um padrão para nomear as branches:

- `nome-autor/docs/referência-da-task`

- `nome-autor/feat/referência-da-task`

- `nome-autor/fix/referência-da-task`

- `nome-autor/perf/referência-da-task`

## Tipos de Commits

Para manter um histórico de commits organizado e padronizado, utilizaremos as seguintes convenções:

- **docs**: Apenas mudanças na documentação.
  
  ```sh
  docs: atualizar documentação sobre autenticação
  ```

- **feat**: Adiciona uma nova funcionalidade.
  
  ```sh
  feat: adicionar validação de senha no cadastro de usuário
  ```

- **fix**: Corrige um bug.
  
  ```sh
  fix: corrigir erro na exibição do modal de login
  ```

- **perf**: Modifica o código para melhorar a performance.
  
  ```sh
  perf: otimizar carregamento de imagens no dashboard
  ```

- **refactor**: Refatora o código sem adicionar funcionalidades nem corrigir bugs.
  
  ```sh
  refactor: simplificar função de formatação de datas
  ```

- **style**: Altera a formatação do código sem impactar sua funcionalidade (espaços, ponto e vírgula, etc.).
  
  ```sh
  style: remover console.log desnecessário
  ```

- **test**: Adiciona ou corrige testes.
  
  ```sh
  test: adicionar testes para o serviço de autenticação
  ```

## Boas Práticas para Commits

### 1. Utilize Commits Atômicos

Commits atômicos referem-se a mudanças pequenas e concisas. Evite agrupar diversas alterações em um único commit, pois isso dificulta a rastreabilidade e o rollback caso seja necessário. Exemplo:

**Ruim (commit bomba)**:

```sh
commit -m "Implementação do formulário de cadastro de clientes"
```

**Bom (commits atômicos)**:

```sh
feat: cria estrutura HTML do formulário
feat: implementa validações dos campos
feat: aplica estilos ao formulário
fix: corrigi erro na validação do CNPJ
```

Isso facilita a identificação de mudanças e o rastreamento de bugs no código.

### 2. Siga um Padrão de Mensagens de Commit

Utilizar um padrão ajuda a organizar o histórico de commits e facilita futuras buscas. Um bom formato inclui:

- **Tipo do commit** (feat, fix, refactor, etc.).

- **Escopo** (opcional) — qual parte do código foi alterada.

- **Mensagem descritiva** sobre a mudança.

Exemplo:

```sh
feat(client): adiciona validação nos campos do cadastro
```

Para commits mais detalhados, use múltiplas linhas:

```sh

git commit -m "feat(client): lógica de validação dos campos no cadastro de clientes

Criação da lógica de validação dos campos utilizando express-validator. 
Para os campos Nome Fantasia, CNPJ, Endereço e Razão Social foi utilizado 
uma validação de notEmpty."

```

Isso melhora a compreensão do histórico e evita mensagens genéricas como "Correções de code review".

### 3. Evite Commits Genéricos

**Exemplos de mensagens ruins:**

```sh
commit -m "Ajustes gerais"
commit -m "Correções diversas"
commit -m "Refatoração do código"
```
Essas mensagens não indicam claramente o que foi alterado. Prefira mensagens explicativas e organizadas.

### 4. Processo de Criar um Commit

1. **Fazer as alterações no código**.

2. **Adicionar os arquivos modificados** ao stage:

   ```sh
   git add .
   ```

3. **Criar o commit com a convenção correta**:
 
   ```sh
   git commit -m "feat: setup tag release workflow"
   ```

4. **Enviar as alterações para o repositório remoto**:

   ```sh
   git push origin minha-branch
   ```

## Criando um Pull Request (PR)

1. Após enviar as alterações para a branch remota, acesse o repositório no GitHub.

2. Clique em **New Pull Request**.

3. Selecione a branch de origem e a branch de destino (geralmente `main`).

4. Preencha a descrição seguindo a estrutura:

   ```
   ## Descrição

   Breve explicação sobre o que foi feito.
   
   ## Changes

   - feat: setup tag release workflow
   - fix: corrigi erro de autenticação
   - refactor: melhora estrutura de componentes
   - style: ajusta espaçamento entre botões
   
   ## Notes

   Observação sobre algo a ser destacado caso haja alguma excepcionalidade.
   
   ## Preview

   Imagens de pré-visualização da implementação podem ser incluídas aqui.
   
   ## Close

   Referência da tarefa correspondente ao commit.
   ```

5. **Criar o PR e aguardar revisão**.

6. Se aprovado, realizar o merge e deletar a branch, se necessário.

## Exemplo de Pull Request

**Branch Criada:**

   ```
   joao/feat/1234-adiciona-autenticacao
   ```

**Commit realizado:**

   ```sh
   git commit -m "feat: implementa sistema de autenticação com JWT"
   ```

**Descrição do Pull Request:**

   ```
   ## Descrição

   Implementação do sistema de autenticação utilizando JWT. O objetivo desta feature é garantir que apenas usuários 
   autenticados possam acessar áreas protegidas do sistema, garantindo maior segurança.

   ## Changes

   - feat: adiciona middleware de autenticação
   - fix: corrigi erro de token inválido
   - refactor: melhora validação dos tokens

   ## Notes

   O token expira após 1 hora e pode ser renovado via refresh token.

   ## Preview

   [Inserir imagem demonstrando a autenticação funcionando]

   ## Close

   Closes #1234
   ```

---

Essa documentação visa manter o processo de versionamento claro e eficiente.

## Bibliografia

[Guia de Padrões de Commits - iuricode](https://github.com/iuricode/padroes-de-commits)

