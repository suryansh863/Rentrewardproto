// Sample base64 encoded images for demo purposes

// Simple placeholder image for cheque/payment receipt - 1x1 transparent pixel
export const sampleChequeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

// A more reliable sample image for testing - small blue square
export const testChequeImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAhklEQVR42mNkGGDAOMD2M4w6YNQBow4YdcCoA0YdMOqAUQeMOmDUAaMOGHXAqANGHTCkHcDAwJAv9Z/hNAMDQyMDA8MBBgYGRgYGhkIGBoZPDAwMjQwMDAkMDAwXGBgYJHC4VJKBgeEjAwPDYgYGBk8GBobfDAwMB6DiX4iyALmQGXXAqANGHQAAJAMYGnAd9/QAAAAASUVORK5CYII=";

// Sample cheque images for the prototype
export const chequeImage1 = "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?q=80&w=800&auto=format&fit=crop";
export const chequeImage2 = "https://images.unsplash.com/photo-1554224155-8d04cb21ed6c?q=80&w=800&auto=format&fit=crop";
export const chequeImage3 = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop";
export const chequeImage4 = "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?q=80&w=800&auto=format&fit=crop";
export const chequeImage5 = "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=800&auto=format&fit=crop";

// Sample receipt images
export const receiptImage1 = "https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?q=80&w=800&auto=format&fit=crop";
export const receiptImage2 = "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=800&auto=format&fit=crop";

// Random sample images array for easy selection
export const sampleChequeImages = [
  chequeImage1,
  chequeImage2,
  chequeImage3,
  chequeImage4,
  chequeImage5,
  receiptImage1,
  receiptImage2
];

// Function to get a random cheque image
export const getRandomChequeImage = () => {
  const randomIndex = Math.floor(Math.random() * sampleChequeImages.length);
  return sampleChequeImages[randomIndex];
}; 