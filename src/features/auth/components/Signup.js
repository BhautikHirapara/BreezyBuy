import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, SubmitHandler } from "react-hook-form"
import {
  selectLoggedInUser, createUserAsync
} from '../authSlice';
import { Link, Navigate } from 'react-router-dom';

export default function Signup() {
  const dispatch = useDispatch();
  const {register, handleSubmit, watch, formState: { errors },  } = useForm();
  const user = useSelector(selectLoggedInUser)
  // console.log(errors)
  return (
  <>
  {user && <Navigate to='/' replace={true}></Navigate> }
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">create a new account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data)=>{
            dispatch(createUserAsync({email: data.name, password: data.password, addresses: []}))
            console.log(data)
          })}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input id="email" {...register("name", 
                { required: "Please enter a valid email address to continue" , pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: 'Please enter a valid email address to continue'
                }})}  
                type="email" 
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div> */}
              </div>
              <div className="mt-2">
                <input id="password" {...register("password", { required: "Password is required", pattern:{
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: `- At least 8 characters
                  - Must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                  - Can contain special characters`
                } })} name="password" type="password"   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                {/* <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                </div> */}
              </div>
              <div className="mt-2">
                <input id="confirmPassword" {...register("confirmPassword", { required: "Confirm Password is required",     validate: (value, formValues) => value === formValues.password || "Password is not matching"})} 
                name="confirmPassword" 
                type="password"  
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
            </div>
            
            {errors.exampleRequired && <span>This field is required</span>}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member? 
            <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Log In</Link>
          </p>
        </div>
      </div>
    </div>
  </>
  );
}
