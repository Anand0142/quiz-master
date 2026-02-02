import { X } from "lucide-react";

interface ValentineErrorPopupProps {
  show: boolean;
  onClose: () => void;
}

const ValentineErrorPopup = ({ show, onClose }: ValentineErrorPopupProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 animate-fade-in">
      <div className="bg-card border-2 border-destructive rounded-2xl p-6 max-w-sm mx-4 animate-shake">
        <div className="text-center">
          <X className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h3 className="font-heading text-xl font-bold text-destructive mb-2">
            ❌ Invalid choice.
          </h3>
          <p className="font-body text-foreground mb-4">
            System has detected you are already my Valentine. 💕
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 bg-success text-success-foreground font-heading font-semibold py-3 rounded-xl hover:bg-success/90 transition-colors"
            >
              Try Again 💖
            </button>
            <div className="flex-1 bg-destructive/50 text-destructive-foreground font-heading font-semibold py-3 rounded-xl opacity-50 cursor-not-allowed">
              No 💔
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValentineErrorPopup;
