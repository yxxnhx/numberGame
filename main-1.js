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
let playButton = document.querySelector('#play-button'); // document - 웹사이트 그 자체 
let userInput = document.querySelector('#user-input');
let resultArea = document.querySelector('#result-area');
let resetButton = document.querySelector('#reset-button');
let chanceArea = document.querySelector('#chance-area');
let chances = 5;
let gameOver = false;
let history = [];

function pickRandomNum() {
    computerNum = Math.floor(Math.random()*100)+1;//랜덤한 숫자를 도와주는 함수 0~1 사이의 숫자로 나오니 100은 나올 수가 없음 so +1을 해서 100이 나올 수 있게 세팅
    console.log("정답", computerNum);
}

pickRandomNum()


playButton.addEventListener('click', play); //play는 변수로서 들어가서 click 했을 때만 실행되게 해야 함 so 함수도 변수처럼 넘길 수 있다!!
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', () => { // 익명의 함수(이름없는 함수) 함수 자체에는 내용이 딱히 없고(로직이 단순) userInput에서 잠깐 쓰고 끝낼 것이기 때문에 선언하면 메모리 차지를 하기 때문
    userInput.value=""
})

function play() {
    let userValue = userInput.value;

    if(userValue > 100 || userValue < 1) {
        resultArea.textContent = "1~100 범위 안의 숫자를 입력해주세요"
        return; // 함수가 종료되게 하는 강력한 힘을 가진 아이
    }
    
    if(history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다 다른 숫자를 입력해주세요"
        return;
    }

    // 위에서 1과 100 사이의 숫자인가? 한번 유효성 검사를 해준 후 이미 입력한 숫자인지 아닌지 여부 확인 유효성 검사를 해준 후 찬스를 깎으면서 up&down을 하게 설정해주면 된다

    chances --;
    chanceArea.textContent = `남은 기회: ${chances}번`

    if(userValue < computerNum) {
        resultArea.textContent = "Up!!"
    } else if (userValue > computerNum) {
        resultArea.textContent = "Down!!"
    } else {
        resultArea.textContent = "정답입니다";
        gameOver = true;
    }

    history.push(userValue);
    console.log(history)

    if(chances < 1) {
        gameOver = true;
    }

    if(gameOver == true) {
        playButton.disabled = true;
    }

}
    //user input창이 깨끗하게 정리되고 새로운 번호가 생성이 되어야 함

function reset() {
    userInput.value = "";
    pickRandomNum();
    resultArea.textContent = "결과값이 여기 나옵니다";
}