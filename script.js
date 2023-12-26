const html = document.querySelector('html');
const image = document.querySelector('.app__image');

const buttonFoco = document.querySelector('.app__card-button--foco');
const buttonCurto = document.querySelector('.app__card-button--curto');
const buttonLongo = document.querySelector('.app__card-button--longo');
const titulo = document.querySelector('.app__title');
const buttons = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioPause = new Audio('./sons/pause.mp3');
const audioPlay = new Audio('./sons/play.wav');
const audioBeep = new Audio('./sons/beep.mp3');
const imgPlay = document.querySelector('.app__card-primary-butto-icon')
const buttonStartPause = document.querySelector('#start-pause span');
const temporizador = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        //audioBeep.play()
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

musica.loop = true

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

buttonFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    definirDataContexto('foco')
    buttonFoco.classList.add('active')
})

buttonCurto.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    definirDataContexto('descanso-curto')
    buttonCurto.classList.add('active')
})

buttonLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    definirDataContexto('descanso-longo')
    buttonLongo.classList.add('active')
})

startPauseBt.addEventListener('click', iniciaOuPausar)

// funções
function iniciaOuPausar() {
    if(intervaloId){
        audioPause.play()
        zerar()
        return
    }
    audioPlay.play()
    buttonStartPause.textContent = 'Pausar'
    imgPlay.setAttribute('src', './imagens/pause.png')
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar() {
    clearInterval(intervaloId)
    buttonStartPause.textContent = 'Começar'
    imgPlay.setAttribute('src', './imagens/play_arrow.png')
    intervaloId = null
}

function definirDataContexto (contextName) {
    mostrarTempo()
    buttons.forEach(function (contextName) {
        contextName.classList.remove('active')
    })
    html.setAttribute('data-contexto', contextName)
    image.setAttribute('src', `/imagens/${contextName}.png`)

    switch (contextName) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>
            `
            break;
        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>
            `
            break;
        default:
            break;
    }
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})
    temporizador.innerHTML = `${tempoFormatado}`
}

mostrarTempo()