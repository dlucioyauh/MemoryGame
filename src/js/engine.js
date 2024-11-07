
const backgroundAudio = new Audio("./src/assets/sounds/environment.mp3");
backgroundAudio.loop = true;  
backgroundAudio.play();  

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

let shuffleImages = images.sort(() => (Math.random() > 0.5 ? 2 : -1));

for (let i = 0; i < images.length; i++) {
  let box = document.createElement("div");
  box.className = "item";
  
  
  let img = document.createElement("img");
  img.src = `./src/assets/images/${shuffleImages[i].src}`;
  img.alt = shuffleImages[i].src.split('.')[0];  
  
  
  img.style.width = "80px"; 
  img.style.height = "80px"; 

  
  const audio = new Audio(`./src/assets/sounds/${shuffleImages[i].sound}`);
  
  img.onclick = () => {
    audio.play();  
    handleClick.call(box); 
  };
  
  box.appendChild(img);
  box.onclick = handleClick;
  document.querySelector(".game").appendChild(box);
}

function handleClick() {
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 500);
  }

  console.log(openCards);
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
  }

  openCards = [];

  if (document.querySelectorAll(".boxMatch").length === images.length) {
    alert("Você venceu !");
  }
}
