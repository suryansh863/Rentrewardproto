import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useOwnerData } from '../../contexts';
import { UserIcon, CameraIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';

const EditTenant = () => {
  const { tenantId } = useParams<{ tenantId: string }>();
  const { editTenant, ownerProperties, propertyTenants } = useOwnerData();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: 'password123', // Default password for demo
    phone: '',
    propertyId: '',
    unitNumber: ''
  });
  const [tenantPhoto, setTenantPhoto] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Find the tenant to edit
  const tenant = tenantId ? Object.values(propertyTenants).flat().find(t => t.id === tenantId) : null;

  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant.name,
        email: tenant.email,
        password: tenant.password,
        phone: tenant.phone,
        propertyId: tenant.propertyId,
        unitNumber: tenant.unitNumber
      });
      // Note: In a real app, you'd load the tenant photo from storage
    } else if (tenantId) {
      // Tenant not found, redirect back
      navigate('/owner');
    }
  }, [tenant, tenantId, navigate]);

  const handleImageCapture = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setTenantPhoto(e.target?.result as string);
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
    setTenantPhoto(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      setError('Tenant name is required');
      setLoading(false);
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!formData.phone.trim()) {
      setError('Phone number is required');
      setLoading(false);
      return;
    }

    if (!formData.propertyId) {
      setError('Please select a property');
      setLoading(false);
      return;
    }

    if (!formData.unitNumber.trim()) {
      setError('Unit number is required');
      setLoading(false);
      return;
    }

    try {
      if (tenantId) {
        editTenant(tenantId, {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          phone: formData.phone.trim(),
          propertyId: formData.propertyId,
          unitNumber: formData.unitNumber.trim(),
        });
        navigate(`/owner/tenant/${tenantId}`, { 
          state: { message: `Tenant "${formData.name}" has been updated successfully!` }
        });
      }
    } catch (err) {
      setError('Failed to update tenant. Please try again.');
      setLoading(false);
    }
  };

  const selectedProperty = ownerProperties.find(p => p.id === formData.propertyId);

  if (!tenant) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Tenant Not Found</h1>
          <p className="text-gray-600 mt-2">The tenant you're trying to edit doesn't exist.</p>
          <button 
            onClick={() => navigate('/owner')}
            className="btn-primary mt-4"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <BackButton to={`/owner/tenant/${tenantId}`} label="Back to Tenant" className="mb-4" />
        <div className="flex items-center mb-4">
          <UserIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mr-3" />
          <h1 className="text-3xl font-bold text-primary">Edit Tenant</h1>
        </div>
        <p className="text-secondary">
          Update the information for "{tenant.name}".
        </p>
      </div>

      <div className="card-gradient">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., John Smith"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="form-label">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., +971 50 123 4567"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Login password"
              />
            </div>
          </div>

          <div>
            <label htmlFor="propertyId" className="form-label">
              Property *
            </label>
            <select
              id="propertyId"
              name="propertyId"
              value={formData.propertyId}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select a property</option>
              {ownerProperties.map(property => (
                <option key={property.id} value={property.id}>
                  {property.name} - {property.address}
                </option>
              ))}
            </select>
            {ownerProperties.length === 0 && (
              <p className="text-sm text-secondary mt-1">
                You need to add a property first before editing tenants.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="unitNumber" className="form-label">
              Unit Number *
            </label>
            <input
              type="text"
              id="unitNumber"
              name="unitNumber"
              value={formData.unitNumber}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., A-101, 205, Unit 15"
              required
            />
            {selectedProperty && (
              <p className="text-sm text-secondary mt-1">
                Property has {selectedProperty.units} total units, {selectedProperty.occupiedUnits} currently occupied
              </p>
            )}
          </div>

          {/* Tenant Photo Section */}
          <div>
            <label className="form-label">Tenant Photo</label>
            
            {!tenantPhoto ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <UserIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Upload Tenant Photo
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Add or update the profile photo for the tenant (optional)
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
                  capture="user"
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
                    src={tenantPhoto}
                    alt="Tenant"
                    className="w-32 h-32 object-cover rounded-full border border-gray-200 dark:border-gray-700 mx-auto"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    style={{ transform: 'translate(50%, -50%)' }}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex gap-2 justify-center">
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="btn-secondary text-sm"
                  >
                    <CameraIcon className="w-4 h-4 mr-2" />
                    Retake
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary text-sm"
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
                  capture="user"
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

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-blue-500 text-lg">ℹ️</span>
              </div>
              <div className="ml-3">
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">Login Credentials</h4>
                <p className="text-sm text-blue-700 dark:text-blue-400">
                  The tenant can log in using their email address and password. Make sure to share any password changes with them.
                </p>
              </div>
            </div>
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
              onClick={() => navigate(`/owner/tenant/${tenantId}`)} 
              className="btn-secondary flex-1 py-3" 
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary flex-1 py-3" 
              disabled={loading || ownerProperties.length === 0}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Updating Tenant...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <UserIcon className="w-5 h-5 mr-2" />
                  Update Tenant
                </div>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Guidelines */}
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">Tenant Update Guidelines:</h3>
        <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
          <li>• Ensure all contact information is up to date</li>
          <li>• Email address must be unique and valid</li>
          <li>• Unit number should match the actual unit they occupy</li>
          <li>• Adding a photo helps with tenant identification</li>
          <li>• Notify tenants of any password changes</li>
        </ul>
      </div>
    </div>
  );
};

export default EditTenant; 