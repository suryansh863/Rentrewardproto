import { useTheme } from '../../contexts';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { key: 'light', label: 'Light', icon: SunIcon },
    { key: 'dark', label: 'Dark', icon: MoonIcon },
    { key: 'system', label: 'System', icon: ComputerDesktopIcon },
  ] as const;

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      {themes.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          className={`flex items-center justify-center p-2 rounded-md transition-all duration-200 ${
            theme === key
              ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-700/50'
          }`}
          title={`Switch to ${label} theme`}
        >
          <Icon className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle; 