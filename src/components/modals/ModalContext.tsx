import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type ModalType = "quote" | "engineer" | "search" | "quick" | null;

export interface ModalContextPayload {
  productName?: string;
  categoryName?: string;
  productSlug?: string;
  initialQuery?: string;
}

interface ModalContextValue {
  activeModal: ModalType;
  modalPayload: ModalContextPayload;
  openModal: (type: ModalType, payload?: ModalContextPayload) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [modalPayload, setModalPayload] = useState<ModalContextPayload>({});

  const openModal = useCallback((type: ModalType, payload?: ModalContextPayload) => {
    setModalPayload(payload || {});
    setActiveModal(type);
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalPayload({});
  }, []);

  return (
    <ModalContext.Provider value={{ activeModal, modalPayload, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
}
