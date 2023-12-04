import { defineStore } from 'pinia'
type MODAL_VIEWS =
  | 'ADD_PAYMENT_MODAL'
  | 'ADD_GUEST_MODAL'
  | 'ADD_RESERVATION_MODAL'
  | 'ADD_SERVICE_MODAL'
  | 'CHANGE_ROOM_STATUS_MODAL'
  | 'CHANGE_ROOM_TYPE_MODAL'
  | ''

export const useModalsStore = defineStore({
  id: 'modals-store',
  state: () => ({
    displayModal: false,
    modalView: ''
  }),
  actions: {
    toggleModal() {
      this.displayModal = !this.displayModal
    },
    openModal() {
      this.displayModal = true
    },
    closeModal() {
      this.displayModal = false
    },
    setModalView(view: MODAL_VIEWS) {
      this.modalView = view
    }
  }
})
