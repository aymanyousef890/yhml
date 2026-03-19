/**
 * Image Optimization Configuration
 * Provides utilities for serving optimized images in different formats and sizes
 */

export interface ResponsiveImageConfig {
  src: string;
  alt: string;
  sizes?: string;
  srcSet?: string;
  width?: number;
  height?: number;
  quality?: number; // 1-100
}

/**
 * Generate srcset for responsive images
 * Example: generateSrcSet('image.jpg', 'jpg') 
 * Returns: image-320w.jpg 320w, image-640w.jpg 640w, image-1280w.jpg 1280w
 */
export const generateSrcSet = (src: string, ext: string): string => {
  const baseName = src.replace(/\.[^.]+$/, '');
  const sizes = [320, 640, 1280];

  return sizes.map((size) => `${baseName}-${size}w.${ext} ${size}w`).join(', ');
};

/**
 * Generate sizes attribute for responsive images
 */
export const generateSizes = (breakpoints: Record<string, string> = {}): string => {
  const defaultBreakpoints: Record<string, string> = {
    'max-width: 640px': '100vw',
    'max-width: 1024px': '80vw',
    'max-width: 1280px': '60vw',
    ...breakpoints,
  };

  return Object.entries(defaultBreakpoints)
    .map(([media, size]) => `(${media}) ${size}`)
    .join(', ');
};

/**
 * Preload critical images
 */
export const preloadImage = (src: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

/**
 * Create picture element for multiple formats
 */
export interface PictureConfig {
  webp: string;
  jpeg: string;
  alt: string;
  className?: string;
  sizes?: string;
}

export const createPictureElement = (config: PictureConfig): string => {
  const webpSrcSet = generateSrcSet(config.webp, 'webp');
  const jpegSrcSet = generateSrcSet(config.jpeg, 'jpg');
  const sizes = config.sizes || generateSizes();

  return `
    <picture>
      <source srcset="${webpSrcSet}" sizes="${sizes}" type="image/webp" />
      <source srcset="${jpegSrcSet}" sizes="${sizes}" type="image/jpeg" />
      <img 
        src="${config.jpeg}" 
        alt="${config.alt}"
        class="${config.className || ''}"
        loading="lazy"
        decoding="async"
      />
    </picture>
  `;
};
