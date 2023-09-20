
import Layout from '../layout/Layout'
import Head from '../components/Head'
import { FiMail, FiMapPin, FiPhoneCall } from 'react-icons/fi'

function ContactUs() {
  const ContactData = [
    {
      _id:1,
      title:'Email us',
      info:'Lorem Ipsum is simp Lorem Ipsum dummy text ever since the 1500 type It hc typesetting, remaining essentially unchanged with the release of Letraset sheets containing Lorem Ipsum passages, and more recently wit Aldusf Lorem Ipsum.',
      icon:FiMail,
      contact:"Filmplus@gmail.com",
    },
    {
      _id:2,
      title:'Call us',
      info:'Lorem Ipsum is sime 1500s, electronic typesetting th the release of Letraset sheets containing Lorem Ipsum passages, and ing software like Aldus PageMaker including versions of Lorem Ipsum.',
      icon:FiPhoneCall,
      contact:"+123 456 7890",
    },
    {
      _id:3,
      title:'Location',
      info:'Lorem Ipsum is sime 1500s,  of type t only five centuries, electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, rsions of Lorem Ipsum.',
      icon:FiMapPin,
      contact:"+123 456 7890",
    }
  ]
  return (
    <Layout>
     <div className='min-height-screen container mx-auto px-2 my-6'>
      <Head title='About Us'/>
      <div className='grid mg:grid-cols-2 gap-6 lg:my-20 my-10 lg:grid-cols-3 xl:gap-8'>
       {
        ContactData.map((item) =>(
          <div key={item._id} className='border border-boarder flex-colo p-10 bg-dry rounded-lg text-center'>
            <span className='flex-colo w-20 h-20 mb-4 rounded-full bg-main text-subMain text-2xl'>
              <item.icon/>
            </span>
            <h5 className='text-xl font-semibold mb-2'>{item.title}</h5>
            <p className='mb-0 text-sm text-text leading-7'>
              <a href={`mailto:${item.contact}`} className='text-blue-600'>{item.contact}</a>
            {' '}
            {item.info}
            </p>
          </div>
        ))
       }
      </div>
     </div>

    </Layout>
  )
}

export default ContactUs