
const grid=document.querySelector('.grid');
const spanPlayer=document.querySelector('.player');
const spanTimer=document.querySelector('.timer');
const characters=[
    'descartes',
    'dostoievski',
     'weber',
     'nietzsche',
     'sartre',
     'Arthur',
     'simone',
     'spinoza',
     'durkheim',
     'marx',

];

const createElement=(tag,className)=>{//cria um elemento
     const element=document.createElement(tag);
     element.className=className;
     return element;
}

let firstCard='';
let secondCard='';
const restartGame=()=>{
    firstCard='';
    secondCard='';

    //reinicia o temporizador
    spanTimer.innerHTML='0';

    //esconde todas as cartas reveladas
    const reveladCards=document.querySelectorAll('.reveal-card');
    reveladCards.forEach(card=>{
         card.classList.remove('reveal-card');
    });
    //Remove a marcação das cartas desativadas

    const disabledCards=document.querySelectorAll('.disabled-card');
    disabledCards.forEach(card=>{
        card.classList.remove('disabled-card');
    });
    //remove todas as cartas da grid
    grid.innerHTML='';
    
    //reinicia o game
    loadGame();
    startTimer();
    window.location='index.html';



}
const checkEndGame=()=>{
    const disabledCards=document.querySelectorAll('.disabled-card');
    if(disabledCards.length==20){
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${spanTimer.innerHTML} `);
        restartGame();
    }
}
const checkCards=()=>{
    const firstCharacter=firstCard.getAttribute('data-character');
    const secondCharacter=secondCard.getAttribute('data-character');
    if(firstCharacter===secondCharacter){
         firstCard.firstChild.classList.add('disabled-card');
         secondCard.firstChild.classList.add('disabled-card');
         firstCard='';
         secondCard='';
         checkEndGame();
       
    }else{
        setTimeout(()=>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard='';
            secondCard='';
        },500);
       
    }
}
const revealCard=({target})=>{
    if(target.parentNode.className.includes('reveal-card')){
        return;
    }
    if(firstCard===''){
        target.parentNode.classList.add('reveal-card');
        firstCard=target.parentNode;
    }else if(secondCard===''){
        target.parentNode.classList.add('reveal-card');
        secondCard=target.parentNode;
    }
    checkCards();
    
}
const createCard=(character)=>{
    const card=createElement('div','card');//cria uma carta
    const front=createElement('div','face front');//cria a parte da frente da carta
    const back=createElement('div','face back');// cria a parte de trás da carta
    front.style.backgroundImage=`url('/img/${character}.jpg')`;//coloca uma imagem na carta
    card.appendChild(front);//adiciona a parte da frente a carta
    card.appendChild(back);//adiciona a parte de trás a carta
    grid.appendChild(card);//adiciona a a carta na grid

    card.addEventListener('click',revealCard);
    card.setAttribute('data-character',character);
    return card;
}
const loadGame=(card)=>{//função que carrega o jogo
    const duplicateCharacters=[...characters,...characters];
    const shuffledArray=duplicateCharacters.sort(()=>Math.random()-0.5);

   shuffledArray.forEach((character)=>{
       const card=createCard(character);
       grid.appendChild(card);
   })
}
const startTimer=()=>{
  this.loop=setInterval(()=>{
       const currentTime=+ spanTimer.innerHTML;
       spanTimer.innerHTML=currentTime+1;
  },1000)
}
window.onload=()=>{
    spanPlayer.innerHTML=localStorage.getItem('player');
    startTimer();
    loadGame();
}

    
