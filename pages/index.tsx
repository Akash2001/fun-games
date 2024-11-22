import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home = () => {
  const games = [
    { name: "Tic Tac Toe", url: "/tic-tac-toe" },
    { name: "Stone Paper Scissor", url: "/stone-paper-scissor" },
  ];
  return (
    <>
      <Head>
        <title>AI powered games</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.game_head}>Choose your favorite game!</div>
      {games.map((game, index) => {
        return (
          <Link key={index} href={game.url}>
            <div className={styles.games}>{game.name}</div>
          </Link>
        );
      })}
    </>
  );
};

export default Home;
