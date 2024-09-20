"use client"
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { faqData } from '@/lib/FaqSampleData';

const FAQ = () => {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (faqData.length > 0 && faqData[0].questions.length > 0) {
            const defaultQuestion = faqData[0].questions[0];
            setSelectedQuestion(defaultQuestion.question);
            setSelectedAnswer(defaultQuestion.answer);
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleAccordion = (id: any) => {
        setOpenAccordion(openAccordion === id ? null : id);
    };

    const handleQuestionClick = (question: any, answer: any) => {
        setSelectedQuestion(question);
        setSelectedAnswer(answer);
        if (isMobile) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="bg-[#fff9ef] px-2 py-20  sm:px-4 md:px-8 lg:px-20 md:py-32 lg:py-32 min-h-screen">
            <h1 className='font-semibold text-xl sm:text-3xl mb-6 md:mb-8 '>Frequently Asked Questions</h1>

            <div className="flex flex-col md:flex-row  ">
                <div className="w-full md:w-2/5 lg:w-2/6 pr-0 md:pr-4 mb-6 md:mb-0">
                    {faqData.map((section, sectionIndex) => {
                        const accordionId = `accordion-${sectionIndex}`;

                        return (
                            <Accordion
                                key={accordionId}
                                id={accordionId}
                                title={section.headline}
                                isOpen={openAccordion === accordionId}
                                onClick={() => toggleAccordion(accordionId)}
                            >
                                <ul className="list-disc pl-6 md:pl-10">
                                    {section.questions.map((faq: any, faqIndex: any) => (
                                        <li
                                            key={`faq-${faqIndex}`}
                                            className={`text-sm md:text-base text-black mb-2 cursor-pointer flex flex-row gap-2 transition-colors duration-300 ease-in-out ${selectedQuestion === faq.question ? 'text-[#FFB433]' : ''}`}
                                            onClick={() => handleQuestionClick(faq.question, faq.answer)}
                                        >
                                            <p>{faq.question}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Accordion>
                        );
                    })}
                </div>

                <div className="w-full md:w-3/5 lg:w-3/6 md:border-l md:border-gray-300 md:pl-6 lg:pl-20 ">
                    {selectedQuestion && (
                        <div className="text-black transition-opacity duration-300 ease-in-out">
                            <p className="mb-4 text-lg sm:text-2xl md:text-3xl space-x-2">
                                <span className="text-lg sm:text-xl md:text-2xl mb-4">Q.</span>
                                <span>{selectedQuestion}</span>
                            </p>
                            <p className="text-sm md:text-lg">{selectedAnswer}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

interface AccordionI {
    id: string;
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

const Accordion = ({ id, title, children, isOpen, onClick }: AccordionI) => {
    return (
        <div className="mb-2">
            <h2 id={`${id}-heading`}>
                <button
                    type="button"
                    className={`flex items-center w-full py-3 md:py-5 font-medium text-sm md:text-base text-black ${!isOpen ? 'border-b border-gray-200 dark:border-gray-700' : null} dark:text-gray-400 gap-2 md:gap-3 transition-all duration-300 ease-in-out`}
                    onClick={onClick}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-body`}
                >
                    {isOpen ? <ChevronUp className="w-3 h-3 md:w-4 md:h-4" /> : <ChevronDown className="w-3 h-3 md:w-4 md:h-4" />}
                    <span>{title}</span>
                </button>
            </h2>
            <div
                id={`${id}-body`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="py-3 md:py-5 border-b border-gray-200 dark:border-gray-700">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FAQ;