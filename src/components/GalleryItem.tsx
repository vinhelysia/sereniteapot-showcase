import React, { useState, useEffect } from 'react';
import { designTypes, realmTypes, mansionTypes } from '../data/showcaseData';

interface Design {
  id: string | number;
  title: string;
  designType: string;
  realmType?: string;
  mansionType?: string;
  replicaId?: string;
  replicaIds?: string[] | { part: string; id: string }[];
  server: string;
  owner: {
    name: string;
    url: string;
  };
  images: string[];
}

interface GalleryItemProps {
  design: Design;
  onImageClick: (images: string[], currentIndex: number) => void;
  onToast: (message: string, type?: string) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ design, onImageClick, onToast }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Auto-slideshow on hover
  useEffect(() => {
    if (isHovered && design.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % design.images.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered, design.images.length]);

  const handleReplicaIdClick = (id: string) => {
    navigator.clipboard.writeText(id);
    onToast('Replica ID copied to clipboard!');
  };

  const getContextInfo = () => {
    if (design.designType === 'ex' && design.realmType) {
      return realmTypes[design.realmType as keyof typeof realmTypes];
    }
    if (design.designType === 'in' && design.mansionType) {
      return mansionTypes[design.mansionType as keyof typeof mansionTypes];
    }
    return '';
  };

  const replicaData = design.replicaIds 
    ? (Array.isArray(design.replicaIds) && design.replicaIds.length > 0 && 
       typeof design.replicaIds[0] === 'object' && 'part' in design.replicaIds[0] && 'id' in design.replicaIds[0]
        ? design.replicaIds as { part: string; id: string }[]
        : (design.replicaIds as string[]).map(id => ({ part: '', id: String(id) })))
    : (design.replicaId ? [{ part: '', id: design.replicaId }] : []);

  return (
    <div className="bg-card rounded-lg shadow-card hover-lift overflow-hidden">
      {/* Image Section */}
      <div 
        className="relative aspect-video overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onImageClick(design.images, currentImageIndex)}
      >
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        <img
          src={design.images[currentImageIndex]}
          alt={design.title}
          className={`w-full h-full object-cover transition-smooth ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Image Navigation Dots */}
        {design.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {design.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-smooth ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Design Type Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {designTypes[design.designType as keyof typeof designTypes]}
          </span>
        </div>

        {/* Server Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {design.server}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{design.title}</h3>
        
        {getContextInfo() && (
          <p className="text-muted-foreground mb-3">{getContextInfo()}</p>
        )}

        {/* Replica IDs */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            Replica ID{replicaData.length > 1 ? 's' : ''}:
          </h4>
          <div className="flex flex-wrap gap-2">
            {replicaData.map((replica, index) => (
              <button
                key={index}
                onClick={() => handleReplicaIdClick(replica.id)}
                className="bg-accent text-accent-foreground px-3 py-1 rounded-lg text-sm font-mono hover:bg-accent/80 transition-smooth"
                title="Click to copy"
              >
                {replica.part && replica.part.trim() !== '' ? `${replica.part}: ${replica.id}` : replica.id}
              </button>
            ))}
          </div>
        </div>

        {/* Owner Info */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Created by:</span>
          <a
            href={design.owner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary transition-smooth font-medium"
          >
            {design.owner.name} ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default GalleryItem;