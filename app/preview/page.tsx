'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { platforms } from '../config/constants'
import ClientOnly from '../components/ClientOnly'

interface GeneratedContent {
  platform: string
  content: string
  hashtags?: string[]
  characterCount: number
}

export default function PreviewPage() {
  const searchParams = useSearchParams()
  const [contents, setContents] = useState<GeneratedContent[]>([])
  const [selectedPlatform, setSelectedPlatform] = useState<string>('')
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    // Get data from URL params or localStorage
    const dataParam = searchParams.get('data')
    if (dataParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(dataParam))
        setContents(parsed)
        setSelectedPlatform(parsed[0]?.platform || '')
      } catch (error) {
        console.error('Error parsing data:', error)
        // Fallback to localStorage
        loadFromStorage()
      }
    } else {
      loadFromStorage()
    }
  }, [searchParams])

  const loadFromStorage = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('socialtools_generated_content')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          setContents(parsed)
          setSelectedPlatform(parsed[0]?.platform || '')
        } catch (error) {
          console.error('Error loading from storage:', error)
        }
      }
    }
  }

  const handleCopy = async (content: string, index: number) => {
    const selectedContent = contents[index]
    const fullContent = selectedContent.hashtags && selectedContent.hashtags.length > 0 
      ? `${selectedContent.content}\n\n${selectedContent.hashtags.join(' ')}`
      : selectedContent.content

    try {
      await navigator.clipboard.writeText(fullContent)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
      
      // Save to history
      if (typeof window !== 'undefined') {
        const history = JSON.parse(localStorage.getItem('socialtools_history') || '[]')
        const newEntry = {
          id: Date.now().toString(),
          content: fullContent,
          platform: selectedContent.platform,
          date: new Date().toISOString()
        }
        localStorage.setItem('socialtools_history', JSON.stringify([newEntry, ...history.slice(0, 9)]))
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const getPlatformInfo = (platformId: string) => {
    return platforms.find(p => p.id === platformId)
  }

  const getCharacterLimitColor = (count: number, limit: number) => {
    const percentage = (count / limit) * 100
    if (percentage > 100) return 'text-red-600'
    if (percentage > 90) return 'text-orange-500'
    return 'text-green-600'
  }

  const selectedContent = contents.find(c => c.platform === selectedPlatform)
  const platformInfo = selectedContent ? getPlatformInfo(selectedContent.platform) : null

  if (contents.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không có nội dung để hiển thị
          </h1>
          <p className="text-gray-600 mb-8">
            Vui lòng tạo nội dung trước khi xem preview.
          </p>
          <a href="/" className="btn-primary inline-block">
            Tạo nội dung mới
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Xem trước nội dung
          </h1>
          <p className="text-gray-600">
            Xem và sao chép nội dung cho từng nền tảng
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Platform Selector Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Chọn nền tảng
              </h3>
              <div className="space-y-2">
                {contents.map((content) => {
                  const platform = getPlatformInfo(content.platform)
                  const isSelected = selectedPlatform === content.platform
                  
                  return (
                    <button
                      key={content.platform}
                      onClick={() => setSelectedPlatform(content.platform)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        isSelected 
                          ? 'border-primary-500 bg-primary-50 text-primary-700' 
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded"
                          style={{ backgroundColor: platform?.color || '#6B7280' }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">
                            {platform?.name || content.platform}
                          </p>
                          <p className={`text-xs truncate ${getCharacterLimitColor(
                            content.characterCount, 
                            platform?.maxLength || 1000
                          )}`}>
                            {content.characterCount}/{platform?.maxLength || '∞'} ký tự
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Content Preview */}
          <div className="lg:col-span-3">
            {selectedContent && platformInfo && (
              <div className="space-y-6">
                {/* Platform Header */}
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: platformInfo.color }}
                      >
                        <span className="text-white font-bold text-lg">
                          {platformInfo.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {platformInfo.name}
                        </h2>
                        <p className="text-sm text-gray-600">
                          {platformInfo.guidelines}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(selectedContent.content, contents.findIndex(c => c.platform === selectedPlatform))}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        copiedIndex === contents.findIndex(c => c.platform === selectedPlatform)
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-primary-500 hover:bg-primary-600 text-white'
                      }`}
                    >
                      {copiedIndex === contents.findIndex(c => c.platform === selectedPlatform) ? (
                        <>✅ Đã sao chép!</>
                      ) : (
                        <>📋 Sao chép nội dung</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Content Preview Card */}
                <div className="card">
                  <div className="space-y-4">
                    {/* Content Stats */}
                    <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className={`text-2xl font-bold ${getCharacterLimitColor(
                            selectedContent.characterCount, 
                            platformInfo.maxLength
                          )}`}>
                            {selectedContent.characterCount}
                          </p>
                          <p className="text-xs text-gray-500">Ký tự</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">
                            {selectedContent.hashtags?.length || 0}
                          </p>
                          <p className="text-xs text-gray-500">Hashtags</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">
                            {Math.ceil(selectedContent.content.split(' ').length / 200) || 1}
                          </p>
                          <p className="text-xs text-gray-500">Phút đọc</p>
                        </div>
                      </div>
                      
                      {platformInfo.maxLength && selectedContent.characterCount > platformInfo.maxLength && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <p className="text-sm text-red-700 font-medium">
                            ⚠️ Vượt quá giới hạn {platformInfo.maxLength} ký tự
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Mock Platform Preview */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="bg-white rounded-lg shadow-sm border p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                          <div>
                            <p className="font-medium text-gray-900">Your Brand</p>
                            <p className="text-sm text-gray-500">Vừa xong</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed">
                            {selectedContent.content}
                          </pre>
                          
                          {selectedContent.hashtags && selectedContent.hashtags.length > 0 && (
                            <div className="pt-3 border-t border-gray-100">
                              <div className="flex flex-wrap gap-2">
                                {selectedContent.hashtags.map((hashtag, index) => (
                                  <span 
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded text-sm text-blue-600 hover:text-blue-700 cursor-pointer"
                                  >
                                    {hashtag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Mock engagement */}
                        <div className="flex items-center space-x-6 pt-4 mt-4 border-t border-gray-100 text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-blue-600">
                            <span>👍</span>
                            <span className="text-sm">Thích</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-green-600">
                            <span>💬</span>
                            <span className="text-sm">Bình luận</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-purple-600">
                            <span>🔄</span>
                            <span className="text-sm">Chia sẻ</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Platform Features */}
                    {platformInfo.features.length > 0 && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Tính năng nền tảng:</h4>
                        <div className="flex flex-wrap gap-2">
                          {platformInfo.features.map((feature, index) => (
                            <span 
                              key={index}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* All Platforms Quick Copy */}
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Sao chép nhanh tất cả
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {contents.map((content, index) => {
                      const platform = getPlatformInfo(content.platform)
                      const fullContent = content.hashtags && content.hashtags.length > 0 
                        ? `${content.content}\n\n${content.hashtags.join(' ')}`
                        : content.content

                      return (
                        <button
                          key={content.platform}
                          onClick={() => handleCopy(fullContent, index)}
                          className={`p-4 border rounded-lg text-left transition-colors ${
                            copiedIndex === index
                              ? 'border-green-300 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div 
                                className="w-4 h-4 rounded"
                                style={{ backgroundColor: platform?.color || '#6B7280' }}
                              />
                              <span className="font-medium">
                                {platform?.name || content.platform}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {copiedIndex === index ? '✅' : '📋'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {content.characterCount} ký tự • {content.hashtags?.length || 0} hashtags
                          </p>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
