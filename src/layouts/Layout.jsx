import { Outlet, Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import logo from '../assets/svg/logo.svg';
import dashboardIcon from '../assets/svg/dashboardIcon.svg';
import logoutIcon from '../assets/svg/logoutIcon.svg';

// Sidebar data
const SidebarData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: dashboardIcon,
  },
  {
    title: 'Logout',
    path: null, // Changed from '/' to null as we'll handle logout with a function
    icon: logoutIcon,
  },
];

// SideBar List
const SidebarList = ({ title, path, icon, onLogout }) => {
  if (title === 'Logout') {
    return (
      <li className='w-full flex items-center justify-center'>
        <div onClick={onLogout} className='w-1/2 h-28 cursor-pointer'>
          <div className='w-full h-full rounded-md flex items-center justify-center flex-col gap-3 bg-transparant border-2 border-[#0C304A] text-[#0C304A]'>
            <img src={icon} alt={icon} className='w-7' />
            <h1 className='text-lg font-medium text-[#0C304A]'>{title}</h1>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className='w-full flex items-center justify-center'>
      <Link to={path} className='w-1/2 h-28'>
        <div className='w-full h-full rounded-md flex items-center justify-center flex-col gap-3 bg-[#003049] text-white cursor-pointer'>
          <img src={icon} alt={icon} className='w-7' />
          <h1 className='text-lg font-medium text-white'>{title}</h1>
        </div>
      </Link>
    </li>
  );
};

// Layout component
const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from cookies
    Cookies.remove('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className='w-full h-screen flex items-start justify-start'>
      {/* Sidebar */}
      <aside className='w-64 h-full text-primary bg-[#F7F7F7] flex items-center justify-start flex-col py-4 gap-10 border-r border-gray-200'>
        <img src={logo} alt='logo' className='w-[120px]' />
        <nav className='w-full'>
          <ul className='flex items-center justify-start flex-col gap-2 w-full'>
            {SidebarData.map((data, index) => (
              <SidebarList
                key={index}
                title={data.title}
                path={data.path}
                icon={data.icon}
                onLogout={data.title === 'Logout' ? handleLogout : undefined}
              />
            ))}
          </ul>
        </nav>
      </aside>
      <main className='bg-[#F7F7F7] w-[calc(100%-256px)] h-screen overflow-y-auto py-4 px-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
