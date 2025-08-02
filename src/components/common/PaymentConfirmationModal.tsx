import { useState } from 'react';
import { CheckIcon, CurrencyDollarIcon, DocumentIcon, PhotoIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/outline';
import type { Tenant, RentRecord } from '../../types';

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: Tenant;
  rentRecord: RentRecord;
  onConfirm: () => void;
  propertyName?: string;
}

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({
  isOpen,
  onClose,
  tenant,
  rentRecord,
  onConfirm,
  propertyName
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [expandedImage, setExpandedImage] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      await onConfirm();
    } finally {
      setIsConfirming(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-800">
          <div className="px-4 pt-5 pb-4 bg-white dark:bg-gray-800 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10">
                <CheckIcon className="w-6 h-6 text-green-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
                  Confirm Payment Receipt
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Please review the payment details and cheque image below before confirming receipt.
                  </p>
                </div>
              </div>
            </div>

            {/* Cheque Photo - Moved to the top for prominence */}
            {rentRecord.paymentMethod === 'cheque' && rentRecord.chequePhoto && (
              <div className="mt-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <PhotoIcon className="w-4 h-4 mr-1" />
                    Cheque Image
                  </div>
                  <button
                    onClick={() => setExpandedImage(!expandedImage)}
                    className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center"
                  >
                    <ArrowsPointingOutIcon className="w-4 h-4 mr-1" />
                    {expandedImage ? 'Reduce' : 'Expand'}
                  </button>
                </div>
                <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 p-2 ${expandedImage ? 'h-80' : 'h-48'} transition-all duration-300`}>
                  <img 
                    src={rentRecord.chequePhoto} 
                    alt="Cheque" 
                    className={`w-full h-full object-contain rounded shadow-sm cursor-pointer ${expandedImage ? 'scale-100' : 'hover:scale-105'} transition-transform duration-300`}
                    onClick={() => setExpandedImage(!expandedImage)}
                  />
                </div>
              </div>
            )}

            {/* Payment Details */}
            <div className="space-y-4 mb-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block">Tenant</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{tenant.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block">Property</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {propertyName ? `${propertyName}, ` : ''}Unit {tenant.unitNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block">Month</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{rentRecord.month}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block">Amount</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">AED {rentRecord.amount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block">Payment Method</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{rentRecord.paymentMethod}</span>
                  </div>
                  {rentRecord.paymentMethod === 'cheque' && rentRecord.chequeNumber && (
                    <div>
                      <span className="text-gray-500 dark:text-gray-400 block">Cheque Number</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{rentRecord.chequeNumber}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block">Submission Date</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{rentRecord.submissionDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400 block">Points Earned</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{rentRecord.pointsEarned}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={handleConfirm}
              disabled={isConfirming}
            >
              {isConfirming ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Confirming...
                </div>
              ) : (
                'Confirm Receipt'
              )}
            </button>
            <button
              type="button"
              className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-700"
              onClick={onClose}
              disabled={isConfirming}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationModal;