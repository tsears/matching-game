let selectedCards = []
let clickable = true

function shuffle (cards) {
  let shuffled = []
  let original = cards.slice()

  do {
      let randomIndex = Math.floor(Math.random() * original.length)
      let randomCard = original.splice(randomIndex, 1)[0]
      shuffled.push(randomCard)
  } while(original.length > 0)

  return shuffled
}

function cardsMatch () {
  return selectedCards[0].parentElement.textContent ===
         selectedCards[1].parentElement.textContent
}

function onCoverClick (e) {
  if (clickable === false ) {
    return
  }

  if (selectedCards.length < 2) {
    e.target.classList.remove('covered')
    selectedCards.push(e.target)
  }

  if (selectedCards.length === 2) {
    if (cardsMatch()) {
      selectedCards.forEach(c => {
        c.classList.add('matched')
        c.removeEventListener('click', onCoverClick)
      })
      selectedCards = []

      // game state in DOM? game state in DOM.
      if (document.querySelectorAll('.matched').length === 16) {
        document.getElementById('youWin').classList.remove('hidden')
      }
    } else {
      clickable = false
      window.setTimeout(() => {
        selectedCards.forEach(c => c.classList.add('covered'))
        selectedCards = []
        clickable = true
      }, 1000)
    }
  }

  console.log('selected cards', selectedCards.map(c => c.parentElement.textContent))
}

function createGame () {
  const gameBoard = document.getElementById('gameBoard')

  const cards = shuffle([
    1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8
  ])

  cards.forEach(cardValue => {
    const card = document.createElement('div')
    const valueContainer = document.createElement('div')
    const cover = document.createElement('div')

    card.classList.add('card')
    cover.classList.add('cover')
    cover.classList.add('covered')
    valueContainer.classList.add('valueContainer')

    valueContainer.textContent = cardValue

    card.appendChild(valueContainer)
    card.appendChild(cover)
    gameBoard.appendChild(card)


    cover.addEventListener('click', onCoverClick)
  })
}

window.addEventListener('DOMContentLoaded', createGame)
window.oncontextmenu = () => false
