import { FaHeart, FaListAlt, FaUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { HiViewGridAdd } from 'react-icons/hi'
import { BiAddToQueue } from 'react-icons/bi'
import { MdRateReview } from 'react-icons/md'
import Layout from '../../layout/Layout'
import { NavLink } from 'react-router-dom'


function SideBar({ children }) {
    const sideLinks = [

        {
            name: "Profile",
            link: "/profile",
            icon: FaUser
        },
        {
            name: "Products Lists",
            link: "/productlists",
            icon: FaListAlt
        },
        {
            name: "Add Product",
            link: "/addproduct",
            icon: BiAddToQueue
        },
        {
            name: "Rent History",
            link: "/renthistory",
            icon: HiViewGridAdd
        },

        {
            name: "Favorite Movies",
            link: "/favorites",
            icon: FaHeart
        },
        {
            name: "Your Reviews",
            link: "/userreviewlist",
            icon: MdRateReview
        },
        // {
        //     name: "Change Password",
        //     link: "/password",
        //     icon: RiLockPasswordFill
        // }
    ]
    const active = 'bg-dryGray text-subMain'
    const hover = 'hover:text-white hover:bg-main'
    const inActive = 'rounded font-medium text-sm transitions flex gap-3 items-centere p-4'
    const Hover = ({ isActive }) =>
        isActive ? `${active} ${inActive}` : `${inActive} ${hover} `

    return (
        <Layout>
            <div className='min-h-screen container mx-auto px-2 '>
                <div className='xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6'>
                    <div className='col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md '>
                        {
                            sideLinks.map((link, index) => (
                                <NavLink to={link.link} key={index} className={Hover}>
                                    <link.icon /><p>{link.name}</p>
                                </NavLink>
                            ))
                        }
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay='10'
                        data-aos-offset='200'

                        className='col-span-6 rounded-md bg-dry border-gray-800 p-6'>
                        {children}
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default SideBar