import React, { useState } from 'react'
import './CreateFood.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CreateFood = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    video: null,
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [videoPreview, setVideoPreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        video: file
      }))
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setVideoPreview(previewUrl)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validation
    if (!formData.name.trim()) {
      setError('Food name is required')
      return
    }
    if (!formData.video) {
      setError('Video is required')
      return
    }
    if (!formData.description.trim()) {
      setError('Description is required')
      return
    }

    setLoading(true)

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('video', formData.video)
      data.append('description', formData.description)

      const response = await axios.post(
        'http://localhost:3000/api/food',
        data,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      console.log('Food item created:', response.data)
      setSuccess('Food item created successfully! ✓')

      // Reset form
      setFormData({
        name: '',
        video: null,
        description: ''
      })
      setVideoPreview(null)

      // Clear success message after 3 seconds
   navigate(`/food-partner/${response.data.item.foodPartner}`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      console.error('Error creating food item:', err)
      setError(err.response?.data?.message || 'Failed to create food item. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-food-container">
      <div className="create-food-card">
        <div className="form-header">
          <h2 className="form-title">Create New Food Item</h2>
          <p className="form-subtitle">Add a delicious dish to your restaurant menu</p>
        </div>

        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit} className="create-food-form">
          {/* Food Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Food Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter food item name (e.g., Butter Chicken)"
              className="form-input"
              maxLength="50"
            />
            <span className="char-count">{formData.name.length}/50</span>
          </div>

          {/* Video Upload Field */}
          <div className="form-group">
            <label htmlFor="video" className="form-label">Upload Video</label>
            <div className="video-upload-wrapper">
              <input
                type="file"
                id="video"
                name="video"
                onChange={handleVideoChange}
                accept="video/*"
                className="file-input"
              />
              <label htmlFor="video" className="file-input-label">
                <div className="upload-icon">📹</div>
                <div className="upload-text">
                  <span className="upload-main">Click to upload video</span>
                  <span className="upload-sub">or drag and drop</span>
                </div>
              </label>
            </div>
            {formData.video && (
              <div className="file-info">
                <span className="file-name">✓ {formData.video.name}</span>
                <span className="file-size">({(formData.video.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            )}
            {videoPreview && (
              <div className="video-preview">
                <video
                  src={videoPreview}
                  controls
                  className="preview-video"
                />
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe your food item (ingredients, taste, special features, etc.)"
              className="form-textarea"
              rows="5"
              maxLength="300"
            />
            <span className="char-count">{formData.description.length}/300</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Creating...
              </>
            ) : (
              <>
                <span className="btn-icon">✨</span>
                Create Food Item
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateFood
