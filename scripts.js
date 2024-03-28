const uusipeli = document.getElementById("uusipeli");
uusipeli.addEventListener("click", function () {
  gameInstance.newGame.reset();
});

// Assume you have multiple elements with the class 'myClass'
document.addEventListener("click", function (event) {
  // Check if the clicked element or any of its parents have the class 'myClass'

  if (event.target.closest(".game-item")) {
    if (gameInstance.voittaja == false) {
      var sijainti = event.target.getAttribute("id");
      console.log(sijainti[0], sijainti[1]);
      var pelimerkki = "";

      if (gameInstance.vuoro == 0) pelimerkki = "X";
      else pelimerkki = "O";
      console.log(gameInstance.vuoro);
      var value = document.createElement("p");
      value.textContent = pelimerkki;
      event.target.appendChild(value);
      gameInstance.vaihdaVuoro();

      gameInstance.newGame.add(pelimerkki, sijainti[0], sijainti[1]);
    }
  }
});

var gameInstance = game("leevi", "nikke");

function winnerLog(winner) {
  console.log("pehva");
  var winnerInfo = document.querySelector(".winnerNotification");
  if (winnerInfo) {
    var value = document.createElement("p");
    value.textContent = "Winner is " + winner;
    winnerInfo.innerHTML = ""; // Clear previous content
    winnerInfo.appendChild(value);
    console.log("pehva1");
  } else {
    console.error("Element with class 'winnerNotification' not found.");
  }
}

function game(name1, name2) {
  return {
    voittaja: false,
    voittajaActivate: function () {
      this.voittaja = true;
    },
    vuoro: 0,
    vaihdaVuoro: function () {
      if (this.vuoro == 0) {
        this.vuoro++;
      } else {
        this.vuoro--;
      }
    },

    newGame: gameGrid(),
    player1: {
      name: name1,
      value: "x",
      nameinfo: function () {
        console.log(this.name);
      },
    },
    player2: {
      name: name2,
      value: "0",
      nameinfo: function () {
        console.log(this.name);
      },
    },
  };
}

function gameGrid() {
  let grid = [
    ["", "", ""], // Row 1
    ["", "", ""], // Row 2
    ["", "", ""], // Row 3
  ];

  function resetUI() {
    document.querySelectorAll(".game-item").forEach(function (element) {
      winner == false;
      // Assuming the markers are in <p> elements
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    });
  }

  function checkWinner() {
    // Check rows and columns
    for (let i = 0; i < 3; i++) {
      if (
        grid[i][0] === grid[i][1] &&
        grid[i][1] === grid[i][2] &&
        grid[i][0] !== ""
      ) {
        return grid[i][0];
      }
      if (
        grid[0][i] === grid[1][i] &&
        grid[1][i] === grid[2][i] &&
        grid[0][i] !== ""
      ) {
        return grid[0][i];
      }
    }

    // Check diagonals
    if (
      grid[0][0] === grid[1][1] &&
      grid[1][1] === grid[2][2] &&
      grid[0][0] !== ""
    ) {
      return grid[0][0];
    }
    if (
      grid[0][2] === grid[1][1] &&
      grid[1][1] === grid[2][0] &&
      grid[0][2] !== ""
    ) {
      return grid[0][2];
    }

    return null; // No winner yet
  }

  return {
    add: function (value, row, col) {
      if (row >= 0 && row < 3 && col >= 0 && col < 3 && grid[row][col] === "") {
        grid[row][col] = value;
        let winner = checkWinner();
        if (winner) {
          console.log(winner + " has won!");
          winnerLog(winner);

          gameInstance.voittaja = true;
        }
      } else {
        console.log("Invalid position or cell already occupied");
      }
    },
    displayScore: function () {
      console.log(grid);
    },
    reset: function () {
      grid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ];
      resetUI(); // Call resetUI to clear the UI
      console.log("Game reset. New game started.");
    },
  };
}
