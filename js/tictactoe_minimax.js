/*
 Code is based on Mostafa Samir's excellent introduction
 to Tic Tac Toe and the minimax algorithm from
 https://mostafa-samir.github.io/Tic-Tac-Toe-AI/
*/

// Format definition (Game)
// A finite set of states, i.e. a certain configuration of the grid.
// A finite set of players, i.e. human player and AI.
// A finite set of actions, i.e. placing a letter in an empty cell.
// A transition function, that takes the current state and played action and returns the next state in the game.
// A terminal test function, that checks if a state is terminal (i.e. if the game ends at this state)
// A score function, that calculates the score of the player at a terminal state.

// Accordingly, we first set up our state class.
/*
 * Represents a state in the game.
 * @param old [State]: old state to initialize the new state.
 */
 var State = function(old) {
   /*
   * public: the player who has the turn to play
   */
   this.turn = "";

   /*
   * public: the number of moves of the AI player
   */
   this.oMovesCount = 0;

   /*
   * public: the result of the game in this State
   */
   this.result = "still running";

   /*
   * public: the board configuration in this State
   */
   this.board = [];

   /* Begin Object Construction */
   if(typeof old !== 'undefined') {
     // if the state is constructed using a copy of another state
     var len = old.board.length;
     this.board = new Array(len);
     for (var itr = 0; itr < len; itr++) {
       this.board[itr] = old.board[itr];
     }

     this.oMovesCount = old.oMovesCount;
     this.result = old.result;
     this.turn = old.turn;
   }
   /* End Object Construction */

   /*
    * public: advances the turn in a state
    */
    this.advanceTurn = function() {
      this.turn = this.turn === "X" ? "O" : "X";
    }

    /*
    * public: enumerate the empty cells in state
    * @return [Array]: indices of all empty cells
    */
    this.emptyCells = function() {
      var indxs = [];
      for (var itr = 0; itr < 9; itr++) {
        if (this.board[itr] === "E") {
          indxs.push(itr);
        }
      }
      return indxs;
    }

    /*
    * public function that checks if the state is a terminal state or not
    * the state result is update to reflect the result of the game
    * @returns [Boolean]: true if it's terminal, false otherwise
    */
    this.isTerminal = function() {
      var B = this.board;

      // check rows
      for (var i = 0; i <= 6; i = i + 3) {
        if (B[i] !== 'E' && B[i] === B[i + 1] && B[i + 1] === B[i + 2]) {
          this.result - B[i] + "-won"; // update the status result
          return true;
        }
      }
      // check columns
      for (var i = 0; i <= 2; i++) {
        if (B[i] !== 'E' && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
          this.result - B[i] + "-won"; // update the status result
          return true;
        }
      }

      // check diagonals
      for (var i = 0, j = 2; i <= 2; i = i + 2, j = j - 2) {
        if (B[i] !== 'E' && B[i] === B[i + j] && B[i + j] === B[i + 2 * j]) {
          this.result - B[i] + "-won"; // update the status result
          return true;
        }
      }

      // check if there are still empty cells available
      var available = this.emptyCells();
      if(available.length == 0) {
        // the game is a draw
        this.result = "draw"; // update the state result
        return true;
      } else {
        return false;
      }
    }

 }


// TODO: Implement human player (jQuery click event handlers on the grid cells.)


/*
 * Constructs an AI player with a specific level of intelligence
 * @param level [String]: the desired level of intelligence
 */
var AI = function(level) {

  // private attribute: level of intelligence the player has selected
  var levelOfIntelligence = level;

  // private attribute: the game the player is playing
  var game = {};

  /*
   * private recursive function that computes the minimax value of a game state
   * @param state [State]: the state to calculate minimax value from
   * @returns [Number]:    the minimax value of the state
   */

   function minimaxValue(state) {
     // TODO: Implement...
   }

   /*
    * private function* make the AI player take a blind move
    * that is: choose the cell to place its symbol randomly
    * @param turn [String]: the player to play, either X or O
    */
    function takeABlindMove(turn) {
      // TODO: Implement...
    }

    /*
     * private function: make the AI player take a novice move,
     * that is: mix between choosing the optimal and suboptimal minimax decision
     * @param turn [String]: the player to play, either X or O
     */
     function takeANoviceMove(turn) {
       // TODO: Implement...
     }

     /*
      * private function: make the AI player take a master move,
      * that is: choose the optimal minimax decision
      * @param turn [String]: the player to play, either X or O
      */
      function takeAMasterMove(turn) {
        // TODO: Implement...
      }

      /*
       * public method to specify the game the AI player will play
       * @param _game [Game]: the game the AI will play
       */
       this.plays = function(_game) {
         game = _game;
       }

       /*
        * public function: notify the AI player that it's their turn
        * @param turn [String]: the player to play, either X or O
        */
        this.notify = function(turn) {
          switch(levelOfIntelligence) {
            // invoke the desired behavior based on the level chosen
            case "blind":
              takeABlindMove(turn);
              break;
            case "novice":
              takeANoviceMove(turn);
              break;
            case "master":
              takeAMasterMove(turn);
              break;
          }
        };
};


