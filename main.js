// // Accessing Blocks
// let Quiz_Result_Block = document.getElementById("Block-5");
// let Exit_Block = document.getElementById("Block-6");

// // Adding Events to Buttons
// // Block -1
// // Block -1 Variables
// let Start_Game_Block = document.getElementById("Block-1");
// let Start_button = document.getElementById("Start-button");

// // Block - 1 Events
// Start_button.addEventListener("click", () => {
//   Start_Game_Block.classList.add("hidden");
//   Player_setup_Block.classList.remove("hidden");
// });

// // Block-2
// // Block - 2 Variables
// let Player_setup_Block = document.getElementById("Block-2");
// let Block_2_Button = document.getElementById("Block_2_Btn");
// let Player_1_Name, Player_2_Name;

// // Block - 2 Events
// Block_2_Button.addEventListener("click", Validate_Players);

// function Validate_Players() {
//   Player_1_Name = document.getElementById("player-1").value.trim();
//   Player_2_Name = document.getElementById("player-2").value.trim();
//   const error_msg_p1 = document.getElementById("error-message_p1");
//   const error_msg_p2 = document.getElementById("error-message_p2");

//   if (!Player_1_Name) {
//     error_msg_p1.textContent = "Please Enter Player - 1 Name...!";
//     return;
//   } else if (!Player_2_Name) {
//     error_msg_p2.textContent = "Please Enter Player - 2 Name...!";
//     error_msg_p1.textContent = "";
//     return;
//   }
//   Player_setup_Block.classList.add("hidden");
//   Select_Category_Block.classList.remove("hidden");
// }

// // Block - 3
// // Block - 3 Variables
// let category;
// let Select_Category_Block = document.getElementById("Block-3");
// let Start_btn_b3 = document.getElementById("Start_btn_b3");
// let category_value = document.getElementById("Category_value");
// let previousCategories = []; // List of previously selected categories
// let previousCategoriesParagraph = document.getElementById(
//   "previous_categories"
// );

// // Block - 3 Events
// Start_btn_b3.addEventListener("click", () => {
//   category = document.getElementById("quiz-category").value;
//   category = formatCategory(category);
//   console.log(category);
//   previousCategories.push(category); // Add the selected category to the list
//   console.log(previousCategories);
//   Select_Category_Block.classList.add("hidden");
//   Ready_block.classList.remove("hidden");
//   category_value.innerHTML = `<b>Selected Category</b> : <i>${category}</i>`;
//   previousCategoriesParagraph.innerHTML =
//   previousCategories.length > 0
//   ? `<b>Previously Selected Categories: </b>${previousCategories.join(
//     ", "
//   )}`
//   : "";
// });

// function formatCategory(category) {
//   // Replace underscores with spaces
//   let formatted = category.replace(/_/g, " ");

//   // Capitalize each word
//   formatted = formatted.replace(/\b\w/g, function (char) {
//     return char.toUpperCase();
//   });
//   return formatted;
// }

// // Block - Ready Block
// // Variables
// let Ready_block = document.getElementById("ready_block");
// let Ready_Button = document.getElementById("Ready_block_btn");
// let Quiz_Block = document.getElementById("Block-4");
// let Questions = [];
// let currentQuestionIndex = 0;
// let currentPlayer = 1;
// let player1Score = 0;
// let player2Score = 0;

// // Events
// Ready_Button.addEventListener("click", Generate_Quiz);

// // Function to shuffle options
// function shuffleOptions(options) {
//   for (let i = options.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [options[i], options[j]] = [options[j], options[i]];
//   }
// }

// // Async function to fetch questions
// async function fetchQuestions(difficulty) {
//   const response = await fetch(
//     `https://the-trivia-api.com/v2/questions?categories=${category}&difficulty=${difficulty}`
//   );
//   const data = await response.json();
//   return data;
// }

// // Async function to generate quiz questions
// async function Generate_Quiz() {
//   Ready_block.classList.add("hidden");
//   Quiz_Block.classList.remove("hidden");

//   try {
//     const easyQuestions = await fetchQuestions("easy");
//     const mediumQuestions = await fetchQuestions("medium");
//     const hardQuestions = await fetchQuestions("hard");

