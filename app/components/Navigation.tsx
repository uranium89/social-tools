'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import ClientOnly from './ClientOnly'

export default function Navigation() {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [hasGeneratedContent, setHasGeneratedContent] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check for generated content only on client side
    const content = localStorage.getItem('socialtools_generated_content')
    setHasGeneratedContent(!!content)

    // Listen for storage changes to update navigation when content is generated
    const handleStorageChange = () => {
      const content = localStorage.getItem('socialtools_generated_content')
      setHasGeneratedContent(!!content)
    }

    window.addEventListener('storage', handleStorageChange)
    
    // Also listen for custom events when localStorage is updated from the same window
    window.addEventListener('socialtools-content-updated', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('socialtools-content-updated', handleStorageChange)
    }
  }, [])

  // Static navigation items that are always present
  const staticNavItems = [
    { path: '/', label: 'Tạo nội dung', icon: '✍️' },
    { path: '/history', label: 'Lịch sử', icon: '📜' },
  ]

  // Dynamic navigation item that depends on client state
  const dynamicNavItem = { path: '/preview', label: 'Xem trước', icon: '👁️' }

  const isActive = (path: string) => pathname === path

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Social Tools</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {/* Static navigation items */}
            {staticNavItems.map((item) => (
              <button
                key={item.path}
                onClick={() => router.push(item.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </button>
            ))}
            
            {/* Dynamic navigation item - only render on client when content exists */}
            <ClientOnly>
              {hasGeneratedContent && (
                <button
                  key={dynamicNavItem.path}
                  onClick={() => router.push(dynamicNavItem.path)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(dynamicNavItem.path)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{dynamicNavItem.icon}</span>
                  {dynamicNavItem.label}
                </button>
              )}
            </ClientOnly>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Mở menu</span>
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Static navigation items */}
              {staticNavItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    router.push(item.path)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              
              {/* Dynamic navigation item - only render on client when content exists */}
              <ClientOnly>
                {hasGeneratedContent && (
                  <button
                    key={dynamicNavItem.path}
                    onClick={() => {
                      router.push(dynamicNavItem.path)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive(dynamicNavItem.path)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-3">{dynamicNavItem.icon}</span>
                    {dynamicNavItem.label}
                  </button>
                )}
              </ClientOnly>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
