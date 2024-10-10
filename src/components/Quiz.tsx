/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useQuizStore } from "../store/store";
import { EndGame } from "../pages/functions/EndGame";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Quiz = ({ questions }) => {
  const {
    currentQuestionIndex,
    score,
    lives,
    setAnswer,
    nextQuestion,
    loading,
    error,
  } = useQuizStore();
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (
      !loading &&
      (lives === 0 || (questions && currentQuestionIndex >= questions.length))
    ) {
      setGameOver(true);
    }
  }, [lives, currentQuestionIndex, questions, loading]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions?.[currentQuestionIndex];
    if (currentQuestion?.answer === answer) {
      toast("Correct answer!", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast.error("Wrong answer!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    setAnswer(answer);
    nextQuestion();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        Error loading questions, please try again.
      </div>
    );
  }

  if (gameOver) {
    return (
      <motion.div
        className="bg-gradient-to- play-modal-wrapperq  from-[#3a1466] to-[#251248] p-8 rounded-2xl shadow-xl text-white"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent">
          Game Over
        </h1>
        <p className="text-2xl text-[#d4ffff] mb-6">Your score: {score}</p>
        <EndGame
          onCreated={(id) => {
            window.location.hash = id;
          }}
        />
      </motion.div>
    );
  }

  const currentQuestion = questions?.[currentQuestionIndex];

  return (
    <>
      <motion.div
        className="bg-gradient-to- play-modal-wrapperq from-[#3a1466] to-[#251248] p-8 rounded-2xl shadow-xl text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentQuestion?.question}
        </motion.h2>
        <div className="flex flex-col space-y-4">
          {currentQuestion?.options.map((option) => (
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-[#00ffff] to-[#8a2be2] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-800 font-bold text-lg"
              key={option}
              onClick={() => handleAnswer(option)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-xl text-[#d4ffff] font-bold">
            Score:{" "}
            <span className="bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent">
              {score}
            </span>
          </p>
        </div>
        <div className="mt-4">
          <p className="text-xl text-[#d4ffff] font-bold">
            Lives:{" "}
            <span className="bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent">
              {lives}
            </span>
          </p>
        </div>
      </motion.div>
    </>
  );
};
