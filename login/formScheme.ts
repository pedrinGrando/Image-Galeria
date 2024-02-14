import * as Yup from 'yup'

export interface LoginForm{
    name?: string;
    email?: string;
    password?: string;
    passwordMatch?: string;
    
}

export const validationScheme = Yup.object().shape({
    email: Yup.string().trim().required('Email is required').email('Invalid Email'),
    password: Yup.string().required('Password is required').min(8, 'Passowrd must have at least 8 chracteres!'),
    passwordMatch: Yup.string().oneOf([Yup.ref('password')], 'Password must match!')
})

export const formScheme: LoginForm = { email: '', name: '', password: '', passwordMatch: '' }