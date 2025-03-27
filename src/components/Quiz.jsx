import { useState, useEffect } from 'react';
import styled from 'styled-components';
import quizService from '../services/QuizService';
import ScoreBoard from './ScoreBoard';
import ReactConfetti from 'react-confetti';

const QuizContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #0d2b45;
  color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
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

const CelebrationMessage = styled.div`
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin: 20px 0;
  color: #ffd700;
  animation: pulse 1.5s infinite;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.7);
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  }
`;

const TrophyIcon = styled.div`
  font-size: 80px;
  text-align: center;
  margin: 20px 0;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
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
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  // Valores de pontuação no estilo Show do Milhão
  const scoreValues = [
    1000, 5000, 10000, 30000, 50000, 
    100000, 150000, 300000, 500000, 1000000
  ];

  useEffect(() => {
    // Carregar perguntas do arquivo JSON
    const loadQuestions = async () => {
      try {
        // Obter perguntas organizadas por nível de dificuldade
        const organizedQuestions = quizService.getQuestionsOrganizedByDifficulty(10);
        
        setQuestions(organizedQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar perguntas:", error);
        setLoading(false);
      }
    };
    
    loadQuestions();
    
    // Atualizar tamanho da janela para o confetti
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Verificar se a resposta está correta
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(scoreValues[currentQuestionIndex]);
      
      // Verificar se é a última pergunta e a resposta está correta
      if (currentQuestionIndex === questions.length - 1) {
        // Jogador ganhou o jogo!
        setShowCelebration(true);
        setGameOver(true);
        // Reproduzir som de vitória
        const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3');
        audio.play().catch(e => console.log('Erro ao reproduzir áudio:', e));
      }
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
    // Obter perguntas organizadas por nível de dificuldade
    const organizedQuestions = quizService.getQuestionsOrganizedByDifficulty(10);
    
    // Atualizar o estado com as novas perguntas organizadas
    setQuestions(organizedQuestions);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
    setGameOver(false);
    setShowCelebration(false);
  };

  if (loading) {
    return <QuizContainer>Carregando perguntas...</QuizContainer>;
  }

  if (gameOver) {
    return (
      <QuizContainer>
        {showCelebration && (
          <>
            <ReactConfetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={true}
              numberOfPieces={500}
              gravity={0.1}
            />
            <CelebrationMessage>PARABÉNS! VOCÊ É UM MILIONÁRIO!</CelebrationMessage>
            <TrophyIcon>🏆</TrophyIcon>
          </>
        )}
        <h1>{showCelebration ? 'VITÓRIA!' : 'Fim de Jogo!'}</h1>
        <ScoreDisplay>Você ganhou: R$ {score.toLocaleString('pt-BR')}</ScoreDisplay>
        {showCelebration && (
          <p style={{ textAlign: 'center', fontSize: '18px', margin: '20px 0' }}>
            Você respondeu todas as perguntas corretamente e conquistou o prêmio máximo!
          </p>
        )}
        <div style={{ textAlign: 'center',display: 'flex', justifyContent: 'center' }}>
          <ControlButton onClick={restartGame}>Jogar Novamente</ControlButton>
        </div>
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