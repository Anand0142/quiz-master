import { Trophy } from "lucide-react";

interface ScoreDisplayProps {
  score: number;
  total: number;
}

const ScoreDisplay = ({ score, total }: ScoreDisplayProps) => {
  return (
    <div className="flex items-center gap-3 bg-secondary px-5 py-3 rounded-xl">
      <Trophy className="w-6 h-6 text-primary" />
      <span className="font-heading font-bold text-xl text-foreground">
        {score}/{total}
      </span>
    </div>
  );
};

export default ScoreDisplay;
