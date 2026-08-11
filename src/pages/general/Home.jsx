import React, { useEffect, useState, useRef } from 'react'
import './Home.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

// const reels = [
//     {
//         id: 1,
//         src: 'https://ik.imagekit.io/ahgtj98vx/0fe7e844-b8ed-4d6b-ac7f-885808b7bc6f_pQcPhonMA.mp4',
//         description: 'Fresh meals delivered hot and ready to your door with exclusive partner discounts.',
//         storeUrl: '/register',
//     },
//     {
//         id: 2,
//         src: 'https://ik.imagekit.io/ahgtj98vx/1d6559b0-754b-4002-b86a-365c11aa1cd6_ini8r9dW6.mp4',
//         description: 'Discover the tastiest spots near you and shop directly from local chefs.',
//         storeUrl: '/register',
//     },
//     {
//         id: 3,
//         src: 'https://ik.imagekit.io/ahgtj98vx/90e149b4-8558-4fae-828e-c676fbd31e7e_ojUVM1MzP.mp4',
//         description: 'Swipe through top-rated food videos, then visit the restaurant to order instantly.',
//         storeUrl: '/register',
//     },

//     {   
//         id: 4,
//         src: 'https://ik.imagekit.io/ahgtj98vx/2c815e6c-7347-4ad1-a551-a17649ca54f4_NV9AXvHmq.mp4', 
//         description: 'Swipe through top-rated food videos, then visit the restaurant to order instantly.',
//         storeUrl: '/register',  
//     }

// ]

const Home = () => {
    const [videos, setVideos] = useState([])
    const videoRefs = useRef([])
    useEffect(() => {
        axios.get('http://localhost:3000/api/food', { withCredentials: true })
            .then((response) => {
                const items = response?.data?.items
                if (Array.isArray(items) && items.length > 0) {
                    // Debug: Log food partner IDs
                    console.log('Food items received:')
                    items.forEach(item => {
                        console.log(`- Video ID: ${item._id}, Food Partner ID: ${item.foodPartner}`)
                    })
                    setVideos(items)
                }
            })
            .catch((error) => {
                console.log('Error fetching food:', error)
            })
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target

                    if (entry.isIntersecting) {
                        videoRefs.current.forEach((otherVideo) => {
                            if (otherVideo && otherVideo !== video) {
                                otherVideo.pause()
                            }
                        })

                        video.play()
                    } else {
                        video.pause()
                    }
                })
            },
            {
                threshold: 0.6
            }
        )

        videoRefs.current.forEach((video) => {
            if (video) observer.observe(video)
        })

        return () => observer.disconnect()
    }, [videos])

    return (
        <main className="reel-page">
            <section className="reel-container">
                {videos.map((item, index) => (
                    <article key={item.id || item._id} className="reel-slide">
                        <video
                            ref={(el) => (videoRefs.current[index] = el)}
                            className="reel-video"
                            src={item.src || item.video}
                            
                            muted
                            loop
                            playsInline
                        />
                        <div className="reel-overlay">
                            <p className="reel-description">{item.description}</p>
                            <Link
                                className="reel-button"
                                to={
                                    item.foodPartner
                                        ? `/food-partner/${typeof item.foodPartner === 'object' ? item.foodPartner._id : item.foodPartner}`
                                        : "/register"
                                }
                            >
                                Visit Store
                            </Link>
                        </div>
                    </article>
                ))}
            </section>
        </main>
    )
}

export default Home
