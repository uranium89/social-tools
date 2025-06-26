'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import ToneSelector from './components/ToneSelector'
import PlatformSelector from './components/PlatformSelector'
import SavedPrompts from './components/SavedPrompts'
import LoadingSpinner from './components/LoadingSpinner'
import ClientOnly from './components/ClientOnly'
import { tones, platforms, savedPrompts } from './config/constants'

export default function HomePage() {
  const router = useRouter()
  const [originalContent, setOriginalContent] = useState('')
  const [selectedTone, setSelectedTone] = useState('casual')
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook'])
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPrompts, setShowPrompts] = useState(false)
  const [hasExistingContent, setHasExistingContent] = useState(false)

  // Load saved preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('socialtools_preferences')
      if (saved) {
        const prefs = JSON.parse(saved)
        setSelectedTone(prefs.tone || 'casual')
        setSelectedPlatforms(prefs.platforms || ['facebook'])
      }
      
      // Check for existing content
      const existingContent = localStorage.getItem('socialtools_generated_content')
      setHasExistingContent(!!existingContent)
    }
  }, [])

  // Save preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('socialtools_preferences', JSON.stringify({
        tone: selectedTone,
        platforms: selectedPlatforms
      }))
    }
  }, [selectedTone, selectedPlatforms])

  const handleGenerate = async () => {
    if (!originalContent.trim()) {
      alert('Vui lòng nhập nội dung')
      return
    }

    if (selectedPlatforms.length === 0) {
      alert('Vui lòng chọn ít nhất một nền tảng')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          originalContent,
          tone: selectedTone,
          platforms: selectedPlatforms,
        }),
      })

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi tạo nội dung')
      }

      const data = await response.json()
      
      // Save to localStorage for preview page
      localStorage.setItem('socialtools_generated_content', JSON.stringify(data.results))
      
      // Update existing content state
      setHasExistingContent(true)
      
      // Dispatch custom event to update navigation
      window.dispatchEvent(new Event('socialtools-content-updated'))
      
      // Redirect to preview page
      const encodedData = encodeURIComponent(JSON.stringify(data.results))
      router.push(`/preview?data=${encodedData}`)
    } catch (error) {
      console.error('Error:', error)
      alert('Có lỗi xảy ra khi tạo nội dung. Vui lòng thử lại.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyContent = (content: string) => {
    // Save to history
    if (typeof window !== 'undefined') {
      const history = JSON.parse(localStorage.getItem('socialtools_history') || '[]')
      const newEntry = {
        id: Date.now().toString(),
        content,
        date: new Date().toISOString(),
        tone: selectedTone,
        platforms: selectedPlatforms
      }
      localStorage.setItem('socialtools_history', JSON.stringify([newEntry, ...history.slice(0, 9)]))
    }
  }

  const steps = [
    { number: 1, title: 'Tạo nội dung', description: 'Soạn thảo nội dung gốc' },
    { number: 2, title: 'Chọn tông giọng', description: 'Chọn phong cách viết' },
    { number: 3, title: 'Chọn nền tảng', description: 'Chọn kênh chia sẻ' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tạo nội dung mạng xã hội
          </h1>
          <p className="text-gray-600">
            Tạo nội dung tối ưu cho mọi nền tảng mạng xã hội với AI thông minh
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium bg-primary-500 text-white">
                  {step.number}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-primary-600">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="w-12 h-0.5 mx-4 bg-primary-500" />
              )}
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Step 1: Content Creation */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                1. Tạo nội dung
              </h2>
              
              <div className="space-y-4">
                <div>
                  <button
                    onClick={() => setShowPrompts(!showPrompts)}
                    className="btn-secondary mb-3"
                  >
                    {showPrompts ? 'Ẩn mẫu có sẵn' : 'Xem mẫu có sẵn'}
                  </button>
                  
                  {showPrompts && (
                    <div className="mb-4">
                      <SavedPrompts 
                        prompts={savedPrompts}
                        onSelectPrompt={(content) => {
                          setOriginalContent(content)
                          setShowPrompts(false)
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nội dung gốc
                  </label>
                  <textarea
                    value={originalContent}
                    onChange={(e) => setOriginalContent(e.target.value)}
                    placeholder="Nhập nội dung bạn muốn chia sẻ..."
                    className="textarea-primary h-32"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    {originalContent.length} ký tự
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Tone Selection */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                2. Chọn tông giọng
              </h2>
              <ToneSelector 
                tones={tones}
                selectedTone={selectedTone}
                onToneChange={setSelectedTone}
              />
            </div>

            {/* Step 3: Platform Selection */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                3. Chọn nền tảng
              </h2>
              <PlatformSelector 
                platforms={platforms}
                selectedPlatforms={selectedPlatforms}
                onPlatformChange={setSelectedPlatforms}
              />
            </div>

            {/* Generate Button */}
            <div className="text-center space-y-4">
              {isGenerating ? (
                <div className="py-8">
                  <LoadingSpinner size="lg" text="Đang tạo nội dung tối ưu cho từng nền tảng..." />
                </div>
              ) : (
                <>
                  <button
                    onClick={handleGenerate}
                    disabled={!originalContent.trim() || selectedPlatforms.length === 0}
                    className={`btn-primary px-8 py-4 text-lg ${
                      !originalContent.trim() || selectedPlatforms.length === 0 
                        ? 'opacity-50 cursor-not-allowed' 
                        : ''
                    }`}
                  >
                    Tạo nội dung
                  </button>
                  
                  {/* Quick access to preview if content exists */}
                  <ClientOnly>
                    {hasExistingContent && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600 mb-2">
                          Bạn có nội dung đã tạo trước đó
                        </p>
                        <button
                          onClick={() => router.push('/preview')}
                          className="btn-secondary"
                        >
                          Xem nội dung đã tạo
                        </button>
                      </div>
                    )}
                  </ClientOnly>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
