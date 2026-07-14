import React from 'react';
import GalleryItem from './GalleryItem';

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

interface GalleryProps {
  designs: Design[];
  onImageClick: (images: string[], currentIndex: number) => void;
  onToast: (message: string, type?: string) => void;
}

const Gallery: React.FC<GalleryProps> = ({ designs, onImageClick, onToast }) => {
  if (designs.length === 0) {
    return (
      <div className="border border-dashed border-border bg-card px-8 py-16 text-center">
        <p className="font-display text-2xl text-foreground mb-2">No builds match</p>
        <p className="text-sm text-muted-foreground">
          Clear a filter or pick another realm / mansion.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between mb-5">
        <p className="text-sm text-muted-foreground">
          Collection
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          {designs.length} {designs.length === 1 ? 'build' : 'builds'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {designs.map((design) => (
          <GalleryItem
            key={design.id}
            design={design}
            onImageClick={onImageClick}
            onToast={onToast}
          />
        ))}
      </div>
    </div>
  );
};

export default Gallery;
