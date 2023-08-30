let myDivname = document.querySelector(".name span");
let blocksContainer = document.querySelector(".memory-game-blocks");
let gameBlocks = Array.from(blocksContainer.children);
let duration = 1000;
let wrongTries = 0;

window.onload = function () {
  let yourName = window.prompt("Enter your name");
  if (yourName == null || yourName == "") {
    myDivname.innerHTML = "Unknown";
  } else {
    myDivname.innerHTML = yourName;
  }
};
let orderRange = [...Array(gameBlocks.length).keys()];
shuffle(orderRange);
gameBlocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("isflipped");

  let allFlippedBlocks = gameBlocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("isflipped")
  );

  if (allFlippedBlocks.length === 2) {
    stopClicking();
    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
function stopClicking() {
  blocksContainer.classList.add("no-clicking");

  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}
function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.remove("isflipped");
    secondBlock.classList.remove("isflipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");

    document.getElementById("success").play();
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

    setTimeout(() => {
      firstBlock.classList.remove("isflipped");
      secondBlock.classList.remove("isflipped");
    }, duration);

    document.getElementById("fail").play();
  }
}

function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }
  return array;
}
