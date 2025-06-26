'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface ToneOption {
  id: string
  name: string
  description: string
}

interface ToneSelectorProps {
  tones: ToneOption[]
  selectedTone: string
  onToneChange: (toneId: string) => void
}

export default function ToneSelector({ tones, selectedTone, onToneChange }: ToneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedToneObj = tones.find(tone => tone.id === selectedTone)

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Chọn tông giọng
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        >
          <div className="flex flex-col">
            <span className="block truncate font-medium">
              {selectedToneObj?.name || 'Chọn tông giọng'}
            </span>
            {selectedToneObj?.description && (
              <span className="block truncate text-sm text-gray-500">
                {selectedToneObj.description}
              </span>
            )}
          </div>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown 
              className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              aria-hidden="true" 
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none">
            {tones.map((tone) => (
              <div
                key={tone.id}
                onClick={() => {
                  onToneChange(tone.id)
                  setIsOpen(false)
                }}
                className={`cursor-pointer select-none relative py-3 px-4 hover:bg-primary-50 ${
                  selectedTone === tone.id ? 'bg-primary-50 text-primary-600' : 'text-gray-900'
                }`}
              >
                <div className="flex flex-col">
                  <span className={`block truncate font-medium ${
                    selectedTone === tone.id ? 'font-semibold' : ''
                  }`}>
                    {tone.name}
                  </span>
                  <span className="block truncate text-sm text-gray-500">
                    {tone.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
