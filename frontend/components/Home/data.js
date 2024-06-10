"use client";
import logo2 from "../../public/img/sm.png";
import {
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
  CogIcon,
} from "@heroicons/react/24/solid";


import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "Services Provided",
  desc: "TradeSense AI offers a range of advanced tools for efficient stock trading and analysis. Empower yourself with cutting-edge technology to extract crucial insights from stock data in real-time.",
  image: logo2,
  bullets: [
  {
  title: "Real-Time Stock Analysis",
  desc: "Utilize deep learning algorithms to analyze stock data instantly.",
  icon: <CogIcon />,
  },
  {
  title: "Risk Assessment",
  desc: "Assess the risk associated with selected stock baskets .",
  icon: <CogIcon />,
  },
  {
  title: "Automated Trading",
  desc: "Integrated with stockbroker APIs for automated buying and selling.",
  icon: <CogIcon />,
  },
  ],
  };

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile-first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by the latest technologies and tools.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
