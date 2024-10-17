
"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FaqModal from './FaqModal';

interface Question {
    _id: string;
    question: string;
    answer: string;
}

interface FaqSection {
    _id: string;
    headline: string;
    questions: Question[];
}

interface FAQProps {
    faqData: FaqSection[];
    setFaqData: React.Dispatch<React.SetStateAction<FaqSection[]>>;
}

interface AccordionProps {
    id: string;
    title: string;
    isOpen: boolean;
    onClick: () => void;
    children: React.ReactNode;
    nested?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ id, title, isOpen, onClick, children, nested = false }) => (
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

const FAQ: React.FC<FAQProps> = ({ faqData, setFaqData }) => {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [openQuestion, setOpenQuestion] = useState<string | null>(null);

    const toggleSection = (id: string): void => {
        setOpenSection(openSection === id ? null : id);
        setOpenQuestion(null);
    };

    const toggleQuestion = (id: string): void => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    const handleAddFAQ = async (sectionId: string, question: string, answer: string): Promise<void> => {
        try {
            const response = await fetch('/api/faq/push/creatQuestion', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ headlineId: sectionId, question, answer }),
            });

            if (response.ok) {
                const updatedSection: FaqSection = await response.json();
                setFaqData(faqData.map(section =>
                    section._id === sectionId ? updatedSection : section
                ));
            } else {
                console.error('Failed to add FAQ');
            }
        } catch (error) {
            console.error('Error adding FAQ:', error);
        }
    };

    const handleEditFAQ = async (sectionId: string, questionId: string, newQuestion: string, newAnswer: string): Promise<void> => {
        try {
            const response = await fetch('/api/faq/put/editQuestion', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    headlineId: sectionId,
                    questionId,
                    question: newQuestion,
                    answer: newAnswer
                }),
            });

            if (response.ok) {
                const updatedSection: FaqSection = await response.json();
                setFaqData(faqData.map(section =>
                    section._id === sectionId ? updatedSection : section
                ));
            } else {
                console.error('Failed to edit FAQ');
            }
        } catch (error) {
            console.error('Error editing FAQ:', error);
        }
    };

    const handleDeleteSection = async (sectionId: string): Promise<void> => {
        try {
            const response = await fetch('/api/faq/delete/DeleteSection', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ headlineId: sectionId }),
            });

            if (response.ok) {
                setFaqData(faqData.filter(section => section._id !== sectionId));
            } else {
                console.error('Failed to delete FAQ section');
            }
        } catch (error) {
            console.error('Error deleting FAQ section:', error);
        }
    };

    const handleDeleteQuestion = async (sectionId: string, questionId: string): Promise<void> => {
        try {
            const response = await fetch('/api/faq/delete/DeleteFaq', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ headlineId: sectionId, questionId }),
            });

            if (response.ok) {
                const { faq: updatedSection } = await response.json();
                setFaqData(faqData.map(section =>
                    section._id === sectionId ? updatedSection : section
                ));
            } else {
                console.error('Failed to delete FAQ question');
            }
        } catch (error) {
            console.error('Error deleting FAQ question:', error);
        }
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
                                    {section.questions.map((faq, faqIndex) => {
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
                                                    <FaqModal
                                                        variant='edit'
                                                        onSubmit={(data) => {
                                                            if (typeof data === 'object' && 'question' in data && 'answer' in data) {
                                                                handleEditFAQ(section._id, faq._id, data.question, data.answer);
                                                            }
                                                        }}
                                                        onDelete={() => handleDeleteQuestion(section._id, faq._id)}
                                                        initialQuestion={faq.question}
                                                        initialAnswer={faq.answer}
                                                    />
                                                </div>
                                            </Accordion>
                                        );
                                    })}

                                    <div className='flex flex-row items-center gap-2'>
                                        <FaqModal
                                            variant='add'
                                            onSubmit={(data) => {
                                                if (typeof data === 'object' && 'question' in data && 'answer' in data) {
                                                    handleAddFAQ(section._id, data.question, data.answer);
                                                }
                                            }}
                                        />
                                        <Button
                                            className='border border-rose-500 bg-transparent mt-4'
                                            onClick={() => handleDeleteSection(section._id)}
                                        >
                                            <Trash2 height={30} width={30} className='text-rose-500 p-1' />
                                        </Button>
                                    </div>

                                </div>
                            </Accordion>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FAQ;