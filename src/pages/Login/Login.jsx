import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { TbFidgetSpinner } from 'react-icons/tb'

const Login = () => {
  const { signIn, loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace />

  const handleSubmit = async event => {
    event.preventDefault()

    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      await signIn(email, password)
      toast.success('Login Successful')
      navigate(from, { replace: true })
    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md bg-gray-100'>
        <h1 className='text-3xl font-bold text-center mb-4'>Login</h1>

        <form onSubmit={handleSubmit} className='space-y-4'>

          <input
            type='email'
            name='email'
            required
            placeholder='Email'
            className='w-full p-2 border rounded'
          />

          <input
            type='password'
            name='password'
            required
            placeholder='Password'
            className='w-full p-2 border rounded'
          />

          <button className='bg-lime-500 w-full py-2 text-white rounded'>
            {loading ? (
              <TbFidgetSpinner className='animate-spin m-auto' />
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className='text-sm text-center mt-3'>
          Don't have account?{' '}
          <Link to='/signup' className='text-lime-500'>
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
