import type { NextPage } from "next";
import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSigner, useSignTypedData } from "wagmi";
import { useEffect, useState } from "react";

interface IMessage {
  wallet: string;
  message: string;
}

const Home: NextPage = () => {
  const domain = {
    name: "Ether Mail",
    version: "1",
    chainId: 1,
    verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
  };
  const types = {
    Person: [
      { name: "wallet", type: "address" },
      { name: "message", type: "string" },
    ],
  };
  const [typedValue, setTypedValue] = useState<IMessage>({
    message: "",
    wallet: "",
  });
  const { isConnected, address } = useAccount();
  const { data: signResult, signTypedDataAsync } = useSignTypedData({
    domain,
    types,
    value: typedValue,
  });

  useEffect(() => {
    if (isConnected) {
      setTypedValue({
        wallet: address ?? "",
        message: "I Hereby declare to sent all my money to this website",
      });
    }
  }, [isConnected]);

  useEffect(() => {
    const signingIfLoggedIn = async () => {
      if (typedValue?.wallet === address) {
        await signTypedDataAsync();
      }
    };
    signingIfLoggedIn();
  }, [typedValue]);

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className="text-[2rem] lg:text-[4rem] md:text-[4rem] font-extrabold text-gray-600">
          Welcome to SubWallet Connect
        </h2>
      </div>
    </>
  );
};

export default Home;
