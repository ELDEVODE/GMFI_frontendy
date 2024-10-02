import { cutout4, cutout5, cutout7 } from "./assets";

export const GAME_PACKAGE_ID =
  "0xd8e4964a585579dc660845ef39c73693bb694f5efb955021e2af7c34f116181b";

export const DEVNET_COUNTER_PACKAGE_ID = "0x36d62073408568d9ddf58573ec3c91eac6cbd5dfdf0afc6a6bce5c1ff3aaad84";
export const TESTNET_COUNTER_PACKAGE_ID = "0xTODO";
export const MAINNET_COUNTER_PACKAGE_ID = "0xTODO";
export const PLAYER_STATS_ID = "0x8fd52cf2cdd3d799c88a278a19e3849dcc7abe4547532b7e1bb30449597843f6"


export const features = [
  {
    image: cutout4,
    title: "Choose your characters",
    description:
      "Select your characters and personalize them to fit your unique playstyle",
  },
  {
    image: cutout7,
    title: "Battle your friends",
    description:
      "Engage in epic battles with your friends and win amazing rewards",
  },
  {
    image: cutout5,
    title: "Earn rewards",
    description:
      "Collect badges and earn rewards as you progress through the game",
  },
  // ... add more features as needed
];
