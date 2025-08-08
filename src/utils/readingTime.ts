/**
 * Calculate reading time for content
 * @param text - The text content to analyze
 * @param wordsPerMinute - Average reading speed (default: 200 words per minute)
 * @returns Object with minutes and formatted text
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200,
) {
  // Remove MDX/Markdown formatting
  const cleanText = text
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`.*?`/g, "") // Remove inline code
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // Replace links with text
    .replace(/[#*_~]/g, "") // Remove markdown formatting
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\n{2,}/g, " ") // Replace multiple newlines with space
    .trim();

  // Count words
  const words = cleanText.split(/\s+/).filter((word) => word.length > 0).length;

  // Calculate reading time
  const minutes = Math.ceil(words / wordsPerMinute);

  // Format text
  const readingTimeText = minutes === 1 ? "1 min read" : `${minutes} min read`;

  return {
    minutes,
    words,
    text: readingTimeText,
  };
}

/**
 * Get reading time from MDX content
 * This is specifically for Astro content collections
 */
export async function getReadingTime(
  content: { body: string } | string,
): Promise<{ minutes: number; words: number; text: string }> {
  // For Astro content collections, we need to get the raw content
  // The body property contains the raw MDX content
  if (typeof content === "object" && "body" in content) {
    return calculateReadingTime(content.body);
  }

  // Fallback for plain text
  if (typeof content === "string") {
    return calculateReadingTime(content);
  }

  return {
    minutes: 0,
    words: 0,
    text: "1 min read",
  };
}
