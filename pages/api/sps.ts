import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    let index = Math.floor(Math.random() * 2);
    let move = ["", ""];

    if (req.body == "Stone") {
      move = ["Paper", "Scissor"];
    } else if (req.body == "Paper") {
      move = ["Stone", "Scissor"];
    } else if(req.body == "Scissor") {
      move = ["Stone", "Paper"];
    }

    return res.status(200).send({ AI: move[index] });
  }
  return res.status(404).json({
    error: {
      code: `not_found`,
      message: `The requested endpoint was not found or doesn't support this method.`,
    },
  });
}
