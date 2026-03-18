"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IconSearch } from "@tabler/icons-react";

const tabs = [
  "Product Usage",
  "Material & Safety",
  "Sizing & Variations",
  "Shipping & Delivery",
  "Return & Replacement",
  "Subscription and Offers",
] as const;

type TabType = (typeof tabs)[number];

const faqData: Record<
  TabType,
  { question: string; answer: string }[]
> = {
  "Product Usage": [
    {
      question: "How often should I change my sanitary pad?",
      answer: "It is recommended to change your sanitary pad every 4–6 hours depending on your flow to maintain hygiene and prevent infections."
    },
    {
      question: "How do I use a menstrual cup correctly?",
      answer: "Fold the cup, insert it into the vagina, and ensure it opens fully. To remove, gently pinch the base and pull it out carefully."
    },
    {
      question: "Can I wear panty liners every day?",
      answer: "Yes, panty liners can be used daily for freshness, but make sure to change them regularly to maintain hygiene."
    },
    {
      question: "Can I exercise while using menstrual products?",
      answer: "Yes, all menstrual hygiene products are designed to support daily activities including workouts and sports."
    },
    {
      question: "How do I clean reusable menstrual products?",
      answer: "Wash with cold water first, then clean with mild soap. For menstrual cups, sterilize by boiling in water after each cycle."
    },
  ],

  "Material & Safety": [
    {
      question: "Are your products safe for sensitive skin?",
      answer: "Yes, our products are dermatologically tested and made with skin-friendly materials suitable for sensitive skin."
    },
    {
      question: "Do your products contain harmful chemicals?",
      answer: "No, our products are free from harsh chemicals, toxins, and artificial irritants."
    },
    {
      question: "Are the products fragrance-free?",
      answer: "Most of our products are fragrance-free to minimize the risk of irritation and allergies."
    },
    {
      question: "Is the material breathable?",
      answer: "Yes, all products are designed with breathable layers to ensure comfort and reduce moisture buildup."
    },
    {
      question: "Are your products eco-friendly?",
      answer: "We offer eco-friendly and biodegradable options that are safe for both users and the environment."
    },
  ],

  "Sizing & Variations": [
    {
      question: "How do I choose the right size for my needs?",
      answer: "You can select the size based on your flow type. Light, regular, and heavy flow options are available on product pages."
    },
    {
      question: "Do you offer multiple size options?",
      answer: "Yes, we provide different sizes and absorbency levels to suit individual preferences."
    },
    {
      question: "Are your products suitable for teenagers?",
      answer: "Yes, we offer smaller sizes and beginner-friendly options suitable for teens."
    },
    {
      question: "Can I switch sizes during my cycle?",
      answer: "Yes, you can switch between sizes depending on your flow during different days of your cycle."
    },
    {
      question: "Do sizes differ between product types?",
      answer: "Yes, each product type such as pads, cups, or liners has its own sizing guidelines."
    },
  ],

  "Shipping & Delivery": [
    {
      question: "How long does delivery take?",
      answer: "Orders are usually delivered within 3–5 business days depending on your location."
    },
    {
      question: "Do you provide tracking details?",
      answer: "Yes, once your order is shipped, you will receive a tracking link via SMS or email."
    },
    {
      question: "Do you deliver across India?",
      answer: "Yes, we currently deliver to most locations across India."
    },
    {
      question: "Is express shipping available?",
      answer: "Express shipping is available in selected cities and can be chosen at checkout."
    },
    {
      question: "What should I do if my order is delayed?",
      answer: "If your order is delayed, please check your tracking link or contact our support team for assistance."
    },
  ],

  "Return & Replacement": [
    {
      question: "Can I return a used product?",
      answer: "For hygiene reasons, used or opened products cannot be returned."
    },
    {
      question: "How do I request a return or replacement?",
      answer: "You can contact our support team within 48 hours of delivery with your order details."
    },
    {
      question: "What is the return policy duration?",
      answer: "Returns must be requested within the allowed return window mentioned in our policy."
    },
    {
      question: "Do I have to pay for return shipping?",
      answer: "Return shipping charges depend on the reason for the return."
    },
    {
      question: "How long does it take to get a refund?",
      answer: "Refunds are processed within 6–8 business days after approval."
    },
  ],

  "Subscription and Offers": [
    {
      question: "Do you offer subscription discounts?",
      answer: "Yes, customers who subscribe can enjoy exclusive discounts and offers."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription anytime without any extra charges."
    },
    {
      question: "Are offers automatically applied?",
      answer: "Yes, eligible discounts and offers are automatically applied during checkout."
    },
    {
      question: "Do subscribers get early access to products?",
      answer: "Yes, subscribers may receive early access to new launches and special deals."
    },
    {
      question: "Can I pause or reschedule my subscription?",
      answer: "Yes, you can pause or reschedule your subscription from your account dashboard."
    },
  ],
};

const Frequently = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Product Usage");

  return (
    <section className="w-full bg-white py-12 sm:py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-semibold text-black">
            Frequently Asked Questions
          </h2>

          <p className="text-sm text-gray-500 mx-auto ">
            Find answers to common questions about our products, shipping, returns, and more. We're here to help you make informed decisions.
          </p>
        </div>

        
        <div className="mt-6 flex justify-center">
          <div className="relative w-full max-w-3xl">
            <IconSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />

            <Input
              placeholder="Search for answers"
              className="h-11 w-full rounded-full border border-gray-300 bg-white pl-11 pr-5 shadow-none focus-visible:ring-0"
            />
          </div>
        </div>

       
        <div className="mt-16 flex overflow-x-auto whitespace-nowrap gap-2 sm:flex-wrap sm:justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
                activeTab === tab
                  ? "bg-[#168BA0] text-white border-[#168BA0]"
                  : "bg-white text-gray-700 border-gray-300 hover:border-teal-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <Accordion type="single" collapsible className="w-full">
            {faqData[activeTab].map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b last:border-none"
              >
                <AccordionTrigger className="text-left text-sm sm:text-base font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
};

export default Frequently;