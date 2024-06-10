"use client";

import React from "react";
import Container from "./container";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 ">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 ">
                    {item.answer}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "What services does TradeSense AI offer?",
    answer: "TradeSense AI offers advanced tools for real-time stock analysis and automated trading.",
  },
  {
    question: "What technology powers TradeSense AI?",
    answer: "TradeSense AI is powered by cutting-edge deep learning algorithms and risk assessment techniques.",
  },
  {
    question: "What types of stocks can be analyzed?",
    answer:
      "TradeSense AI can analyze a wide range of stocks across various sectors and industries.",
  },
  {
    question: "Does TradeSense AI support automated buying and selling?",
    answer:
      "Yes, TradeSense AI seamlessly integrates with stockbroker APIs for automated trading operations.",
  },
];

export default Faq;
