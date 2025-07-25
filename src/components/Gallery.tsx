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
      <div className="text-center py-16">
        <div className="bg-card rounded-lg shadow-card p-12 max-w-md mx-auto">
          <div className="text-6xl mb-4 opacity-50">🏠</div>
          <h3 className="text-2xl font-semibold text-foreground mb-2">No designs found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more designs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {designs.map((design) => (
        <GalleryItem
          key={design.id}
          design={design}
          onImageClick={onImageClick}
          onToast={onToast}
        />
      ))}
    </div>
  );
};

export default Gallery;