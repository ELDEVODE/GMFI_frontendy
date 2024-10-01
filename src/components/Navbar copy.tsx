import { ConnectButton } from "@mysten/dapp-kit";
import logo from "../images/gmfi.jpg";
import "@suiet/wallet-kit/style.css";

export const Navbar = () => {
  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <a href="/" className="">
            <img src={logo} width={50} alt="" className="rounded-xl " />
          </a>
        </div>
        <div className="flex-none">
          {" "}
          <ConnectButton className="btn btn-primary font-bold uppercase text-base-content hover:text-secondary" />
          {/* <button className="btn btn-primary font-bold uppercase text-base-content hover:text-secondary">
            Connect Wallet
          </button> */}
        </div>
      </div>
    </div>
  );
};
