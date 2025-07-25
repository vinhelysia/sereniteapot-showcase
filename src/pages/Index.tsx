import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import FilterControls from '../components/FilterControls';
import Gallery from '../components/Gallery';
import Modal from '../components/Modal';

import Footer from '../components/Footer';
import Toast from '../components/Toast';
import { showcaseData } from '../data/showcaseData';

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

const Index = () => {
  const [filters, setFilters] = useState({
    designType: '',
    contextType: '',
    server: ''
  });
  
  const [filteredDesigns, setFilteredDesigns] = useState<Design[]>(showcaseData);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [modalCurrentIndex, setModalCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success');
  const [isToastVisible, setIsToastVisible] = useState(false);

  // Filter designs based on current filters
  const filterDesigns = useCallback(() => {
    let filtered = showcaseData;

    if (filters.designType) {
      filtered = filtered.filter(design => design.designType === filters.designType);
    }

    if (filters.contextType) {
      filtered = filtered.filter(design => {
        if (filters.designType === 'ex') {
          return design.realmType === filters.contextType;
        } else if (filters.designType === 'in') {
          return design.mansionType === filters.contextType;
        }
        return true;
      });
    }

    if (filters.server) {
      filtered = filtered.filter(design => design.server === filters.server);
    }

    setFilteredDesigns(filtered);
  }, [filters]);

  useEffect(() => {
    filterDesigns();
  }, [filterDesigns]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleFilterReset = () => {
    setFilters({
      designType: '',
      contextType: '',
      server: ''
    });
  };

  const handleImageClick = (images: string[], currentIndex: number) => {
    setModalImages(images);
    setModalCurrentIndex(currentIndex);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalIndexChange = (index: number) => {
    setModalCurrentIndex(index);
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setIsToastVisible(true);
  };

  const hideToast = () => {
    setIsToastVisible(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 py-12">
        <FilterControls
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleFilterReset}
        />
        
        <Gallery
          designs={filteredDesigns}
          onImageClick={handleImageClick}
          onToast={showToast}
        />
      </main>



      <Footer />

      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        images={modalImages}
        currentIndex={modalCurrentIndex}
        onIndexChange={handleModalIndexChange}
      />

      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={isToastVisible}
        onHide={hideToast}
      />
    </div>
  );
};

export default Index;
