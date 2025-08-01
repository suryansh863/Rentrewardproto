import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTenantData } from '../../contexts';
import { CameraIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import BackButton from '../../components/common/BackButton';

const SubmitRent = () => {
  const { tenant, submitRent } = useTenantData();
  const navigate = useNavigate();
  
  const [amount, setAmount] = useState('');
  const [chequeNumber, setChequeNumber] = useState('');
  const [chequeImage, setChequeImage] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  if (!tenant) {
    return <div className="text-center text-red-500">Error loading tenant data</div>;
  }

  const handleImageCapture = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setChequeImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
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
    setChequeImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate input
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    // If no cheque image, cheque number is required
    if (!chequeImage && !chequeNumber) {
      setError('Please either enter a cheque number OR upload a cheque photo');
      return;
    }

    if (!chequeImage) {
      setError('Please upload a photo of your cheque');
      return;
    }

    // Show confirmation modal
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Submit rent with cheque number (use "Photo Attached" if no number provided)
    const finalChequeNumber = chequeNumber || "Photo Attached";
    submitRent(Number(amount), finalChequeNumber);
    
    // Redirect to dashboard
    navigate('/tenant');
  };

  return (
    <div className="space-y-6 p-4">
      <BackButton to="/tenant" label="Back to Dashboard" className="mb-4" />
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">Submit Rent Payment</h2>
        <p className="text-gray-600 dark:text-gray-400">Enter your cheque details manually OR upload a photo of your cheque</p>
      </div>
      
      {/* Rent submission form */}
      <div className="card-gradient">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="form-label">
              Rent Amount (AED)
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="form-input"
              placeholder="Enter rent amount"
              required
            />
          </div>
          
          <div>
            <label htmlFor="chequeNumber" className="form-label">
              Cheque Number {chequeImage && <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">(Optional - visible in photo)</span>}
            </label>
            <input
              type="text"
              id="chequeNumber"
              value={chequeNumber}
              onChange={(e) => setChequeNumber(e.target.value)}
              className="form-input"
              placeholder={chequeImage ? "Optional - cheque number visible in photo" : "Enter cheque number"}
              required={!chequeImage}
            />
            {chequeImage && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Since you've uploaded a photo, the cheque number is optional as it's visible in the image.
              </p>
            )}
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
            <div className="px-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                OR
              </span>
            </div>
            <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          {/* Cheque Photo Section */}
          <div>
            <label className="form-label">Cheque Photo</label>
            
            {!chequeImage ? (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <CameraIcon className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Upload Cheque Photo
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Take a clear photo of your cheque or select from gallery
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
                    src={chequeImage}
                    alt="Cheque"
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
          
          <button type="submit" className="btn-primary w-full py-3 text-lg font-semibold">
            Submit Rent Payment
          </button>
        </form>
      </div>
      
      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CameraIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Confirm Rent Submission</h3>
              <p className="text-gray-600 dark:text-gray-400">Please review your submission details</p>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Amount:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">AED {Number(amount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Cheque Number:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {chequeNumber || <span className="text-gray-500 dark:text-gray-400 italic">Visible in photo</span>}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Submission Date:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{new Date().toLocaleDateString()}</span>
                </div>
                
                {chequeImage && (
                  <div>
                    <span className="text-sm text-gray-600 dark:text-gray-400 block mb-2">Cheque Photo:</span>
                    <img
                      src={chequeImage}
                      alt="Cheque preview"
                      className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="btn-secondary flex-1 py-3"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="btn-primary flex-1 py-3"
              >
                Confirm Submission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitRent; 