import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    class Move {
      row!: number;
      col!: number;
    }

    let player = "O",
      opponent = "X";

    const isMovesLeft = (board: any) => {
      for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++) if (board[i][j] == " ") return true;

      return false;
    };

    const evaluate = (b: any) => {
      for (let row = 0; row < 3; row++) {
        if (b[row][0] == b[row][1] && b[row][1] == b[row][2]) {
          if (b[row][0] == player) return +10;
          else if (b[row][0] == opponent) return -10;
        }
      }

      for (let col = 0; col < 3; col++) {
        if (b[0][col] == b[1][col] && b[1][col] == b[2][col]) {
          if (b[0][col] == player) return +10;
          else if (b[0][col] == opponent) return -10;
        }
      }

      if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
        if (b[0][0] == player) return +10;
        else if (b[0][0] == opponent) return -10;
      }

      if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
        if (b[0][2] == player) return +10;
        else if (b[0][2] == opponent) return -10;
      }
      return 0;
    };

    const minimax = (board: any, depth: any, isMax: any) => {
      let score = evaluate(board);

      if (score == 10) return score;

      if (score == -10) return score;

      if (isMovesLeft(board) == false) return 0;

      if (isMax) {
        let best = -1000;

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] == " ") {
              board[i][j] = player;

              best = Math.max(best, minimax(board, depth + 1, !isMax));

              board[i][j] = " ";
            }
          }
        }
        return best;
      } else {
        let best = 1000;
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (board[i][j] == " ") {
              board[i][j] = opponent;
              best = Math.min(best, minimax(board, depth + 1, !isMax));
              board[i][j] = " ";
            }
          }
        }
        return best;
      }
    };

    const findBestMove = (board: any) => {
      let bestVal = -1000;
      let bestMove = new Move();
      bestMove.row = -1;
      bestMove.col = -1;

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == " ") {
            board[i][j] = player;
            let moveVal = minimax(board, 0, false);
            board[i][j] = " ";

            if (moveVal > bestVal) {
              bestMove.row = i;
              bestMove.col = j;
              bestVal = moveVal;
            }
          }
        }
      }
      return bestMove;
    };
    let bestMove = findBestMove(req.body);
    req.body[bestMove.row][bestMove.col] = "O";
    return res.status(200).send(req.body);
  }
  return res.status(404).json({
    error: {
      code: `not_found`,
      message: `The requested endpoint was not found or doesn't support this method.`,
    },
  });
}
