'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface HistoryItem {
  id: string
  content: string
  platform?: string
  date: string
  tone?: string
  platforms?: string[]
}

export default function HistoryPage() {
  const router = useRouter()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('socialtools_history')
      if (stored) {
        try {
          setHistory(JSON.parse(stored))
        } catch (error) {
          console.error('Error loading history:', error)
        }
      }
    }
  }, [])

  const clearHistory = () => {
    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử?')) {
      localStorage.removeItem('socialtools_history')
      setHistory([])
    }
  }

  const deleteItem = (id: string) => {
    const newHistory = history.filter(item => item.id !== id)
    setHistory(newHistory)
    localStorage.setItem('socialtools_history', JSON.stringify(newHistory))
  }

  const copyContent = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const filteredHistory = history.filter(item =>
    item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.platform && item.platform.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(dateString))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Lịch sử nội dung
              </h1>
              <p className="text-gray-600">
                Xem lại các nội dung đã tạo trước đó
              </p>
            </div>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="btn-secondary text-red-600 hover:text-red-700"
              >
                🗑️ Xóa tất cả
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search and Controls */}
        <div className="card mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Tìm kiếm nội dung..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <span className="text-sm text-gray-600">
              {filteredHistory.length} / {history.length} mục
            </span>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            {history.length === 0 ? (
              <div>
                <p className="text-gray-500 mb-4">Chưa có lịch sử nào</p>
                <button
                  onClick={() => router.push('/')}
                  className="btn-primary"
                >
                  Tạo nội dung đầu tiên
                </button>
              </div>
            ) : (
              <p className="text-gray-500">Không tìm thấy kết quả nào</p>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item) => (
              <div key={item.id} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      {item.platform && (
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                          {item.platform}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <p className="text-gray-800 line-clamp-3 leading-relaxed">
                      {item.content}
                    </p>
                    <div className="flex items-center space-x-4 mt-3">
                      <span className="text-xs text-gray-500">
                        {item.content.length} ký tự
                      </span>
                      {item.tone && (
                        <span className="text-xs text-gray-500">
                          Tông giọng: {item.tone}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => copyContent(item.content)}
                      className="p-2 text-gray-400 hover:text-primary-600 rounded"
                      title="Sao chép"
                    >
                      📋
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 rounded"
                      title="Xóa"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
