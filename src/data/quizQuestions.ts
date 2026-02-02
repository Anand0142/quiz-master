export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  image?: string;
  isValentineQuestion?: boolean;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "What does this image represent?",
    options: ["Friendship", "Love & Togetherness", "Adventure", "Nature"],
    correctAnswer: 1,
    image: "couple",
  },
  {
    id: 5,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "Which country has the largest population?",
    options: ["United States", "India", "China", "Indonesia"],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "What do these represent on Valentine's Day?",
    options: ["Apology", "Love & Romance", "Celebration", "Gratitude"],
    correctAnswer: 1,
    image: "roses",
  },
  {
    id: 8,
    question: "What is the speed of light?",
    options: ["299,792 km/s", "150,000 km/s", "1,000,000 km/s", "500,000 km/s"],
    correctAnswer: 0,
  },
  {
    id: 9,
    question: "What's the perfect Valentine's treat?",
    options: ["Cookies", "Chocolates", "Cake", "Ice Cream"],
    correctAnswer: 1,
    image: "chocolate",
  },
  {
    id: 10,
    question: "Will you be my Valentine? 💕",
    options: ["Yes 💖", "No 💔"],
    correctAnswer: 0,
    isValentineQuestion: true,
  },
];
