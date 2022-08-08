// 랜덤 번호 지정
// 유저가 번호를 입력한 후 go라는 번호를 누름
// 만약에 유저가 랜덤 번호를 맞추면, 맞췄습니다
// 랜덤번호가 유저 번호보다 작을 때 down
// 랜덤번호가 유저 번호보다 크다면 up
// reset번호를 누르면 게임 리셋
// 5번의 기회를 다 쓰면 게임 종료 (더이상 추측 불가 버튼이 disable)
// 유저가 1과 100 범위 밖의 숫자를 입력할 때에는 알려준다 기회는 깎지 않음
// 유저가 이미 입력한 숫자를 또 입력하면 알려주고 기회 깎지 않음

let computerNum = 0;
let resultArea = document.querySelector('#result-area');
let chanceArea = document.querySelector('#chance-area');
let userInput = document.querySelector('#user-input');
let playBtn = document.querySelector('#play-button');
let resetBtn = document.querySelector('#reset-button');
let chances = 5;
let gameOver = false;
let history = [];

function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100)+1;
    console.log(`정답 ${computerNum}`);
}

pickRandomNum()


playBtn.addEventListener('click', play);
resetBtn.addEventListener('click', reset);
userInput.addEventListener('focus', () => {
    userInput.value = ""
})

function play() {
    let userValue = userInput.value;
    console.log(userValue)    

    if(userValue < 1 || userValue > 100) {
        resultArea.textContent = "1~100 사이의 번호를 입력해 주세요";
        return;
    }

    if(history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다 다시 입력해주세요";
        return;
    }

    chances --;
    chanceArea.textContent = `남은 찬스: ${chances}번`

    if(userValue < computerNum) {
        resultArea.textContent = "Up!"
        console.log("Up!")
    } else if(userValue > computerNum) {
        resultArea.textContent = "Down!"

        console.log("Down")
    } else {
        resultArea.textContent = "정답입니다!"
        console.log("정답입니다");
        gameOver = true;
    }

    history.push(userValue);
    console.log(history);


    if(chances < 1) {
        gameOver = true;
    }

    if(gameOver == true) {
        playBtn.disabled = true;
    }
}

function reset() {
    userInput.value="";
    pickRandomNum();
    resultArea.textContent = "게임을 다시 시작합니다"
    chanceArea.textContent = "남은 찬스: 5번"
    playBtn.disabled = false;
}

