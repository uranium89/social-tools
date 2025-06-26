import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export interface ContentRequest {
  originalContent: string
  tone: string
  platforms: string[]
  customPrompt?: string
}

export interface GeneratedContent {
  platform: string
  content: string
  hashtags?: string[]
  characterCount: number
}

export async function generateContent(request: ContentRequest): Promise<GeneratedContent[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

  const results: GeneratedContent[] = []

  for (const platform of request.platforms) {
    try {
      const prompt = createPrompt(request.originalContent, request.tone, platform, request.customPrompt)
      
      const result = await model.generateContent(prompt)
      const response = await result.response
      const generatedText = response.text()

      // Parse the response to extract content and hashtags
      const parsed = parseGeneratedContent(generatedText, platform)
      
      results.push({
        platform,
        content: parsed.content,
        hashtags: parsed.hashtags,
        characterCount: parsed.content.length
      })
    } catch (error) {
      console.error(`Error generating content for ${platform}:`, error)
      // Return original content as fallback
      results.push({
        platform,
        content: request.originalContent,
        hashtags: [],
        characterCount: request.originalContent.length
      })
    }
  }

  return results
}

function createPrompt(content: string, tone: string, platform: string, customPrompt?: string): string {
  const toneInstructions = {
    casual: 'tự nhiên, thân thiện, gần gũi',
    professional: 'chuyên nghiệp, trang trọng, lịch sự', 
    humorous: 'hài hước, vui vẻ, khôi hài',
    informative: 'thông tin, rõ ràng, có giá trị',
    urgent: 'khẩn cấp, gấp gáp, cần hành động ngay',
    inspiring: 'truyền cảm hứng, động viên, tích cực',
    promotional: 'quảng cáo, bán hàng, thu hút khách hàng'
  }

  const platformGuidelines = {
    facebook: 'Facebook - có thể dài, chia đoạn, hashtag 3-5 cái, khuyến khích tương tác',
    twitter: 'Twitter/X - tối đa 280 ký tự, ngắn gọn, hashtag trending, có thể tạo thread',
    instagram: 'Instagram - caption hấp dẫn, hashtag 5-10 cái, visual-friendly',
    linkedin: 'LinkedIn - chuyên nghiệp, chia sẻ insights, industry hashtags',
    tiktok: 'TikTok - ngắn gọn, trendy, Gen Z language, hashtag challenges',
    youtube: 'YouTube - mô tả chi tiết, SEO keywords, call-to-action'
  }

  let prompt = `
Bạn là một chuyên gia về social media marketing. Hãy viết lại nội dung sau đây cho nền tảng ${platform} với tông giọng ${toneInstructions[tone as keyof typeof toneInstructions] || tone}.

Nội dung gốc: "${content}"

Yêu cầu:
- Viết bằng tiếng Việt
- Tông giọng: ${toneInstructions[tone as keyof typeof toneInstructions] || tone}
- Nền tảng: ${platformGuidelines[platform as keyof typeof platformGuidelines] || platform}
- Bao gồm hashtag phù hợp
- Tối ưu cho engagement trên ${platform}

${customPrompt ? `Yêu cầu bổ sung: ${customPrompt}` : ''}

Định dạng trả về:
CONTENT:
[nội dung chính]

HASHTAGS:
[các hashtag, mỗi hashtag một dòng, bắt đầu với #]

Lưu ý: Chỉ trả về nội dung theo định dạng trên, không thêm giải thích hay bình luận.
`

  return prompt
}

function parseGeneratedContent(text: string, platform: string): { content: string; hashtags: string[] } {
  const lines = text.split('\n')
  let content = ''
  let hashtags: string[] = []
  let currentSection = ''

  for (const line of lines) {
    const trimmedLine = line.trim()
    
    if (trimmedLine.includes('CONTENT:')) {
      currentSection = 'content'
      continue
    } else if (trimmedLine.includes('HASHTAGS:')) {
      currentSection = 'hashtags'
      continue
    }

    if (currentSection === 'content' && trimmedLine) {
      content += (content ? '\n' : '') + trimmedLine
    } else if (currentSection === 'hashtags' && trimmedLine && trimmedLine.startsWith('#')) {
      hashtags.push(trimmedLine)
    }
  }

  // Fallback if parsing fails
  if (!content) {
    content = text.replace(/CONTENT:|HASHTAGS:/g, '').trim()
    const hashtagMatches = content.match(/#\w+/g)
    if (hashtagMatches) {
      hashtags = hashtagMatches
      content = content.replace(/#\w+/g, '').trim()
    }
  }

  return { content, hashtags }
}
