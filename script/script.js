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
    questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ],
    finalAnswers = [];
    // Функции    
    const renderQuestions = (indexQuestion) => {
        formAnswers.innerHTML = ``;
        questionTitle.textContent = `${questions[indexQuestion].question}`;
    }
    const renderAnswers = (index) => {
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
    const renderCard = (index) => {
        renderQuestions(index);
        renderAnswers(index);
    }
    const questionCountChecker = (numberQuestion) => {
        
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
    const checkAnswer = (numberQuestion) => {
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
    const playTest = () => {
        let numberQuestion = 0;
        questionCountChecker(numberQuestion);
        renderCard(numberQuestion);
        nextButton.onclick = () => {
            checkAnswer(numberQuestion);
            questionCountChecker(numberQuestion);
            numberQuestion++;
            console.log(numberQuestion);
            questionCountChecker(numberQuestion);
            
        };
        prevButton.onclick = () => {
            numberQuestion--;
            console.log(numberQuestion);
            questionCountChecker(numberQuestion);
            renderCard(numberQuestion);
        };
        sendButton.onclick = () => {
            numberQuestion++
            questionCountChecker(numberQuestion);
            checkAnswer(numberQuestion);

        }
        
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