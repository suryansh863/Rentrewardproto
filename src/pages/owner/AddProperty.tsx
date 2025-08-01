import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOwnerData } from '../../contexts';
import { BuildingOfficeIcon, CameraIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';

const AddProperty = () => {
  const { addProperty } = useOwnerData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    units: '',
    occupiedUnits: ''
  });
  const [propertyImage, setPropertyImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageCapture = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPropertyImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageCapture(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageCapture(file);
    }
  };

  const removeImage = () => {
    setPropertyImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!formData.name.trim()) {
      setError('Property name is required');
      setLoading(false);
      return;
    }
    if (!formData.address.trim()) {
      setError('Property address is required');
      setLoading(false);
      return;
    }
    if (!formData.units || Number(formData.units) <= 0) {
      setError('Number of units must be greater than 0');
      setLoading(false);
      return;
    }
    if (Number(formData.occupiedUnits) > Number(formData.units)) {
      setError('Occupied units cannot exceed total units');
      setLoading(false);
      return;
    }

    try {
      addProperty({
        name: formData.name.trim(),
        address: formData.address.trim(),
        units: Number(formData.units),
        occupiedUnits: Number(formData.occupiedUnits) || 0,
      });

      // Redirect to dashboard with success message
      navigate('/owner', { 
        state: { message: `Property "${formData.name}" has been added successfully!` }
      });
    } catch (err) {
      setError('Failed to add property. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <BackButton to="/owner" label="Back to Dashboard" className="mb-4" />
        <div className="flex items-center mb-4">
          <BuildingOfficeIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
          <h1 className="text-3xl font-bold text-primary">Add New Property</h1>
        </div>
        <p className="text-secondary">
          Add a new property to your portfolio and start managing tenants.
        </p>
      </div>

      <div className="card-gradient">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="form-label">
              Property Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Marina Heights, Al Reem Residency"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="form-label">
              Property Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="form-input resize-none"
              placeholder="e.g., Dubai Marina, Dubai, UAE"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="units" className="form-label">
                Total Units *
              </label>
              <input
                type="number"
                id="units"
                name="units"
                value={formData.units}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 10"
                min="1"
                required
              />
            </div>

            <div>
              <label htmlFor="occupiedUnits" className="form-label">
                Currently Occupied Units
              </label>
              <input
                type="number"
                id="occupiedUnits"
                name="occupiedUnits"
                value={formData.occupiedUnits}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., 8"
                min="0"
              />
            </div>
          </div>

          {/* Property Photo Section */}
          <div>
            <label className="form-label">Property Photo</label>
            
            {!propertyImage ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <BuildingOfficeIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Upload Property Photo
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Add a photo of your property to make it more appealing
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="btn-primary flex items-center justify-center"
                    >
                      <CameraIcon className="w-5 h-5 mr-2" />
                      Take Photo
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="btn-secondary flex items-center justify-center"
                    >
                      <PhotoIcon className="w-5 h-5 mr-2" />
                      Choose from Gallery
                    </button>
                  </div>
                </div>

                {/* Hidden file inputs */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCameraCapture}
                  className="hidden"
                />
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={propertyImage}
                    alt="Property"
                    className="w-full h-48 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="btn-secondary flex-1 text-sm"
                  >
                    <CameraIcon className="w-4 h-4 mr-2" />
                    Retake
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary flex-1 text-sm"
                  >
                    <PhotoIcon className="w-4 h-4 mr-2" />
                    Choose Different
                  </button>
                </div>

                {/* Hidden file inputs */}
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCameraCapture}
                  className="hidden"
                />
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>
          
          {error && (
            <div className="error-message">
              <p className="error-text flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/owner')}
              className="btn-secondary flex-1 py-3"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 py-3"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding Property...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                  Add Property
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Property Guidelines */}
      <div className="mt-8 card-gradient">
        <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
          <BuildingOfficeIcon className="w-5 h-5 mr-2" />
          Property Guidelines
        </h3>
        <div className="space-y-3 text-sm text-secondary">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Choose a descriptive name that helps identify the property easily</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Include complete address with city and country for clarity</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>Occupied units can be updated later as you add tenants</p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p>You can add tenants to this property after it's created</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty; 