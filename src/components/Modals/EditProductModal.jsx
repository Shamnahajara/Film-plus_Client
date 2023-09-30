import MainModal from './MainModal'
import axios from 'axios';
import axiosInstance from '../../api/axios';
import { useState } from 'react';
import {toast} from 'react-hot-toast'



function EditProductModal({modalOpen, setModalOpen,Product}) {

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

    

    const handleSubmit = (productId)=>{
        if(latitude == 0 || longitude == 0|| productName.trim().length == 0 || price == 0|| description.trim().length == 0 ||images.length ==0){
            toast.error('Please fill all the details')
        }else{
            console.log('ingatt varind')
            console.log(productId)
            axiosInstance.patch('/user/editproduct',{productId,location,latitude,longitude,images,description,productName,price}).then((res)=>{
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
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block sm:w-4/5  rounded-md border border-boarder md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full  bg-main text-white'>
        <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-bold '>Edit Product</h2>
        <div className='w-full grid md:grid-cols-2 gap-6'>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Product name</label>
        <input onChange={(e)=>setProductName(e.target.value)} required type='text' placeholder={Product?.productName} className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        </div>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Price</label>
        <input onChange={(e)=>setPrice(e.target.value)} required type='text' placeholder={Product?.rentPrice} className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        </div>
        </div>
        <div className='w-full grid md:grid-cols-2 gap-6'>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Product Location</label>
        <input       
           onChange={(e) => {
            setSuggetion(true)
            setLocation(e.target.value);
            handleLocationSuggestion(e.target.value); // Fetch suggestions as the user types
        }}
          required type='text'
           placeholder={Product?.locationName}
           value={location}
            className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
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
        
     {/* Description  */}
     <div className='w-full grid md:grid-cols-2 gap-6'>
            {/* images */}
            <div className="text-sm w-full">
            <label className="text-border font-semibold">Product images</label>
            <input required 
                onChange={handleImageChange}
                type="file"
                name="photo"
                acceptedfiles=".jpg,.jpeg,.png"
                id="file"
                multiple
                className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
            </div>
        

            {/* Description  */}
            <div className="text-sm w-full">
            <label className="text-border font-semibold">Description</label>
            <textarea onChange={(e)=>setDescription(e.target.value)} placeholder={Product?.description} className="w-full bg-main h-40 mt-2 px-4 py-2 border border-border rounded " ></textarea>
            </div>
        </div>




        <div className='flex justify-end items-center my-4'>
        <button onClick={()=>{
          handleSubmit(Product._id)
          setModalOpen(false)
        } } className='w-full flex-colo py-4 hover:bg-transparent border-2 border-subMain rounded bg-subMain text-white'>
           Update
        </button>
        </div>

       </div>
       </div>
    </MainModal>
  )
}

export default EditProductModal