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
    { question: "How often should I change my sanitary pad?", answer: "Change every 4–6 hours depending on flow." },
    { question: "How do I insert and remove a menstrual cup?", answer: "Fold, insert gently, and pinch base to remove." },
    { question: "Can I wear period panties overnight?", answer: "Yes, depending on absorbency level." },
    { question: "How do I clean reusable menstrual products?", answer: "Rinse with cold water and wash with mild soap." },
    { question: "Can I exercise while using menstrual products?", answer: "Yes, they are designed for daily activity." },
  ],
  "Material & Safety": [
    { question: "Are the materials safe for sensitive skin?", answer: "Yes, dermatologically tested." },
    { question: "Do your products contain harmful chemicals?", answer: "No, we avoid harsh chemicals." },
    { question: "Are products fragrance free?", answer: "Most variants are fragrance free." },
    { question: "Is the material breathable?", answer: "Yes, designed for airflow and comfort." },
    { question: "Are products tested before sale?", answer: "Yes, quality checks are done." },
  ],
  "Sizing & Variations": [
    { question: "How do I choose the right size?", answer: "Check the size guide on product page." },
    { question: "Do you offer multiple sizes?", answer: "Yes, different sizes are available." },
    { question: "Are sizes suitable for teens?", answer: "Yes, smaller sizes are available." },
    { question: "Can I switch sizes during cycle?", answer: "Yes, based on flow comfort." },
    { question: "Do sizes vary by product type?", answer: "Yes, each product has its own sizing." },
  ],
  "Shipping & Delivery": [
    { question: "How long does delivery take?", answer: "Usually 3–5 business days." },
    { question: "Do you provide tracking?", answer: "Yes, tracking link is shared after shipping." },
    { question: "Do you deliver nationwide?", answer: "Yes, delivery is available across locations." },
    { question: "Is express shipping available?", answer: "Yes, in selected areas." },
    { question: "What if delivery is delayed?", answer: "Contact support for help." },
  ],
  "Return & Replacement": [
    { question: "Can I return opened products?", answer: "Opened hygiene products are non-returnable." },
    { question: "How do I request a replacement?", answer: "Contact support with order details." },
    { question: "What is return time period?", answer: "Returns allowed within policy period." },
    { question: "Do I pay return shipping?", answer: "Depends on return reason." },
    { question: "How long refund takes?", answer: "Refunds processed within few business days." },
  ],
  "Subscription and Offers": [
    { question: "Do you offer subscription discounts?", answer: "Yes, subscribers get offers." },
    { question: "Can I cancel anytime?", answer: "Yes, subscription can be cancelled anytime." },
    { question: "Are offers auto applied?", answer: "Yes, eligible offers apply automatically." },
    { question: "Do subscribers get early access?", answer: "Yes, sometimes early access is given." },
    { question: "Can I pause subscription?", answer: "Yes, pause option is available." },
  ],
};

const Frequently = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Product Usage");

  return (
    <section className="w-full bg-white py-12 sm:py-14">
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">

        
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