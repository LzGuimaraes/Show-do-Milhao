import questionsData from '../data/questions.json';
import { OpenAI } from 'openai';

class QuizService {
  constructor() {
    this.questions = questionsData;
    this.openai = null;
  }

  // Inicializar a API da OpenAI se uma chave for fornecida
  initOpenAI(apiKey) {
    if (apiKey) {
      this.openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true // Permitir uso no navegador (apenas para demonstração)
      });
      return true;
    }
    return false;
  }

  // Obter todas as perguntas
  getAllQuestions() {
    return this.questions;
  }

  // Obter perguntas por nível de dificuldade
  getQuestionsByDifficulty(difficulty) {
    return this.questions.filter(q => q.difficulty === difficulty);
  }

  // Embaralhar perguntas
  getShuffledQuestions() {
    return [...this.questions].sort(() => Math.random() - 0.5);
  }

  // Gerar uma nova pergunta usando a API da OpenAI
  async generateQuestion(topic, difficulty) {
    if (!this.openai) {
      throw new Error('OpenAI API não inicializada. Forneça uma chave de API válida.');
    }

    try {
      const difficultyText = difficulty === 1 ? 'fácil' : 
                            difficulty === 2 ? 'média' : 'difícil';
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Você é um gerador de perguntas para um quiz no estilo Show do Milhão. 
                     Gere uma pergunta de nível ${difficultyText} sobre ${topic} com 4 alternativas, 
                     sendo apenas uma correta. Retorne no formato JSON com os campos: 
                     question, options (array com 4 opções), correctAnswer (a resposta correta), 
                     difficulty (número de 1 a 3).`
          }
        ],
        temperature: 0.7,
        max_tokens: 300,
        response_format: { type: "json_object" }
      });

      const generatedQuestion = JSON.parse(response.choices[0].message.content);
      return generatedQuestion;
    } catch (error) {
      console.error('Erro ao gerar pergunta:', error);
      throw error;
    }
  }

  // Adicionar uma nova pergunta ao banco de perguntas (apenas em memória)
  addQuestion(question) {
    if (question && question.question && question.options && 
        question.correctAnswer && question.difficulty) {
      this.questions.push(question);
      return true;
    }
    return false;
  }
}

// Exportar uma instância única do serviço
const quizService = new QuizService();
export default quizService;