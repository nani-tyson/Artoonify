import cv2
import numpy as np
from typing import Union

class Cartoonifier:
    def __init__(self):
        self.texture_cache = None
    
    def _generate_texture(self, height: int, width: int) -> np.ndarray:
        """Generate reusable paper-like texture pattern"""
        if self.texture_cache is None or self.texture_cache.shape[:2] != (height, width):
            noise = np.random.randint(0, 50, (height, width, 3), dtype=np.uint8)
            self.texture_cache = cv2.GaussianBlur(noise, (0, 0), 3)
        return self.texture_cache
    
    def _enhance_edges(self, img: np.ndarray, style: str = "comic") -> np.ndarray:
        """Improved edge detection with style-specific processing"""
        gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
        gray = cv2.medianBlur(gray, 5)
        
        if style == "comic":
            edges = cv2.Laplacian(gray, cv2.CV_8U, ksize=5)
            _, edges = cv2.threshold(edges, 50, 255, cv2.THRESH_BINARY_INV)
            kernel = np.ones((2, 2), np.uint8)
            edges = cv2.dilate(edges, kernel, iterations=1)
        elif style == "anime":
            edges = cv2.adaptiveThreshold(
                gray, 255,
                cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                cv2.THRESH_BINARY_INV,
                blockSize=9,
                C=2
            )
        elif style == "pixel":
            edges = cv2.Canny(gray, 100, 200)
            edges = cv2.dilate(edges, np.ones((2, 2), np.uint8), iterations=1)
        else:  # watercolor
            edges = cv2.Canny(gray, 50, 150)
            edges = cv2.dilate(edges, np.ones((1, 1), np.uint8), iterations=1)
        
        return cv2.cvtColor(edges, cv2.COLOR_GRAY2RGB)
    
    def _quantize_colors(self, img: np.ndarray, palette_size: int = 8) -> np.ndarray:
        """Advanced color quantization in LAB color space"""
        lab = cv2.cvtColor(img, cv2.COLOR_RGB2LAB)
        data = lab.reshape((-1, 3)).astype(np.float32)
        
        criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 1.0)
        _, labels, centers = cv2.kmeans(
            data, palette_size, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS
        )
        
        centers = np.uint8(centers)
        quantized = centers[labels.flatten()].reshape(img.shape)
        return cv2.cvtColor(quantized, cv2.COLOR_LAB2RGB)
    
    def _add_texture(self, img: np.ndarray, intensity: float = 0.2) -> np.ndarray:
        """Add hand-drawn texture effect"""
        texture = self._generate_texture(img.shape[0], img.shape[1])
        return cv2.addWeighted(img, 1 - intensity, texture, intensity, 0)
    
    def _watercolor_effect(self, img: np.ndarray) -> np.ndarray:
        """Special watercolor processing"""
        filtered = cv2.bilateralFilter(img, d=15, sigmaColor=100, sigmaSpace=100)
        smoothed = cv2.edgePreservingFilter(filtered, flags=cv2.RECURS_FILTER, sigma_s=100)
        edges = self._enhance_edges(smoothed, "watercolor")
        return cv2.bitwise_and(smoothed, 255 - edges)
    
    def _pixel_art_effect(self, img: np.ndarray, pixel_size: int = 8) -> np.ndarray:
        """Create pixel art style"""
        small = cv2.resize(img, 
                         (img.shape[1] // pixel_size, img.shape[0] // pixel_size),
                         interpolation=cv2.INTER_NEAREST)
        return cv2.resize(small, 
                         (img.shape[1], img.shape[0]),
                         interpolation=cv2.INTER_NEAREST)
    
    def process_image(
        self,
        img: np.ndarray,
        style: str = "comic",
        edge_strength: float = 0.8,
        palette_size: int = 8
    ) -> np.ndarray:
        """Main processing pipeline"""
        # Validate input
        if len(img.shape) == 2:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
        elif img.shape[2] == 4:
            img = img[:, :, :3]
        
        # Special style pipelines
        if style == "watercolor":
            return self._watercolor_effect(img)
        if style == "pixel":
            return self._pixel_art_effect(img)
        
        # Standard pipeline
        smoothed = cv2.bilateralFilter(
            img,
            d=max(3, int(9 * edge_strength)),
            sigmaColor=max(5, int(75 * (1.5 - edge_strength))),
            sigmaSpace=max(5, int(75 * (1.5 - edge_strength)))
        )
        
        edges = self._enhance_edges(smoothed, style)
        quantized = self._quantize_colors(smoothed, palette_size)
        
        cartoon = cv2.bitwise_and(quantized, edges) if style == "comic" else cv2.bitwise_and(quantized, 255 - edges)
        cartoon = self._add_texture(cartoon, 0.2)
        
        if style == "anime":
            kernel = np.array([[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]])
            cartoon = cv2.filter2D(cartoon, -1, kernel)
        
        return cartoon

# Singleton instance for Flask app
cartoonifier = Cartoonifier()

def cartoonify_image(img: np.ndarray, style: str = "comic") -> np.ndarray:
    """Wrapper function for Flask endpoint"""
    return cartoonifier.process_image(img, style=style)