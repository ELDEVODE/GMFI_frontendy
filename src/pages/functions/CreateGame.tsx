import React, { useState, useEffect } from "react";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../../networkConfig";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useQuizStore } from "../../store/store"; // Import Zustand store
import { PLAYER_STATS_ID } from "../../constants";
import { motion } from "framer-motion"; // Import Framer Motion
import { ResetGame } from "./ResetGame"; // Import ResetGame component

export const CreateGame = ({
  onCreated,
}: {
  onCreated: (id: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const counterPackageId = useNetworkVariable("counterPackageId");
  const playerStatsId = PLAYER_STATS_ID;
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showEffects: true,
        },
      }),
  });

  const [gameId, setGameId] = useState<string | null>(() => {
    // Retrieve gameId from sessionStorage
    const storedGameId = sessionStorage.getItem("gameId");
    return isValidSuiObjectId(storedGameId || "") ? storedGameId : null;
  });

  useEffect(() => {
    if (gameId) {
      // Refetch data for the gameId stored in session
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);

  const { refetch } = useSuiClientQuery("getObject", {
    id: gameId || "",
    options: {
      showContent: true,
      showOwner: true,
    },
  });

  const { resetQuiz } = useQuizStore();

  return (
    <motion.div
      className="py-20 bg-gradient-to-b from-[#2a0e6167] play-modal-wrapperq to-[#1d0a3a7a] text-white flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-o-r from-[#3a1466] to-[#25124879] .play-modal-overlay .play-modal-overlay.transparent p-8 rounded-2xl shadow-2xl shadow-slate-600 text-center">
        <motion.h2
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Ready to Play?
        </motion.h2>
        <motion.p
          className="text-xl mb-6 text-[#d4ffff]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Click the button below to create a new game session and start your
          quiz adventure!
        </motion.p>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#00ffff] to-[#8a2be2] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-800 font-bold text-lg"
          onClick={create}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Game
        </motion.button>
      </div>

      <button
        className="px-6 py-3 bg-gradient-to-r from-[#00ffff] to-[#8a2be2] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-800 font-bold text-lg self-end mr-4"
        onClick={() => setIsModalOpen(true)} // Open the modal
      >
        Reset Lives
      </button>

      {/* Modal to display ResetGame component */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gradient-to-r from-[#3a1466] to-[#251248] p-6 rounded-lg shadow-lg w-full">
            <ResetGame onReset={() => setIsModalOpen(false)} />{" "}
            {/* Pass a close handler to the modal */}
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => setIsModalOpen(false)} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );

  function create() {
    const tx = new Transaction();
    tx.moveCall({
      arguments: [tx.object(playerStatsId!)],
      target: `${counterPackageId}::gmfi::create`,
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          const createdObject = result.effects?.created?.[0];
          refetch();
          if (createdObject) {
            const objectId = createdObject.reference.objectId;
            onCreated(objectId);
            setGameId(objectId);

            // Store the gameId in sessionStorage instead of the hash
            sessionStorage.setItem("gameId", objectId);
            resetQuiz();
            refetch();
          }
          console.log(result);
          refetch();
        },
        onError: (error) => {
          console.error("Error creating game:", error);
          refetch();
        },
      }
    );
  }
};
