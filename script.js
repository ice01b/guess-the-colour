const colors = [
    { name: 'Red', hex: '#FF0000' },
    { name: 'Green', hex: '#008000' },
    { name: 'Blue', hex: '#0000FF' },
    { name: 'Yellow', hex: '#FFFF00' },
    { name: 'Purple', hex: '#800080' },
    { name: 'Orange', hex: '#FFA500' }
];

let selectedColor;
let options = [];

const colorDisplay = document.getElementById('color-display');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result');
const startButton = document.getElementById('start-button');

function startGame() {
    resultContainer.textContent = ''; // Clear previous result
    selectedColor = getRandomColor();
    options = getRandomOptions(selectedColor);

    // Display the color
    colorDisplay.style.backgroundColor = selectedColor.hex;

    // Display options
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option.name;
        button.classList.add('option');
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function getRandomOptions(correctColor) {
    const shuffled = [...colors];
    const randomOptions = [correctColor];

    // Add 3 random colors, making sure not to repeat the correct answer
    while (randomOptions.length < 4) {
        const randomColor = shuffled[Math.floor(Math.random() * shuffled.length)];
        if (!randomOptions.includes(randomColor)) {
            randomOptions.push(randomColor);
        }
    }

    // Shuffle the options before returning
    return randomOptions.sort(() => Math.random() - 0.5);
}

function checkAnswer(option) {
    if (option === selectedColor) {
        resultContainer.textContent = 'Correct! 🎉';
        resultContainer.style.color = 'green';
    } else {
        resultContainer.textContent = 'Oops! Try again! 😢';
        resultContainer.style.color = 'red';
    }
}

startButton.onclick = startGame;

// Start the game when the page loads
startGame();
