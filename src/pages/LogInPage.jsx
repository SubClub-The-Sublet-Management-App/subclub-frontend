import { useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import logo from '../assets/images/sub-club-logo.svg';
import ModalMessages from '../components/ModalMessages';
import { AuthContext } from '../components/AuthContext';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export default function LogInPage() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // control the message displayed in the modal
  const [modalMessage, setModalMessage] = useState('');

  const handleLogIn = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      // Set to true when the user logs in successfully
      setIsAuthenticated(true);

      // Store the user token in localStorage
      localStorage.setItem('userToken', response.data.token);

      // set the message to display in the modal
      setModalMessage(response.data.message);
      setIsModalOpen(true);

      // navigate to the root page after a delay
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error) {
      // extract the error message from the response
      const errorMessage = error.response.data.message;

      // set the error message to display in the modal
      setModalMessage(errorMessage);
      setIsModalOpen(true);
    }
  };

  return (
    <div className='flex flex-col sm:lg:flex-row'>
      <div className='w-full h-30vh sm:lg:h-full sm:lg:w-1/2 relative'>
        <img
          className='w-full h-full object-cover'
          src='https://images.unsplash.com/photo-1582298538104-fe2e74c27f59?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWgelfHx8fGVufDB8fHx8fA%3D%3D'
          alt='house mates'
        />
        <p className='absolute bottom-0 left-0 px-1 text-gray-300'>
          Photo by{' '}
          <a
            href='https://unsplash.com/@heftiba?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
            className='text-white'
          >
            Toa Heftiba
          </a>{' '}
          on{' '}
          <a
            href='https://unsplash.com/photos/woman-in-black-and-white-checkered-long-sleeve-shirt-sitting-beside-man-in-green-crew-neck-l_ExpFwwOEg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash'
            className='text-white'
          >
            Unsplash
          </a>
        </p>
      </div>

      <div className='signup-form w-full sm:lg:w-1/2'>
        <div className='flex max-h-1/2 min-h-full flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <img className='mx-auto h-10 w-auto' src={logo} alt='SubClub' />
            <h2 className='mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Log In
            </h2>
          </div>
          <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form className='space-y-6' onSubmit={handleLogIn}>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Password
                  </label>
                </div>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    autoComplete='current-password'
                    required
                    className='block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className='flex justify-center align-middle w-full rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                >
                  Log In
                </button>
              </div>
            </form>

            <p className='mt-10 text-center text-sm text-gray-500'>
              Don't have an account yet?
              <a
                href='signup'
                className='font-semibold leading-6 text-primary hover:text-indigo-500'
              >
                {' '}
                Sign Up for free
              </a>
            </p>
          </div>
        </div>
      </div>
      <ModalMessages
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
