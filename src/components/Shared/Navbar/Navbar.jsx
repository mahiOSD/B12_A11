import Container from '../Container'
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/images/logo.webp'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logOut()
    setIsOpen(false)
  }

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4'>
        <Container>
          <div className='flex items-center justify-between'>

            
            <Link to='/'>
              <img src={logo} alt='logo' width='200' />
            </Link>

          
            <div className='relative'>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='p-3 border border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
              >
                <AiOutlineMenu />

              
                <img
                  className='rounded-full'
                  referrerPolicy='no-referrer'
                  src={user?.photoURL || avatarImg}
                  alt='profile'
                  height='30'
                  width='30'
                />
              </div>

             
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-44 bg-white right-0 top-12 text-sm'>

               
                  <Link
                    to='/'
                    onClick={() => setIsOpen(false)}
                    className='block px-4 py-3 hover:bg-neutral-100 font-semibold md:hidden'
                  >
                    Home
                  </Link>

                  {user ? (
                    <>
                      <Link
                        to='/dashboard'
                        onClick={() => setIsOpen(false)}
                        className='block px-4 py-3 hover:bg-neutral-100 font-semibold'
                      >
                        Dashboard
                      </Link>

                      <Link
                        to='/dashboard/profile'
                        onClick={() => setIsOpen(false)}
                        className='block px-4 py-3 hover:bg-neutral-100 font-semibold'
                      >
                        Profile
                      </Link>

                      <div
                        onClick={handleLogout}
                        className='px-4 py-3 hover:bg-neutral-100 font-semibold cursor-pointer'
                      >
                        Logout
                      </div>
                    </>
                  ) : (
                    <>
                      <Link
                        to='/login'
                        onClick={() => setIsOpen(false)}
                        className='block px-4 py-3 hover:bg-neutral-100 font-semibold'
                      >
                        Login
                      </Link>

                      <Link
                        to='/signup'
                        onClick={() => setIsOpen(false)}
                        className='block px-4 py-3 hover:bg-neutral-100 font-semibold'
                      >
                        Sign Up
                      </Link>
                    </>
                  )}

                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
