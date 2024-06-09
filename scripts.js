let playerTurn = true
let playerMaxHP = 20
let playerHealth = 20
let enemyHealth = 20
let mana = 5

function cloneTemplate(id) {
    return document.getElementById(id).content.cloneNode(true)
   }

function createNewCard(card) {
    let newCard = cloneTemplate('card-template');
    newCard.querySelector('.card-title').innerText = card.title;
    newCard.querySelector('.card-cost').innerText = card.cost;
    newCard.querySelector('.card-illustration').src = "assets/cardImages/" + card.illustration;
    newCard.querySelector('.card-description').innerText = card.description;
    return newCard
}

function addNewCardToHand(card) {
    let newCard = createNewCard(card);
    let cardElement = newCard.querySelector('.card');
    cardElement.addEventListener('click', () => {
        onCardClick(card, cardElement); // Pass the card data and card element to the click handler
    });
    document.getElementById('player-hand').appendChild(newCard);
}
function onCardClick(card, cardElement) {
    console.log(`Carte cliquée: ${card.title}`);
    // Add your logic here for what happens when a card is clicked
    if (playerTurn & mana > card.cost) {
        deductPlayerMana(card.cost)
        console.log(mana)
        cardElement.remove();
        console.log("Carte retirée du jeu.");
        deductEnemyHP(card.dmg)
        playerMaxHP += card.shield
        deductPlayerHP(-card.heal)
        if (playerHealth > playerMaxHP){
            playerHealth = playerMaxHP
            updatePlayerHealthDisplay()
        }

    }
}

function switchTurns() {
    playerTurn = !playerTurn;
    if (playerTurn) {
        resetPlayerMana()
        console.log("C'est le tour du joueur.");
        document.getElementById('endTurnCTA').style.display = 'block'; // Show end turn button
        addRandomCardToHand(cardList)
    } else {
        console.log("C'est le tour de l'ennemi.");
        document.getElementById('endTurnCTA').style.display = 'none'; // Hide end turn button
        enemyTurn();
    }
}

function enemyTurn() {
    setTimeout(() => {
        deductPlayerHP(3)
        console.log(playerHealth);
        console.log("L'ennemi a joué son tour.");
        switchTurns(); // Switch back to the player's turn after enemy actions are complete
    }, 1000); // Simulate some delay for enemy actions
}

document.addEventListener('DOMContentLoaded', () => {
    addNewCardToHand(croc);
    addNewCardToHand(Elixir);
    
    document.getElementById('endTurnCTA').addEventListener('click', (event) => {
        event.preventDefault();
        switchTurns();
    });
    
    // Initialize the turn system
    switchTurns();
});

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function addRandomCardToHand(cardNamesArray) {
    addNewCardToHand(getRandomItem(cardNamesArray))
}

function updatePlayerHealthDisplay() {
    document.getElementById('playerHealth').innerText = `${playerHealth} / ${playerMaxHP}`;
}

function deductPlayerHP(amount) {
    playerHealth -= amount;
    updatePlayerHealthDisplay();
}

function updateEnemyHealthDisplay() {
    document.getElementById('enemyHealth').innerText = `${enemyHealth} / 20`;
}

function deductEnemyHP(amount) {
    enemyHealth -= amount;
    updateEnemyHealthDisplay();
}

function updatePlayerManaDisplay() {
    document.getElementById('energy').innerText = `${mana} / 5`;
}

function deductPlayerMana(amount) {
    mana -= amount;
    updatePlayerManaDisplay();
}

function resetPlayerMana() {
    mana = 5;
    updatePlayerManaDisplay();
}