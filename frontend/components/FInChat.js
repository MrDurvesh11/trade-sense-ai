import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";

export default function FInChat() {
  const [prompt, setPrompt] = useState(''); 
  const [isNewMessage, setIsNewMessage] = useState(true); 
  const [responses, setResponses] = useState(["How can I help you?"]);
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  const handlePrompt = async (e) => {
    e.preventDefault(); 
    if (!prompt) return;
    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: prompt, isNew: isNewMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setPrompt('');
      setIsNewMessage(false);
      setResponses([...responses, prompt, data.response]);
      console.log(responses);
    } catch (error) {
      console.error('Error:', error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* Chat bubbles */}
      {/* <div class="flex items-start gap-2.5 mt-3">
        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/logo.svg" alt="Jese image" />
        <div class="flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900 dark:text-white"></span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> {
              new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            } </span>
          </div>
          <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">How can I help you?</p>
        </div>
      </div>
      <div class="flex items-start gap-2.5 mt-3 flex-row-reverse">
        <FaUser class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 p-2" />
        <div class="flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-l-lg rounded-br-lg dark:bg-gray-700">
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <span class="text-sm font-semibold text-gray-900 dark:text-white">You </span>
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> {
              // display time 
              new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
            } </span>
          </div>
          <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">What is Nifty 50?</p>
        </div>
      </div> */}

      {/* Chat bubbles */}
      {responses.map((response, index) => (
        <div key={index} class={`flex items-start gap-2.5 mt-3 ${index % 2 === 0 ?  '' : 'flex-row-reverse'}`}>
          {
            index % 2 === 0 ?    <RiRobot2Line class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 p-2" />:  <FaUser class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 p-2" /> 
          }
          <div class={`flex flex-col w-full max-w-[500px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-lg dark:bg-gray-700 ${index % 2 === 0 ? 'rounded-l-lg rounded-br-lg' : 'rounded-r-lg rounded-bl-lg'}`}>
            <div class="flex items-center space-x-2 rtl:space-x-reverse">
              <span class="text-sm font-semibold text-gray-900 dark:text-white">{index % 2 === 0 ?  'TradeSense':"You"}</span>
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400"> {
                // display time
                new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
              } </span>
            </div>
            <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{response}</p>
          </div>
        </div>
      ))}


      {/* Chat input form */}
      <form class="flex items-center gap-2.5 mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg dark:shadow-dark-lg" onSubmit={handlePrompt}>
        <input type="text" placeholder="Type a message" class="w-full px-4 py-2.5 text-sm text-gray-900 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
        <button type="submit" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  font-medium  rounded-lg text-sm px-5 py-2.5" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Send'}
          </button>
      </form>
    </>
  );
}
