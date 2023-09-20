
import Layout from '../layout/Layout'
import Head from '../components/Head'
import aboutImg from '../images/avangers.jpg'


function AboutUs() {
  return (
    <Layout>
    <div className='min-height-screen container mx-auto px-2 my-6'>
     <Head title='About Us'/>
     <div className='xl:py-20 py-10 px-4'>
       <div className='grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16  items-center'>
         <div>
          <h3 className='text-xl lg:text-3xl mb-4 font-semibold'>
           Welcome to our Film Plus
          </h3>
          <div className='mt-3 text-sm leading-8 text-text'>
         <p>Lorem Ipsum is simp Lorem Ipsum dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
         <p>Lorem Ipsum is  software like Aldus PageMaker including versions of Lorem Ipsum.</p>
         <p>Lorem Ipsum is simply dummy text of the the industrys standard s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
       </div>
       <div className='grid md:grid-cols-2 gap-6 xl:gap-6 mt-8'>
         <div className='p-8 bg-dry rounded-lg'>
           <span className='txt-3xl block font-extrabold mt-4 '>10K</span>
           <h4 className='text-lg font-bold mb-1'>Listed Movies</h4>
           <p className='mb-0 text-text leading-7 text-sm '>
           Lorem Ipsum is simply dummy text of the printing and typesetting industry.
           </p>
         </div>
         <div className='p-8 bg-dry rounded-lg'>
           <span className='txt-3xl block font-extrabold mt-4 '>10K</span>
           <h4 className='text-lg font-bold mb-1'>Lovely Users</h4>
           <p className='mb-0 text-text leading-7 text-sm '>
           Lorem Ipsum is simply dummy text 
           </p>
         </div>
       </div>
       </div>
       <div className='mt-10 lg:mt-0'>
         <img src={aboutImg} alt='' className='w-full xl:block hidden h-header rounded-lg object-cover'/>
       </div>
       </div>
     </div>
    </div>

   </Layout>
  )
}

export default AboutUs