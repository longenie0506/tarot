// modal
const url = 'https://raw.githubusercontent.com/longenie0506/tarot/main/js/cards.json';
const modalContainer = document.getElementById('modalContainer');
let card = document.getElementsByClassName('main__tarot-card');
const closeButton = document.getElementById('closeButton');
const playAgain = document.getElementById('again');

// random number card

const min = Math.ceil(0);
const max = Math.floor(77);


async function getCards(cardNumber) {

    const res = await fetch(url);
    const dados = await res.json();

    document.getElementById('card-name').innerHTML = dados.cartas[cardNumber].card_name;
    document.getElementById('explanation').innerHTML = dados.cartas[cardNumber].explanation;
    document.getElementById('yes-or-no').innerHTML = dados.cartas[cardNumber].card_name;

    const image = document.createAttribute('src');
    image.value = dados.cartas[cardNumber].url;
    document.getElementById('photo').setAttributeNode(image);

    return dados;
}

// Show the modalContainer when click on card
for (let i = 0; i < card.length; i++) {

    card[i].onclick = async function() {

        this.style.animation = '';
        let random = Math.floor(Math.random() * (max - min)) + min;
        let cardNumber = random;
        const dados = await getCards(cardNumber);


        //   card[i].style.filter = 'grayscale(100%)';
        card[i].style.animation = 'flip 0.2s linear';


        setTimeout(() => {
            modalContainer.style.display = 'block'
            this.style.backgroundImage = `url('${dados.cartas[cardNumber].url}')`;
        }, 100);
        setTimeout(() => {
            modalContainer.style.opacity = 1;
        }, 200);
    }
}

// Close modalContainer when click in "x"
closeButton.onclick = function() {

    modalContainer.style.opacity = 0;
    setTimeout(() => {
        modalContainer.style.display = 'none';
    }, 300);
}



// play again button
playAgain.onclick = function(e) {
    e.stopPropagation();

    modalContainer.style.opacity = 0;
    const backgroundCard = 'url(https://raw.githubusercontent.com/longenie0506/tarot/main/assets/card.png?token=GHSAT0AAAAAABQIA562XRIWAXGMVZAQ6PGQYPMYOHQ)';
    let cardClose = document.getElementsByClassName('main__tarot-card');

    for (let j = 0; j < cardClose.length; j++) {

        //   cardClose[j].style.filter = 'grayscale(0%)';
        cardClose[j].style.backgroundImage = backgroundCard;
        cardClose[j].style.animation = 'flip 0.2s linear';
    }
    setTimeout(() => { modalContainer.style.display = 'none' }, 250)

}