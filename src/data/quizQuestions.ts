export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  image?: string;
  isValentineQuestion?: boolean;
  isNotedQuestion?: boolean;
  notedMessage?: string;
  isArgumentQuestion?: boolean;
  isBestQuestion?: boolean;
  isSorryQuestion?: boolean;
  isLoveQuestion?: boolean;
  isFinalQuestion?: boolean;
}

export const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Which movie did we watch together last time?",
    options: ["Orange", "Hi Nanna", "Andhala Rakshashi", "Double Ismart Shanker"],
    correctAnswer: 2,
  },
  {
    id: 2,
    question: "What color dress did I order for you the first time?",
    options: ["Green", "Blue", "Red", "Brown"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Where are we going next time?",
    options: ["Temple", "kerala", "Tirupati", "Araku"],
    correctAnswer: 0,
    isNotedQuestion: true,
    notedMessage: "Hammaya! Noted",
  },
  {
    id: 4,
    question: "What is a memorable moment?",
    options: ["YadagiriGutta(Ammi)", "Lift", "Rose Flower", "All the Above"],
    correctAnswer: 0,
    isNotedQuestion: true,
    notedMessage: "😍 Wow! same for Me",
  },
  {
    id: 5,
    question: "In which movie did we take this photo?",
    options: ["Orange", "Hi Nanna", "Andhala Rakshashi", "Double Ismart Shanker"],
    correctAnswer: 0,
    image: "couple",
  },
  {
    id: 6,
    question: "Who is wrong in all the arguments?",
    options: ["You", "Me"],
    correctAnswer: 1,
    isArgumentQuestion: true,
  },
  {
    id: 7,
    question: "who is best ?",
    options: ["You", "Me"],
    correctAnswer: 1,
    isBestQuestion: true,
  },
  {
    id: 8,
    question: "Sorry For All my Mistakes Can you Accept?",
    options: ["Yes Accepted", "Not Accepted", "Never"],
    correctAnswer: 0,
    isSorryQuestion: true,
  },
  {
    id: 9,
    question: "Do you Love me ?",
    options: ["yes", "No"],
    correctAnswer: 0,
    isLoveQuestion: true,
    isFinalQuestion: true,
  },
];
