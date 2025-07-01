import Link from "next/link";

export default function CreateSuccessPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#F3F1EF" }}
    >
      <div
        className="w-full max-w-md mx-auto p-8 rounded-xl shadow-xl text-center"
        style={{ backgroundColor: "#FFFFFF", color: "#124261" }}
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">投稿完了！</h1>
          <p className="text-gray-600">旅行記録が正常に投稿されました。</p>
        </div>

        <div className="space-y-3">
          <Link
            href="/mypage"
            className="block w-full px-6 py-3 text-white rounded-lg font-medium transition-colors duration-200"
            style={{ backgroundColor: "#227461" }}
          >
            マイページに戻る
          </Link>
          <Link
            href="/create"
            className="block w-full px-6 py-3 border-2 rounded-lg font-medium transition-colors duration-200"
            style={{ borderColor: "#E48928", color: "#E48928" }}
          >
            新しい投稿を作成
          </Link>
        </div>
      </div>
    </div>
  );
}
