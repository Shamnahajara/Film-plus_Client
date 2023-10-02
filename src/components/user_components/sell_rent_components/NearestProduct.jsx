import { useEffect,useState } from 'react';
import Titles from '../../../components/Titles'
import { BsCaretLeft, BsCaretRight} from 'react-icons/bs'
import { HiLocationMarker } from 'react-icons/hi';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation,Autoplay} from 'swiper/modules'
import {BsFillCartPlusFill } from 'react-icons/bs'
import {Link} from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'





function  NearestProduct({products,onEditFunction}) {
  const [nextEl ,setNextEl] = useState(null)
  const [prevEl ,setPrevEl] = useState(null)
  const classNames = 'hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white'


  const [location ,setLocation] = useState('')
  const [latitude,setLatitude] = useState(0)
  const [longitude,setLongitude] =useState(0)
  const [suggestion, setSuggestion] = useState(false); 
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

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


      // Function to calculate distance between two sets of coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      const filtered = products.filter((product) => {
        const distance = calculateDistance(latitude, longitude, product.latitude, product.longitude);
        return distance <= 100; // You can change the distance threshold as needed
      });
  
      setFilteredProducts(filtered);
    }
  }, [latitude, longitude, products]);
  

  return (
  <>

  
<div className='col-span-3 w-72'>
               <div className='w-full text-sm bg-dryGray rounded flex-btn gap-4'>
                <button type='submit' className='bg-subMain w-12 flex-colo h-12 rounded text-white'>
                <FaSearch/>
                </button>
                <input 
                onChange={(e) => {
                  const inputLocation = e.target.value;
                  setSuggestion(inputLocation.trim() !== ''); 
                  setLocation(inputLocation);
                  handleLocationSuggestion(inputLocation); 
                }}
                
                 value = {location}
                 type='text'
                 placeholder='Find nearest products'
                 className='font-medium placeholder:text-boarder text-sm w-11/12 h-12 bg bg-transparent border-none px-2 text-black'/>
            {location && ( 
    <button
      onClick={() => {
        setLocation(''); 
        setLocationSuggestions([]); 
      }}
      className='w-8 h-6 flex-colo bg-subMain text-white rounded-full hover:bg-dry'
    >
      X
    </button>
  )}

    
    
               </div>
               {/* Display location suggestions */}
          <ul className='absolute z-0 mt-2 w-64 bg-main border border-border rounded-lg shadow-lg'>
                     {
                            suggestion && locationSuggestions.map((suggestion) => (
                                <li key={suggestion.id}
                                className="p-2 hover:bg-subMain cursor-pointer"
                                >
                                    {/* Assuming you want to display the place name as a suggestion */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSuggestion(false)
                                            setLocation(suggestion.place_name); 
                                            setLocationSuggestions([]);
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
           <br></br>


  <div className='my-16'>
    <Titles title='Nearest Product' Icon={HiLocationMarker}/>
    <div className='mt-10'>
        <Swiper 
        navigation={{nextEl,prevEl}}
        slidesPerView={4}
        spaceBetween={40}
        autoplay={true}
        speed={1000}
        loop={true}
        modules={[Navigation,Autoplay]}
        breakpoints={{
          0: {
              slidesPerView: 1,
              spaceBetween:10
          },
          768: {
              slidesPerView: 2,
              spaceBetween:20

          },
          1024: {
              slidesPerView: 3,
              spaceBetween:30
          },
          1280: {
              slidesPerView: 4,
              spaceBetween: 40,
          },
      }}
        >


          {filteredProducts && filteredProducts.map((product) => (
              
              <SwiperSlide key={product._id}>
                <div className="p-4 h-rate hovered border border-boarder bg-dry rounded-lg overflow-hidden">
                  <img src={product?.productImage[0]} alt="" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="px-4 gap-6 flex-colo hoveres absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
                  {
                  
                    product.isRented ? <button  className="w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-green-600">
                    Booked
                  </button>:
                   <button onClick={()=>onEditFunction(product)} className="w-12 h-12 flex-colo transitions hover:bg-subMain rounded-full bg-white bg-opacity-30 text-white">
                    <BsFillCartPlusFill />
                  </button>
                  }
                  
                  <Link className="font-semibold text-xl truncated line-clamp-2" to={`/productDetail/${product._id}`}>
                    {product.productName}
                  </Link>
                  <div className="flex gap-2 text-star">
                    <span className="text-center">{product.locationName}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <div className='w-full px-1 flex-rows gap-6 pt-12'>
          <button className={classNames} ref={(node)=> setPrevEl(node)}>
            <BsCaretLeft/>
          </button>
          <button className={classNames} ref={(node)=> setNextEl(node)}>
            <BsCaretRight/>
          </button>
        </div>
    </div>
  </div>
  </>
  )
}

export default NearestProduct