'use client'

import { useState } from 'react'

interface Platform {
  id: string
  name: string
  color: string
  maxLength: number
  guidelines: string
  features: string[]
}

interface PlatformSelectorProps {
  platforms: Platform[]
  selectedPlatforms: string[]
  onPlatformChange: (platformIds: string[]) => void
}

export default function PlatformSelector({ 
  platforms, 
  selectedPlatforms, 
  onPlatformChange 
}: PlatformSelectorProps) {
  const handlePlatformToggle = (platformId: string) => {
    const isSelected = selectedPlatforms.includes(platformId)
    if (isSelected) {
      onPlatformChange(selectedPlatforms.filter(id => id !== platformId))
    } else {
      onPlatformChange([...selectedPlatforms, platformId])
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Chọn nền tảng chia sẻ
      </label>
      
      <div className="space-y-3">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.includes(platform.id)
          return (
            <div key={platform.id} className="relative">
              <label className="flex items-start space-x-3 cursor-pointer group">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handlePlatformToggle(platform.id)}
                    className="checkbox-custom"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: platform.color }}
                    />
                    <span className="text-sm font-medium text-gray-900 group-hover:text-primary-600">
                      {platform.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      (Tối đa {platform.maxLength.toLocaleString()} ký tự)
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {platform.guidelines}
                  </p>
                  {platform.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {platform.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </label>
              
              {isSelected && (
                <div className="absolute left-0 top-0 w-1 h-full bg-primary-500 rounded-full -ml-2" />
              )}
            </div>
          )
        })}
      </div>
      
      {selectedPlatforms.length > 0 && (
        <div className="mt-4 p-3 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-700">
            <span className="font-medium">Đã chọn {selectedPlatforms.length} nền tảng:</span>{' '}
            {selectedPlatforms.map(id => {
              const platform = platforms.find(p => p.id === id)
              return platform?.name
            }).join(', ')}
          </p>
        </div>
      )}
    </div>
  )
}
