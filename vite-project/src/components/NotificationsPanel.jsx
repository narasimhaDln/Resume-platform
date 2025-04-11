import React, { useState } from 'react';
import { useRealtime } from '../context/RealtimeContext';
import { BellIcon, XMarkIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export default function NotificationsPanel() {
  const { notifications, userStatus, isSupabaseConfigured } = useRealtime();
  const [isOpen, setIsOpen] = useState(false);
  
  // Count online users
  const onlineUsers = Object.keys(userStatus).length;
  
  // Calculate notification badge count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isSupabaseConfigured && (
        <div className="absolute bottom-20 right-0 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg shadow-md">
          <div className="flex items-center">
            <InformationCircleIcon className="h-5 w-5 mr-2" />
            <span>Using mock data</span>
          </div>
        </div>
      )}
      
      {/* Active users badge */}
      <div className="absolute right-14 bottom-14 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
        {onlineUsers} online
      </div>
      
      {/* Notification Bell with badge */}
      <button 
        onClick={togglePanel}
        className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-50 transition-all duration-300 relative"
        aria-label="Notifications"
      >
        <BellIcon className="h-6 w-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      
      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 max-h-96 overflow-y-auto bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300">
          <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700">Notifications</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          
          <div className="divide-y divide-gray-200">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 hover:bg-gray-50 transition-colors duration-200 ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium text-gray-900">{notification.title}</h4>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 