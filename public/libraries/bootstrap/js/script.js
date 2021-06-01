//membuat class player
class player {
  constructor(batu, kertas, gunting) {
    this.batu = batu;
    this.kertas = kertas;
    this.gunting = gunting;
  }

  //pilihan komputer
  getPilihanKomputer() {
    resetComp();
    const comp = Math.random();

    if (comp < 0.34) {
      compbatu.classList.add("selected");
      return "batu";
    }
    if (comp >= 0.34 && comp < 0.67) {
      compkertas.classList.add("selected");
      return "kertas";
    } else {
      compgunting.classList.add("selected");
      return "gunting";
    }
  }
  //akhir pilihan komputer

  //pilihan hasilnya

  getHasil(comp, player) {
    var hasilS = "";

    if (player == comp) return "DRAW";
    if (player == "batu") {
      hasilS = comp == "kertas" ? "COMP WIN" : "PLAYER 1 WIN";
      return hasilS;
    }
    if (player == "kertas") {
      hasilS = comp == "batu" ? "PLAYER 1 WIN" : "COMP WIN";
      return hasilS;
    }
    if (player == "gunting") {
      hasilS = comp == "kertas" ? "PLAYER 1 WIN" : "COMP WIN";
      return hasilS;
    }
  }
  //akhir pilihan hasilnya
}
var allPlayer = new player("rock", "paper", "scisor");

//akhir membuat class

//membuat background pada computer
let compbatu = document.querySelector(".compBatu");
let compkertas = document.querySelector(".compKertas");
let compgunting = document.querySelector(".compGunting");
function resetComp() {
  compbatu.classList.remove("selected");
  compkertas.classList.remove("selected");
  compgunting.classList.remove("selected");
}

//alhir background pada computer

//disini adalah ketika ditekan akan memunculkan pilihan
const pilihan = document.querySelectorAll(".area-player li img");
// var sComp = 0;
// var sPlayer = 0;
pilihan.forEach(function (pil) {
  pil.addEventListener("click", function () {
    const pilihanKomputer = allPlayer.getPilihanKomputer();
    const pilihanPlayer = pil.className;
    const hasil = allPlayer.getHasil(pilihanKomputer, pilihanPlayer);

    //membuat score
    // let scoreComp = document.querySelector(".score.komputer");
    // let scorePlayer = document.querySelector(".score.player");
    // if (hasil == "PLAYER 1 WIN") {
    //   sPlayer++;
    //   scorePlayer.innerHTML = "Score: " + sPlayer;
    //   console.log(sPlayer);
    // }
    // if (hasil == "COMP WIN") {
    //   sComp++;
    //   scoreComp.innerHTML = "Score: " + sComp;
    //   console.log(sComp);
    // }

    //akhir score

    const imgKomputer = document.querySelector(".area-comp li");
    imgKomputer.setAttribute("src", "assets/" + pilihanKomputer + ".png");

    //mengatur bakcground pada VERSUS
    const info = document.querySelector(".info");
    info.innerHTML = hasil;
    info.classList.remove("versus");
    info.classList.add("pilihan");
    // akhir mengatur bakcground pada VERSUS
  });
});
//akhir

//membuat padding grey pada gambar
let pBatu = document.getElementById("libatu");
let pKertas = document.getElementById("likertas");
let pGunting = document.getElementById("ligunting");
let compBatu = document.getElementById("c-Batu");
let compKertas = document.getElementById("c-Kertas");
let compGunting = document.getElementById("c-Gunting");
var textResult = document.getElementById("result");
let pHands = document.getElementsByClassName("players");
let compHand = document.getElementsByClassName("c-Hand");
let tombolRefresh = document.getElementById("refresh");
tombolRefresh.addEventListener("click", function () {
  resetGame();
});

for (let i = 0; i < pHands.length; i++) {
  const element = pHands[i];
  element.addEventListener("click", function () {
    resetPlayerHands();
    element.classList.add("selected");
  });
}

function resetPlayerHands() {
  for (let i = 0; i < pHands.length; i++) {
    const element = pHands[i];
    element.classList.remove("selected");
  }
}
function resetCompHands() {
  for (let i = 0; i < compHand.length; i++) {
    const element = compHand[i];
    element.classList.remove("selected");
  }
}

function resetTextResult() {
  window.location.replace(
    window.location.pathname + window.location.search + window.location.hash
  );
}

function resetGame() {
  resetPlayerHands();
  resetCompHands();
  resetTextResult();
}

//akhir membuat padding grey pada gambar
