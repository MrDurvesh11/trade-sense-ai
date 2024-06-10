import React from "react";
import NavBar from "@/components/Home/navbar"

function page() {
  return (
    <>
      <NavBar />
      <div class=" ml-24 mt-24 sm:flex items-center max-w-screen-xl dark:text-gray-300">
        <div class="sm:w-1/2 p-10">
          <div class="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" />
          </div>
        </div>
        <div class="sm:w-1/2 p-5">
          <div class="text">
            <span class="text-gray-500 border-b-2 border-indigo-600 uppercase dark:text-gray-300">
              About us
            </span>
            <h2 class="my-4 font-bold text-3xl  sm:text-4xl ">
              About <span class="text-indigo-600
                dark:text-indigo-400
              ">Our Company</span>
            </h2>
            <p class="text-gray-700 dark:text-gray-300 ">
              TradeSense AI offers a suite of intelligent tools designed to enhance your trading experience. Our advanced AI algorithms help you save time by providing real-time stock analysis, risk assessment, and automated trading solutions. We are a team of dedicated developers passionate about revolutionizing stock trading with innovative technology. Your feedback is invaluable to us as we continuously strive to improve our tools and make them more user-friendly. Stay tuned for exciting new features and enhancements as we work tirelessly to make TradeSense AI the ultimate trading companion.
            </p>
          </div>
        </div>
      </div>

      <div class="bg-gray-800 text-white ">
        <div class="container mx-auto p-8">
          <div class="flex flex-wrap">
            <div class="w-full h-28  md:w-1/3">
              <h5 class="selftcentre uppercase text-2xl mb-6">About Us</h5>
              <p className="selftcentre">copyright @2024 CodeWeavers</p>
            </div>
            <div class="selftcentre w-full md:w-1/3">
              <h5 class="uppercase text-2xl mb-6">Contact Us</h5>
              <p>Vishwakarma Institue of Technology,Pune</p>
              <p>
                <a href="tel:1234567890">123-456-7890</a>
              </p>
              <p>
                <a href="mailto: ">
                  {" "}
                  Mail Us : group3@gmail.com
                </a>
              </p>
            </div>
            <div class="w-full md:w-1/3">
              <h5 class="selftcentre uppercase text-2xl mb-6">Follow Us</h5>
              <ul class="list-none p-0">
                <li class="my-2">
                  <a href="https://www.facebook.com/" target="_blank">
                    Facebook
                  </a>
                </li>
                <li class="my-2">
                  <a href="https://www.instagram.com/" target="_blank">
                    Instagram
                  </a>
                </li>
                <li class="my-2">
                  <a href="https://twitter.com/" target="_blank">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
