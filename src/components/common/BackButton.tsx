import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

const BackButton = ({ to, label = "Back", className = "" }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 hover:underline transition-colors duration-200 ${className}`}
    >
      <ArrowLeftIcon className="w-4 h-4 mr-1" />
      {label}
    </button>
  );
};

export default BackButton; 