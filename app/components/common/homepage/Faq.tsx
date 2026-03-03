import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What makes your products different from traditional drugstore brands?",
    answer: "Our products focus on \"Modern Comfort,\" meaning we use hypoallergenic materials, are eco-friendly, and are designed by experts to ensure they are as gentle on your skin as they are on the planet."
  },
  {
    question: "Are Potent Hygiene products safe for sensitive skin?",
    answer: "Yes, all our products are dermatologically tested and free from harsh chemicals, fragrances, and toxins to ensure maximum safety."
  },
  {
    question: "How do I choose the right product for my flow?",
    answer: "We offer a variety of sizes and absorbency levels. Check our 'Product Guide' on each product page to find your perfect match."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we ship pan-India, but we are working hard to bring Potent Hygiene to women across the globe very soon!"
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we ship pan-India, but we are working hard to bring Potent Hygiene to women across the globe very soon!"
  }
];

const Faq = () => {
  return (
    <section className="bg-[#FFFFFF] ">
      <div className="container mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-8 py-6">
            <h2 className="md:text-4xl text-3xl font-serif font-bold text-[#333333]">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4 pb-4">
              {faqData.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="border rounded-md px-6 py-1 transition-all border-black/20 data-[state=open]:border-[#1A8D91] data-[state=open]:bg-[#F9FDFE] shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-800 hover:no-underline md:text-md py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-2xl mx-auto text-sm text-black/50 leading-relaxed pb-6">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="relative flex justify-center items-center lg:sticky lg:top-10">
            <div className="relative w-full aspect-square max-w-[500px]">
              <Image
                src="/faq.png"
                alt="Potent Hygiene Products Collage"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;