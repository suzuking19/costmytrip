import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Eye, Heart, Star } from "lucide-react";

// Type definition for bookmarked travel posts
interface BookmarkedPost {
  id: string;
  title: string;
  location: string;
  imageUrl: string;
  cost: string;
  duration: string;
  authorName: string;
  authorAvatar: string;
  publishedAt: string;
  views: number;
  rating: number;
  bookmarkedAt: string;
}

// Dummy data
const dummyBookmarks: BookmarkedPost[] = [
  {
    id: "1",
    title: "バンコク4日間グルメツアー",
    location: "Bangkok, Thailand",
    imageUrl: "https://placehold.co/400x250/f39c12/ffffff?text=Bangkok",
    cost: "¥65,000",
    duration: "4日間",
    authorName: "佐藤花子",
    authorAvatar: "https://placehold.co/40x40/e74c3c/ffffff?text=S",
    publishedAt: "2024年12月10日",
    views: 2341,
    rating: 4.8,
    bookmarkedAt: "2024年12月20日",
  },
  {
    id: "2",
    title: "台湾一周鉄道の旅",
    location: "Taiwan",
    imageUrl: "https://placehold.co/400x250/27ae60/ffffff?text=Taiwan",
    cost: "¥85,000",
    duration: "6日間",
    authorName: "山田太郎",
    authorAvatar: "https://placehold.co/40x40/3498db/ffffff?text=Y",
    publishedAt: "2024年11月25日",
    views: 1876,
    rating: 4.9,
    bookmarkedAt: "2024年12月15日",
  },
  {
    id: "3",
    title: "シンガポール週末弾丸旅行",
    location: "Singapore",
    imageUrl: "https://placehold.co/400x250/e67e22/ffffff?text=Singapore",
    cost: "¥55,000",
    duration: "2日間",
    authorName: "鈴木美咲",
    authorAvatar: "https://placehold.co/40x40/9b59b6/ffffff?text=S",
    publishedAt: "2024年11月30日",
    views: 987,
    rating: 4.6,
    bookmarkedAt: "2024年12月12日",
  },
  {
    id: "4",
    title: "ベトナム縦断バックパッカーの旅",
    location: "Vietnam",
    imageUrl: "https://placehold.co/400x250/e74c3c/ffffff?text=Vietnam",
    cost: "¥72,000",
    duration: "10日間",
    authorName: "田中一郎",
    authorAvatar: "https://placehold.co/40x40/34495e/ffffff?text=T",
    publishedAt: "2024年10月15日",
    views: 3456,
    rating: 4.7,
    bookmarkedAt: "2024年12月08日",
  },
];

const BookmarksPage: React.FC = () => {
  const bookmarks = dummyBookmarks;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-stone py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/mypage"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to My Page
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Bookmarks</h1>
          <p className="text-gray-600 mt-2">
            You have bookmarked {bookmarks.length} travel records
          </p>
        </div>

        {/* Bookmark List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              {/* Image */}
              <div className="relative">
                <Image
                  src={bookmark.imageUrl}
                  alt={bookmark.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {bookmark.title}
                </h3>

                <p className="text-gray-600 mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {bookmark.location}
                </p>

                {/* Cost and Duration */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-full">
                    {bookmark.cost}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                    {bookmark.duration}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center mr-2">
                    {renderStars(bookmark.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {bookmark.rating}
                  </span>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <Image
                      src={bookmark.authorAvatar}
                      alt={bookmark.authorName}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{bookmark.authorName}</span>
                  </div>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {bookmark.views.toLocaleString()}
                  </span>
                </div>

                {/* Published Date and Bookmark Date */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>Published: {bookmark.publishedAt}</p>
                  <p>Bookmarked: {bookmark.bookmarkedAt}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {bookmarks.length === 0 && (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No bookmarks yet
            </h2>
            <p className="text-gray-600 mb-6">
              Bookmark interesting travel records to read them later
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Explore Travel Records
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;
