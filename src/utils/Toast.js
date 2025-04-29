// FILE: Toast.js
import { toast } from 'sonner';

// Toast configuration object to centralize styles and settings
const TOAST_CONFIG = {
  duration: 3000, // Default duration for all toasts
  position: 'top-center', // Toast position
  styles: {
    success: {
      icon: '✅',
      style: {
        backgroundColor: '#4caf50',
        color: '#fff',
      },
    },
    error: {
      icon: '❌',
      style: {
        backgroundColor: 'white',
        color: '#000',
      },
    },
    info: {
      icon: 'ℹ️',
      style: {
        backgroundColor: '#2196F3',
        color: '#fff',
      },
    },
    default: {
      style: {
        backgroundColor: '#333',
        color: '#fff',
      },
    },
  },
};

/**
 * Displays a toast notification with the specified message and type.
 */
export const showToast = (message, type = 'default') => {
  const { duration, position, styles } = TOAST_CONFIG;
  const toastStyle = styles[type] || styles.default;

  // Dynamically call the appropriate toast method based on the type
  toast(message, {
    duration,
    position,
    icon: toastStyle.icon,
    style: toastStyle.style,
  });
};
