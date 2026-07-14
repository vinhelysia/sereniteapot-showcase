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
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (isHovered && design.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % design.images.length);
      }, 2200);
      return () => clearInterval(interval);
    }
  }, [isHovered, design.images.length]);

  const isWorld = design.designType === 'world';
  const idLabel = isWorld ? 'Stage GUID' : 'Replica ID';

  const copyText = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }
    // Fallback for non-secure contexts
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const handleReplicaIdClick = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await copyText(id);
      setCopiedId(id);
      onToast(`${idLabel} copied`);
      window.setTimeout(() => {
        setCopiedId((current) => (current === id ? null : current));
      }, 900);
    } catch {
      onToast(`Couldn't copy ${idLabel}`, 'error');
    }
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

  const context = getContextInfo();
  const anyLoaded = Object.values(loaded).some(Boolean);

  return (
    <article className="catalog-card group flex flex-col border border-border bg-card overflow-hidden h-full">
      <div
        className="catalog-media relative aspect-[4/3] overflow-hidden cursor-pointer bg-muted"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onImageClick(design.images, currentImageIndex)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onImageClick(design.images, currentImageIndex);
          }
        }}
        aria-label={`View photos of ${design.title}`}
      >
        {!anyLoaded && (
          <div className="absolute inset-0 bg-muted" />
        )}

        {design.images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={index === currentImageIndex ? design.title : ''}
            aria-hidden={index !== currentImageIndex}
            className={`absolute inset-0 w-full h-full object-cover ${
              index === currentImageIndex && loaded[index] ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
            onError={() => setLoaded((prev) => ({ ...prev, [index]: true }))}
          />
        ))}

        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <span className="chip">
            {designTypes[design.designType as keyof typeof designTypes]}
          </span>
        </div>
        <div className="absolute top-2.5 right-2.5">
          <span className="chip-soft">{design.server}</span>
        </div>

        {design.images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {design.images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'w-4 bg-light'
                    : 'w-1.5 bg-light/50 hover:bg-light/80'
                }`}
                aria-label={`Image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h3 className="font-display text-xl leading-snug text-foreground">
            {design.title}
          </h3>
          {context && (
            <p className="mt-1 text-sm text-muted-foreground">{context}</p>
          )}
        </div>

        {replicaData.length > 0 && (
          <div>
            <p className="text-[11px] font-medium text-muted-foreground mb-1.5">
              {idLabel}{replicaData.length > 1 ? 's' : ''}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {replicaData.map((replica, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={(e) => handleReplicaIdClick(e, replica.id)}
                  className={`stamp ${copiedId === replica.id ? 'stamp-copied' : ''}`}
                  title={`Click to copy ${idLabel}`}
                  aria-label={`Copy ${idLabel} ${replica.id}`}
                >
                  {replica.part && replica.part.trim() !== ''
                    ? `${replica.part}: ${replica.id}`
                    : replica.id}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between gap-2">
          <span className="text-xs text-muted-foreground">Builder</span>
          <a
            href={design.owner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-jade hover:underline underline-offset-4 transition-colors"
          >
            {design.owner.name}
          </a>
        </div>
      </div>
    </article>
  );
};

export default GalleryItem;
