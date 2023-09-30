import MainModal from './MainModal'
import axios from 'axios';
import { useState } from 'react';
import {toast} from 'react-hot-toast'
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';



function RentFormModal({modalOpen, setModalOpen,Product}) {

    
    const [latitude,setLatitude] = useState(0)
    const [longitude,setLongitude] =useState(0)
    const [suggetion,setSuggetion] = useState(false)
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [location ,setLocation] = useState('')
    const [rentFrom, setRentFrom] = useState('')
    const [rentTo, setRentTo] = useState('')
    const [idProof,setIdproof] = useState('')
    const {userId} = useSelector((state)=>state.User)


    const handleBooking = async (productId) => {

        if (new Date() >= new Date(rentFrom) || rentFrom == rentTo || new Date() >= new Date(rentTo) || rentFrom == undefined || rentTo == undefined) {
          toast.error("Enter correct dates")
        } else {
          axiosInstance.post('/user/create-checkout-session', {userId, productId, rentFrom, rentTo,location,idProof }).then((res) => {
            if (res.data.url) {
              window.location.href = res.data.url
            }
          }).catch((err) => {
            if (err.response.data.errMsg) {
              toast.error(err.response.data.errMsg)
            }
          })
        }
      }

      function isValidImage(logo) {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();
        return validExtensions.includes(extension);
    }

    const handleImageChange = (img) => {
        if (isValidImage(img.target.files[0].name)) {
            let reader = new FileReader()
            reader.readAsDataURL(img.target.files[0])
            reader.onload = () => {
                setIdproof(reader.result)
            }
            reader.onerror = (err) => {
                console.log(err);
            }
        } else {
            toast.error('Add valid image')
        }
    };


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
        <h2 className='text-xl font-bold '>Rent Details</h2>
        <div className='w-full grid md:grid-cols-2 gap-6'>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Rent From</label>
        <input onChange={(e)=>setRentFrom(e.target.value)} required type='date' placeholder='' className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        </div>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Rent To</label>
        <input onChange={(e)=>setRentTo(e.target.value)} required type='date' placeholder='' className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        </div>
        </div>
        <div className='w-full grid md:grid-cols-2 gap-6'>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Delivery location</label>
        <input       
           onChange={(e) => {
            setSuggetion(true)
            setLocation(e.target.value);
            handleLocationSuggestion(e.target.value); // Fetch suggestions as the user types
        }}
           required type='text'
           placeholder='select location'
           value={location}
           className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        {/* Display location suggestions */}
        <ul className='absolute z-0 mt-2 w-60 bg-main border border-border rounded-lg shadow-lg'>
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

                        <div className="form-control w-full max-w-xs">
  <label className="label mt-2">
    <span className="label-text  text-white font-semibold">upload any id proof</span>
  </label>
  <input type="file" accept=".jpg,.jpeg,.png" id="file" onChange={handleImageChange} className="file-input file-input-bordered w-full max-w-xs" />
  
</div>
        </div>
        
        </div>

        <div className='flex justify-end items-center my-4'>
        <button onClick={()=>{
          handleBooking(Product._id)
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

export default RentFormModal