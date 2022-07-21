import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header = () => {
  return (
    <header className="col-span-12">
      <div className="flex flex-row justify-between items-center p-8">
        <div>Logo</div>
        <div>Menu</div>
        <div>
          <ConnectButton label="Select Wallet" />
        </div>
      </div>
    </header>
  );
};

export default Header;
