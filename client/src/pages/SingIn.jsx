

import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { singInStart, singInSuccess, singInFailure } from '../redux/user/userSlice';

const SingIn =()=> {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector(state => state.user);

  const handleChange = (event) => {
    setFormData({...formData, [event.target.id]: event.target.value.trim() });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(singInFailure('Please fill out all fields.'));
    }
    try {
      dispatch(singInStart());
      const res = await fetch('/api/auth/singin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
        if(data.success === false){
          dispatch(singInFailure(data.message));
        }

        if(res.ok){
          dispatch(singInSuccess(data));
          navigate('/');
        }
    } catch (error) {
      dispatch(singInFailure(error.message));
    }
  };


  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

            {/* left */}
          <div className='flex-1'>
            <Link to="/" 
              className='font-bold 
            dark:text-white text-4xl'
            >
              <span className='px-3 py-1 
                bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 
                rounded-lg text-white'>React-pro</span>
              <span className='font-bold'>Vite</span>
            </Link>
            <p className='text-sm mt-5'>This is demo project React-vite
              you can sing-in with your email and password or with Google
            </p>
          </div>

            {/* right */}
          <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

              <div>
                <Label value='Your email' />
                <TextInput 
                  type='email'
                  placeholder='name@company.com'
                  id='email' 
                  onChange={handleChange}
                  /> 
              </div>

              <div>
                <Label value='Your password' />
                <TextInput 
                  type='password'
                  placeholder='*************'
                  id='password' 
                  onChange={handleChange}
                  /> 
              </div>

              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                  {
                    loading ? (
                      <>
                        <Spinner size='sm'/>
                        <span className='pl-3'>Loading...</span>
                      </>
                    ) : 'Sing In'
                  }
              </Button>
            </form>

            <div className='flex gap-2 text-sm mt-5'>
              <span>Don&lsquo;t Have an account?</span>
              <Link to='/sing-up' className='text-purple-600'>
                Sing Up
              </Link>
            </div>
            {errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )}
          </div>
      </div>      
    </div>
  )
}

export default SingIn;
