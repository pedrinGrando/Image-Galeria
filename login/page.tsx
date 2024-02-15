'use client'

import { Template, RenderIf, InputText, Button, FieldError, useNotification } from '@/components'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { LoginForm, formScheme, validationScheme } from './formScheme' 

export default function Login(){

    const [loading, setLoading] = useState<boolean>(false);
    const [newUserState, setNewUserState] = useState<boolean>(false);

    const { values, handleChange, handleSubmit, errors} = useFormik<LoginForm>({
        initialValues: formScheme,
        validationSchema: validationScheme,
        onSubmit: onSubmit
       }) 

       async function onSubmit(values: LoginForm){
         console.log(values)
       }

    return (
        <Template loading={loading}>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <h2 className='mt-10 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900'>
                        { newUserState ? 'Create New User' : 'Login to Your Account' }
                    </h2>
                </div>

                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form onSubmit={handleSubmit} className='space-y-2'>
                        <RenderIf condition={newUserState}>
                            <div>
                                <label className='block text-sm font-medium leading-6 text-gray-900'>Name: </label>
                            </div>
                            <div className='mt-2'>
                                <InputText style='w-full' 
                                           id='name' 
                                           value={values.name}/>
                                           <FieldError error={errors.name}/>
                                           

                            </div>
                        </RenderIf>
                        <div>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>Email: </label>
                        </div>
                        <div className='mt-2'>
                            <InputText style='w-full' 
                                        id='email' 
                                        onChange={handleChange}
                                        value={values.email}/>

                                       <FieldError error={errors.email}/>
                        </div>

                        <div>
                            <label className='block text-sm font-medium leading-6 text-gray-900'>Password: </label>
                        </div>
                        <div className='mt-2'>
                            <InputText style='w-full' 
                                       id='password' 
                                       onChange={handleChange}
                                       value={values.password}/>
                                       <FieldError error={errors.password}/>
                                  
                        </div>

                        <RenderIf condition={newUserState}>
                            <div>
                                <label className='block text-sm font-medium leading-6 text-gray-900'>Repeat Password: </label>
                            </div>
                            <div className='mt-2'>
                                <InputText style='w-full'                                        
                                        id='passwordMatch'
                                        onChange={handleChange}
                                        value={values.passwordMatch}/>
                                        <FieldError error={errors.passwordMatch}/>
                               
                            </div>
                        </RenderIf>

                        <div>
                            <RenderIf condition={newUserState}>
                                <Button type='submit' 
                                        style='bg-indigo-700 hover:bg-indigo-500' 
                                        label='Save' />
                                <Button type='button' 
                                        style='bg-red-700 hover:bg-red-500 mx-2' 
                                        label='Cancel' 
                                        onClick={event => setNewUserState(false)} />
                            </RenderIf>

                            <RenderIf condition={!newUserState}>
                                <Button type='submit' 
                                        style='bg-indigo-700 hover:bg-indigo-500' 
                                        label='Login' />
                                <Button type='button' 
                                        style='bg-red-700 hover:bg-red-500 mx-2' 
                                        label='Sign Up'
                                        onClick={event => setNewUserState(true)} />
                            </RenderIf>
                        </div>
                    </form>
                </div>

            </div>
        </Template>
    )
}
