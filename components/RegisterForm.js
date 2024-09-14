"use client";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            
            const res = await axios.post('/api/register', data);

            if(res.status === 201){
                setLoading(false);
                reset();
                router.push('/')
            }
            else{
                const errorData = res.data.message;
                setError(errorData.message);
                console.log("Something went wrong.");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error("Form submission error:", error);
            setError('formError', { type: 'manual', message: 'Submission failed, please try again later.' });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
            <div className='flex flex-col'>
                <label htmlFor="name">Full Name</label>
                <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    id='name'
                    name='name'
                    className='w-[400px]'
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div className='flex flex-col'>
                <label htmlFor="email">Email</label>
                <input
                    {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' }
                    })}
                    type="email"
                    id='email'
                    name='email'
                    className='w-[400px]'
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div className='flex flex-col'>
                <label htmlFor="password">Password</label>
                <input
                    {...register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                    })}
                    type="password"
                    id='password'
                    name='password'
                    className='w-[400px]'
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            {errors.formError && <span className="text-red-500">{errors.formError.message}</span>}

            
            <button disabled={loading} type='submit' className='btn-primary font-semibold w-32 mx-auto'>
                {loading ? 'Loading...' : 'Register'}
            </button>
        </form>
    );
}

export default RegisterForm;
