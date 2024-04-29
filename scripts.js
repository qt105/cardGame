function typeColor(cardType){
    switch (cardType) {
        case 'Attack':
            return '#f8d5d5'
        
        case 'Defense':
            return '#D5E1F8'

        case 'HealingT1':
            return '#D5FFD7'
        
        case 'HealingT2':
            return '#93F99D'

        default:
            return 'white'
    }
}

function getContent(selectedCard) {
    let contentHTML = '';

        if (selectedCard.damage > 0) {
            contentHTML += `<p>Attaque et inflige <span class="attackColor">${selectedCard.damage} points de dégâts physiques</span></p>`;
        }

        if (selectedCard.weaken > 0) {
            contentHTML += `<p>L'attaque octroie <span class="weaknessInflictColor">${selectedCard.weaken} point de faiblesse à l'adversaire</span></p>`;
        }

        if (selectedCard.shield > 0) {
            contentHTML += `<p>La carte offre <span class="shieldColor" >${selectedCard.shield} points de bouclier</span></p>`;
        }

        if (selectedCard.heal > 0) {
            contentHTML += `<p>La carte restaure <span class="healColor" >${selectedCard.heal} points de vie</span></p>`;
        }

        return contentHTML;
}