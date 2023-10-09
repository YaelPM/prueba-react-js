import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Clock from '../components/clock';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [catImages, setCatImages] = useState([]);
    const [totalImages, setTotalImages] = useState(0);

    useEffect(() => {
        const apiKey = 'live_yngWPXIwJr7Pbzt4hof7LPMvx9nblLWzY5ibNqmIKSsb3d7udnRHH0gQvAPIoyJ2';
        const headers = {
            'x-api-key': apiKey,
        };

        const fetchMoreCatImages = async () => {
            try {
                if (totalImages < 20) {
                    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=10&page=${Math.ceil(totalImages / 10) + 1}`, { headers });
                    setCatImages(prevImages => [...prevImages, ...response.data]);
                    setTotalImages(totalImages + response.data.length);
                }
            } catch (error) {
                console.error('Error al obtener las imágenes de gatos', error);
            }
        };


        // Llamar a fetchMoreCatImages solo si totalImages es menor que 20
        if (totalImages < 20) {
            fetchMoreCatImages();
        }
    }, [totalImages]);
    const handleLogout = () => {
        navigate("/");
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/Home">
                        Gatitos App
                    </a>
                    <button onClick={handleLogout} className="btn btn-danger ml-auto">
                        Cerrar Sesión
                    </button>
                </div>
            </nav>

            <div className='container'>
                <div>
                    <Clock />
                </div>
                <div className='row'>
                    {catImages.map(catImage => (
                        <div key={catImage.id} className='col-md-4 mb-3'>
                            <img
                                src={catImage.url}
                                alt={`Gato-${catImage.id}`}
                                className='img-fluid'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
