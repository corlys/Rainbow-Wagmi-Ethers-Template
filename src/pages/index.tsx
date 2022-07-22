import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAccount, useSignTypedData, useDisconnect } from "wagmi";

interface IMessage {
  wallet: string;
  message: string;
}

const Home: NextPage = () => {
  const router = useRouter();
  const domain = {
    name: "Parkir",
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
  const { disconnect } = useDisconnect();
  const {
    data: signResult,
    error: signTypedDataError,
    signTypedDataAsync,
    isSuccess: isSuccessSignTypedData,
    isError: isErrorSignTypedData,
    reset: resetSignTypedData,
  } = useSignTypedData({
    domain,
    types,
    value: typedValue,
    onError: () => {
      resetSignTypedData();
      disconnect();
    },
  });
  useEffect(() => {
    if (isConnected) {
      setTypedValue({
        wallet: address ?? "",
        message: "Hello, i want to login plis",
      });
    }
    if (!isConnected) {
      resetSignTypedData();
    }
  }, [isConnected]);

  useEffect(() => {
    const signingIfLoggedIn = async () => {
      if (typedValue?.wallet === address) {
        try {
          await signTypedDataAsync();
        } catch (error) {}
      }
    };
    signingIfLoggedIn();
  }, [typedValue]);

  useEffect(() => {
    if (signResult) {
      console.log(signResult);
    }
  }, [signResult]);

  const handleRouteExplorer = () => {
    router.push("/explorer");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <h2 className="text-[2rem] lg:text-[4rem] md:text-[4rem] font-extrabold text-gray-600">
          Welcome to Parkir
        </h2>
        {isSuccessSignTypedData && (
          <button onClick={handleRouteExplorer} type="button">
            Explore
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
