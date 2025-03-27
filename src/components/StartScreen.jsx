import React from 'react';
import styled from 'styled-components';

const StartScreenContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #0d2b45;
  color: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #ffd700;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin-bottom: 40px;
  color: #fff;
`;

const Button = styled.button`
  padding: 15px 30px;
  background-color: #ffd700;
  color: #0d2b45;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #ffec8b;
    transform: scale(1.05);
  }
`;

const Rules = styled.div`
  margin-top: 40px;
  padding: 20px;
  background-color: #1d4a7c;
  border-radius: 8px;
  text-align: left;
`;

const RulesList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
  }
`;

const StartScreen = ({ onStartGame }) => {
  return (
    <StartScreenContainer>
      <Title>Show do Milhão</Title>
      <Subtitle>Teste seus conhecimentos e ganhe até R$ 1.000.000!</Subtitle>
      
      <Button onClick={onStartGame}>Iniciar Jogo</Button>
      
      <Rules>
        <h3>Como Jogar:</h3>
        <RulesList>
          <li>O jogo consiste em 10 perguntas de múltipla escolha.</li>
          <li>Cada pergunta tem 4 alternativas, sendo apenas uma correta.</li>
          <li>As perguntas aumentam de valor conforme você avança.</li>
          <li>Se errar uma pergunta, o jogo termina.</li>
          <li>Responda corretamente todas as perguntas para ganhar R$ 1.000.000!</li>
        </RulesList>
      </Rules>
    </StartScreenContainer>
  );
};

export default StartScreen;