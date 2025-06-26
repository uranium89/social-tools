export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Trang không tồn tại
        </h2>
        <p className="text-gray-600 mb-8">
          Xin lỗi, trang bạn đang tìm kiếm không được tìm thấy.
        </p>
        <a 
          href="/"
          className="btn-primary inline-block"
        >
          Về trang chủ
        </a>
      </div>
    </div>
  )
}
