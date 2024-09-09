import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { LogIn } from 'lucide-react';

export function SignupForm() {
    // State to manage the visibility of the password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State to manage form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State to manage form validation errors
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setPasswordError('');

        // Process signup with email and password
        console.log('Email:', email);
        console.log('Password:', password);

        // Add your signup logic here
    };

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    // Function to toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prevState => !prevState);
    };

    return (
        <div className='w-full'>
            <h2 className='text-3xl text-black text-center mb-8 font-semibold'>Signup!</h2>
            <div className='w-full flex items-center justify-center'>
                <form onSubmit={handleSubmit} className='w-full max-w-sm flex flex-col items-center'>
                    <div className='mb-4 w-full'>
                        <label htmlFor='email' className='block text-black text-sm font-bold mb-2'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full text-black rounded-3xl px-3 py-2 border border-gray-300  shadow-sm focus:outline-none focus:ring focus:ring-white focus:ring-opacity-50'
                            required
                        />
                    </div>
                    <div className='mb-6 w-full relative overflow-hidden'>
                        <label htmlFor='password' className='block text-black text-sm font-bold mb-2'>
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full px-3 py-2 text-black border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring focus:ring-white focus:ring-opacity-50'
                            required
                        />
                        <button
                            type='button'
                            onClick={togglePasswordVisibility}
                            className='absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-gray-600'
                        >
                            {showPassword ? <Eye width={20} /> : <EyeOff width={20} />}
                        </button>
                    </div>
                    <div className='mb-6 w-full relative overflow-hidden'>
                        <label htmlFor='confirmPassword' className='block text-black text-sm font-bold mb-2'>
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id='confirmPassword'
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='w-full px-3 py-2 text-black border border-gray-300 rounded-3xl shadow-sm focus:outline-none focus:ring focus:ring-white focus:ring-opacity-50'
                            required
                        />
                        <button
                            type='button'
                            onClick={toggleConfirmPasswordVisibility}
                            className='absolute inset-y-0 right-0 pr-3 pt-6 flex items-center text-gray-600'
                        >
                            {showConfirmPassword ? <Eye width={20} /> : <EyeOff width={20} />}
                        </button>
                    </div>
                    {passwordError && <p className='text-red-500 mb-4'>{passwordError}</p>}
                    <div className='flex items-center justify-end w-full'>
                        <button
                            type='submit'
                            className=' flex items-center gap-3 py-2 px-5 text-white bg-[#f0d464] rounded-md hover:bg-[#c5ae51] transition-colors duration-300'
                        >
                            Signup <LogIn />
                        </button>
                    </div>
                    
                    
                </form>
            </div>
        </div>
    );
}
