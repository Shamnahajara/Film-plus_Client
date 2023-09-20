import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    const Links = [
        {
            title: 'Company',
            links: [
                {
                    name: 'Home',
                    link: '/',
                },
                {
                    name: 'AboutUs',
                    link: '/aboutUs',
                },
                {
                    name: 'contactUs',
                    link: '/contactUs',
                },
                {
                    name: 'movies',
                    link: '/movies',
                },
            ],
        },
        {
            title: 'Top-categories',
            links: [
                {
                    name: 'Action', // Changed from 'title'
                    link: '#',
                },
                {
                    name: 'Romantic', // Changed from 'title'
                    link: '#',
                },
                {
                    name: 'Horror', // Changed from 'title'
                    link: '#',
                },
                {
                    name: 'Drama', // Changed from 'title'
                    link: '#',
                },
                {
                    name: 'Historical', // Changed from 'title'
                    link: '#',
                },
            ],
        },
        {
            title: 'My Account',
            links: [
                {
                    name: 'Dashboard', // Changed from 'title'
                    link: '/dashboard',
                },
                {
                    name: 'My favorite', // Changed from 'title'
                    link: '/favorite',
                },
                {
                    name: 'Profile', // Changed from 'title'
                    link: '/profile',
                },
                {
                    name: 'Change pasword', // Changed from 'title'
                    link: '/password',
                },
            ],
        },
    ];

    return (
        <div className="bg-dry py-4 border-t-2 border-black">
            <div className="container mx-auto px-2">
                <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 justify-between">
                    {Links.map((link, index) => (
                        <div key={index} className="col-span-2 md:col-span-2 lg:col-span-3 pb-3.5 sm:pb-0">
                            <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
                                {link.title}
                            </h3>
                            <ul className="text-sm flex flex-col space-y-3">
                                {link.links.map((text, index) => (
                                    <li key={index} className="flex items-baseline">
                                        <Link to={text.link} className="text-border inline-block w-full hover:text-subMain">
                                            {text.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className='pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3'>
                        <Link to='/'>
                            <p className='w-2/4 object-contain h-12 text-lg text-subMain '>FILM-PLUS</p>
                        </Link>
                        <p className='leading-7 text-sm text-boarder mt-3 '>
                            <span>
                            Lorem Ipsum is simply <br /> electronic typesetting
                            </span>  
                            <br/>
                            <span>remaining essentially unchanged.</span>
                            <br />
                            <span>email:shamnahajara@gmail.com</span>
                            
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
