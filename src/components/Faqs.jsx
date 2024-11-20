import { useEffect, useState } from "react";
import faqsData from "../mocks/faqs.json";  

export const Faqs = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    setFaqs(faqsData);
  }, []);

  return (
    <section id="faqs" className="w-full p-5 dark:bg-slate-800 ">
      <div className="lg:w-2/3">
        <h2 className="mb-3 text-2xl font-bold text-tertiary dark:text-white">FAQs</h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`flex flex-col  mb-5 w-full h-auto bg-center bg-cover rounded-lg`}
          >
            <h3 className="text-lg font-semibold dark:text-white text-tertiary">{faq.title}</h3>
            <p className="text-sm font-medium dark:text-white ">{faq.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
