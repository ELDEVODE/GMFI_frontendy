import { Button, Container } from "@radix-ui/themes";
import { useSignAndExecuteTransaction, useSuiClient, useCurrentAccount } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useNetworkVariable } from "./networkConfig";

export function RegisterPlayer() {
  const gamePackageId = useNetworkVariable("gamePackageId");
  const gameStoreId = "0xd1f34ced928f8c49559e0f2c5399e51b07ab350a11d7856c2d56257ee1e12c1e"
//   const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  console.log("Game Package ID:", gamePackageId);
  console.log("Game Store ID:", gameStoreId);

  return (
    <Container>
      <Button
        size="3"
        onClick={() => {
          if (currentAccount) {
            registerPlayer();
          } else {
            console.error("No current account found.");
          }
        }}
      >
        Register Player
      </Button>
    </Container>
  );

  function registerPlayer() {
    if (!gamePackageId || !gameStoreId) {
      console.error("Game Package ID or Game Store ID is undefined. Check network configuration.");
      return;
    }

    const tx = new Transaction();

    tx.moveCall({
      target: `${gamePackageId}::game::register_player`,
      arguments: [tx.object(gameStoreId)],
    });

    console.log("Player registration transaction before signing:", tx);

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: (result) => {
          console.log("Player registration succeeded:", result);
        },
        onError: (error) => {
          console.error("Player registration failed:", error);
        },
      }
    );
  }
}