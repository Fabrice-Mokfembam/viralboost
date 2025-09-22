/**
 * Utility functions for handling task data
 */

/**
 * Convert instructions to array format regardless of input type
 * @param instructions - Can be string or string array
 * @returns Array of instruction strings
 */
export const normalizeInstructions = (instructions: string | string[] | undefined): string[] => {
  if (!instructions) return [];
  
  if (Array.isArray(instructions)) {
    return instructions;
  }
  
  if (typeof instructions === 'string') {
    // Split by newlines, semicolons, or other delimiters
    return instructions
      .split(/[\n;]/)
      .map((instruction: string) => instruction.trim())
      .filter((instruction: string) => instruction.length > 0);
  }
  
  return [];
};

/**
 * Convert instructions array to string format for form inputs
 * @param instructions - Array of instruction strings
 * @returns String with instructions joined by newlines
 */
export const instructionsArrayToString = (instructions: string[] | undefined): string => {
  if (!instructions || !Array.isArray(instructions)) return '';
  return instructions.join('\n');
};

/**
 * Get task property value handling both API and static data formats
 * @param task - Task object
 * @param apiProp - Property name in API format
 * @param staticProp - Property name in static data format
 * @returns Property value
 */
export const getTaskProperty = (task: any, apiProp: string, staticProp: string): string | number => {
  const value = task[apiProp] ?? task[staticProp];
  return value as string | number;
};

/**
 * Format task status for display
 * @param status - Task status string
 * @returns Formatted status string
 */
export const formatTaskStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    pending: 'Pending',
    active: 'Active',
    pause: 'Paused',
    paused: 'Paused',
    completed: 'Completed',
    suspended: 'Suspended',
    expired: 'Expired',
  };
  
  return statusMap[status.toLowerCase()] || status;
};

/**
 * Get platform icon for display
 * @param platform - Platform name
 * @returns Platform icon emoji
 */
export const getPlatformIcon = (platform: string): string => {
  const platformIcons: { [key: string]: string } = {
    instagram: '📷',
    youtube: '📺',
    twitter: '🐦',
    tiktok: '🎵',
    facebook: '👥',
    linkedin: '💼',
  };
  
  return platformIcons[platform.toLowerCase()] || '📱';
};
