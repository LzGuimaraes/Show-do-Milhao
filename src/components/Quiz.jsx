import { useState, useEffect } from 'react';
import styled from 'styled-components';
import quizService from '../services/QuizService';
import ScoreBoard from './ScoreBoard';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #0d2b45;
  color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
  padding: 15px;
  background-color: #1d4a7c;
  border-radius: 8px;
`;

const OptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
`;

const OptionButton = styled.button`
  padding: 15px;
  background-color: ${props => props.selected ? '#ffd700' : '#2a628f'};
  color: ${props => props.selected ? '#000' : '#fff'};
  border: 2px solid #ffd700;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ffd700;
    color: #000;
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ScoreDisplay = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  color: #ffd700;
`;

const ControlButton = styled.button`
  padding: 12px 24px;
  background-color: #ffd700;
  color: #0d2b45;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ffec8b;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #2a628f;
  border-radius: 5px;
  margin: 20px 0;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #ffd700;
  width: ${props => props.percentage}%;
  transition: width 0.5s ease;
`;

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Valores de pontuação no estilo Show do Milhão
  const scoreValues = [
    1000, 5000, 10000, 30000, 50000, 
    100000, 150000, 300000, 500000, 1000000
  ];

  useEffect(() => {
    // Carregar perguntas do arquivo JSON
    const loadQuestions = async () => {
      try {
        // Obter perguntas embaralhadas do serviço
        const shuffledQuestions = quizService.getShuffledQuestions();
        
        // Limitar a 10 perguntas para o jogo
        const gameQuestions = shuffledQuestions.slice(0, 10);
        
        setQuestions(gameQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
        setLoading(false);
      }
    };
    
    loadQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Verificar se a resposta está correta
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(scoreValues[currentQuestionIndex]);
    } else {
      // No Show do Milhão, se errar perde tudo ou fica com uma pontuação garantida
      setGameOver(true);
    }
    
    // Avançar para a próxima pergunta ou finalizar o jogo
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    // Obter perguntas reembaralhadas do serviço
    const shuffledQuestions = quizService.getShuffledQuestions();
    
    // Limitar a 10 perguntas para o jogo
    const gameQuestions = shuffledQuestions.slice(0, 10);
    
    // Atualizar o estado com as novas perguntas embaralhadas
    setQuestions(gameQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setGameOver(false);
  };

  if (loading) {
    return <QuizContainer>Carregando perguntas...</QuizContainer>;
  }

  if (gameOver) {
    return (
      <QuizContainer>
        <h1>Fim de Jogo!</h1>
        <ScoreDisplay>Você ganhou: R$ {score.toLocaleString('pt-BR')}</ScoreDisplay>
        <ControlButton onClick={restartGame}>Jogar Novamente</ControlButton>
      </QuizContainer>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <QuizContainer>
      <h1>Show do Milhão</h1>
      <ScoreDisplay>R$ {score.toLocaleString('pt-BR')}</ScoreDisplay>
      
      <ProgressBar>
        <Progress percentage={progress} />
      </ProgressBar>
      
      <p>Pergunta {currentQuestionIndex + 1} de {questions.length}</p>
      
      <ScoreBoard 
        currentQuestionIndex={currentQuestionIndex} 
        totalQuestions={questions.length} 
      />
      
      <QuestionContainer>
        <h2>{currentQuestion.question}</h2>
        <OptionsContainer>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              selected={selectedOption === option}
              onClick={() => handleOptionSelect(option)}
            >
              {String.fromCharCode(65 + index)}) {option}
            </OptionButton>
          ))}
        </OptionsContainer>
      </QuestionContainer>
      
      <ControlButton 
        onClick={handleNextQuestion} 
        disabled={selectedOption === null}
      >
        Confirmar Resposta
      </ControlButton>
    </QuizContainer>
  );
};

export default Quiz;