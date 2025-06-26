'use client'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export default function LoadingSpinner({ size = 'md', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-primary-500 rounded-full animate-spin`} />
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  )
}
