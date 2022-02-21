function loadTrivia() {
    fetch('https://opentdb.com/api.php?amount=50')
    .then(resp => resp.json())
    .then(createTrivias)
    .catch(err=>console.log(err));
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

    const title = document.getElementsByClassName('main-title')[0] //elementS because multiple things can have the same class

    const body = document.getElementsByTagName('body')[0]  //to make sure you get first element

    const list2 = document.querySelector('#trivia-list')  //this one is written like in css
    const title2 = document.querySelector('.main-title')  //only takes the first one though
    const body2 = document.querySelector('body')

    console.log(title2);
}

