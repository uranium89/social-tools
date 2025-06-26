// Utility functions for local storage
export const storage = {
  // Save user preferences
  savePreferences: (preferences: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('socialtools_preferences', JSON.stringify(preferences))
    }
  },

  // Load user preferences
  loadPreferences: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('socialtools_preferences')
      return saved ? JSON.parse(saved) : null
    }
    return null
  },

  // Save generated content history
  saveContentHistory: (content: any) => {
    if (typeof window !== 'undefined') {
      const history = getContentHistory()
      const newHistory = [content, ...history.slice(0, 9)] // Keep last 10
      localStorage.setItem('socialtools_history', JSON.stringify(newHistory))
    }
  },

  // Load content history
  loadContentHistory: () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('socialtools_history')
      return saved ? JSON.parse(saved) : []
    }
    return []
  }
}

export const getContentHistory = () => {
  return storage.loadContentHistory()
}

// Copy to clipboard utility
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    } catch (err) {
      document.body.removeChild(textArea)
      return false
    }
  }
}

// Format character count with limits
export const formatCharacterCount = (count: number, limit: number): string => {
  const percentage = (count / limit) * 100
  if (percentage > 100) return `${count}/${limit} (Vượt quá)`
  if (percentage > 90) return `${count}/${limit} (Gần đạt giới hạn)`
  return `${count}/${limit}`
}

// Get platform color
export const getPlatformColor = (platformId: string): string => {
  const colors: { [key: string]: string } = {
    facebook: '#1877F2',
    twitter: '#1DA1F2', 
    instagram: '#E4405F',
    linkedin: '#0A66C2',
    tiktok: '#000000',
    youtube: '#FF0000'
  }
  return colors[platformId] || '#6B7280'
}

// Validate content for platform
export const validateContent = (content: string, platform: string): { valid: boolean; message?: string } => {
  const limits: { [key: string]: number } = {
    facebook: 63206,
    twitter: 280,
    instagram: 2200,
    linkedin: 3000,
    tiktok: 150,
    youtube: 5000
  }

  const limit = limits[platform]
  if (!limit) return { valid: true }

  if (content.length > limit) {
    return {
      valid: false,
      message: `Nội dung vượt quá giới hạn ${limit} ký tự cho ${platform}`
    }
  }

  return { valid: true }
}

// Generate unique ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Format date for display
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
