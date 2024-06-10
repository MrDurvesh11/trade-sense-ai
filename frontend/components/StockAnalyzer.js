import React, { useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// import { MenuIcon } from 'lucide-react';
// import { Input } from "@/components/ui/input"
const StockAnalyzer = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [stockData, setStockData] = useState("");
  const [showInputCompmay, setShowInputCompany] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    setLoading(true); // Set loading state to true
    setMessage(""); // Clear any previous error message

    try {
      // Perform backend call
      const response = await fetch("http://localhost:5000/analyze_stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ stock_name: companyName }),
      });

      const data = await response.json(); // Parse JSON response

      if (data.error) {
        setMessage(data.error);
        console.log("error bc"); // Set error message if any error occurs
      } else {
        console.log(data); // Print data in the console
      }
      setStockData(data); // Set stock data state with the fetched data
      setLoading(false);
      setShowInputCompany(false); // Set loading state to false
    } catch (error) {
      setMessage("Something went wrong. Please try again later."); // Set error message if an exception occurs
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <div class="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      {/* #width 100 */}
      {showInputCompmay && (
        <Card className="w-full  p-5 ">
          <CardContent className="grid gap-4">
            <div class="grid gap-4">
              <div class="grid gap-0.5">
                <h2 class="text-md mb-3">Company</h2>

                <input
                  id="company"
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter company name"
                  class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
                />
              </div>
              <button
                onClick={handleSubmit}
                class="w-full px-3 py-2 text-sm font-semibold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                type="submit"
              >
                Search
              </button>
            </div>
          </CardContent>
        </Card>
      )}
      {loading && <p>Loading...</p>}
      {!loading && !showInputCompmay && (
        <div className="flex flex-col w-full min-h-screen">
          <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold">
              <Link
                className="flex items-center justify-center gap-2 text-lg font-semibold"
                href="#"
              >
                <div className="flex items-center mb-4">
                  <BarChartIcon className="text-gray-500 mr-2" />
                  <h1 className="text-xl font-semibold">
                    Stock Name: {stockData["companyName"]}
                  </h1>
                </div>
              </Link>
            </div>
            <Button className="ml-2.5 md:hidden" size="icon" variant="outline">
              <MenuIcon className="w-4 h-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </header>

          <main className="flex flex-1 flex-col p-4 gap-4 md:p-10 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    52 Week High
                  </CardTitle>
                  <ArrowUpIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{stockData["52_week_high"]}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    52 Week Low
                  </CardTitle>
                  <ArrowDownIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{stockData["52_week_low"]}
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                {/* <CardTitle className="text-sm font-medium">Company</CardTitle> */}
                <h2 className="text-lg font-semibold mb-2">About Company</h2>
              </CardHeader>
              <CardContent>
                <p>{stockData["about_company"]}</p>
              </CardContent>
            </Card>

            <Card>
              <div className="mb-4 p-3">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <h2 className="text-lg font-semibold mb-2">Latest News</h2>
                </CardHeader>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <div className="p-4  rounded-lg">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        {" "}
                        <h3 className="font-semibold mb-1">
                          {" "}
                          {stockData.latest_news[0]["title"]}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">
                          {stockData.latest_news[0]["description"]}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                  <Card>
                    <div className="p-4  rounded-lg">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        {" "}
                        <h3 className="font-semibold mb-1">
                          {" "}
                          {stockData.latest_news[1]["title"]}
                        </h3>
                      </CardHeader>

                      <CardContent>
                        <p className="text-sm">
                          {stockData.latest_news[1]["description"]}
                        </p>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Buy Recommendation Percent
                  </CardTitle>
                  <ArrowUpIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div
                    style={{ width: "300px", height: "300px" }}
                    className="flex flex-col"
                  >
                    <PieChart
                      animate
                      animationDuration={500}
                      animationEasing="ease-out"
                      center={[50, 50]}
                      data={[
                        {
                          title: `Buy ${stockData["buy_recommendation_percent"]} %`,
                          value: parseInt(
                            stockData["buy_recommendation_percent"]
                          ),
                          color: "#84cc16",
                        },
                        {
                          title: `Sell ${stockData["sell_recommendation_percent"]} %`,
                          value: parseInt(
                            stockData["sell_recommendation_percent"]
                          ),
                          color: "#dc2626",
                        },
                        {
                          title: `Hold ${stockData["hold_recommendation_percent"]} %`,
                          value: parseInt(
                            stockData["hold_recommendation_percent"]
                          ),
                          color: "#60a5fa",
                        },
                      ]}
                    />

                    <div className="flex mt-4">
                      <div className="h-3 w-3 mt-2 mr-2 bg-blue-600"></div>
                      <p className=" mr-2 text-blue-600"> Hold </p>
                      <p>
                        {parseInt(stockData["hold_recommendation_percent"])}%{" "}
                      </p>
                      <div className="h-3 w-3 mt-2  ml-2 mr-2 bg-green-600"></div>
                      <p className=" mr-2 text-green-600"> Buy </p>
                      <p>
                        {parseInt(stockData["buy_recommendation_percent"])}%{" "}
                      </p>
                      <div className="h-3 w-3 mt-2 ml-2 mr-2 bg-red-600"></div>
                      <p className=" mr-2 text-red-600"> Sell </p>
                      <p>
                        {parseInt(stockData["sell_recommendation_percent"])}%{" "}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">
                    Current Price
                  </CardTitle>
                  <ArrowUpIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  {/* upto two decimals */}

                  <div className="text-2xl font-bold">
                    {" "}
                    ₹{stockData["current_price"].toFixed(2)}
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="p-4 pt-5">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 border rounded-lg">
                  <span className="text-sm text-gray-500">Market Cap</span>
                  <span className="text-lg font-semibold">
                    {" "}
                    {stockData["market_cap"]}.
                  </span>
                </div>
                <div className="p-4 border rounded-lg">
                  <span className="text-sm text-gray-500">Open</span>
                  <span className="text-lg font-semibold">
                    {" "}
                    ₹{stockData["open"]}
                  </span>
                </div>
                <div className="p-4 border rounded-lg">
                  <span className="text-sm text-gray-500">P/E Ratio</span>
                  <span className="text-lg font-semibold">
                    {" "}
                    {stockData["pe_ratio"]}
                  </span>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                {/* <CardTitle className="text-sm font-medium">Company</CardTitle> */}
                <h2 className="text-lg font-semibold mb-2">Buy Reason</h2>
              </CardHeader>
              <CardContent>
                <p>{stockData["buy_reason"]}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                {/* <CardTitle className="text-sm font-medium">Company</CardTitle> */}
                <h2 className="text-lg font-semibold mb-2">Hold Reason</h2>
              </CardHeader>
              <CardContent>
                <p>{stockData["hold_reason"]}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                {/* <CardTitle className="text-sm font-medium">Company</CardTitle> */}
                <h2 className="text-lg font-semibold mb-2">Sell Reason</h2>
              </CardHeader>
              <CardContent>
                <p>{stockData["sell_reason"]}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                {/* <CardTitle className="text-sm font-medium">Company</CardTitle> */}
                <h2 className="text-lg font-semibold mb-2">Positives</h2>
              </CardHeader>
              <CardContent>
                <p>
                  {stockData.positives.map((positive, index) => (
                    <React.Fragment key={index}>
                      {positive}
                      {index !== stockData.positives.length - 1 && <br />}{" "}
                      {/* Add line break if not the last item */}
                    </React.Fragment>
                  ))}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                {/* <CardTitle className="text-sm font-medium">Company</CardTitle> */}
                <h2 className="text-lg font-semibold mb-2">Negatives </h2>
              </CardHeader>
              <CardContent>
                <p>
                  {stockData.negatives.map((negative, index) => (
                    <React.Fragment key={index}>
                      {negative}
                      {index !== stockData.negatives.length - 1 && <br />}{" "}
                      {/* Add line break if not the last item */}
                    </React.Fragment>
                  ))}
                </p>
              </CardContent>
            </Card>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-4 border rounded-lg">
                <span className="text-sm text-gray-500">volume </span>
                <span className="text-lg font-semibold">
                  {stockData["volume"]}
                </span>
              </div>
              <div className="p-4 border rounded-lg">
                <span className="text-sm text-gray-500">Symbol </span>
                <span className="text-lg font-semibold">
                  {" "}
                  {stockData["yfinance_symbol"]}
                </span>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
};

function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}
function ArrowDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function Package2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}
export default StockAnalyzer;
