let display = document.querySelector('#display div');
let game = document.querySelector('#game');
let score = document.querySelector('#score');   
let difficulty = 'Easy';
let targetColor;
let guesses = 0;
let correctGuesses = 0;
// Functions
const actions = {
    clearBoard() {
        game.innerHTML="";
    },
    generateBoard() {
        function makeNum() {
            return Math.floor(Math.random()*255);
        }
        const arr = [];
        if(difficulty === 'Easy'){
            for(let i=0;i<3;i++) {
                arr.push(`rgb(${makeNum()}, ${makeNum()}, ${makeNum()})`)
            }
        }
        else if(difficulty === 'Normal'){
            for(let i=0;i<6;i++) {
                arr.push(`rgb(${makeNum()}, ${makeNum()}, ${makeNum()})`)
            }
        }
        else if(difficulty === 'Hard'){
            for(let i=0;i<9;i++) {
                arr.push(`rgb(${makeNum()}, ${makeNum()}, ${makeNum()})`)
            }
        }
        let board = document.createElement('div');
        board.setAttribute('id','board')
        game.appendChild(board);
        let number = Math.floor(Math.random()*arr.length);
        targetColor = arr[number];
        display.innerText = targetColor;
        for(let i=0;i<arr.length;i++) {
            let cell = document.createElement('button');
            if(difficulty === "Easy") {
                cell.classList.add('cell-easy');
            }
            else if(difficulty === "Normal"){
                cell.classList.add('cell');
            }
            else{
                cell.classList.add('cell-hard');
            }
            cell.style.backgroundColor = arr[i];
            cell.setAttribute('id',`cell${i}`)
            cell.addEventListener('click',function(){
                if(cell.style.backgroundColor === targetColor) {
                    correctGuesses+=1
                }
                guesses+=1
                score.innerText = `${correctGuesses}/${guesses}`
                actions.clearBoard();
                actions.generateBoard();
            })
            board.appendChild(cell);
        }
    },
    resetBoard() {
        score.innerText = '0/0';
        this.clearBoard()
        this.generateBoard()
    }
}
// Start Button:
let start = document.querySelector('#start');
start.addEventListener('click',function(){
    actions.clearBoard();
    actions.generateBoard();
    score.innerText = `${correctGuesses}/${guesses}`
})
// Reset:
let reset = document.querySelector('#reset');
reset.addEventListener('click',function(){
    actions.resetBoard()
})
// Difficulty selection:    
let buttons = document.querySelectorAll('.difficulty-selection');
for(let i =0;i<buttons.length;i++) {
    let button = buttons[i];
    button.addEventListener('click',function(){
        if(this.innerText !== difficulty){
            difficulty = this.innerText;
            actions.resetBoard();
        }
    })
}