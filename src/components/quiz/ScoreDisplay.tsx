interface ScoreDisplayProps {
  score: number;
  total: number;
}

const ScoreDisplay = ({ score, total }: ScoreDisplayProps) => {
  return (
    <div className="bg-primary/10 px-5 py-2 rounded-xl border border-primary/30">
      <span className="font-heading font-bold text-lg text-primary">
        Score: {score}/{total}
      </span>
    </div>
  );
};

export default ScoreDisplay;
