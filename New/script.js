document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const letter = document.getElementById('letter');
    const loveText = document.getElementById('loveText');
    let isOpen = false;
    
    // Texto da carta que será digitado
    const messageText = `Cada dia ao seu lado é uma nova aventura, um novo capítulo da nossa história de amor. Seu sorriso ilumina meus dias mais escuros, e seu abraço é meu lugar favorito no mundo. Você não é apenas meu amor, é minha inspiração, minha força e minha paz.

    Quando penso em todos os momentos que compartilhamos juntos, meu coração transborda de felicidade. Você me faz querer ser uma pessoa melhor a cada dia, e sou eternamente grato(a) por ter você em minha vida.

    Não existem palavras suficientes para expressar o quanto você significa para mim, mas prometo demonstrar meu amor por você em cada pequeno gesto, todos os dias da nossa vida.`;

    // Função para simular digitação
    function typeWriter(text, index = 0) {
        if (index < text.length) {
            loveText.textContent += text.charAt(index);
            setTimeout(() => typeWriter(text, index + 1), 50);
        }
    }

    // Adiciona efeito de hover no envelope
    envelope.addEventListener('mouseover', () => {
        if (!isOpen) {
            envelope.style.transform = 'scale(1.05)';
        }
    });

    envelope.addEventListener('mouseout', () => {
        if (!isOpen) {
            envelope.style.transform = 'scale(1)';
        }
    });

    // Abre o envelope ao clicar
    envelope.addEventListener('click', () => {
        if (!isOpen) {
            isOpen = true;
            envelope.classList.add('opened');
            
            // Começa a digitar o texto após a animação de abertura
            setTimeout(() => {
                typeWriter(messageText);
            }, 1000);
            
            // Atualiza o texto das instruções
            document.querySelector('.instructions').textContent = 'Carta aberta ❤️';
        }
    });

    // Adiciona efeitos de partículas de coração quando o envelope é aberto
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(() => {
        if (isOpen) {
            createHeart();
        }
    }, 300);
});