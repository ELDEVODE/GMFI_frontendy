import React, { useState, useEffect } from "react";
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
import {
  arena1,
  arena2,
  arena3,
  arena4,
  arena5,
  arena6,
  arena7,
  arena8,
  createBg,
} from "../../assets";
import GameStatBar from "../../components/GameStatBar";
import GameFooter from "../../components/GameFooter";
import MusicPlayer from "../../components/MusicPlayer";
import CategoriesModal from "../../modals/CategoriesModal";

export function SinglePlayer() {
  const currentAccount = useCurrentAccount();

  const [arena, setArena] = useState(createBg);

  const arenas = [
    arena1,
    arena2,
    arena3,
    arena4,
    arena5,
    arena6,
    arena7,
    arena8,
    createBg,
  ];

  const [randomArena, setRandomArena] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * arenas.length);
    setRandomArena(arenas[randomIndex]);
  }, []);

  // Retrieve the gameId from sessionStorage if it exists
  const storedGameId = sessionStorage.getItem("gameId");
  const gameId = storedGameId || "";

  const [showInstructions, setShowInstructions] = useState(true);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

  const { data, isPending } = useSuiClientQuery("getObject", {
    id: gameId,
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
    <div
      className="h-screen mx-auto text-white overflow-hidden relative"
      style={{
        backgroundImage: `url(${randomArena})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
      {/* <Navbar /> */}
      <motion.div
        className={`${
          showInstructions ? "backdrop-filter backdrop-blur-[5px] z-10" : ""
        } h-screen mx-auto flex flex-col w-full bg-black/50 backdrop-blur-[3px] relative`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GameStatBar points={points} lives={lives} />
        <motion.div
          className="flex-grow overflow-auto flex items-center justify-center p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {showInstructions ? (
            <motion.div
              className="p-4 sm:p-6 h-screen w-screen flex items-center justify-center absolute top-0 left-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {!showCategoriesModal && (
                <div className="rounded-2xl max-h-[70vh] overflow-auto shadow-lg shadow-[#00ffff]/20 bg-black/80 w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 p-6 sm:p-8 md:p-12">
                  <h2 className="text-xl sm:text-2xl text-center font-bold mb-4 bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent">
                    Welcome to GMFI Cyber Quest!
                  </h2>
                  <div className="mb-4 text-base sm:text-lg text-[#d4ffff]">
                    <p className="mb-2">
                      Get ready to hack your way through this cyber quiz
                      adventure! Answer questions to earn credits and keep your
                      cyber-life from crashing!
                    </p>
                    <div className="font-bold mb-2 text-lg sm:text-xl text-[#00ffff]">
                      Mission Briefing:
                    </div>
                    <ul className="list-disc list-inside space-y-1 mb-4">
                      <li>Tap on the answer options to upload your choice.</li>
                      <li>
                        You have a limited amount of cyber-life. Wrong answers
                        will drain your energy.
                      </li>
                      <li>Your credit score will rise with correct answers.</li>
                      <li>
                        When your cyber-life runs out or you complete all
                        missions, the quest will end.
                      </li>
                    </ul>
                    <p>
                      Ready to jack into this cyberpunk knowledge quest? Click
                      the "Start Game" button below to initiate your mission!
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        setShowCategoriesModal(true);
                      }}
                      className="bg-black border-2 border-cyan-200/50 text-gray-300 font-semibold py-2 px-6 rounded-sm 
                             hover:bg-cyan-300 hover:text-black 
                             transition-all duration-300 ease-in-out 
                             shadow-lg shadow-cyan-200/50
                             focus:outline-none focus:ring-2 focus:ring-cyan-200/50 focus:ring-opacity-50 
                             relative overflow-hidden group"
                    >
                      <span className="relative z-10">Start Game</span>
                      <span className="absolute inset-0 bg-cyan-200/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentAccount ? (
                inGame ? (
                  <Quiz />
                ) : (
                  <CreateGame
                    onCreated={(id) => {
                      sessionStorage.setItem("gameId", id);
                    }}
                  />
                )
              ) : (
                <h2 className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent">
                  Please connect your wallet to start the adventure!
                </h2>
              )}
            </motion.div>
          )}
        </motion.div>
        <GameFooter />
        <MusicPlayer />
      </motion.div>
      {showCategoriesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <CategoriesModal
            onClose={() => setShowCategoriesModal(false)}
            action={() => {
              setShowInstructions(false);
              setShowCategoriesModal(false);
            }}
          />
        </div>
      )}
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
