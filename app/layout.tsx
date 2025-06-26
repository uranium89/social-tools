import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navigation from './components/Navigation'

export const metadata = {
  title: 'Social Tools - Công cụ Chia sẻ Mạng Xã hội',
  description: 'Tạo và chia sẻ nội dung trên các nền tảng mạng xã hội một cách thông minh',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="h-full">
      <body className="h-full bg-gray-50 font-vietnamese">
        <div className="min-h-full">
          <Navigation />
          <main>
            {children}
          </main>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}
