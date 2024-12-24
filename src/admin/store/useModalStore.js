import { create } from "zustand";

const useModalStore = create((set, get) => ({
  isOpen: false,
  title: "",
  content: null,
  modalQueue: [],

  openModal: (title, content) => {
    set({
      isOpen: true,
      title,
      content,
    });
  },

  queueModal: (title, content) => {
    set((state) => ({
      modalQueue: [...state.modalQueue, { title, content }],
    }));
  },

  closeModal: () => {
    const { modalQueue } = get();
    if (modalQueue.length > 0) {
      const nextModal = modalQueue[0];
      const remainingQueue = modalQueue.slice(1);
      set({
        isOpen: true,
        title: nextModal.title,
        content: nextModal.content,
        modalQueue: remainingQueue,
      });
    } else {
      set({
        isOpen: false,
        title: "",
        content: null,
      });
    }
  },
}));

export default useModalStore;
