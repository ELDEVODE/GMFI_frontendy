import React from "react";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../../networkConfig";
import { isValidSuiObjectId } from "@mysten/sui/utils";
import { useSuiClientQuery } from "@mysten/dapp-kit";
import { useQuizStore } from "../../store/store"; // Import the Zustand store
import { PLAYER_STATS_ID } from "../../constants";

export const CreateGame = ({
  onCreated,
}: {
  onCreated: (id: string) => void;
}) => {
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

  // Query the game object using SuiClientQuery

  const [gameId, setGameId] = React.useState(() => {
    const hash = window.location.hash.slice(1);
    console.log(hash);
    return isValidSuiObjectId(hash) ? hash : null;
  });

  const { refetch } = useSuiClientQuery("getObject", {
    id: gameId || "",
    options: {
      showContent: true,
      showOwner: true,
    },
  });

  // Extract points, lives, and inGame status from the data

  // Import the Zustand store to use the resetQuiz function
  const { resetQuiz } = useQuizStore();

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          // if (typeof points === "number" && points > 0) {
          //   create();
          // } else if (points == "N/A") {
          //   create();
          // } else {
          //   start_session();
          // }
          create();
        }}
      >
        Create Game
      </button>
    </div>
  );

  function create() {
    const tx = new Transaction();
    // const queryClient = QueryClient();

    tx.moveCall({
      arguments: [tx.object(playerStatsId!)],
      target: `${counterPackageId}::counter::create`,
    });
    // tx.setGasBudget(10000000);
    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          const createdObject = result.effects?.created?.[0];
          if (createdObject) {
            const objectId = createdObject.reference.objectId;
            onCreated(objectId);
            setGameId(objectId);
            resetQuiz();
          }
          console.log(result);
          refetch();
        },
        onError: (error) => {
          console.error("Error creating game:", error);
        },
      }
    );
  }
};

// Extract fields from the SuiObjectResponse
