const input=document.querySelector('.login_input');
const button=document.querySelector('.login_button');
const form=document.querySelector('.login-form');

const validateInput=({target})=>{ //valida o input para ativar e desativar o botão
    if(target.value.length>3){
        button.removeAttribute('disabled');
        return;
    }
    button.setAttribute('disabled','');
}
const handleSubmit=(event)=>{
    event.preventDefault();

    localStorage.setItem('player',input.value);//coloca um usuário no localStorage
    window.location='/pages/game.html';//direciona o usuário para a página do game
    console.log('logando...');
}
input.addEventListener('input',validateInput);
form.addEventListener('submit',handleSubmit);//salva os dados dps do envio do form