//     // Assume the data is an array of questions, and we take the first 2 of each difficulty for both players
//     Questions = [
//       ...easyQuestions.slice(0, 4),
//       ...mediumQuestions.slice(0, 4),
//       ...hardQuestions.slice(0, 4),
//     ];

//     // Shuffle the questions array to randomize the order
//     shuffleOptions(Questions);
//     displayQuestion();
//   } catch (error) {
//     console.error("Error fetching quiz questions:", error);
//   }
// }

// function displayQuestion() {
//   if (currentQuestionIndex < Questions.length) {
//     let question = Questions[currentQuestionIndex];
//     let options = [question.correctAnswer, ...question.incorrectAnswers];
//     shuffleOptions(options);

//     document.getElementById("question").textContent = question.question.text;
//     let optionsList = document.getElementById("options");
//     optionsList.innerHTML = "";
//     options.forEach((option) => {
//       let li = document.createElement("li");
//       li.textContent = option;
//       li.addEventListener("click", () => checkAnswer(option, question));
//       optionsList.appendChild(li);
//     });

//     document.getElementById("player_turn").textContent = `${
//       currentPlayer === 1 ? Player_1_Name : Player_2_Name
//     }'s Turn`;
//   } else {
//     Quiz_Block.classList.add("hidden");
//     Quiz_Result_Block.classList.remove("hidden");
//     displayResults();
//   }
// }

// function checkAnswer(selected, question) {
//   if (selected === question.correctAnswer) {
//     if (currentPlayer === 1) {
//       player1Score += getPoints(question.difficulty);
//     } else {
//       player2Score += getPoints(question.difficulty);
//     }
//   }

//   currentPlayer = currentPlayer === 1 ? 2 : 1;
//   currentQuestionIndex++;
//   displayQuestion();
// }

// function getPoints(difficulty) {
//   switch (difficulty) {
//     case "easy":
//       return 10;
//     case "medium":
//       return 15;
//     case "hard":
//       return 20;
//     default:
//       return 0;
//   }
// }

// function displayResults() {
//   document.getElementById(
//     "player1_score"
//   ).textContent = `${Player_1_Name}: ${player1Score} points`;
//   document.getElementById(
//     "player2_score"
//   ).textContent = `${Player_2_Name}: ${player2Score} points`;

//   if (player1Score > player2Score) {
//     document.getElementById("winner").textContent = `${Player_1_Name} Wins!`;
//   } else if (player2Score > player1Score) {
//     document.getElementById("winner").textContent = `${Player_2_Name} Wins!`;
//   } else {
//     document.getElementById("winner").textContent = "It's a Tie!";
//   }
// }

// // Function to restart the game
// function restartGame() {
//   // Reset all the relevant variables
//   currentQuestionIndex = 0;
//   currentPlayer = 1;
//   player1Score = 0;
//   player2Score = 0;
//   Questions = [];

//   // Reset all the UI elements to their initial state
//   document.getElementById("player-1").value = "";
//   document.getElementById("player-2").value = "";
//   document.getElementById("error-message_p1").textContent = "";
//   document.getElementById("error-message_p2").textContent = "";

//   // Select_Category_Block.classList.add("hidden");
//   Ready_block.classList.add("hidden");
//   Quiz_Block.classList.add("hidden");
//   Quiz_Result_Block.classList.add("hidden");
//   Exit_Block.classList.add("hidden");

//   Start_Game_Block.classList.remove("hidden");

//   document.getElementById("Category_value").innerHTML = "";
//   document.getElementById("player_turn").textContent = "";
//   document.getElementById("question").textContent = "";
//   document.getElementById("options").innerHTML = "";
//   document.getElementById("player1_score").textContent = "";
//   document.getElementById("player2_score").textContent = "";
//   document.getElementById("winner").textContent = "";
//   document.getElementById("question").textContent = "Loading Questions...";
// }

