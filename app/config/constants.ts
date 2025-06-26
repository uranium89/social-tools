// Cấu hình các tông giọng
export const tones = [
  { id: 'casual', name: 'Bình thường', description: 'Tự nhiên, thân thiện' },
  { id: 'professional', name: 'Chuyên nghiệp', description: 'Trang trọng, lịch sự' },
  { id: 'humorous', name: 'Hài hước', description: 'Vui vẻ, khôi hài' },
  { id: 'informative', name: 'Thông tin', description: 'Rõ ràng, có giá trị' },
  { id: 'urgent', name: 'Khẩn cấp', description: 'Gấp gáp, cần hành động' },
  { id: 'inspiring', name: 'Truyền cảm hứng', description: 'Động viên, tích cực' },
  { id: 'promotional', name: 'Quảng cáo', description: 'Bán hàng, thu hút' },
]

// Cấu hình các nền tảng mạng xã hội
export const platforms = [
  {
    id: 'facebook',
    name: 'Facebook',
    color: '#1877F2',
    maxLength: 63206,
    guidelines: 'Phù hợp với cả văn bản dài và ngắn. Hỗ trợ hashtag và mention.',
    features: ['hashtags', 'mentions', 'longForm']
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    color: '#1DA1F2',
    maxLength: 280,
    guidelines: 'Giới hạn 280 ký tự. Sử dụng hashtag hiệu quả. Thread cho nội dung dài.',
    features: ['hashtags', 'mentions', 'threads']
  },
  {
    id: 'instagram',
    name: 'Instagram',
    color: '#E4405F',
    maxLength: 2200,
    guidelines: 'Tập trung vào visual. Caption ngắn gọn. Hashtag tối đa 30.',
    features: ['hashtags', 'mentions', 'stories']
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    color: '#0A66C2',
    maxLength: 3000,
    guidelines: 'Chuyên nghiệp, có giá trị. Phù hợp với nội dung nghề nghiệp.',
    features: ['hashtags', 'mentions', 'professional']
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    color: '#000000',
    maxLength: 150,
    guidelines: 'Ngắn gọn, hấp dẫn. Hashtag trending. Phù hợp với video.',
    features: ['hashtags', 'trending', 'video']
  },
  {
    id: 'youtube',
    name: 'YouTube',
    color: '#FF0000',
    maxLength: 5000,
    guidelines: 'Mô tả video chi tiết. SEO friendly. Call-to-action rõ ràng.',
    features: ['seo', 'descriptions', 'cta']
  },
  {
    id: 'zalo',
    name: 'Zalo',
    color: '#0068FF',
    maxLength: 1000,
    guidelines: 'Nền tảng nhắn tin và mạng xã hội phổ biến nhất Việt Nam. Thân thiện, gần gũi.',
    features: ['messaging', 'stickers', 'groups', 'vietnamese']
  }
]

// Lời nhắc đã lưu sẵn
export const savedPrompts = [
  {
    id: 'product-launch',
    title: 'Ra mắt sản phẩm',
    content: 'Viết bài đăng thông báo ra mắt sản phẩm mới với tone hào hứng và chuyên nghiệp',
    category: 'business'
  },
  {
    id: 'event-promotion',
    title: 'Quảng bá sự kiện',
    content: 'Tạo nội dung quảng bá sự kiện sắp tới với call-to-action rõ ràng',
    category: 'marketing'
  },
  {
    id: 'behind-scenes',
    title: 'Hậu trường',
    content: 'Chia sẻ khoảnh khắc hậu trường với tone thân thiện và gần gũi',
    category: 'lifestyle'
  },
  {
    id: 'educational',
    title: 'Giáo dục',
    content: 'Chia sẻ kiến thức hữu ích với tone thông tin và dễ hiểu',
    category: 'education'
  },
  {
    id: 'testimonial',
    title: 'Phản hồi khách hàng',
    content: 'Chia sẻ phản hồi tích cực từ khách hàng với tone tin cậy',
    category: 'social-proof'
  },
  {
    id: 'motivational',
    title: 'Động viên',
    content: 'Tạo nội dung truyền cảm hứng và động viên với tone tích cực',
    category: 'inspiration'
  }
]

// Hướng dẫn hệ thống cho từng nền tảng
export const platformInstructions = {
  facebook: `
    Hướng dẫn cho Facebook:
    - Sử dụng ngôn ngữ tự nhiên và thân thiện
    - Có thể viết dài, chia thành đoạn văn
    - Sử dụng emoji một cách hợp lý
    - Hashtag không quá 3-5 cái
    - Khuyến khích tương tác (like, share, comment)
    - Có thể đặt câu hỏi để tăng engagement
  `,
  twitter: `
    Hướng dẫn cho Twitter/X:
    - Giới hạn 280 ký tự, ngắn gọn và súc tích
    - Sử dụng hashtag phổ biến và trending
    - Có thể tạo thread nếu nội dung dài
    - Sử dụng emoji để tiết kiệm ký tự
    - Call-to-action rõ ràng (RT, reply)
    - Tận dụng current events và trending topics
  `,
  instagram: `
    Hướng dẫn cho Instagram:
    - Caption ngắn gọn, thu hút trong 125 ký tự đầu
    - Sử dụng emoji và line breaks để dễ đọc
    - Hashtag từ 5-10 cái, mix popular và niche
    - Khuyến khích save và share
    - Có thể tag location nếu phù hợp
    - Stories-friendly content
  `,
  linkedin: `
    Hướng dẫn cho LinkedIn:
    - Tone chuyên nghiệp nhưng personable
    - Chia sẻ insights và lessons learned
    - Sử dụng industry hashtags
    - Encourage professional discussions
    - Include personal experiences và expertise
    - Longer form content works well
  `,
  tiktok: `
    Hướng dẫn cho TikTok:
    - Ngôn ngữ Gen Z, trendy
    - Hashtag challenges và trending sounds
    - Ngắn gọn, catchy
    - Video-first mindset
    - Trending hashtags và effects
    - Call-to-action để duet hoặc stitch
  `,
  youtube: `
    Hướng dẫn cho YouTube:
    - Mô tả chi tiết nội dung video
    - SEO-optimized với keywords
    - Timestamps cho các phần quan trọng
    - Call-to-action subscribe và like
    - Links đến social media khác
    - Playlist suggestions
  `,
  zalo: `
    Hướng dẫn cho Zalo:
    - Sử dụng tiếng Việt tự nhiên, thân thiện
    - Phù hợp với văn hóa Việt Nam
    - Có thể sử dụng sticker và emoji phù hợp
    - Nội dung ngắn gọn, dễ đọc trên mobile
    - Khuyến khích tương tác trong nhóm
    - Tone gần gũi, như trò chuyện với bạn bè
    - Tránh quá chính thức hoặc xa cách
  `
}

// Cài đặt mặc định
export const defaultSettings = {
  tone: 'casual',
  platforms: ['facebook', 'instagram'],
  savePreferences: true,
  maxContentLength: 2000,
  includeHashtags: true,
  includeEmojis: true
}
