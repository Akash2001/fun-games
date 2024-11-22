import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { winner } from "../helpers/tic-tac-toe/winner";
import { isDraw } from "../helpers/tic-tac-toe/isDraw";

export const TicTacToeModule = () => {
  const [board, setBoard] = useState([
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ]);
  const [winnerPlayer, setWinnerPlayer] = useState(" ");
  const [level, setLevel] = useState("min-max");

  const move = (a: any, b: any) => {
    setWinnerPlayer(winner(board));

    if (winnerPlayer === " " && board[a][b] === " ") {
      let arr = [...board];
      arr[a][b] = "X";
      setBoard(arr);

      setWinnerPlayer(winner(board));

      const response = fetch("/api/" + level, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(board),
      })
        .then((response) => response.json())
        .then((result) => {
          setBoard(result);
          setWinnerPlayer(winner(result));
        });
    }
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Tic tac toe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className={styles.textCenter}>Tic tac toe</h1>

        <div className={styles.level}>
          <select
            name="level"
            onChange={(e) => {
              setBoard([
                [" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "],
              ]);
              setWinnerPlayer(" ");
              setLevel(e.target.value);
            }}
          >
            <option value="min-max">Hard</option>
            <option value="ccs">Easy</option>
          </select>
        </div>

        <div className={styles.board}>
          <div className={styles.row1}>
            <div className={styles.rightBorder} onClick={() => move(0, 0)}>
              {board[0][0]}
            </div>
            <div className={styles.rightBorder} onClick={() => move(0, 1)}>
              {board[0][1]}
            </div>
            <div onClick={() => move(0, 2)}>{board[0][2]}</div>
          </div>
          <div className={styles.row2}>
            <div className={styles.rightBorder} onClick={() => move(1, 0)}>
              {board[1][0]}
            </div>
            <div className={styles.rightBorder} onClick={() => move(1, 1)}>
              {board[1][1]}
            </div>
            <div onClick={() => move(1, 2)}>{board[1][2]}</div>
          </div>
          <div className={styles.row3}>
            <div className={styles.rightBorder} onClick={() => move(2, 0)}>
              {board[2][0]}
            </div>
            <div className={styles.rightBorder} onClick={() => move(2, 1)}>
              {board[2][1]}
            </div>
            <div onClick={() => move(2, 2)}>{board[2][2]}</div>
          </div>
        </div>
        <div className={styles.textCenter}>
          {winnerPlayer === "X" && <h2>Congratulations, you won!</h2>}
          {winnerPlayer === "O" && <h2>Oops, you lost. Try again!</h2>}
          {winnerPlayer === " " && isDraw(board) && <h2>Draw!</h2>}
        </div>
        <div className={styles.textCenter}>
          {(winnerPlayer !== " " || isDraw(board)) && (
            <div
              className={styles.button}
              onClick={() => {
                setBoard([
                  [" ", " ", " "],
                  [" ", " ", " "],
                  [" ", " ", " "],
                ]);
                setWinnerPlayer(" ");
              }}
            >
              New Game
            </div>
          )}
        </div>
      </div>
    </div>
  );
};