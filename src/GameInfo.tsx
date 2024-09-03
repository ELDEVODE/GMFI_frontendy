// GameInfo.tsx
import {
    useCurrentAccount,
    useSignAndExecuteTransaction,
    useSuiClient,
    useSuiClientQuery,
  } from "@mysten/dapp-kit";
  import { Button, Flex, Heading, Text } from "@radix-ui/themes";
  import { SuiObjectData } from "@mysten/sui/client";
  import { Transaction } from "@mysten/sui/transactions";
  import { useNetworkVariable } from "./networkConfig";
  
  export function GameInfo({ gameId }: { gameId: string }) {
    const suiClient = useSuiClient();
    const currentAccount = useCurrentAccount();
    const gamePackageId = useNetworkVariable("gamePackageId");
    const { data, isPending, error, refetch } = useSuiClientQuery("getObject", {
      id: gameId,
      options: {
        showContent: true,
        showOwner: true,
      },
    });
  
    const { mutate: signAndExecute } = useSignAndExecuteTransaction({
      execute: async ({ bytes, signature }) => {
        console.log("Executing transaction with bytes:", bytes);
        console.log("Transaction signature:", signature);
        return await suiClient.executeTransactionBlock({
          transactionBlock: bytes,
          signature,
          options: {
            showRawEffects: true,
            showEffects: true,
          },
        });
      },
    });
  
    const executeMoveCall = (method: "start" | "end") => {
      console.log(`Executing move call for method: ${method}`);
      const tx = new Transaction();
  
      if (method === "end") {
        tx.moveCall({
          arguments: [tx.object(gameId)],
          target: `${gamePackageId}::game::end_game`,
        });
        console.log("Transaction for ending game:", tx);
      } else {
        tx.moveCall({
          arguments: [tx.object(gameId)],
          target: `${gamePackageId}::game::start_game`,
        });
        console.log("Transaction for starting game:", tx);
      }
  
      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: async () => {
            console.log("Transaction successful. Refetching data...");
            await refetch();
          },
          onError: (error) => {
            console.error("Transaction failed:", error);
          },
        }
      );
    };
  
    if (isPending) {
      console.log("Data is pending...");
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      console.error("Error fetching data:", error);
      return <Text>Error: {error.message}</Text>;
    }
  
    if (!data.data) {
      console.log("Data not found for game ID:", gameId);
      return <Text>Not found</Text>;
    }
  
    const gameFields = getGameFields(data.data);
    const ownedByCurrentAccount = gameFields?.owner === currentAccount?.address;
  
    console.log("Game fields:", gameFields);
    console.log("Owned by current account:", ownedByCurrentAccount);
  
    return (
      <>
        <Heading size="3">Game {gameId}</Heading>
  
        <Flex direction="column" gap="2">
          <Text>Game Mode: {gameFields?.mode}</Text>
          <Text>Stakes: {gameFields?.stakes}</Text>
          <Text>Ended: {gameFields?.ended ? "Yes" : "No"}</Text>
          <Flex direction="row" gap="2">
            {ownedByCurrentAccount && !gameFields?.ended ? (
              <>
                <Button onClick={() => executeMoveCall("end")}>End Game</Button>
                <Button onClick={() => executeMoveCall("start")}>Start Game</Button>
              </>
            ) : null}
          </Flex>
        </Flex>
      </>
    );
  }
  
  function getGameFields(data: SuiObjectData) {
    if (data.content?.dataType !== "moveObject") {
      console.warn("Data is not a moveObject. Content dataType:", data.content?.dataType);
      return null;
    }
  
    console.log("Game fields data:", data.content.fields);
    return data.content.fields as { mode: string; stakes: number; ended: boolean; owner: string };
  }
  