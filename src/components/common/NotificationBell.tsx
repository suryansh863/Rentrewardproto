import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { BellIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useNotifications, useOwnerData } from '../../contexts';
import type { Notification } from '../../types';

const NotificationBell = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification } = useNotifications();
  const { acknowledgeRent } = useOwnerData();
  const [isOpen, setIsOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Handle payment approval
  const handleApprovePayment = (notification: Notification, e: React.MouseEvent) => {
    e.stopPropagation();
    if (notification.type === 'rent_payment' && notification.tenantId && notification.rentId) {
      acknowledgeRent(notification.tenantId, notification.rentId);
      markAsRead(notification.id);
    }
  };

  // Update button position when dropdown opens
  useEffect(() => {
    const updatePosition = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const isMobile = window.innerWidth < 768; // md breakpoint
        
        if (isMobile) {
          // Mobile: Center dropdown and add proper spacing
          setButtonPosition({
            top: rect.bottom + 8,
            right: 16, // Fixed right margin for mobile
          });
        } else {
          // Desktop: Align to button
          setButtonPosition({
            top: rect.bottom + 8,
            right: window.innerWidth - rect.right
          });
        }
      }
    };

    updatePosition();

    // Listen for window resize to recalculate position
    window.addEventListener('resize', updatePosition);
    window.addEventListener('orientationchange', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('orientationchange', updatePosition);
    };
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && 
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'rent_payment':
        return '💰';
      case 'new_tenant':
        return '👤';
      default:
        return '📢';
    }
  };

  return (
    <div 
      className="relative isolate" 
      ref={dropdownRef}
      style={{ zIndex: 1000000 }}
    >
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        ref={buttonRef}
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown rendered in portal */}
      {isOpen && createPortal(
        <>
          {/* Backdrop without blur */}
          <div 
            className="notification-backdrop fixed inset-0 bg-transparent" 
            onClick={() => setIsOpen(false)}
            style={{ zIndex: 999998 }}
          />
          {/* Dropdown Content */}
          <div 
            ref={dropdownRef}
            className="notification-dropdown fixed w-80 sm:w-80 max-w-[calc(100vw-32px)] bg-gray-900 rounded-xl shadow-2xl border border-gray-600 max-h-96 overflow-hidden"
            style={{ 
              zIndex: 999999,
              top: buttonPosition.top,
              right: buttonPosition.right,
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            }}
          >
            {/* Header */}
            <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-700 flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 font-medium transition-colors px-2 py-1 rounded hover:bg-gray-700"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 sm:max-h-80 max-h-[70vh] overflow-y-auto bg-gray-900">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`px-3 sm:px-4 py-3 sm:py-3 border-b border-gray-700 hover:bg-gray-800 transition-colors ${
                      !notification.isRead ? 'bg-gray-800' : 'bg-gray-900'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div 
                        className="flex items-start flex-1 cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <span className="text-xl sm:text-2xl mr-2 sm:mr-3 mt-1">{getNotificationIcon(notification.type)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium truncate ${
                              !notification.isRead 
                                ? 'text-white' 
                                : 'text-gray-300'
                            }`}>
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-indigo-400 rounded-full ml-2 flex-shrink-0"></div>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTime(notification.timestamp)}
                          </p>
                          
                          {/* Approve Payment Button for rent_payment notifications */}
                          {notification.type === 'rent_payment' && notification.tenantId && notification.rentId && (
                            <div className="mt-2 flex items-center space-x-2">
                              <button
                                onClick={(e) => handleApprovePayment(notification, e)}
                                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
                              >
                                <CheckIcon className="w-3 h-3 mr-1" />
                                Approve Payment
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeNotification(notification.id);
                        }}
                        className="ml-2 text-gray-500 hover:text-gray-300 flex-shrink-0 transition-colors p-1 rounded-full hover:bg-gray-700"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-3 sm:px-4 py-6 sm:py-8 text-center bg-gray-900">
                  <BellIcon className="w-10 sm:w-12 h-10 sm:h-12 mx-auto text-gray-600 mb-3" />
                  <p className="text-sm sm:text-base text-gray-400">No notifications yet</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    You'll see rent payments and other updates here
                  </p>
                </div>
              )}
            </div>
          </div>
        </>,
        document.body
      )}
    </div>
  );
};

export default NotificationBell;