# Show do Milhão - Quiz Game

## Sobre o Projeto

Este projeto é uma aplicação web inspirada no famoso programa de TV "Show do Milhão". Desenvolvido com React e Vite, o jogo apresenta perguntas de múltipla escolha com diferentes níveis de dificuldade e prêmios crescentes, culminando no grande prêmio de R$ 1.000.000.

## Funcionalidades

- Quiz com perguntas de múltipla escolha
- Três níveis de dificuldade (fácil, médio, difícil)
- Sistema de pontuação progressiva
- Placar visual mostrando o progresso e valores dos prêmios
- Seleção aleatória de perguntas a cada jogo
- Interface amigável e responsiva

## Tecnologias Utilizadas

- React 19
- Vite
- Styled Components
- OpenAI API (opcional, para geração de novas perguntas)

## Como Executar o Projeto

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Execute o projeto em modo de desenvolvimento:
   ```
   npm run dev
   ```
4. Acesse a aplicação em `http://localhost:5173` (ou a porta indicada no terminal)

## Estrutura do Projeto

```
src/
├── assets/         # Recursos estáticos
├── components/     # Componentes React
│   ├── Quiz.jsx    # Componente principal do quiz
│   ├── ScoreBoard.jsx # Placar de pontuação
│   └── StartScreen.jsx # Tela inicial
├── data/
│   └── questions.json # Banco de perguntas
├── services/
│   └── QuizService.js # Serviço para gerenciar perguntas
├── App.jsx         # Componente principal
└── main.jsx        # Ponto de entrada
```

## Como Adicionar Novas Perguntas

O arquivo `questions.json` contém todas as perguntas do quiz. Para adicionar novas perguntas, siga o formato abaixo:

### Formato das Perguntas

Cada pergunta deve seguir esta estrutura:

```json
{
  "question": "Texto da pergunta?",
  "options": ["Opção 1", "Opção 2", "Opção 3", "Opção 4"],
  "correctAnswer": "Opção correta",
  "difficulty": 1
}
```

### Níveis de Dificuldade

- `1`: Fácil
- `2`: Médio
- `3`: Difícil

### Exemplo de Adição de Perguntas

Para adicionar uma nova pergunta, edite o arquivo `src/data/questions.json` e adicione um novo objeto ao array:

```json
[
  // Perguntas existentes...
  {
    "question": "Qual é o maior deserto do mundo?",
    "options": ["Saara", "Antártida", "Atacama", "Kalahari"],
    "correctAnswer": "Antártida",
    "difficulty": 2
  }
]
```

### Dicas para Criar Boas Perguntas

1. Certifique-se de que a resposta correta esteja entre as opções
2. Evite ambiguidades nas perguntas e respostas
3. Distribua perguntas entre os diferentes níveis de dificuldade
4. Verifique a precisão das informações

## Como o Sistema Seleciona Perguntas

O sistema seleciona perguntas aleatoriamente do banco de perguntas usando a função `getShuffledQuestions()` no serviço `QuizService`. Esta função embaralha todas as perguntas disponíveis e o componente Quiz seleciona as primeiras 10 para o jogo.

Se você quiser filtrar perguntas por nível de dificuldade, o serviço também oferece a função `getQuestionsByDifficulty(difficulty)` que pode ser usada para obter apenas perguntas de um determinado nível.

## Funcionalidade Opcional: Geração de Perguntas com OpenAI

O projeto inclui uma integração opcional com a API da OpenAI para gerar novas perguntas dinamicamente. Para utilizar esta funcionalidade:

1. Obtenha uma chave de API da OpenAI
2. Inicialize o serviço com sua chave de API
3. Use a função `generateQuestion(topic, difficulty)` para criar novas perguntas sobre um tópico específico

## Licença

Este projeto está licenciado sob a licença MIT.
