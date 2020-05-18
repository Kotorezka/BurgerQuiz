'use strict';
document.addEventListener('DOMContentLoaded', () => {
    // Переменные     
    const
    modalBlock = document.querySelector('#modalBlock'),
    closeModal = document.querySelector('#closeModal'),
    questionTitle = document.querySelector('#question'),
    formAnswers = document.querySelector('#formAnswers'), 
    btnOpenModal = document.querySelector('#btnOpenModal'),
    nextButton = document.querySelector('#next'),
    prevButton = document.querySelector('#prev'),
    sendButton = document.querySelector('#send'),
    firebaseConfig = {
        apiKey: "AIzaSyDd2ivqTGDTylGt_TLkKN2wPlYXvoGbo4w",
        authDomain: "burgerquiz-fce87.firebaseapp.com",
        databaseURL: "https://burgerquiz-fce87.firebaseio.com",
        projectId: "burgerquiz-fce87",
        storageBucket: "burgerquiz-fce87.appspot.com",
        messagingSenderId: "1085243411500",
        appId: "1:1085243411500:web:b63190cb4bee21f1701589",
        measurementId: "G-4V29XJN860"
        },
    finalAnswers = [];
    firebase.initializeApp(firebaseConfig);
    // Функции
    
    const renderQuestions = (indexQuestion, questions) => {
        formAnswers.innerHTML = ``;
        questionTitle.textContent = `${questions[indexQuestion].question}`;
    }
    const renderAnswers = (index, questions) => {
        questions[index].answers.forEach((answer) => {
            const answerItem = document.createElement('div');
            answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
            answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="burger">
                    <span>${answer.title}</span>
                </label>
            `;
            formAnswers.appendChild(answerItem);
        })
    }
    const renderCard = (index, questions) => {
        renderQuestions(index, questions);
        renderAnswers(index, questions);
    }
    const questionCountChecker = (numberQuestion, questions) => {
        
        switch (true) {
            case (numberQuestion === 0):
                prevButton.style.display = 'none';
                nextButton.style.display = 'block';
                sendButton.display = 'none';
                renderCard(numberQuestion);  
                break;
            case (numberQuestion > 0 && numberQuestion < questions.length):
                prevButton.style.display = 'block';
                nextButton.style.display = 'block';
                sendButton.display = 'none';
                renderCard(numberQuestion);
                break;
            case (numberQuestion === questions.length):
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
                sendButton.classList.remove('d-none');
                sendButton.display = 'block';
                questionTitle.textContent = '';
                formAnswers.innerHTML =`
                <div class = "form-group">
                    <label for="numberPhone">Enter your phone number</label>
                    <input type="phone" class="form-control" id="numberPhone">
                </div>    
                `;
                break;
            case (numberQuestion === questions.length+1):
                questionTitle.textContent = '';
                formAnswers.textContent = 'Спасибо';
                sendButton.display = 'none';
                
                break;         

        }
    }
    const checkAnswer = (numberQuestion, questions) => {
        const obj = {};
        const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
        inputs.forEach((input, index) => {
            if (numberQuestion >= 0 && numberQuestion < questions.length - 1){
                obj[`${index}_${questions[numberQuestion].question}`] = input.value;
            }
            if (numberQuestion === questions.length) {
                obj["Номер телефона"] = input.value;
            }    
        })
        finalAnswers.push(obj);
    }
    const playTest = (questions) => {
        let numberQuestion = 0;
        questionCountChecker(numberQuestion, questions);
        renderCard(numberQuestion, questions);
        nextButton.onclick = () => {
            checkAnswer(numberQuestion, questions);
            questionCountChecker(numberQuestion, questions);
            numberQuestion++;
            console.log(numberQuestion, questions);
            questionCountChecker(numberQuestion, questions);
            
        };
        prevButton.onclick = () => {
            numberQuestion--;
            console.log(numberQuestion, questions);
            questionCountChecker(numberQuestion, questions);
            renderCard(numberQuestion, questions);
        };
        sendButton.onclick = () => {
            numberQuestion++
            questionCountChecker(numberQuestion, questions);
            checkAnswer(numberQuestion, questions);
            firebase
                .database()
                .ref()
                .child('contacts')
                .push(finalAnswers);

        }
        
    }

    const getData = () => {
        firebase.database().ref().child('questions').once('value')
            .then(snap => playTest(snap.val()))
    } 

    // События
    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });
    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });
})