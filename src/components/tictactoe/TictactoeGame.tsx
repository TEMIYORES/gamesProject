import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "./tictactoeComps/Button";
import Square from "./tictactoeComps/Square";
import "./tictactoeComps/tictactoeStyles.css";
import { useSelector } from "react-redux";
import { getTictactoeData } from "../../slices/tictactoe";
import sound1 from "../../assets/sounds/sound1.mp3";
import sound2 from "../../assets/sounds/sound2.mp3";

const TictactoeGame = () => {
  const tictactoeSetting = useSelector(getTictactoeData);
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("x");
  const [winner, setWinner] = useState<string | null>(null);

  const checkEndTheGame = () => {
    for (const square of squares) {
      if (!square) return false;
    }
    return true;
  };

  const checkWinner = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of combos) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const updateSquares = (ind: number) => {
    if (squares[ind] || winner) {
      return;
    }
    const s = squares;
    s[ind] = turn;
    setSquares(s);
    setTurn(turn === "x" ? "o" : "x");
    const W = checkWinner();
    if (W) {
      setWinner(W);
    } else if (checkEndTheGame()) {
      setWinner("x | o");
    }
    if (W != null && W == "x") {
      onWinSound();
    } else if (W != null && W == "o") {
      onLoseSound();
    } else if (W == null && checkEndTheGame()) {
      onWinSound();
    }
  };
  const onLoseSound = () => {
    if (loseaudio.paused) {
      loseaudio.play();
    }
  };
  const onWinSound = () => {
    if (winAudio.paused) {
      winAudio.play();
    }
  };
  const resetGame = () => {
    setSquares(Array(9).fill(""));
    setTurn("x");
    setWinner(null);
  };

  const minimax = (
    squares: string[],
    depth: number,
    isMaximizingPlayer: boolean
  ) => {
    const winner = checkWinner();
    if (winner !== null) {
      return winner === "o" ? 10 - depth : depth - 10;
    }

    if (checkEndTheGame()) {
      return 0;
    }

    if (isMaximizingPlayer) {
      let maxEval = -Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === "") {
          squares[i] = "o";
          const evaluation = minimax(squares, depth + 1, false);
          squares[i] = "";
          maxEval = Math.max(maxEval, evaluation);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < squares.length; i++) {
        if (squares[i] === "") {
          squares[i] = "x";
          const evaluation = minimax(squares, depth + 1, true);
          squares[i] = "";
          minEval = Math.min(minEval, evaluation);
        }
      }
      return minEval;
    }
  };

  const bestMove = () => {
    let bestEval = -Infinity;
    let move = null;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === "") {
        squares[i] = "o";
        const evaluation = minimax(squares, 0, false);
        squares[i] = "";
        if (evaluation > bestEval) {
          bestEval = evaluation;
          move = i;
        }
      }
    }
    updateSquares(move!);
  };

  useEffect(() => {
    if (turn === "o") {
      bestMove();
    }
  }, [turn]);

  const [loseaudio, setLoseAudio] = useState<HTMLAudioElement>(new Audio());
  const [winAudio, setWinAudio] = useState<HTMLAudioElement>(new Audio());

  useEffect(() => {
    if (tictactoeSetting.loseSound.name === "Sound 1") {
      setLoseAudio(new Audio(sound1));
    } else if (tictactoeSetting.loseSound.name === "Sound 2") {
      setLoseAudio(new Audio(sound2));
    }
    if (tictactoeSetting.winSound.name === "Sound 1") {
      setWinAudio(new Audio(sound1));
    } else if (tictactoeSetting.winSound.name === "Sound 2") {
      setWinAudio(new Audio(sound2));
    }
  }, [tictactoeSetting.loseSound.name, tictactoeSetting.winSound.name]);

  return (
    <div className="tic-tac-toe">
      {/* <Button resetGame={resetGame} /> */}
      <div
        className="game"
        style={{
          backgroundColor: tictactoeSetting.gameBackground,
          borderRadius: "5px",
        }}
      >
        {Array.from("012345678").map((ind, i) => {
          return (
            <Square
              key={ind}
              ind={i}
              gridColor={tictactoeSetting.gridColor}
              oColor={tictactoeSetting.oColor}
              xColor={tictactoeSetting.xColor}
              updateSquares={updateSquares}
              clsName={squares[i]}
            />
          );
        })}
      </div>
      <AnimatePresence>
        {winner && (
          <motion.div
            key={"parent-box"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="winner"
          >
            <motion.div
              key={"child-box"}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="text"
            >
              <motion.h2
                initial={{ scale: 0, y: 100 }}
                animate={{
                  scale: 1,
                  y: 0,
                  transition: {
                    y: { delay: 0.7 },
                    duration: 0.7,
                  },
                }}
              >
                {winner === "x"
                  ? "You won :)"
                  : winner === "o"
                  ? "You lost :("
                  : "No winner :/"}
              </motion.h2>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: {
                    delay: 1.3,
                    duration: 0.2,
                  },
                }}
                className="win"
              >
                {winner === "x | o" ? (
                  <>
                    <Square clsName="x" />
                    <Square clsName="o" />
                  </>
                ) : (
                  <>
                    <Square clsName={winner} />
                  </>
                )}
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { delay: 1.5, duration: 0.3 },
                }}
              >
                <Button resetGame={resetGame} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TictactoeGame;
