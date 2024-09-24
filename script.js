const words = [
    'javascript', 'programacao', 'desenvolvimento', 'forca',
    'computador', 'internet', 'tecnologia', 'aprendizado',
    'algoritmo', 'software', 'hardware', 'rede',
    'variavel', 'funcao', 'objeto', 'array',
    'mobile', 'web', 'sistema', 'seguranca',
    'interface', 'usuario', 'design', 'estilo',
    'programador', 'engenharia', 'dados', 'analise'
];

let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let wrongAttempts = 0;

const canvas = document.getElementById('gallows');
const ctx = canvas.getContext('2d');

function drawHangman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(50, 150);
    ctx.lineTo(150, 150);
    ctx.moveTo(100, 150);
    ctx.lineTo(100, 20);
    ctx.lineTo(150, 20);
    ctx.lineTo(150, 40);
    ctx.stroke();

    if (wrongAttempts > 0) ctx.arc(150, 60, 20, 0, Math.PI * 2); // cabeça
    if (wrongAttempts > 1) ctx.moveTo(150, 80), ctx.lineTo(150, 120); // corpo
    if (wrongAttempts > 2) ctx.moveTo(150, 90), ctx.lineTo(130, 110); // braço esquerdo
    if (wrongAttempts > 3) ctx.moveTo(150, 90), ctx.lineTo(170, 110); // braço direito
    if (wrongAttempts > 4) ctx.moveTo(150, 120), ctx.lineTo(130, 140); // perna esquerda
    if (wrongAttempts > 5) ctx.moveTo(150, 120), ctx.lineTo(170, 140); // perna direita
    ctx.stroke();
}

function displayWord() {
    const display = selectedWord.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    document.getElementById('word').textContent = display;
}

function guess() {
    const input = document.getElementById('letter').value.toLowerCase();
    document.getElementById('letter').value = '';

    if (input && !guessedLetters.includes(input)) {
        guessedLetters.push(input);
        if (!selectedWord.includes(input)) {
            wrongAttempts++;
        }
        drawHangman();
        displayWord();
        checkGameStatus();
    }
}

function checkGameStatus() {
    if (wrongAttempts >= 6) {
        document.getElementById('message').textContent = 'Você perdeu! A palavra era: ' + selectedWord;
    } else if (selectedWord.split('').every(letter => guessedLetters.includes(letter))) {
        document.getElementById('message').textContent = 'Você ganhou!';
    }
}

drawHangman();
displayWord();
