'use strict';
document.addEventListener('DOMContentLoaded', () => {
    // Переменные     
    const
    modalBlock = document.querySelector('#modalBlock'),
    closeModal = document.querySelector('#closeModal'),
    questionTitle = document.querySelector('#question'),
    formAnswers = document.querySelector('#formAnswers'), 
    btnOpenModal = document.querySelector('#btnOpenModal');
    let burgerSrc = './image/burgerBlack.png';
    let burgerName = 'Черный' 
    // Функции
    const renderQuestions = () => {
        questionTitle.textContent = 'Какого цвета бургер вы хотите?';
        formAnswers = `
            <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="./image/burger.png" alt="burger">
                    <span>Стандарт</span>
                </label>
            </div>
            <div class="answers-item d-flex justify-content-center">
                <input type="radio" id="answerItem2" name="answer" class="d-none">
                <label for="answerItem2" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src=${burgerName} alt="burger">
                    <span>${burgerName}</span>
                </label>
            </div>
        `;
    }
    const playTest = () => {

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