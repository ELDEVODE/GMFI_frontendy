import React, { useState } from "react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Flex } from "@radix-ui/themes";
import { CreateGame, RegisterPlayer } from "../../components";
import { GameInfo } from "../../GameInfo";

function GamePage() {
  const [gameId, setGameId] = useState<string | null>(null);
  const account = useCurrentAccount();

  return (
    <div className="game-page">
      <header className="App-header">
        <ConnectButton />
        {account && <div>Connected to {account.address}</div>}
      </header>

      <main>
        <Flex direction="column" gap="4">
          <CreateGame onCreated={setGameId} />
          {gameId && <GameInfo gameId={gameId} />}
        </Flex>
      </main>
      <RegisterPlayer />
    </div>
  );
}

export default GamePage;
