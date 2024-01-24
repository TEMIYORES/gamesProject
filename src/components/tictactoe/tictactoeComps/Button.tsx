const Button = ({ resetGame }: { resetGame: () => void }) => {
  return <button onClick={() => resetGame()}>New Game</button>;
};

export default Button;
