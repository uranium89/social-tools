'use client'

import { useState } from 'react'

interface SavedPrompt {
  id: string
  title: string
  content: string
  category: string
}

interface SavedPromptsProps {
  prompts: SavedPrompt[]
  onSelectPrompt: (content: string) => void
}

export default function SavedPrompts({ prompts, onSelectPrompt }: SavedPromptsProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const categories = ['all', ...Array.from(new Set(prompts.map(p => p.category)))]
  
  const categoryNames: { [key: string]: string } = {
    all: 'Tất cả',
    business: 'Kinh doanh',
    marketing: 'Marketing',
    lifestyle: 'Lối sống',
    education: 'Giáo dục',
    'social-proof': 'Bằng chứng xã hội',
    inspiration: 'Truyền cảm hứng'
  }
  
  const filteredPrompts = selectedCategory === 'all' 
    ? prompts 
    : prompts.filter(p => p.category === selectedCategory)

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mẫu có sẵn
        </label>
        
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {categoryNames[category] || category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Prompts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredPrompts.map(prompt => (
          <div
            key={prompt.id}
            onClick={() => onSelectPrompt(prompt.content)}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 cursor-pointer transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-gray-900 group-hover:text-primary-700">
                {prompt.title}
              </h4>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {categoryNames[prompt.category] || prompt.category}
              </span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-3">
              {prompt.content}
            </p>
          </div>
        ))}
      </div>
      
      {filteredPrompts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Không có mẫu nào trong danh mục này</p>
        </div>
      )}
    </div>
  )
}
