import { create } from "zustand";

const useModalStore = create((set, get) => ({
  isOpen: false,
  title: "",
  content: null,
  modalQueue: [],
  modalStack: [],

  openModal: (title, content, options = {}) => {
    const { isStacked = false } = options;
    const currentState = get();

    if (isStacked && currentState.isOpen) {
      set({
        modalStack: [
          ...currentState.modalStack,
          {
            title: currentState.title,
            content: currentState.content,
          },
        ],
        isOpen: true,
        title,
        content,
      });
    } else {
      set({
        isOpen: true,
        title,
        content,
      });
    }
  },

  queueModal: (title, content) => {
    set((state) => ({
      modalQueue: [...state.modalQueue, { title, content }],
    }));
  },

  closeModal: () => {
    const { modalQueue, modalStack } = get();

    if (modalStack.length > 0) {
      const previousModal = modalStack[modalStack.length - 1];
      const newStack = modalStack.slice(0, -1);
      set({
        title: previousModal.title,
        content: previousModal.content,
        modalStack: newStack,
      });
    } else if (modalQueue.length > 0) {
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
        modalStack: [],
        modalQueue: [],
      });
    }
  },
}));

export default useModalStore;
