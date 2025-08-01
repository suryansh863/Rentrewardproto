import type { ReactNode } from 'react';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';

interface StatusNotificationProps {
  status: 'pending' | 'received' | 'late';
  message: string;
  icon?: ReactNode;
}

const StatusNotification = ({ status, message, icon }: StatusNotificationProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          textColor: 'text-yellow-700 dark:text-yellow-400',
          defaultIcon: <ClockIcon className="w-5 h-5" />
        };
      case 'received':
        return {
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-800',
          textColor: 'text-green-700 dark:text-green-400',
          defaultIcon: <CheckCircleIcon className="w-5 h-5" />
        };
      case 'late':
        return {
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          textColor: 'text-red-700 dark:text-red-400',
          defaultIcon: <XCircleIcon className="w-5 h-5" />
        };
      default:
        return {
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          textColor: 'text-gray-700 dark:text-gray-400',
          defaultIcon: <ClockIcon className="w-5 h-5" />
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-4`}>
      <div className="flex items-center">
        <div className={`${config.textColor} mr-3 flex-shrink-0`}>
          {icon || config.defaultIcon}
        </div>
        <p className={`${config.textColor} text-sm font-medium`}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default StatusNotification; 