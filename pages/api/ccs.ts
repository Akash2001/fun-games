// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { winner } from "../../helpers/tic-tac-toe/winner";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    if (winner(req.body) === " ") {
      if (req.body[1][1] === " ") req.body[1][1] = "O";
      else if (req.body[0][2] === " ") req.body[0][2] = "O";
      else if (req.body[2][0] === " ") req.body[2][0] = "O";
      else if (req.body[2][2] === " ") req.body[2][2] = "O";
      else if (req.body[0][0] === " ") req.body[0][0] = "O";
      else if (req.body[0][1] === " ") req.body[0][1] = "O";
      else if (req.body[2][1] === " ") req.body[2][1] = "O";
      else if (req.body[1][0] === " ") req.body[1][0] = "O";
      else if (req.body[1][2] === " ") req.body[1][2] = "O";
    }
    return res.status(200).send(req.body);
  }
  return res.status(404).json({
    error: {
      code: `not_found`,
      message: `The requested endpoint was not found or doesn't support this method.`,
    },
  });
}
