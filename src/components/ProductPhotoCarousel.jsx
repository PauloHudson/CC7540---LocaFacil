import React, { useEffect, useState } from 'react';
import './ProductPhotoCarousel.css';
import { PLACEHOLDER_DATA_URI } from '../utils/placeholder';

const parseImageUrls = (imageUrls) => {
  if (!imageUrls) {
    return [];
  }

  if (Array.isArray(imageUrls)) {
    return imageUrls.filter(Boolean);
  }

  return String(imageUrls)
    .split(/[,\n]/)
    .map((url) => url.trim())
    .filter(Boolean);
};

const ProductPhotoCarousel = ({ type = 'vehicle', name, brand, model, imageUrls }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fallbackUsed, setFallbackUsed] = useState({});

  const customImageUrls = parseImageUrls(imageUrls);
  const images = customImageUrls.length
    ? customImageUrls.map((src) => ({
        query: src,
        src,
        fallback: PLACEHOLDER_DATA_URI,
      }))
    : [
        {
          query: 'placeholder',
          src: PLACEHOLDER_DATA_URI,
          fallback: PLACEHOLDER_DATA_URI,
        },
      ];

  useEffect(() => {
    setActiveIndex(0);
    setFallbackUsed({});
  }, [name, brand, model, type, imageUrls]);

  useEffect(() => {
    if (images.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [images.length]);

  if (!images.length) {
    return null;
  }

  const currentImage = images[activeIndex];

  const handleImageError = (event, imageIndex) => {
    if (fallbackUsed[imageIndex]) {
      return;
    }

    setFallbackUsed((current) => ({ ...current, [imageIndex]: true }));
    event.currentTarget.src = images[imageIndex].fallback;
  };

  return (
    <div className="product-carousel">
      <div className="product-carousel__frame">
        <img
          src={currentImage.src}
          alt={`${name || model || 'Produto'} - foto ${activeIndex + 1}`}
          className="product-carousel__image"
          onError={(event) => handleImageError(event, activeIndex)}
        />

        <div className="product-carousel__overlay">
          <span className="product-carousel__label">
            {customImageUrls.length ? '' : 'Imagem padrão'}
          </span>
          <span className="product-carousel__counter">
            {activeIndex + 1}/{images.length}
          </span>
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="product-carousel__control product-carousel__control--prev"
              onClick={() => setActiveIndex((current) => (current - 1 + images.length) % images.length)}
              aria-label="Foto anterior"
            >
              ‹
            </button>
            <button
              type="button"
              className="product-carousel__control product-carousel__control--next"
              onClick={() => setActiveIndex((current) => (current + 1) % images.length)}
              aria-label="Próxima foto"
            >
              ›
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="product-carousel__dots" aria-label="Selecionar foto">
          {images.map((image, index) => (
            <button
              key={image.query}
              type="button"
              className={`product-carousel__dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Mostrar foto ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPhotoCarousel;