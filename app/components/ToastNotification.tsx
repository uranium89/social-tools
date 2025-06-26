'use client'

interface ToastNotificationProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export default function ToastNotification({ message, type, onClose }: ToastNotificationProps) {
  const icons = {
    success: '✅',
    error: '❌', 
    info: 'ℹ️'
  }

  const bgColors = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700'
  }

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 border rounded-lg shadow-lg max-w-sm ${bgColors[type]}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{icons[type]}</span>
          <span className="text-sm font-medium">{message}</span>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 text-lg font-bold hover:opacity-70"
        >
          ×
        </button>
      </div>
    </div>
  )
}
