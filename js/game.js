const grid = document.querySelector('.grid')
const spanPlayer = document.querySelector('.player')
const spanTimer = document.querySelector('.timer')

const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
]

const creatElement = (tag, className) => {
    const element = document.createElement(tag)
    element.className = className
    return element
}
let firstCard = ''
let secondCard = ''

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card')

    if(disableCards.length == 20){
        clearInterval(this.loop)
        alert(`Parabens, ${spanPlayer.innerHTML}, seu tempo foi: ${spanTimer.innerHTML} segundos!`)
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    if (firstCharacter == secondCharacter) {

            firstCard.firstChild.classList.add('disable-card')
            secondCard.firstChild.classList.add('disable-card')

            firstCard = ''
            secondCard = ''

            checkEndGame()
    
    } else {
        setTimeout(() => {
            
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')

            firstCard = ''
            secondCard = ''

        }, 500)

    }
}

const revealCard = ({ target }) => {

    if(target.parentNode.className.includes('reveal-card')){
        return
    }
    if (firstCard == '') {

        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode

    } else if (secondCard == '') {

        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode

        checkCards()
    }

    
}

const creatCard = (characters) => {

    const card = creatElement('div', 'card')
    const front = creatElement('div', 'face front')
    const back = creatElement('div', 'face back')

    front.style.backgroundImage =`url('../images/${characters}.png')`

    card.appendChild(front)
    card.appendChild(back)

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', characters)

    return card
}

const loadGame = () => {

    const duplicatesCharacters = [ ...characters, ...characters ]

    const shuffledArray = duplicatesCharacters.sort(() => Math.random() - 0.5)

    shuffledArray.forEach((characters) => {

        const card = creatCard(characters)
        grid.appendChild(card)

    })

}

const startTimer = () => {

    this.loop = setInterval(() =>{
        const correntTime = +spanTimer.innerHTML
        spanTimer.innerHTML = correntTime + 1
    }, 1000)

}

window.onload = () => {
    const playerName = localStorage.getItem('player')

    spanPlayer.innerHTML = playerName

    startTimer()
    loadGame()
}

