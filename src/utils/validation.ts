/**
 * URL validation utilities
 */

/**
 * Validate Instagram URL format
 */
export function validateInstagramUrl(url: string): {
  isValid: boolean;
  error?: string;
} {
  if (!url) {
    return { isValid: true }; // Empty URL is valid (optional field)
  }

  try {
    const urlObj = new URL(url);

    // Check if it's an Instagram URL
    if (!["instagram.com", "www.instagram.com"].includes(urlObj.hostname)) {
      return {
        isValid: false,
        error:
          "Please enter a valid Instagram URL in the format https://instagram.com/username or https://www.instagram.com/username",
      };
    }

    // Check if pathname starts with /
    if (!urlObj.pathname.startsWith("/")) {
      return {
        isValid: false,
        error: "Please include a username in your Instagram URL",
      };
    }

    // Basic username validation (should start with / and contain at least one character)
    const username = urlObj.pathname.slice(1); // Remove leading /
    if (!username || username.includes("/")) {
      return {
        isValid: false,
        error: "Please include a username in your Instagram URL",
      };
    }

    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: "Please enter a valid Instagram URL",
    };
  }
}

/**
 * Validate X (Twitter) URL format
 */
export function validateXUrl(url: string): {
  isValid: boolean;
  error?: string;
} {
  if (!url) {
    return { isValid: true }; // Empty URL is valid (optional field)
  }

  try {
    const urlObj = new URL(url);

    // Check if it's an X/Twitter URL
    if (
      !["x.com", "www.x.com", "twitter.com", "www.twitter.com"].includes(
        urlObj.hostname
      )
    ) {
      return {
        isValid: false,
        error:
          "Please enter a valid X URL in the format https://x.com/username or https://twitter.com/username",
      };
    }

    // Check if pathname starts with /
    if (!urlObj.pathname.startsWith("/")) {
      return {
        isValid: false,
        error: "Please include a username in your X URL",
      };
    }

    // Basic username validation (should start with / and contain at least one character)
    const username = urlObj.pathname.slice(1); // Remove leading /
    if (!username || username.includes("/")) {
      return {
        isValid: false,
        error: "Please include a username in your X URL",
      };
    }

    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: "Please enter a valid X URL",
    };
  }
}

/**
 * Validate username format (must start with @)
 */
export function validateUsername(username: string): {
  isValid: boolean;
  error?: string;
} {
  if (!username) {
    return { isValid: false, error: "Username is required" };
  }

  if (!username.startsWith("@")) {
    return { isValid: false, error: "Username must start with @" };
  }

  const usernameWithoutAt = username.slice(1);

  if (usernameWithoutAt.length < 3) {
    return {
      isValid: false,
      error: "Username must be at least 3 characters after @",
    };
  }

  if (usernameWithoutAt.length > 20) {
    return {
      isValid: false,
      error: "Username must be 20 characters or less after @",
    };
  }

  // Only allow alphanumeric characters and underscores
  if (!/^[a-zA-Z0-9_]+$/.test(usernameWithoutAt)) {
    return {
      isValid: false,
      error: "Username can only contain letters, numbers, and underscores",
    };
  }

  return { isValid: true };
}
