// App.tsx
import { useState } from "react";
import { ConnectButton, useCurrentAccount } from "@mysten/dapp-kit";
import { Flex } from "@radix-ui/themes";
import { CreateGame } from "./CreateGame"; // Import the CreateGame component
import { GameInfo } from "./GameInfo"; // Import the GameInfo component
import { RegisterPlayer } from "./RegisterPlayer";

function App() {
  const [gameId, setGameId] = useState<string | null>(null);
  const account = useCurrentAccount();

  return (
    <div className="App">
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

export default App;
