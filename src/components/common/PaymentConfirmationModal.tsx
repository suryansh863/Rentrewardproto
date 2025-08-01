import { useState } from 'react';
import { CheckIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import type { Tenant, RentRecord } from '../../types';

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  tenant: Tenant;
  rentRecord: RentRecord;
  propertyName: string;
}

const PaymentConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  tenant,
  rentRecord,
  propertyName
}: PaymentConfirmationModalProps) => {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsConfirming(true);
    try {
      onConfirm();
      onClose();
    } catch (error) {
      console.error('Error confirming payment:', error);
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CurrencyDollarIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Confirm Rent Payment
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Please review and confirm this rent payment
          </p>
        </div>

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
                <span className="font-medium text-gray-900 dark:text-gray-100">{propertyName}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block">Unit</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{tenant.unitNumber}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block">Month</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{rentRecord.month}</span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block">Amount</span>
                <span className="font-medium text-green-600 dark:text-green-400 text-lg">
                  AED {rentRecord.amount.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500 dark:text-gray-400 block">Payment Method</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 capitalize">
                  {rentRecord.paymentMethod}
                  {rentRecord.chequeNumber && ` (#${rentRecord.chequeNumber})`}
                </span>
              </div>
            </div>
          </div>

          {rentRecord.submissionDate && (
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              Submitted on {new Date(rentRecord.submissionDate).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isConfirming}
            className="btn-secondary flex-1 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirming}
            className="btn bg-green-500 hover:bg-green-600 text-white flex-1 py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConfirming ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <CheckIcon className="w-5 h-5 mr-2" />
                Confirm Payment
              </>
            )}
          </button>
        </div>

        {/* Notice */}
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
            💡 Once confirmed, the tenant will earn reward points and the payment status will be updated to "Received"
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationModal;