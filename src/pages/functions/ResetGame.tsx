import React, { useState } from "react";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../../networkConfig";
import { PLAYER_STATS_ID } from "../../constants";
import { motion } from "framer-motion"; // Import Framer Motion for animations
import { isValidSuiObjectId } from "@mysten/sui/utils";

export const ResetGame = ({ onReset }: { onReset: () => void }) => {
  const counterPackageId = useNetworkVariable("counterPackageId");
  const playerStatsId = PLAYER_STATS_ID;
  const [gameId] = React.useState(() => {
    const hash = window.location.hash.slice(1);
    console.log(hash);
    return isValidSuiObjectId(hash) ? hash : null;
  });
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

  return (
    <motion.div
      className="py-20 bg-gradient-to-b from-[#2a0e61] to-[#1d0a3a] text-white flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-[#3a1466] to-[#251248] p-8 rounded-2xl shadow-xl text-center">
        <motion.h2
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#00ffff] to-[#d09dff] bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Reset Game
        </motion.h2>
        <motion.p
          className="text-xl mb-6 text-[#d4ffff]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          You are out of lives <br />
          Click below to reset the current game and start over.
        </motion.p>
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#00ffff] to-[#8a2be2] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-gray-800 font-bold text-lg"
          onClick={reset}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Reset Lives
        </motion.button>
      </div>
    </motion.div>
  );

  function reset() {
    const tx = new Transaction();
    tx.moveCall({
      arguments: [tx.object(gameId!), tx.object(playerStatsId!)],
      target: `${counterPackageId}::gmfi::reset_game`,
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: () => {
          console.log("Game reset successfully");
          onReset();
        },
        onError: (error) => {
          console.error("Error resetting game:", error);
        },
      }
    );
  }
};
