import Container from '../Container';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import avatarImg from '../../../assets/images/placeholder.jpg';
import logo from '../../../assets/images/logo.webp';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (!user) return navigate('/login');
   
    switch (user.role) {
      case "admin":
        navigate('/dashboard/admin');
        break;
      case "chef":
        navigate('/dashboard');
        break;
      default:
        navigate('/dashboard');
        break;
    }
  };

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>

            <Link to='/' className='flex items-center gap-2'>
              <img src={logo} alt='logo' width='100' height='60' />
              <span className='font-bold text-xl hidden md:block'>LocalChefBazaar</span>
            </Link>

            <div className='hidden md:flex items-center gap-6 font-semibold'>
              <NavLink to='/' className={({ isActive }) => isActive ? 'text-lime-600' : 'hover:text-lime-600'}>Home</NavLink>
              <NavLink to='/meals' className={({ isActive }) => isActive ? 'text-lime-600' : 'hover:text-lime-600'}>Meals</NavLink>
              {user && <button onClick={handleDashboardClick} className='hover:text-lime-600 font-semibold'>Dashboard</button>}
            </div>

            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link to='/' className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'>Home</Link>
                    <Link to='/meals' className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'>Meals</Link>

                    {user ? (
                      <>
                        <div onClick={handleDashboardClick} className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'>Dashboard</div>
                        <div onClick={logOut} className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'>Logout</div>
                      </>
                    ) : (
                      <>
                        <Link to='/login' className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>Login</Link>
                        <Link to='/signup' className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>Sign Up</Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
