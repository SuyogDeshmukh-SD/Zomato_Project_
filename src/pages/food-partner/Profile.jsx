import React, { useState, useEffect } from 'react'
import './profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const [videos, setVideos] = useState([])
    const { id } = useParams() // Get the profile parameter from the URL
    const [profile, setProfile] = useState({
        name: '',
        address: '',
        image: '',
        totalMeals: 0,
        customersServed: '0',
        contactName: ''
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!id) {
            setError('No food partner ID provided')
            setLoading(false)
            return
        }

        // Create cancel tokens to prevent race conditions
        const profileCancelSource = axios.CancelToken.source()
        const videosCancelSource = axios.CancelToken.source()

        // Clear videos when ID changes to prevent showing old food partner's videos
        setVideos([])

        // Fetch profile data based on the ID from the URL
        console.log('Fetching profile for ID:', id)

        // Set a timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
            setError('Request timeout - server not responding')
            setLoading(false)
            profileCancelSource.cancel('Request timeout')
            videosCancelSource.cancel('Request timeout')
        }, 10000)

        axios.get(`http://localhost:3000/api/food-partner/${id}`, {
            withCredentials: true,
            cancelToken: profileCancelSource.token
        })
            .then((response) => {
                clearTimeout(timeoutId)
                console.log('Profile data received:', response.data)

                const foodPartnerData = response.data.foodPartner || response.data.data || response.data

                if (foodPartnerData) {
                    setProfile(foodPartnerData)
                    console.log('Setting profile:', foodPartnerData)
                } else {
                    console.warn('No foodPartner data found in response')
                }

                setLoading(false)
            })
            .catch((error) => {
                clearTimeout(timeoutId)
                if (axios.isCancel(error)) {
                    console.log('Profile request cancelled')
                    return
                }
                console.error('Error fetching profile data:', error)
                console.error('Response status:', error.response?.status)
                console.error('Response data:', error.response?.data)
                console.error('Error message:', error.message)

                // Check if it's an authentication error
                if (error.response?.status === 401) {
                    setError('Not authenticated. Please log in as a user to view restaurant profiles.')
                } else if (error.response?.status === 403) {
                    setError('Access denied. You do not have permission to view this profile.')
                } else if (error.response?.status === 404) {
                    setError(`Restaurant not found (ID: ${id}). The restaurant may have been deleted or the ID is invalid.`)
                } else {
                    setError(`Error: ${error.message}`)
                }

                setLoading(false)
            })

        // Fetch videos for this food partner
        axios.get(`http://localhost:3000/api/food?foodPartner=${id}`, {
            withCredentials: true,
            cancelToken: videosCancelSource.token
        })
            .then((response) => {
                console.log('Videos data received:', response.data)
                const items = response.data.items || []
                // Only set videos if they belong to the current food partner ID
                setVideos(items.filter(video => video.foodPartner === id || video.foodPartner?._id === id))
            })
            .catch((error) => {
                if (axios.isCancel(error)) {
                    console.log('Videos request cancelled')
                    return
                }
                console.error('Error fetching videos:', error)
                setVideos([])
            })

        return () => {
            clearTimeout(timeoutId)
            profileCancelSource.cancel('Component unmounted')
            videosCancelSource.cancel('Component unmounted')
        }

    }, [id])

    // const [restaurantData] = useState({
    //     name: 'Restaurant Name',
    //     address: '123 Food Street, City',
    //     image: 'https://via.placeholder.com/150',
    //     totalMeals: 43,
    //     customersServed: '15K'
    // })



    return (
        <div className="profile-container">
            {loading && <div className="loading">Loading profile...</div>}
            {error && <div className="error">Error: {error}</div>}
            {!loading && !error && (
                <>
                    {/* Restaurant Info Section */}
                    <div className="restaurant-header">
                        <div className="restaurant-image-wrapper">
                            <img
                                src={profile.image || 'https://imgs.search.brave.com/zVUWGO9ANwK_bnyl5dCuUbEJmqjZ9_PV9kn72d_BX-g/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z2VlZGVzay5jb20v/YmxvZy93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wNS9ob3Rl/bF9ndWVzdHNfcHJv/ZmlsZXMud2VicA'}
                                alt={profile.contactName || 'Restaurant'}
                                className="restaurant-image"
                            />
                        </div>

                        <div className="restaurant-info">
                            <input
                                type="text"
                                className="restaurant-input restaurant-name"
                                defaultValue={profile.name || ''}
                                placeholder="Business Name"
                                readOnly
                            />
                            <input
                                type="text"
                                className="restaurant-input restaurant-address"
                                defaultValue={profile.address || ''}
                                placeholder="Address"
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="restaurant-stats">
                        <div className="stat-box">
                            <label className="stat-label">total meals</label>
                            <span className="stat-value">{videos?.length || 0}</span>
                        </div>
                        <div className="stat-box">
                            <label className="stat-label">customer serve</label>
                            <span className="stat-value">{Math.floor(Math.random() * 100) + 1 + "k" || '0'}</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="divider"></div>

                    {/* Videos Grid Section */}
                    <div className="videos-section">
                        <h3 className="videos-title">Restaurant Videos</h3>
                        <div className="videos-grid">
                            {videos && videos.length > 0 ? (
                                videos.map((video) => (
                                    <div key={video._id || video.id} className="video-card">
                                        <video
                                            className="video-thumbnail"
                                            src={video.video}
                                            type="video/mp4"
                                            controls
                                            autoPlay
                                        />
                                        <div className="video-label">{video.name || 'video'}</div>
                                    </div>
                                ))
                            ) : (
                                <p className="no-videos">No videos available</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Profile

