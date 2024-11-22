import Head from "next/head";
import styles from "../styles/Home.module.css";
import stone from "../images/rock.png";
import paper from "../images/paper.png";
import scissor from "../images/scissor.png";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";
import { winner } from "../helpers/stone-paper-scissor/winner";

export const StonePaperScissorModule = () => {
  const moves = [
    { name: "Stone", img: stone },
    { name: "Paper", img: paper },
    { name: "Scissor", img: scissor },
  ];
  const [playerMove, setPlayerMove] = useState({ name: "", img: stone });
  const [aiMove, setAiMove] = useState({ name: "", img: stone });
  const [winnerName, setWinnerName] = useState("");
  const [playerWins, setPlayerWins] = useState(0);
  const [aiWins, setAiWins] = useState(0);

  const Move = (move: { name: string; img: StaticImageData }) => {
    setPlayerMove(move);
    const response = fetch("/api/sps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(move.name),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.AI === "Stone") {
          setAiMove({ name: result.AI, img: stone });
        } else if (result.AI === "Paper") {
          setAiMove({ name: result.AI, img: paper });
        } else if (result.AI === "Scissor") {
          setAiMove({ name: result.AI, img: scissor });
        }

        const won = winner({ player: move.name, ai: result.AI });
        setWinnerName(won);

        if (won == "Player") setPlayerWins(playerWins + 1);
        else setAiWins(aiWins + 1);
      });
  };

  return (
    <>
      <Head>
        <title>Stone paper scissor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.sps}>
        <div className={styles.sps_moves}>
          <div>
            {playerMove.name && (
              <>
                <p>You</p>
                <Image src={playerMove.img} alt={playerMove.name} />
                <p>
                  Points <br /> {playerWins}
                </p>
              </>
            )}
          </div>
          <p>
            {playerMove.name && <>VS</>}
            <br />
            {winnerName === "Player" && <p>You won!</p>}
            {winnerName === "AI" && <p>You lost!</p>}
          </p>
          <div>
            {aiMove.name && (
              <>
                <p>AI</p>
                <Image src={aiMove.img} alt={aiMove.name} />
                <p>
                  Points <br /> {aiWins}
                </p>
              </>
            )}
          </div>
        </div>
        <div className={styles.sps_player}>
          {moves.map((move, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  Move({ name: move.name, img: move.img });
                }}
              >
                <Image src={move.img} alt={move.name} />
                <p>{move.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
