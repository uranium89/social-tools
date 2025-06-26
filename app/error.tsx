'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          Có lỗi xảy ra!
        </h1>
        <p className="text-gray-600 mb-8">
          {error.message || 'Đã xảy ra lỗi không mong muốn.'}
        </p>
        <div className="space-x-4">
          <button 
            onClick={reset}
            className="btn-primary"
          >
            Thử lại
          </button>
          <a 
            href="/"
            className="btn-secondary inline-block"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    </div>
  )
}
