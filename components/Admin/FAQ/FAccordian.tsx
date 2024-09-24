
"use client"
import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus, Edit } from 'lucide-react';
import { faqData } from '@/lib/FaqSampleData';
import { Button } from '@/components/ui/button';
import FaqModal from './FaqModal';

const FAQ = () => {
    const [openSection, setOpenSection] = useState(null);
    const [openQuestion, setOpenQuestion] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSection = (id: any) => {
        setOpenSection(openSection === id ? null : id);
        setOpenQuestion(null);
    };

    const toggleQuestion = (id: any) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    const handleAddFAQ = (sectionIndex: number) => {
        // Implement your add FAQ logic here
        console.log(`Add FAQ to section ${sectionIndex}`);
    };

    const handleEditAnswer = (sectionIndex: number, questionIndex: number) => {
        // Implement your edit answer logic here
        console.log(`Edit answer for section ${sectionIndex}, question ${questionIndex}`);
    };

    return (
        <div className="bg-white px-2 pt-10 sm:px-4 md:px-8 lg:px-20 h-screen">
            <div className="w-full space-y-6">
                {faqData.map((section, sectionIndex) => {
                    const sectionId = `section-${sectionIndex}`;

                    return (
                        <div key={sectionId} className="bg-[#f8f8f8] rounded-lg shadow-md overflow-hidden">
                            <Accordion
                                id={sectionId}
                                title={section.headline}
                                isOpen={openSection === sectionId}
                                onClick={() => toggleSection(sectionId)}
                            >
                                <div className="space-y-2 px-4 bg-white border py-2">
                                    {section.questions.map((faq: any, faqIndex: any) => {
                                        const questionId = `question-${sectionIndex}-${faqIndex}`;

                                        return (
                                            <Accordion
                                                key={questionId}
                                                id={questionId}
                                                title={faq.question}
                                                isOpen={openQuestion === questionId}
                                                onClick={() => toggleQuestion(questionId)}
                                                nested
                                            >
                                                <div className="text-sm md:text-base py-2">
                                                    <p>{faq.answer}</p>
                                                    <FaqModal variant='edit'/>
                                                </div>
                                            </Accordion>
                                        );
                                    })}
                                    <Button
                                        className="w-full bg-[#ffb433] hover:bg-[#a57521]  py-2 mt-4 flex items-center justify-center  rounded-sm"
                                        onClick={() => handleAddFAQ(sectionIndex)}
                                    >
                                        <Plus className="w-4 h-4 mr-1" />
                                        Add FAQ
                                    </Button>
                                </ div>
                            </Accordion>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

interface AccordionProps {
    id: string;
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
    nested?: boolean;
}

const Accordion = ({ id, title, children, isOpen, onClick, nested = false }: AccordionProps) => {
    return (
        <div className={`${nested ? 'border-t border-gray-200 h-max' : ''}`}>
            <h2 id={`${id}-heading`}>
                <button
                    type="button"
                    className={`flex items-center w-full py-4 px-4 font-medium text-sm md:text-base text-black dark:text-gray-400 gap-2 md:gap-3 transition-all duration-300 ease-in-out ${nested ? 'pl-8' : ''}`}
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
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'h-max opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="py-4 px-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FAQ;