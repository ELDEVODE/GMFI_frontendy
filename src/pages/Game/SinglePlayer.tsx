import React, { useState } from "react";
import Navbar from "../../components/Navbar2";
import { useWallet } from "@suiet/wallet-kit";
import { CreateGame } from "../functions/CreateGame";
import { useSuiClientQuery, useCurrentAccount } from "@mysten/dapp-kit";
import { Quiz } from "../../components/Quiz";
import { SuiObjectResponse } from "@mysten/sui/client";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { ResetGame } from "../functions/ResetGame";

export function SinglePlayer() {
  const currentAccount = useCurrentAccount();
  const gameId = window.location.hash.slice(1);
  const [showInstructions, setShowInstructions] = useState(true);

  const { data, isPending } = useSuiClientQuery("getObject", {
    id: gameId || "",
    options: {
      showContent: true,
      showOwner: true,
    },
  });

  const fields =
    data && data.data
      ? getCounterFields(data.data as unknown as ExtendedSuiObjectResponse)
      : null;
  const points =
    fields?.total_points || fields?.value?.fields?.total_points || "N/A";
  const lives =
    fields?.current_lives || fields?.value?.fields?.total_lives || "N/A";
  const inGame =
    fields?.in_session || fields?.value?.fields?.in_session || false;

  console.log("Sui Object Data:", data);

  // if (isPending) return <div>Loading...</div>;
  // if (error) return <div>Error loading game data</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2a0e61] to-[#1d0a3a] text-white ">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Navbar />
      <motion.div
        className="container mx-auto px-4 py-8 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between p-4 mt-14 bg-gradient-to-r from-[#4a1c82] to-[#2c1053] rounded-xl shadow-lg mb-8">
          <div className="text-xl">
            <strong className="bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent">
              Points: {points}
            </strong>
          </div>
          <div className="text-xl">
            <strong className="bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent">
              Lives: {lives}
            </strong>
          </div>
        </div>
        <motion.div
          className="p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {showInstructions ? (
            <motion.div
              className="bg-gradient-to-r from-[#3a1466] to-[#251248] p-8 rounded-2xl shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent">
                Welcome to the Epic Trivia Adventure!
              </h2>
              <div className="mb-6 text-xl text-[#d4ffff]">
                Test your knowledge in this thrilling quiz game. Answer
                questions to earn points and keep your lives from reaching zero!
                <br />
                <br />
                <div className="font-bold mb-3 text-2xl text-[#00ffff]">
                  Instructions:
                </div>
                <ul className="list-disc list-inside mb-6 space-y-2">
                  <li>Click on the answer options to submit your choice.</li>
                  <li>
                    You have a limited number of lives. Incorrect answers will
                    reduce your lives.
                  </li>
                  <li>Your score will increase with correct answers.</li>
                  <li>
                    When you run out of lives or complete all questions, the
                    game will end.
                  </li>
                </ul>
                Ready to embark on this epic quest of knowledge? Click the
                "Start Game" button below to begin your adventure!
              </div>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-[#00ffff] to-[#8a2be2] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-800 font-bold text-lg"
                onClick={() => setShowInstructions(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Game
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentAccount ? (
                inGame ? (
                  <Quiz />
                ) : (
                  // only create game if lives is more than 0

                  <CreateGame
                    onCreated={(id) => {
                      window.location.hash = id;
                    }}
                  />
                )
              ) : (
                <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent">
                  Please connect your wallet to start the adventure!
                </h2>
              )}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

interface ExtendedSuiObjectResponse extends SuiObjectResponse {
  content?: {
    dataType: string;
    fields: {
      value: any;
      total_points: number;
      current_lives: number;
      in_session: boolean;
    };
  };
}

function getCounterFields(data: ExtendedSuiObjectResponse) {
  if (!data.content || data.content.dataType !== "moveObject") {
    return null;
  }

  return data.content.fields;
}
