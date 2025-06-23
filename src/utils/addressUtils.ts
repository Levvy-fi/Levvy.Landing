/**
 * Truncates a Cardano address in the middle with ellipsis
 * @param address - The full Cardano address
 * @param startChars - Number of characters to show at start (default: 12)
 * @param endChars - Number of characters to show at end (default: 8)
 * @returns Truncated address string
 */
export const truncateAddress = (
  address: string, 
  startChars: number = 12, 
  endChars: number = 8
): string => {
  if (!address || address.length <= startChars + endChars) {
    return address;
  }
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};