/**
 * City card data structure
 */
export interface CityCard {
  id: string;
  name: string;
  country: string;
  averageCost: number;
  currency: string;
  pinCount: number;
  contributionCount: number;
  topPost: TopPost;
}

/**
 * Top post (most bookmarked expense card) data
 */
export interface TopPost {
  id: string;
  cost: number;
  startDate: string;
  endDate: string;
  travelType: string;
  position: string;
  author: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
  bookmarkCount: number;
}