// // Function to handle exit game
// function exitGame() {
//   // Hide all blocks
//   Start_Game_Block.classList.add("hidden");
//   Player_setup_Block.classList.add("hidden");
//   Select_Category_Block.classList.add("hidden");
//   Ready_block.classList.add("hidden");
//   Quiz_Block.classList.add("hidden");
//   Quiz_Result_Block.classList.add("hidden");

//   // Show the Exit block
//   Exit_Block.classList.remove("hidden");
// }

// // Attach restartGame function to the restart button
// document.getElementById("restart-game").addEventListener("click", restartGame);

// // Attach exitGame function to the exit button
// document.getElementById("exit-game").addEventListener("click", exitGame);

// Accessing Blocks
let Start_Game_Block = document.getElementById("Block-1");
let Player_setup_Block = document.getElementById("Block-2");
let Select_Category_Block = document.getElementById("Block-3");
let Ready_block = document.getElementById("ready_block");
let Quiz_Block = document.getElementById("Block-4");
let Quiz_Result_Block = document.getElementById("Block-5");
let Exit_Block = document.getElementById("Block-6");

// Variables
let Start_button = document.getElementById("Start-button");
let Block_2_Button = document.getElementById("Block_2_Btn");
let Player_1_Name, Player_2_Name;
let category;
let Start_btn_b3 = document.getElementById("Start_btn_b3");
let category_value = document.getElementById("Category_value");
let previousCategories = []; // List of previously selected categories
let previousCategoriesParagraph = document.getElementById(
  "previous_categories"
);
let Ready_Button = document.getElementById("Ready_block_btn");
let Questions = [];
let currentQuestionIndex = 0;
let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;

// Start Game Event
Start_button.addEventListener("click", () => {
  Start_Game_Block.classList.add("hidden");
  Player_setup_Block.classList.remove("hidden");
});

// Player Setup Block Events
Block_2_Button.addEventListener("click", Validate_Players);

function Validate_Players() {
  Player_1_Name = document.getElementById("player-1").value.trim();
  Player_2_Name = document.getElementById("player-2").value.trim();
  const error_msg_p1 = document.getElementById("error-message_p1");
  const error_msg_p2 = document.getElementById("error-message_p2");

  if (!Player_1_Name) {
    error_msg_p1.textContent = "Please Enter Player - 1 Name...!";
    return;
  } else if (!Player_2_Name) {
    error_msg_p2.textContent = "Please Enter Player - 2 Name...!";
    error_msg_p1.textContent = "";
    return;
  }

  Player_setup_Block.classList.add("hidden");
  Select_Category_Block.classList.remove("hidden");
}

// Category Selection Block Events
Start_btn_b3.addEventListener("click", () => {
  category = document.getElementById("quiz-category").value;
  category = formatCategory(category);

  previousCategories.push(category); // Add the selected category to the list

  Select_Category_Block.classList.add("hidden");
  Ready_block.classList.remove("hidden");
  category_value.innerHTML = `<b>Selected Category</b> : <i>${category}</i>`;
  previousCategoriesParagraph.innerHTML =
    previousCategories.length > 0
      ? `<b>Previously Selected Categories: </b>${previousCategories.join(
          ", "
        )}`
      : "";
});

function formatCategory(category) {
  // Replace underscores with spaces and capitalize each word
  return category
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Ready Block Events
Ready_Button.addEventListener("click", Generate_Quiz);

// Function to shuffle options
function shuffleOptions(options) {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
}

// Async function to fetch questions based on difficulty
async function fetchQuestions(difficulty) {
  const response = await fetch(
    `https://the-trivia-api.com/v2/questions?categories=${category}&difficulty=${difficulty}`
  );
  const data = await response.json();
  return data;
}

// Function to generate quiz questions
async function Generate_Quiz() {
  Ready_block.classList.add("hidden");
  Quiz_Block.classList.remove("hidden");

  try {
    const easyQuestions = await fetchQuestions("easy");
    const mediumQuestions = await fetchQuestions("medium");
    const hardQuestions = await fetchQuestions("hard");

    // Combine and shuffle questions
    Questions = [
      ...easyQuestions.slice(0, 4),
      ...mediumQuestions.slice(0, 4),
      ...hardQuestions.slice(0, 4),
    ];
    console.log(Questions);
    shuffleOptions(Questions);
    console.log(shuffleOptions(Questions));
    displayQuestion();
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
  }
}

// Function to display the current question
function displayQuestion() {
  if (currentQuestionIndex < Questions.length) {
    let question = Questions[currentQuestionIndex];
    let options = [question.correctAnswer, ...question.incorrectAnswers];
    shuffleOptions(options);
    console.log(options);

    document.getElementById("question").textContent = question.question.text;
    let optionsList = document.getElementById("options");
    optionsList.innerHTML = "";
    options.forEach((option) => {
      let li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => checkAnswer(option, question));
      optionsList.appendChild(li);
    });

    document.getElementById("player_turn").textContent = `${
      currentPlayer === 1 ? Player_1_Name : Player_2_Name
    }'s Turn`;
  } else {
    Quiz_Block.classList.add("hidden");
    Quiz_Result_Block.classList.remove("hidden");
    displayResults();
  }
}

