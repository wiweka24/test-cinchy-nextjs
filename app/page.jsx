"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import Navbar from "@/components/navbar/navbar";
import heroImg from "@/public/hero-img.png";
import heroContent from "@/public/hero-content.png";
import { axiosInstance } from "@/utils/config";

import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";

export default function Home() {
  const [faq, setFaq] = useState([]);
  const [currentFaq, setCurrentFaq] = useState(faq);
  const [topic, setTopic] = useState([]);
  const [currentTopic, setCurrentTopic] = useState({ topic: "All", total: 6 });
  const [openFaq, setOpenFaq] = useState("");
  const [openTopic, setOpenTopic] = useState(window.innerWidth >= 1024);

  // get faq
  useEffect(() => {
    (async () => {
      try {
        await axiosInstance.get("/faq").then((res) => {
          setFaq(res.data);
          setCurrentFaq(res.data);
        });
      } catch (err) {
        // setFaq(false);
      }
    })();
  }, []);

  useEffect(() => {
    const uniqueTopics = faq.reduce((result, item) => {
      const topic = item.topic;

      // Find the index of the topic in the result array
      const index = result.findIndex((obj) => obj.topic === topic);

      if (index === -1) {
        // If the topic doesn't exist in the result array, add it
        result.push({ topic, total: 1 });
      } else {
        // If the topic exists, increment the count
        result[index].total += 1;
      }

      return result;
    }, []);

    // Add a special "All" category
    const totalTopics = uniqueTopics.reduce(
      (total, item) => total + item.total,
      0
    );
    uniqueTopics.unshift({ topic: "All", total: totalTopics });

    // return uniqueTopics;
    setTopic(uniqueTopics);
  }, [faq]);

  // filter faq by topic
  function filterByTopic(data, topicToFilter) {
    // Set the current topic
    setCurrentTopic(topicToFilter);

    // If the topic is "All", return all items in the data array and set the current faq to the data array
    if (topicToFilter.topic === "All") {
      setCurrentFaq(data);
    } else {
      const currentFaq = data.filter(
        (item) => item.topic === topicToFilter.topic
      );
      setCurrentFaq(currentFaq);
    }
  }

  function openPickFaq(topic) {
    if (openFaq === topic) {
      setOpenFaq("");
    } else {
      setOpenFaq(topic);
    }
  }

  return (
    <main className="font-base bg-bg text-darkgreen relative">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Content */}
      <div className="bg-darkgreen-dark">
        <div className="max-w-[1440px] h-[320px] md:h-[500px] mx-auto relative flex items-center">
          <Image
            className="h-[320px] md:h-[500px] absolute top-0 bottom-0"
            src={heroImg}
            alt="Mask Group"
          />
          <Image
            className="bg-contain hidden lg:inline lg:absolute z-10 right-48 bottom-0"
            src={heroContent}
            alt="Mask Group"
          />
          <div className="text-white font-title z-20 m-12 md:ml-48 max-w-[400px] space-y-2 md:space-y-7">
            <h1 className="text-[32px] md:text-5xl">Get Started</h1>
            <p className="text-[16px] md:text-lg">
              Flight - confirmed! Hotel - sorted! And now, it's time to embark
              on your Bali Scooter Rental adventure! If you're still uncertain
              about your next steps, don’t worry, as we're here to address all
              your queries and concerns.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Content*/}
      <div className="lg:mt-12 mt-6 z-50 pb-48 px-4 lg:px-0 mx-auto max-w-[1236px] flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-[312px] flex flex-col px-6 py-4 md:py-6 rounded-[20px] bg-white divide-darkgreen-dark h-max">

          {/* dropdown on mobile */}
          <div className="flex justify-between lg:hidden">
            <div className="font-semibold">
              {currentTopic.topic} ({currentTopic.total})
            </div>
            <button onClick={() => setOpenTopic(!openTopic)} className="">
              {openTopic === true ? (
                <IoTriangle />
              ) : (
                <IoTriangle className="rotate-180" />
              )}
            </button>
          </div>

          {/* button on desktop and use for dropdown item in mobile */}
          {openTopic ? (
            <div className="mt-4 lg:mt-0">
              {topic.map((item, index) => (
                <div key={index}>
                  <button
                    onClick={() => {
                      filterByTopic(faq, item);
                      setOpenTopic(false);
                    }}
                    className="py-2 md:my-0 flex w-full font-title text-base justify-between items-center md:h-14 rounded-r-[10px] hover:bg-gray-100 focus:bg-gray-100 "
                  >
                    {item.topic} ({item.total})
                  </button>
                  <div className="hidden md:block w-full h-[1px] my-[16px] bg-darkgreen-dark" />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {/* FAQ List */}
        <div className="max-w-[824px]">
          <h1 className="hidden lg:inline font-title text-[28px] lg:text-[38px] font-semibold">
            {currentTopic.topic}
          </h1>
          <div className="mt-4 md:mt-[62px] flex flex-col gap-4">
            {currentFaq.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] p-6 space-y-4 lg:space-y-[34px]"
              >
                <div className="flex justify-between items-center">
                  <h1 className="font-title text-[38px]">{item.title}</h1>
                  <button
                    onClick={() => openPickFaq(item.title)}
                    className="text-2xl w-10 h-10 px-2 py-1.5 font-semibold rounded-full bg-gray-100"
                  >
                    {openFaq === item.title ? (
                      <FaChevronDown />
                    ) : (
                      <FaChevronUp />
                    )}
                  </button>
                </div>
                <p className="text-base font-title ">{item.shortInfo}</p>
                {openFaq === item.title ? (
                  <>
                    <div className="w-full h-[1px] my-[16px] bg-darkgreen-dark" />
                    <p className="text-base font-title ">{item.longInfo}</p>
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
