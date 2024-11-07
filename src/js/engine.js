const backgroundAudio = new Audio("./src/assets/sounds/environment.mp3");
backgroundAudio.loop = true;

// Criar a mensagem de alerta para ligar o som
const soundMessage = document.createElement("div");
soundMessage.id = "soundMessage";
soundMessage.style.position = "absolute";
soundMessage.style.top = "20px";
soundMessage.style.left = "50%";
soundMessage.style.transform = "translateX(-50%)";
soundMessage.style.padding = "10px";
soundMessage.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
soundMessage.style.color = "#fff";
soundMessage.style.fontSize = "18px";
soundMessage.style.fontWeight = "bold";
soundMessage.style.borderRadius = "5px";
soundMessage.style.zIndex = "1000";
soundMessage.innerHTML = "Por favor, ligue o som para jogar!";

// Adicionar a mensagem ao body
document.body.appendChild(soundMessage);

// Play do áudio de fundo
backgroundAudio.oncanplaythrough = function() {
  // Quando o áudio for carregado e estiver pronto para tocar, esconder a mensagem
  document.getElementById("soundMessage").style.display = "none";
  backgroundAudio.play();
};

// Cartas e sons
const images = [
  { src: "cat.png", sound: "cat.mp3" },
  { src: "cat.png", sound: "cat.mp3" },
  { src: "cock.png", sound: "cock.mp3" },
  { src: "cock.png", sound: "cock.mp3" },
  { src: "cow.png", sound: "cow.mp3" },
  { src: "cow.png", sound: "cow.mp3" },
  { src: "dog.png", sound: "dog.mp3" },
  { src: "dog.png", sound: "dog.mp3" },
  { src: "elephant.png", sound: "elephant.mp3" },
  { src: "elephant.png", sound: "elephant.mp3" },
  { src: "lion.png", sound: "lion.mp3" },
  { src: "lion.png", sound: "lion.mp3" },
  { src: "monkey.png", sound: "monkey.mp3" },
  { src: "monkey.png", sound: "monkey.mp3" },
  { src: "pig.png", sound: "pig.mp3" },
  { src: "pig.png", sound: "pig.mp3" },
];

let openCards = [];
let shuffleImages = images.sort(() => (Math.random() > 0.5 ? 1 : -1));

for (let i = 0; i < images.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  
  let img = document.createElement("img");
  img.src = `./src/assets/images/${shuffleImages[i].src}`;
  img.alt = shuffleImages[i].src.split('.')[0];
  img.style.width = "80px"; 
  img.style.height = "80px";
  
  // Áudio criado dentro do loop de cartas
  const audio = new Audio(`./src/assets/sounds/${shuffleImages[i].sound}`);
  audio.preload = "auto";
  
  // Adicionando o evento de erro para depuração
  audio.onerror = function (e) {
    console.error("Erro ao carregar áudio:", e);
  };

  // Novo evento de clique unificado
  box.onclick = async function() {
    if (!this.classList.contains("boxOpen") && openCards.length < 2) {
      try {
        audio.currentTime = 0; // Reinicia o áudio se já estiver tocando
        await audio.play();
      } catch (err) {
        console.error("Erro ao tentar reproduzir áudio:", err);
      }
      
      this.classList.add("boxOpen");
      openCards.push(this);
      
      if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
      }
    }
  };

  box.appendChild(img);
  document.querySelector(".game").appendChild(box);
}

function checkMatch() {
  const card1 = openCards[0];
  const card2 = openCards[1];

  if (card1 && card2) {
    if (card1.innerHTML === card2.innerHTML) {
      card1.classList.add("boxMatch");
      card2.classList.add("boxMatch");
    } else {
      setTimeout(() => {
        card1.classList.remove("boxOpen");
        card2.classList.remove("boxOpen");
      }, 500);
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === images.length) {
      alert("Você venceu!");
    }
  }
}
