import { useEffect, useState } from 'react'
import { API_KEY } from '../api/constance';
import axios from 'axios'


function CastDetails() {
    const [actorData, setActorData] = useState(null);

    useEffect(() => {
        // Fetch actor data from the Movie Database API
        axios
            .get(`https://api.themoviedb.org/3/person/5588?api_key=${API_KEY}&language=en-US`)
            .then((response) => {
                setActorData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching actor data:', error);
            });
    }, []);

    console.log(actorData);

    if (!actorData) {
        return <div>Loading...</div>;
    }
    return (
        <>
        <div className="bg-gray-100 p-6">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-center">
              <img
                src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${actorData.profile_path}`}
                alt={actorData.name}
                className="w-24 h-24 rounded-full"
              />
            </div>
            <h1 className="text-2xl font-semibold mt-4">{actorData.name}</h1>
            <p className="text-gray-500 mt-2">{actorData.biography}</p>
            <div className="mt-4">
              {actorData.also_known_as
 && actorData.also_known_as
 .length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold">Known For</h2>
                  <div className="flex mt-2">
                    {actorData.also_known_as
.map((movie, index) => (
                      <div key={index} className="mr-4">
                        <img
                          src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${actorData.profile_path}`}
                          alt={movie.title}
                          className="w-32 h-48 object-cover rounded-lg"
                        />
                        <p className="text-sm mt-2">{movie.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
      
    )
}

export default CastDetails
