"use client";
import Image from "next/image";
import Container from "./container";
import heroImg from "../../public/img/girl.webp";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useRouter } from "next/navigation";


const Hero = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState();
  useEffect(() => {
    const uname = localStorage.getItem("username");
    console.log(uname);
    if (uname !== undefined) {
      setUsername(() => uname);
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  function handleRegisterComplaint() {
    const username = localStorage.getItem("username");

    console.log(isLoggedIn, username, "adashgdjgasjdgjasgdj");
    if (isLoggedIn) {
      router.push("/raise-complaint");
    } else {
      router.push("/login");
    }
  }
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-xl lg:leading-tight xl:text-5xl xl:leading-tight dark:text-gray-300">
            Empowering smart trading and analysis.
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl lg:leading-normal xl:text-2xl xl:leading-normal dark:text-gray-400">
               TradeSense AI: Revolutionizing stock trading with advanced analysis tools. Seamlessly integrating deep learning and risk assessment, TradeSense AI empowers traders with data-driven decisions for smarter trading strategies. Experience the future of trading efficiency today.
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <button
                onClick={handleRegisterComplaint}
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md "
              >
                Explore
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
      
    </>
  );
};

export default Hero;
