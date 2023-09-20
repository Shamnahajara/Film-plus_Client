import SideBar from '../../../screens/dashboard/sidebar'
import Uploader from '../../../components/Uploader'
import product from '../../../images/2c.jpg'
import { useState} from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import axiosInstance from '../../../api/axios'
import { Toaster, toast } from 'react-hot-toast'



function AddProduct() {
    const {userId} = useSelector((state)=>state.User)
    const [location ,setLocation] = useState('')
    const [latitude,setLatitude] = useState(0)
    const [longitude,setLongitude] =useState(0)
    const [productName,setProductName] = useState('')
    const [images,setImages] = useState([])
    const [price,setPrice] = useState(0)
    const [description,setDescription] = useState('')
    const [suggetion,setSuggetion] = useState(false)
    const [locationSuggestions, setLocationSuggestions] = useState([]);


    function isValidImage(logo) {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();
        return validExtensions.includes(extension);
    }


    const handleImageChange = (event) => {
        const files = event.target.files;
        const results = [];

        for (let i = 0; i < files.length; i++) {
            console.log(files[i].name);
            if (isValidImage(files[i].name)) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = () => {
                    results.push(reader.result);
                    if (results.length === files.length) {
                        setImages(results);
                    }
                };

                reader.onerror = (error) => {
                    console.log(error);
                };

                reader.readAsDataURL(file);
            } else {
                toast.error('Add valid image')
                break
            }

        }
    };

    const handleSubmit = ()=>{
        if(latitude == 0 || longitude == 0|| productName.trim().length == 0 || price == 0|| description.trim().length == 0 ||images.length ==0){
            toast.error('Please fill all the details')
        }else{
            console.log('ingatt varind')
            axiosInstance.put('/user/addproduct',{userId,location,latitude,longitude,images,description,productName,price}).then((res)=>{
                toast.success(res.data.message)

            }).catch((err)=>{
                toast.error(err?.res?.data?.errmsg)
            })
        }

    }

    // Function to get location suggestions from Mapbox Geocoding API
    const getLocationSuggestions = async (query) => {
        const MAPBOX_API_KEY = 'pk.eyJ1Ijoieml5YWR1IiwiYSI6ImNsa2tyb3hycjBmMHQza28zY2JyeGE5bXEifQ.uK6EfNoLf37b1K6oFdjFJw';
        const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`;
        const params = {
            access_token: MAPBOX_API_KEY,
            types: 'place,locality,neighborhood', // Limit results to places only
            limit: 5, // Number of suggestions to retrieve
            country:"IN"
        };

        try {
            const response = await axios.get(endpoint, { params });
            return response.data.features;
        } catch (error) {
            console.error('Error fetching location suggestions:', error);
            return [];
        }
    };

    // Function to handle location suggestion selection
    const handleLocationSuggestion = async (query) => {
        // Get location suggestions when the user types
        const suggestions = await getLocationSuggestions(query);
        setLocationSuggestions(suggestions);
    };
    
  return (
    <SideBar>
       
        <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-bold '>Add Product</h2>
        <div className='w-full grid md:grid-cols-2 gap-6'>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Product Name</label>
        <input required type='text' onChange={(e)=>setProductName(e.target.value)} placeholder="enter product name" className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        </div>
        <div className="text-sm w-full ">
        <label className="text-border font-semibold">Price</label>
        <input required type='text' onChange={(e)=>setPrice(e.target.value)}  placeholder="Give rent price" className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        </div>
        </div>
        <div className='w-full grid md:grid-cols-2 gap-6 '>
        <div className="text-sm w-full relative">
        <label className="text-border font-semibold">Product Location</label>
        <input required type='text' 
           onChange={(e) => {
            setSuggetion(true)
            setLocation(e.target.value);
            handleLocationSuggestion(e.target.value); // Fetch suggestions as the user types
        }}
        value = {location}
         placeholder="Location" className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
          {/* Display location suggestions */}
          <ul className='absolute z-0 mt-2 w-full bg-main border border-border rounded-lg shadow-lg'>
               {
                            suggetion && locationSuggestions.map((suggestion) => (
                                <li key={suggestion.id}
                                className="p-2 hover:bg-subMain cursor-pointer"
                                >
                                    {/* Assuming you want to display the place name as a suggestion */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSuggetion(false)
                                            setLocation(suggestion.place_name); // Update the input field with the selected suggestion
                                            setLocationSuggestions([]); // Clear the suggestions list
                                            // Now you can also get the longitude and latitude from suggestion.geometry.coordinates
                                            const [long, lat] = suggestion?.geometry.coordinates;
                                            setLatitude(lat)
                                            setLongitude(long)
                                        }}
                                    >
                                        {suggestion.place_name}
                                    </button>
                                </li>
                            ))}
                        </ul>
        </div>
        </div>

         

    
        <div className='w-full grid md:grid-cols-2 gap-6'>
            {/* images */}
            <div className="text-sm w-full">
            <label className="text-border font-semibold">Product images</label>
            <input required  
                type="file"
                name="photo"
                acceptedfiles=".jpg,.jpeg,.png"
                id="file"
                multiple
                onChange={handleImageChange}  className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
            </div>

            {/* Description  */}
            <div className="text-sm w-full">
            <label className="text-border font-semibold">Description</label>
            <textarea onChange={(e)=>setDescription(e.target.value)} className="w-full bg-main h-40 mt-2 px-4 py-2 border border-border rounded " placeholder='give detail about product'></textarea>
            </div>
        </div>
        <div className='flex justify-end items-center my-4'>
            <button onClick={()=>handleSubmit()} className='bg-subMain font-medium transition hover:bg-main border border-subMain text-white  px-6 py-3 gap-4 rounded-lg w-full sm:w-auto '>
                Update
            </button>
        </div>

       </div>
    </SideBar>
  )
}

export default AddProduct