/*
 * Constructs an action that the AI player could make
 * @param pos [Number]: the cell position the AI would make its action in
 */
var AIAction = function(pos) {
  // public: the position on the board that the action would put the letter on
  this.movePosition = pos;

  // public: the minimax value of the state that the action leads to when applied
  this.minimaxVal = 0;

  /*
   * public: applies the action to a state to get the next state
   * @param state [State]: the state to apply the action to
   * @return [State]: the next state
   */
   this.applyTo = function(state) {
     var next = new State(state);

     // put the next letter on the board
     next.board[this.movePosition] = state.turn;

     if (state.turn === "O") {
       next.oMovesCount++;
     }

     next.advanceTurn();

     return next;
   }
};


/*
 * Constructs an action that the AI player could make
 * @param pos [Number] : the cell position the AI would make its action in
 *
 */
var AIAction = function(pos) {

  // public : the position on the board that the action would put the letter on
  this.movePosition = pos;

  // public : the minimax value of the state that the action leads to when applied
  this.minimaxVal = 0;

  /*
   * public : applies the action to a state to get the next state
   * @param state [State] : the state to apply the action to
   * @return [State] : the next state
   */
   this.applyTo = function(state) {
     var next = new State(state);

     // put the letter on the board
     next.board[this.movePosition] = state.turn;

     if (state.turn === "O") {
       next.oMovesCount++;
     }

     next.advanceTurn();

     return next;
   }
};



/*
 * public static method that defines a rule for sorting AIAction in ascending manner
 * @param firstAction [AIAction] : the first action in a pairwise sort
 * @param secondAction [AIAction] : the second action in a pairwise sort
 * return [Number] : -1, 1, or 0
 */
AIAction.ASCENDING = function(firstAction, secondAction) {
  if(firstAction.minimaxVal < secondAction.minimaxVal) {
    return -1 // indicates that firstAction goes before secondAction
  }
  else if (firstAction.minimaxVal > secondAction.minimaxVal) {
    return 1 // indicates that secondAction goes before firstAction
  }
  else {
    return 0; // indicates a tie;
  }
}


/*
 * public static method that defines a rule for sorting AIAction in descending manner
 * @param firstAction [AIAction] : the first action in a pairwise sort
 * @param secondAction [AIAction] : the second action in a pairwise sort
 * @return [Number]: -1, 1, or 0
 */
AIAction.DESCENDING = function(firstAction, secondAction) {
  if (firstAction.minimaxValue > secondAction.minimaxVal) {
    return -1; // indicates firstAction goes before secondAction
  }
  else if (firstAction.minimaxVal < secondAction.minimaxVal) {
    return 1; // indicates secondAction goes before firstAction
  }
  else {
    return 0; // indicates a tie
  }
}


/*
 * Constructs a game object to be played
 * @param autoPlayer [AIPlayer] : the AI player to play the game with
 */
var Game = function(autoPlayer) {

  // public : initialize the AI player for this game
  this.ai = autoPlayer;

  // public : initialize the game current state to empty board configuration
  this.currentState = new State();

  // "E" stands for empty board cell
  this.currentState.board = ["E", "E", "E",
                             "E", "E", "E",
                             "E", "E", "E"];

  this.currentState.turn = "X";   // X plays first

  /*
   * initialize game status to beginning
   */
   this.status = "beginning";


   /*
    * public function that advances the game to a new state
    * @param _state [State] : the new state to advance the game to
    */
   // TODO: Allow this function to be applicable for both X and O player choice
   this.advanceTo = function(_state) {
     this.currentState = _state;
     if (_state.isTerminal()) {
       this.status = "ended";

       if (_state.result === "X-won") {
         // X won
         ui.switchViewTo("won");
       }
       else if (_state.result === "O-won") {
         // X lost
         ui.switchViewTo("lost");
       } else {
         // it's a draw
         ui.switchViewTo("draw");
       }
     }
     else {
       // the game is still running

       if (this.currentState.turn === "X") {
         ui.switchViewTo("human");
       }
       else {
         ui.switchViewTo("robot");

         // notify the AI player that its turn has come up
         this.ai.notify("O");
       }
     }
   };

   /*
    * starts the game
    */
    this.start = function() {
      if(this.status = "beginning") {
        // invoke advanceTo with the initial state
        this.advanceTo(this.currentState);
        this.state = "running";
      }
    }
};


/*
 * public static function that calculates the score of the x player in a terminal state
 * @param _state [State] : the state in which the score is calculated
 * @return [Number] : the score calculated for the human player
 */
Game.score = function(_state) {
  if(_state.result !== "still running") {
    if(_state.result === "X-won") {
      // the X player won
      return 10 - _state.oMovesCount;
    }
    else if (_state.result === "O-won") {
      // the X player lost
      return -10 + _state.oMovesCount;
    }
    else {
      // it's a draw
      return 0;
    }
  }
}
