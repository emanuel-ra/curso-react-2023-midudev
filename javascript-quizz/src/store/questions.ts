import { create } from "zustand";
import { type Question } from "../types";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestion: (limit: number) => void;
  selectAnswer: (question: number, answerIndex: number) => void;
}

export const useQuestionStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,
    fetchQuestion: async (limit: number) => {
      const res = await fetch("http://localhost:5173/data.json");
      const json = await res.json();

      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
      set({ questions });
    },
    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get();
      // clone the state
      const newQuestions = structuredClone(questions);
      // find the question index
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
      // get the question
      const questionInfo = newQuestions[questionIndex];
      // evaluate if is correct
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
      // update the state
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      };
      // update the state
      set({ questions: newQuestions });
    },
  };
});
