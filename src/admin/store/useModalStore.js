import { create } from "zustand";

const useModalStore = create((set, get) => ({
  isOpen: false,
  title: "",
  content: null,
  dynamicButtonLabel: "",
  dynamicButtonCallback: () => {},
  modalQueue: [],

  openModal: (title, content) =>
    set({
      isOpen: true,
      title,
      content,
    }),

  closeModal: () => {
    const { modalQueue } = get();
    if (modalQueue.length > 0) {
      const nextModal = modalQueue.shift();
      set({
        isOpen: true,
        title: nextModal.title,
        content: nextModal.content,
        modalQueue,
      });
    } else {
      set({
        isOpen: false,
        title: "",
        content: null,
        dynamicButtonLabel: "",
        dynamicButtonCallback: () => {},
      });
    }
  },

  queueModal: (title, content) => {
    const { modalQueue } = get();
    set({
      modalQueue: [...modalQueue, { title, content }],
    });
  },
}));

export default useModalStore;
