import React, { useState } from "react";
import { useQuizStore } from "../store/store";
import "./CategoriesModal.css";

const categories = [
  "Pop Culture",
  "Science & Technology",
  "History",
  "Geography",
  "Movies & TV Shows",
  "Music",
  "Sports",
  "Food & Cuisine",
  "Literature",
  "Animal Kingdom",
];

const difficulties = ["Easy", "Medium", "Hard"];

const CategoriesModal = ({ onClose, action }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const { setCategory, setDifficulty, fetchQuestions, loading } =
    useQuizStore();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategory(category);
    if (selectedDifficulty) {
      fetchQuestions(category, selectedDifficulty);
    }
  };

  const handleDifficultySelect = async (difficulty) => {
    setSelectedDifficulty(difficulty);
    setDifficulty(difficulty);
    if (selectedCategory) {
      fetchQuestions(selectedCategory, difficulty);
    }
    if (action) {
      action();
    }
    onClose();
  };

  return (
    <div className="categories-modal bg-black/80 p-6 rounded-lg shadow-lg max-w-md w-full">
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : !selectedCategory ? (
        <>
          <h3 className="text-xl font-bold mb-4 text-cyan-300">
            Choose your Category
          </h3>
          <div className="category-list grid grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                className="category-button bg-cyan-700 hover:bg-cyan-600 text-white py-2 px-4 rounded transition-colors duration-200"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold mb-4 text-cyan-300">
            Selected Category: {selectedCategory}
          </h3>
          <h4 className="text-lg font-semibold mb-3 text-cyan-200">
            Choose Difficulty
          </h4>
          <div className="difficulty-list flex justify-around">
            {difficulties.map((difficulty, index) => (
              <button
                key={index}
                className="difficulty-button bg-cyan-700 hover:bg-cyan-600 text-white py-2 px-6 rounded transition-colors duration-200"
                onClick={() => handleDifficultySelect(difficulty)}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriesModal;
