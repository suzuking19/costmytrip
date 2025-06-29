import { z } from "zod";

/**
 * Zod validation schemas
 */

// Username validation schema
const usernameSchema = z
  .string()
  .min(1, "Username is required")
  .transform((username) => {
    if (!username) return username;
    // Remove @ if user included it
    return username.startsWith("@") ? username.slice(1) : username;
  })
  .pipe(
    z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(20, "Username must be 20 characters or less")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
  );

// Instagram URL validation schema
const instagramUrlSchema = z
  .string()
  .optional()
  .transform((url) => {
    // If url is undefined or empty string, return undefined
    if (!url || url.trim() === "") return undefined;
    return url.trim();
  })
  .refine(
    (url) => {
      if (!url) return true; // Empty URL is valid (optional field)

      try {
        const urlObj = new URL(url);
        return ["instagram.com", "www.instagram.com"].includes(urlObj.hostname);
      } catch {
        return false;
      }
    },
    {
      message:
        "Please enter a valid Instagram URL in the format https://instagram.com/username or https://www.instagram.com/username",
    }
  )
  .refine(
    (url) => {
      if (!url) return true;

      try {
        const urlObj = new URL(url);
        const username = urlObj.pathname.slice(1); // Remove leading /
        return username && !username.includes("/");
      } catch {
        return false;
      }
    },
    {
      message: "Please include a username in your Instagram URL",
    }
  );

// X URL validation schema
const xUrlSchema = z
  .string()
  .optional()
  .transform((url) => {
    // If url is undefined or empty string, return undefined
    if (!url || url.trim() === "") return undefined;
    return url.trim();
  })
  .refine(
    (url) => {
      if (!url) return true; // Empty URL is valid (optional field)

      try {
        const urlObj = new URL(url);
        return [
          "x.com",
          "www.x.com",
          "twitter.com",
          "www.twitter.com",
        ].includes(urlObj.hostname);
      } catch {
        return false;
      }
    },
    {
      message:
        "Please enter a valid X URL in the format https://x.com/username or https://twitter.com/username",
    }
  )
  .refine(
    (url) => {
      if (!url) return true;

      try {
        const urlObj = new URL(url);
        const username = urlObj.pathname.slice(1); // Remove leading /
        return username && !username.includes("/");
      } catch {
        return false;
      }
    },
    {
      message: "Please include a username in your X URL",
    }
  );

// Profile update schema
export const profileUpdateSchema = z.object({
  username: usernameSchema,
  description: z.string().optional(),
  current_city_id: z.string().optional(),
  instagram_url: instagramUrlSchema,
  x_url: xUrlSchema,
  spoken_languages: z.array(z.string()).optional(),
});

export type ProfileUpdateData = z.infer<typeof profileUpdateSchema>;

/**
 * Legacy validation functions (for backward compatibility)
 */
export function validateUsername(username: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    usernameSchema.parse(username);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: "Invalid username format" };
  }
}

export function validateInstagramUrl(url: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    instagramUrlSchema.parse(url);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: "Invalid Instagram URL format" };
  }
}

export function validateXUrl(url: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    xUrlSchema.parse(url);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: "Invalid X URL format" };
  }
}
