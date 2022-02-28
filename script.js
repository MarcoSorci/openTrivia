function loadCategories() {
    fetch('https://opentdb.com/api_category.php')
        .then(resp => resp.json())
        .then((data) => createSelect(data.trivia_categories, 'categories-select')) //if you need more parameters other than data you need a lambda
        .catch(err => console.log(err));
}

function loadDifficulty() {
    fetch('./assets/settingz/difficulty.json')
        .then(resp => resp.json())
        .then((data) => createSelect(data, 'difficulty-select'))
        .catch(err => console.log(err));
}

function loadType() {
    fetch('./assets/settingz/type.json')
        .then(resp => resp.json())
        .then((data) => createSelect(data, 'type-select'))
        .catch(err => console.log(err));
}

function initQuiz() {
    loadCategories()
    loadDifficulty()
    loadType()
}

function createSelect(data, selectId) {
    const select = document.getElementById(selectId);
    for (const elem of data) {
        const option = document.createElement('option');
        option.value = elem.id
        const textnode = document.createTextNode(elem.name);
        option.appendChild(textnode);
        select.appendChild(option)
    }
}


function loadTrivia() {
    let category = document.getElementById('categories-select').value;
    let difficulty = document.getElementById('difficulty-select').value;
    let type = document.getElementById('type-select').value;
    let stringUrl = 'https://opentdb.com/api.php?amount=10';
    if (category != -1) {
        stringUrl += ("&category=" + category)
    }
    if (difficulty != -1) {
        stringUrl += ("&difficulty=" + difficulty)
    }
    if (type != -1) {
        stringUrl += ("&type=" + type)
    }

    fetch(stringUrl)
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

const list = document.getElementById('trivia-list')
function displayTrivia(triviaArray) {

    list.innerHTML = ''


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
    let textnode = document.createTextNode(Utility.decodeHtml(trivia.question))


    span.appendChild(textnode)
    liElement.appendChild(span)

    let answersList = createAnswersList(trivia.getAllAnswers(), trivia)
    liElement.appendChild(answersList)

    return liElement
}

function createAnswersList(answers, trivia) {
    let answerList = document.createElement('ul')
    for (const answ of answers) {
        let liElement = createAnswerListElement(answ, trivia, answerList)
        answerList.appendChild(liElement)
    }
    return answerList
}

function createAnswerListElement(answ, trivia, answerList) {
    let liElement = document.createElement('button')
    liElement.className += 'button-elem'
    let span = document.createElement('span')
    let textnode = document.createTextNode(Utility.decodeHtml(answ))
    liElement.addEventListener('click', (event) => onButtonClick(event, trivia, liElement, answerList), { once: true });

    span.appendChild(textnode)
    liElement.appendChild(span)

    return liElement
}

let finalPoints = 0
let counter = document.getElementById('counter')


function onButtonClick(event, trivia, liElement, answerList) {
    counter.innerHTML = 'Points: <br>'
    const response = event.target.innerText;
    if (trivia.checkAnswer(Utility.decodeHtml(response))) {
        finalPoints++
    }

    for (const button of answerList.getElementsByTagName('button')) {
        let response = button.innerText
        if (trivia.checkAnswer(Utility.decodeHtml(response))) {
            button.style.backgroundColor = 'lightgreen'
        } else {
            button.style.backgroundColor = 'red'
        }

        button.outerHTML = button.outerHTML  //loses event listeners by recreating the tag
    }

    let countertext = document.createTextNode(finalPoints)
    counter.appendChild(countertext)

}



