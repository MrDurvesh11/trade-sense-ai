import Head from "next/head";
import Hero from "@/components/Home/hero";
import Navbar from "@/components/Home/navbar";
import SectionTitle from "@/components/Home/sectionTitle";
import { benefitOne } from "@/components/Home/data";
import Video from "@/components/Home/video";
import Benefits from "@/components/Home/benefits";
import Footer from "@/components/Home/footer";
import Faq from "@/components/Home/faq";
import PopupWidget from "@/components/Home/popupWidget";

const page = () => {
  return (
    <>
      <Head>
        <title>Pragyan</title>
        <meta
          name="description"
          content="Nextly is a free lanith next.js & Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <Hero />
      <SectionTitle title="Why TradeSense AI?">
        TradeSense AI provides an array of intelligent tools for advanced stock trading and analysis. Seamlessly blending deep learning and risk assessment, TradeSense AI empowers traders to make informed decisions, optimizing their trading strategies in real-time. With TradeSense AI, traders can effortlessly integrate with stockbroker APIs for automated buying and selling, enhancing efficiency and profitability.
      </SectionTitle>
      <Benefits data={benefitOne} />
      <SectionTitle
        pretitle="Watch a video"
        title="Learn About Stock Market "
      ></SectionTitle>
      <Video />
      {/* <SectionTitle
        pretitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonails is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>
      <Testimonials />
      */}
      <SectionTitle
        pretitle="FAQ"
        title="Frequently Asked Questions"
      ></SectionTitle>
      <Faq />
      {/* <Cta /> */}
      <Footer />
      <PopupWidget />
    </>
  );
};

export default page;
