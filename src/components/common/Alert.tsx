import type { ReactNode } from 'react';
import { 
  ExclamationTriangleIcon, 
  XCircleIcon, 
  CheckCircleIcon, 
  InformationCircleIcon 
} from '@heroicons/react/24/outline';

interface AlertProps {
  type: 'error' | 'warning' | 'success' | 'info';
  title?: string;
  children: ReactNode;
  onDismiss?: () => void;
}

const Alert = ({ type, title, children, onDismiss }: AlertProps) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return <XCircleIcon className="w-5 h-5" />;
      case 'warning':
        return <ExclamationTriangleIcon className="w-5 h-5" />;
      case 'success':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'info':
        return <InformationCircleIcon className="w-5 h-5" />;
      default:
        return <InformationCircleIcon className="w-5 h-5" />;
    }
  };

  const getClasses = () => {
    switch (type) {
      case 'error':
        return 'error-message';
      case 'warning':
        return 'warning-message';
      case 'success':
        return 'success-message';
      case 'info':
        return 'info-message';
      default:
        return 'info-message';
    }
  };

  const getTextClasses = () => {
    switch (type) {
      case 'error':
        return 'error-text';
      case 'warning':
        return 'warning-text';
      case 'success':
        return 'success-text';
      case 'info':
        return 'info-text';
      default:
        return 'info-text';
    }
  };

  return (
    <div className={`${getClasses()} relative`}>
      <div className="flex items-start">
        <div className={`flex-shrink-0 ${getTextClasses()}`}>
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-bold ${getTextClasses()} mb-1`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${getTextClasses()}`}>
            {children}
          </div>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={`ml-auto flex-shrink-0 ${getTextClasses()} hover:opacity-75 transition-opacity`}
          >
            <XCircleIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert; 