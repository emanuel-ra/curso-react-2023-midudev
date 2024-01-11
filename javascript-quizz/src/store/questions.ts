import { create } from "zustand";
import { type Question } from "../types";
import confetti from "canvas-confetti";
import { persist, devtools } from "zustand/middleware";
import { getAllQuestions } from "../services/questions";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestion: (limit: number) => void;
  selectAnswer: (question: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          questions: [],
          currentQuestion: 0,
          fetchQuestion: async (limit: number) => {
            const json = await getAllQuestions(limit);
            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit);
            set({ questions });
          },
          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            // clone the state
            const newQuestions = structuredClone(questions);
            // find the question index
            const questionIndex = newQuestions.findIndex(
              (q) => q.id === questionId
            );
            // get the question
            const questionInfo = newQuestions[questionIndex];
            // evaluate if is correct
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex;

            if (isCorrectUserAnswer) confetti();

            // update the state
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
            };
            // update the state
            set({ questions: newQuestions });
          },
          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion });
            }
          },
          goPreviousQuestion: () => {
            const { currentQuestion, questions } = get();
            const previousQuestion = currentQuestion - 1;

            if (previousQuestion >= 0) {
              set({ currentQuestion: previousQuestion });
            }
          },
          reset: () => {
            set({ currentQuestion: 0, questions: [] });
          },
        };
      },
      {
        name: "questions",
      }
    )
  )
);
