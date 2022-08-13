const gameBoard = (() => {
    let _board = [,,,,,,,,];

    const makeMove = (sign, position) => {
        _board[position] = sign;
    };
    const clearBoard = () => {
        _board = [,,,,,,,,]
    };
    const checkResult = (sign) => {
        if ((_board[0] == sign && _board[1] == sign && _board[2] == sign) ||
        (_board[3] == sign && _board[4] == sign && _board[5] == sign) ||
        (_board[6] == sign && _board[7] == sign && _board[8] == sign) ||
        (_board[0] == sign && _board[3] == sign && _board[6] == sign) ||
        (_board[1] == sign && _board[4] == sign && _board[7] == sign) ||
        (_board[2] == sign && _board[5] == sign && _board[8] == sign) ||
        (_board[0] == sign && _board[4] == sign && _board[8] == sign) ||
        (_board[2] == sign && _board[4] == sign && _board[6] == sign)) {
            return 'win';
        } else if (!_board.includes(undefined)) {
            return 'tie';
        } else return false;
    };
    const printBoard = () => _board;

    return { makeMove, clearBoard, checkResult, printBoard }
})(); 

const player = (() => {
    let _sign = 'x';
    const switchSign = () => {
        if (_sign == 'x') {
            _sign = 'o';
        } else _sign = 'x'
    };
    const getSign = () => _sign;
    const reset = () => {
        _sign = 'x';
    }

    return { switchSign, getSign, reset }
})();

const displayController = (() => {
    const cells = document.querySelectorAll(".cell");
    const result = document.querySelector('h2');
    const move = document.getElementById('div-move');
    const startOverBtn = document.querySelector('button'); 
    
    const _makeCellInactive = (e) => {
        e.target.style.pointerEvents = "none";
    }

    const _startOver = () => {
        cells.forEach(cell => {
            cell.style.pointerEvents = "";
            cell.textContent = ""
        });
        result.textContent = "";
        move.textContent = "x"

        gameBoard.clearBoard();
        player.reset();
    } 


    const _play = (e) => {
        const position = e.target.id;
        const sign = player.getSign();
        gameBoard.makeMove(sign, position);
        console.log(sign, position, gameBoard.printBoard());
        e.target.textContent = sign;
        _makeCellInactive(e);
        player.switchSign();
        move.textContent = player.getSign();
        
        const gameResult = gameBoard.checkResult(sign);        
        
        if (gameResult == 'win') {
            result.textContent = `Player ${sign.toUpperCase()} won!`;
            cells.forEach(cell => cell.style.pointerEvents = "none");
        } else if (gameResult == 'tie') {
            result.textContent = `It's a tie!`;
        } 
        
    }

    cells.forEach(cell => cell.addEventListener("click", _play));
    startOverBtn.addEventListener('click', _startOver)
})();