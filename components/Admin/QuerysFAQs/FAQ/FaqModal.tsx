


"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'

interface ModalProps {
    variant: 'create' | 'edit' | 'add'
    onSubmit: (data: string | { question: string, answer: string }) => void
    onDelete?: () => void
    initialQuestion?: string
    initialAnswer?: string
}

const FaqModal: React.FC<ModalProps> = ({ variant, onSubmit, onDelete, initialQuestion = '', initialAnswer = '' }) => {
    const [headline, setHeadline] = useState<string>('');
    const [question, setQuestion] = useState<string>(initialQuestion);
    const [answer, setAnswer] = useState<string>(initialAnswer);
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (variant === 'create') {
            onSubmit(headline);
        } else if (variant === 'edit' || variant === 'add') {
            onSubmit({ question, answer });
        }
        setIsOpen(false);
    };

    const handleHeadlineChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setHeadline(event.target.value);
    };

    const handleQuestionChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setQuestion(event.target.value);
    };

    const handleAnswerChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
        setAnswer(event.target.value);
    };

    const handleDelete = (): void => {
        if (onDelete) {
            onDelete();
            setIsOpen(false);
        }
    };

    if (variant === 'create') {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <div className='inline-flex'>
                        <Button variant={'default'} className='bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]'>
                            <Plus /> Add FAQ Section
                        </Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
                    <DialogHeader className="w-full">
                        <DialogTitle className="text-2xl font-normal text-center w-full mb-4">Create New FAQ section</DialogTitle>
                        <form onSubmit={handleSubmit} className="w-full space-y-6">
                            <div className="w-full">
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="section_name">
                                    Enter Section Name
                                </label>
                                <input
                                    type="text"
                                    id="section_name"
                                    className="border border-[#ffb433] bg-white text-[#888888] text-sm rounded-lg focus:ring-[#ffb433] focus:border-[#ffb433] block w-full ps-2 p-2.5 outline-none"
                                    value={headline}
                                    onChange={handleHeadlineChange}
                                    required
                                />
                            </div>
                            <div className="w-full flex justify-end pt-4">
                                <Button type="submit" variant={'default'} className="w-full bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]">
                                    <Plus />Create FAQ Section
                                </Button>
                            </div>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )
    }

    // Edit and Add variants
    const isEdit = variant === 'edit';
    const modalTitle = isEdit ? 'Edit FAQ' : 'Add New Question';
    const submitButtonText = isEdit ? 'Save Changes' : 'Add Question';

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {isEdit ? (
                    <div className="inline-flex">
                        <Button variant="default" className={isEdit ? 'px-4 py-2 underline text-blue-500 bg-white rounded-md hover:bg-primary-dark' : 'bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]'}>
                            {isEdit ? 'Edit FAQ' : 'Add New Question'}
                        </Button>
                    </div>
                ) : (
                    <Button
                        className="w-full bg-[#ffb433] hover:bg-[#9c6d1b] py-2 mt-4 flex items-center justify-center rounded-sm"
                        onClick={() => setIsOpen(true)}
                    >
                        <Plus className="w-4 h-4 mr-1" />
                        Add FAQ
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="bg-white text-black p-6 w-[30rem] max-w-full rounded-md">
                <DialogHeader className="w-full">
                    <DialogTitle className="text-2xl font-normal text-center w-full mb-4">
                        {modalTitle}
                    </DialogTitle>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="question">
                                Question
                            </label>
                            <textarea
                                id="question"
                                rows={3}
                                className="border border-[#ffb433] bg-white text-[#888888] text-sm rounded-lg focus:ring-[ #ffb433] focus:border-[#ffb433] block w-full ps-2 p-2.5 outline-none"
                                value={question}
                                onChange={handleQuestionChange}
                                required
                            />
                        </div>

                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="answer">
                                Answer
                            </label>
                            <textarea
                                id="answer"
                                rows={3}
                                className="border border-[#ffb433] bg-white text-[#888888] text-sm rounded-lg focus:ring-[#ffb433] focus:border-[#ffb433] block w-full ps-2 p-2.5 outline-none"
                                value={answer}
                                onChange={handleAnswerChange}
                                required
                            />
                        </div>

                        <div className="w-full flex justify-between items-center pt-4">
                            {/* Delete Button */}
                            {isEdit && onDelete && (
                                <Button type="button" variant="default" className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md" onClick={handleDelete}>
                                    Delete FAQ
                                </Button>
                            )}

                            {/* Submit Button */}
                            <Button type="submit" variant={'default'} className={`${isEdit ? 'w-[70%]' : 'w-full'} bg-[#ffb433] font-semibold hover:bg-[#9c6d1b]`}>
                                {submitButtonText}
                            </Button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default FaqModal;