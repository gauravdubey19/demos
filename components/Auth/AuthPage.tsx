"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import AuthContainer from './AuthContainer';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
    const router = useRouter();
    const [isSignup, setIsSignup] = useState(false);
    const formRef = useRef(null); // Ref to hold the current form's DOM element
    const {data:session} = useSession();

    useEffect(() => {
        if (session?.user) {
            router.push('/');
        }
    }, [session, router]);
    const handleToggleForm = () => {
        setIsSignup(prevState => !prevState);
    };

    useEffect(() => {
        // Trigger animation when `isSignup` changes
        gsap.fromTo(
            formRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 }
        );
    }, [isSignup]);


    return (
        <div>
            <AuthContainer handleToggleForm={handleToggleForm} isSignup={isSignup}>
                <div className='w-full' ref={formRef} style={{ transition: 'opacity 0.5s ease' }}>
                    {isSignup ? <SignupForm /> : <LoginForm />}
                </div>
            </AuthContainer>
        </div>
    );
};

export default AuthPage;
