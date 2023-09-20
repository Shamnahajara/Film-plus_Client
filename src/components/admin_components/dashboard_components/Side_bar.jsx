import { useState } from "react";
import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react';
import { PowerIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogout } from '../../../store/slice/admin';
import { TfiAngleDoubleLeft } from 'react-icons/tfi';

import { FaBars, FaUsersCog } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';


export function Side_bar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(true);

  return (
    <div className='lg:w-1/3'>
      {show ? (
        <FaBars
          className="absolute lg:hidden ms-1 mt-5 cursor-pointer text-primary"
          onClick={() => setShow(false)}
          size={20}
        />
      ) : (
        ''
      )}
      <div
        className={`${
          show ? '' : 'fixed w-screen h-screen'
        } lg:static lg:w-0 lg:h-0`}
      >
        <Card
          style={{ position: 'fixed', background: '#2c3e50' }}
          className={`lg:flex z-auto ${
            show ? 'hidden' : 'flex w-screen bg-opacity-70 backdrop-blur-[2px]'
          } top-4 left-4 h-screen ease-in-out duration-500 w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5`}
        >
          <div className=''>
            {show ? (
              ''
            ) : (
              <TfiAngleDoubleLeft
                className="ms-5 lg:hidden mt-5 cursor-pointer text-primary"
                onClick={() => setShow(true)}
                size={20}
              />
            )}
          </div>

          <List>
            <ListItem
              className={`hover:scale-105 transition-transform cursor-pointer text-white`}
              onClick={() => navigate('/admin')}
            >
              <ListItemPrefix>
                <AiFillHome className="h-5 w-5 me-2" />
              </ListItemPrefix>
              Home
            </ListItem>
           
            <ListItem
              className='hover:scale-105 transition-transform cursor-pointer text-white'
              onClick={() => navigate('/admin/users')}
            >
              <ListItemPrefix>
                <FaUsersCog className="h-5 w-5 me-2" />
              </ListItemPrefix>
              Users
            </ListItem>

            <ListItem
              className='hover:scale-105 transition-transform cursor-pointer text-white'
              onClick={() => {
                dispatch(adminLogout());
                navigate('/admin/login');
              }}
            >
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 me-2" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </div>
    </div>
  );
}

export default Side_bar;
