function loadTrivia() {
    fetch('https://opentdb.com/api.php?amount=10')
        .then(resp => resp.json())
        .then(createTrivias)
        .catch(err => console.log(err));
}

function createTrivias(data) {

    const results = data.results;
    const triviaArray = []
    for (const res of results) {
        const trivia = new Trivia(res.category, res.type, res.difficulty, res.question, res.correct_answer, res.incorrect_answers)
        triviaArray.push(trivia)

    }
    displayTrivia(triviaArray)

    // let firstTrivia = triviaArray[0]
    // console.log(firstTrivia.question);
    // console.log(firstTrivia.getAllAnswers());
    // console.log(triviaArray);
}


function displayTrivia(triviaArray) {
    const list = document.getElementById('trivia-list')

    for (const trivia of triviaArray) {
        let liElement = createTriviaListElement(trivia)
        list.appendChild(liElement)
    }

    // const title = document.getElementsByClassName('main-title')[0] //elementS because multiple things can have the same class
    // const body = document.getElementsByTagName('body')[0]  //to make sure you get first element
    // const list2 = document.querySelector('#trivia-list')  //this one is written like in css
    // const title2 = document.querySelector('.main-title')  //only takes the first one though
    // const body2 = document.querySelector('body')
}

function createTriviaListElement(trivia) {
    let liElement = document.createElement('div')
    let span = document.createElement('span')
    span.className += 'question-text' //best to += so you can add multiple
    span.style.fontWeight = 'bold'
    span.style.backgroundColor = 'lightgrey'
    let textnode = document.createTextNode(decodeHtml(trivia.question))
    

    span.appendChild(textnode)
    liElement.appendChild(span)

    let answersList = createAnswersList(trivia.getAllAnswers(), trivia)
    liElement.appendChild(answersList)

    return liElement
}

function createAnswersList(answers, trivia) {
    let answerList= document.createElement('ul')
    for (const answ of answers) {
        let liElement = createAnswerListElement(answ, trivia)
        answerList.appendChild(liElement)
    }
    return answerList
}

function createAnswerListElement(answ, trivia) {
    let liElement = document.createElement('button')
    liElement.className += 'button-elem'
    // if (answ === carry.correctAnswer) {
    //     liElement.id = 'black'
    // } else {
    //     liElement.backgroundColor = 'black'
    // }
    let span = document.createElement('span')
    let textnode = document.createTextNode(decodeHtml(answ))
    liElement.addEventListener('click', (event) => onButtonClick(event, trivia));

    span.appendChild(textnode)
    liElement.appendChild(span)

    return liElement
}

function onButtonClick(event, trivia) {
    const response = event.target.innerText;
    const points = trivia.checkAnswer(response);
    console.log(points);
}

// const singleButton = document.getElementById('button-elem')
// singleButton.addEventListener('click', checkAnswer())

function decodeHtml(html) {                           
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


