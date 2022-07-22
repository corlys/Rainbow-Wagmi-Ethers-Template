import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "../../../public/Parkir.png";

const Header = () => {
  const router = useRouter();
  const handleExploreButton = () => {
    router.push("/explorer");
  };
  const handleHomeButton = () => {
    router.push("/");
  };
  return (
    <header className="col-span-12">
      <div className="flex flex-row justify-between items-center w-full py-8 border-b-2 border-gray-200">
        <div className="h-12 w-12">
          <Image alt="Logo" src={Logo} layout="responsive" onClick={handleHomeButton} />
        </div>
        <nav className="hidden md:flex space-x-10">
          <div className="flex flex-row justify-around items-center gap-4">
            <button type="button" className="" onClick={handleExploreButton}>
              Explore
            </button>

            <button type="button" className="">
              Contacts
            </button>
          </div>
        </nav>
        <div className="flex justify-end">
          <ConnectButton label="Select Wallet" />
        </div>
      </div>
    </header>
  );
};

export default Header;
