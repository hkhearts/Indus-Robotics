import React from "react";
import { useModals } from "./ModalContext";
import { SearchModal } from "./SearchModal";
import { QuickEnquiryModal } from "./QuickEnquiryModal";
import { QuoteModal } from "./QuoteModal";
import { EngineerModal } from "./EngineerModal";

export function GlobalModals() {
  const { activeModal, closeModal } = useModals();

  return (
    <>
      <SearchModal isOpen={activeModal === "search"} onClose={closeModal} />
      <QuickEnquiryModal isOpen={activeModal === "quick"} onClose={closeModal} />
      <QuoteModal isOpen={activeModal === "quote"} onClose={closeModal} />
      <EngineerModal isOpen={activeModal === "engineer"} onClose={closeModal} />
    </>
  );
}
