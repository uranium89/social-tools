'use client'

import { useState } from 'react'

interface GeneratedContent {
  platform: string
  content: string
  hashtags?: string[]
  characterCount: number
}

interface ContentDisplayProps {
  contents: GeneratedContent[]
  platforms: any[]
  onCopy: (content: string) => void
}

export default function ContentDisplay({ contents, platforms, onCopy }: ContentDisplayProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleCopy = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content)
      onCopy(content)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
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

  if (contents.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>Nội dung sẽ hiển thị ở đây sau khi tạo</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Nội dung đã tạo ({contents.length} nền tảng)
      </h3>
      
      {contents.map((content, index) => {
        const platformInfo = getPlatformInfo(content.platform)
        const isCopied = copiedIndex === index
        const fullContent = content.hashtags && content.hashtags.length > 0 
          ? `${content.content}\n\n${content.hashtags.join(' ')}`
          : content.content

        return (
          <div key={`${content.platform}-${index}`} className="card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: platformInfo?.color || '#6B7280' }}
                />
                <h4 className="font-medium text-gray-900">
                  {platformInfo?.name || content.platform}
                </h4>
                <span className={`text-sm ${getCharacterLimitColor(
                  content.characterCount, 
                  platformInfo?.maxLength || 1000
                )}`}>
                  {content.characterCount}/{platformInfo?.maxLength || '∞'} ký tự
                </span>
              </div>
              
              <button
                onClick={() => handleCopy(fullContent, index)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isCopied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                }`}
              >
                {                  isCopied ? (
                  <>
                    <span>✅</span>
                    <span>Đã sao chép!</span>
                  </>
                ) : (
                  <>
                    <span>📋</span>
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                {content.content}
              </pre>
            </div>
            
            {content.hashtags && content.hashtags.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Hashtags:</h5>
                <div className="flex flex-wrap gap-2">
                  {content.hashtags.map((hashtag, hashIndex) => (
                    <span 
                      key={hashIndex}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {platformInfo?.maxLength && content.characterCount > platformInfo.maxLength && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  ⚠️ Nội dung vượt quá giới hạn {platformInfo.maxLength} ký tự cho {platformInfo.name}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
