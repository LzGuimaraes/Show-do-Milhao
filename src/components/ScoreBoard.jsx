import React from 'react';
import styled from 'styled-components';

const ScoreBoardContainer = styled.div`
  background-color: #1d4a7c;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0;
  max-width: 300px;
  position: fixed;
  right: 20px;
  top: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);

  @media (max-width: 1200px) {
    position: static;
    margin: 20px auto;
  }
`;

const ScoreTitle = styled.h3`
  color: #ffd700;
  text-align: center;
  margin-bottom: 10px;
  font-size: 18px;
`;

const ScoreItem = styled.div`
  padding: 8px 10px;
  margin: 5px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.active ? '#ffd700' : 'transparent'};
  color: ${props => props.active ? '#0d2b45' : props.passed ? '#8f8f8f' : 'white'};
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  border: ${props => props.active ? '2px solid #fff' : '1px solid #3a6ea5'};
  transition: all 0.3s ease;
`;

const ScoreValue = styled.span`
  font-weight: bold;
`;

const ScoreBoard = ({ currentQuestionIndex, totalQuestions }) => {
  // Valores de pontuação no estilo Show do Milhão
  const scoreValues = [
    1000, 5000, 10000, 30000, 50000, 
    100000, 150000, 300000, 500000, 1000000
  ];

  // Garantir que temos o número correto de valores para o total de perguntas
  const adjustedScoreValues = scoreValues.slice(0, totalQuestions);
  
  return (
    <ScoreBoardContainer>
      <ScoreTitle>Prêmios</ScoreTitle>
      {adjustedScoreValues.map((value, index) => {
        // Calcular o índice reverso para mostrar os valores em ordem decrescente
        const reverseIndex = totalQuestions - index - 1;
        const reverseValue = adjustedScoreValues[reverseIndex];
        
        // Verificar se este é o valor atual, ou se já foi passado
        const isActive = reverseIndex === currentQuestionIndex;
        const isPassed = reverseIndex > currentQuestionIndex;
        
        return (
          <ScoreItem 
            key={reverseIndex} 
            active={isActive}
            passed={isPassed}
          >
            <span>Pergunta {reverseIndex + 1}</span>
            <ScoreValue>R$ {reverseValue.toLocaleString('pt-BR')}</ScoreValue>
          </ScoreItem>
        );
      })}
    </ScoreBoardContainer>
  );
};

export default ScoreBoard;