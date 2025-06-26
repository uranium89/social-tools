declare module 'react-hot-toast' {
  export interface ToastOptions {
    duration?: number
    style?: React.CSSProperties
    className?: string
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  }

  export interface ToasterProps {
    position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
    toastOptions?: ToastOptions
  }

  interface Toast {
    (message: string, options?: ToastOptions): void
    success(message: string, options?: ToastOptions): void
    error(message: string, options?: ToastOptions): void
    loading(message: string, options?: ToastOptions): void
  }

  export const toast: Toast
  export const Toaster: React.FC<ToasterProps>
}