// Function to check the selected answer and update the score
function checkAnswer(selected, question) {
  if (selected === question.correctAnswer) {
    if (currentPlayer === 1) {
      player1Score += getPoints(question.difficulty);
    } else {
      player2Score += getPoints(question.difficulty);
    }
  }

  currentPlayer = currentPlayer === 1 ? 2 : 1;
  currentQuestionIndex++;
  displayQuestion();
}

// Function to get points based on question difficulty
function getPoints(difficulty) {
  switch (difficulty) {
    case "easy":
      return 10;
    case "medium":
      return 15;
    case "hard":
      return 20;
    default:
      return 0;
  }
}

// Function to display the results at the end of the quiz
function displayResults() {
  document.getElementById(
    "player1_score"
  ).textContent = `${Player_1_Name}: ${player1Score} points`;
  document.getElementById(
    "player2_score"
  ).textContent = `${Player_2_Name}: ${player2Score} points`;

  if (player1Score > player2Score) {
    document.getElementById("winner").textContent = `${Player_1_Name} Wins!`;
  } else if (player2Score > player1Score) {
    document.getElementById("winner").textContent = `${Player_2_Name} Wins!`;
  } else {
    document.getElementById("winner").textContent = "It's a Tie!";
  }
}

// Function to restart the game
function restartGame() {
  // Reset all the relevant variables
  currentQuestionIndex = 0;
  currentPlayer = 1;
  player1Score = 0;
  player2Score = 0;
  Questions = [];

  // Reset all the UI elements to their initial state
  document.getElementById("player-1").value = "";
  document.getElementById("player-2").value = "";
  document.getElementById("error-message_p1").textContent = "";
  document.getElementById("error-message_p2").textContent = "";

  // Hide all blocks and show the start block
  Player_setup_Block.classList.add("hidden");
  Select_Category_Block.classList.add("hidden");
  Ready_block.classList.add("hidden");
  Quiz_Block.classList.add("hidden");
  Quiz_Result_Block.classList.add("hidden");
  Exit_Block.classList.add("hidden");

  Start_Game_Block.classList.remove("hidden");

  // Reset displayed text
  document.getElementById("Category_value").innerHTML = "";
  document.getElementById("player_turn").textContent = "";
  document.getElementById("question").textContent = "Loading Questions...";
  document.getElementById("options").innerHTML = "";
  document.getElementById("player1_score").textContent = "";
  document.getElementById("player2_score").textContent = "";
  document.getElementById("winner").textContent = "";
}

// Function to handle exit game
function exitGame() {
  // Hide all blocks and show the exit block
  Start_Game_Block.classList.add("hidden");
  Player_setup_Block.classList.add("hidden");
  Select_Category_Block.classList.add("hidden");
  Ready_block.classList.add("hidden");
  Quiz_Block.classList.add("hidden");
  Quiz_Result_Block.classList.add("hidden");

  Exit_Block.classList.remove("hidden");
}

// Attach restartGame function to the restart button
document.getElementById("restart-game").addEventListener("click", restartGame);

// Attach exitGame function to the exit button
document.getElementById("exit-game").addEventListener("click", exitGame);
