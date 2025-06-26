import { NextRequest, NextResponse } from 'next/server'
import { generateContent } from '../../lib/gemini'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { originalContent, tone, platforms, customPrompt } = body

    // Validate required fields
    if (!originalContent || !tone || !platforms || platforms.length === 0) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc' },
        { status: 400 }
      )
    }

    // Generate content using Gemini
    const results = await generateContent({
      originalContent,
      tone,
      platforms,
      customPrompt
    })

    return NextResponse.json({ results })
  } catch (error) {
    console.error('Error in generate API:', error)
    return NextResponse.json(
      { error: 'Có lỗi xảy ra khi tạo nội dung' },
      { status: 500 }
    )
  }
}
