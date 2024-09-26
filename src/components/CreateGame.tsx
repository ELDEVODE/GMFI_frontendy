import { Button, Container } from "@radix-ui/themes";
import {
  useSignAndExecuteTransaction,
  useSuiClient,
  useCurrentAccount,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "../networkConfig";

function CreateGame({ onCreated }: { onCreated: (id: string) => void }) {
  const gamePackageId = useNetworkVariable("gamePackageId");
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
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

  console.log("Game Package ID:", gamePackageId);

  return (
    <Container>
      <Button
        size="3"
        onClick={() => {
          if (currentAccount) {
            createGame(currentAccount.address);
          } else {
            console.error("No current account found.");
          }
        }}
      >
        Create Game
      </Button>
    </Container>
  );

  function createGame(playerAddress: string) {
    if (!gamePackageId) {
      console.error(
        "Game Package ID is undefined. Check network configuration."
      );
      return;
    }

    const tx = new Transaction();

    tx.moveCall({
      target: `${gamePackageId}::game::create_single_player_game`,
      arguments: [
        tx.object(
          "0xd1f34ced928f8c49559e0f2c5399e51b07ab350a11d7856c2d56257ee1e12c1e"
        ), // game_store
        tx.pure.address(playerAddress), // player as struct reference
      ],
    });

    console.log("Transaction for creating game before signing:", tx);

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          console.log("Transaction succeeded:", result);

          if (result.effects) {
            console.log("Transaction Effects:", result.effects);
          }

          const objectId = result.effects?.created?.[0]?.reference?.objectId;
          if (objectId) {
            onCreated(objectId);
          }
        },
        onError: (error) => {
          console.error("Transaction failed:", error);
        },
      }
    );
  }
}

export default CreateGame;
