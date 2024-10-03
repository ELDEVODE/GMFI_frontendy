import React, { useState, useEffect } from "react";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../../networkConfig";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useQuizStore } from "../../store/store";
import { PLAYER_STATS_ID } from "../../constants";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { toast, Bounce } from "react-toastify";

export const EndGame = ({ onCreated }: { onCreated: (id: string) => void }) => {
  const { score, resetQuiz } = useQuizStore();
  const points = score * 2;
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

  // Get the gameId from session storage or initialize as null
  const [gameId, setGameId] = useState<string | null>(() => {
    const storedGameId = sessionStorage.getItem("gameId");
    return isValidSuiObjectId(storedGameId) ? storedGameId : null;
  });

  useEffect(() => {
    // Save the gameId to session storage whenever it's updated
    if (gameId) {
      sessionStorage.setItem("gameId", gameId);
    }
  }, [gameId]);

  const { refetch } = useSuiClientQuery("getObject", {
    id: gameId || "",
    options: {
      showContent: true,
      showOwner: true,
    },
  });

  return (
    <motion.div
      className="py-20 bg-gradient-to-b from-[#2a0e614b] to-[#1d0a3a] text-white flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to- play-modal-wrapperq from-[#3a1466] to-[#251248] p-8 rounded-2xl shadow-xl text-center">
        <motion.h2
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          End of Game
        </motion.h2>
        <motion.p
          className="text-xl mb-6 text-[#d4ffff]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          You earned <strong className="text-[#00ffff]">{points}</strong>{" "}
          points! Ready to submit and see your final score?
        </motion.p>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#00ffff] to-[#8a2be2] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-800 font-bold text-lg"
          onClick={End}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          End Game
        </motion.button>
      </div>
    </motion.div>
  );

  function End() {
    if (!gameId) {
      console.error("No game ID found to end the session.");
      return;
    }

    const tx = new Transaction();
    tx.moveCall({
      arguments: [
        tx.object(gameId!),
        tx.object(playerStatsId!),
        tx.pure.u64(points),
      ],
      target: `${counterPackageId}::gmfi::end_session`,
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          const objectId = result.effects?.created?.[0]?.reference?.objectId;
          toast.success("You earned " + points + " points!", {
            position: "bottom-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
          if (objectId) {
            onCreated(objectId);
            resetQuiz();
          }
          refetch();
        },
        onError: (error) => {
          console.error("Error ending game session:", error);
        },
      }
    );
  }
};
