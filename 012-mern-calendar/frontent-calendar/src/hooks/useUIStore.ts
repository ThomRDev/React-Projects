import { useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal, RootState, useAppDispatch } from "../store"

export const useUIStore = () => {
  const dispatch = useAppDispatch()

  const { isDateModalOpen } = useSelector((state:RootState)=>state.ui)

  const openDateModal = () => {
    dispatch(onOpenDateModal())
  }

  const closeDateModal = () => {
    dispatch(onCloseDateModal())
  }

  return {
    isDateModalOpen,

    // metodos
    openDateModal,
    closeDateModal
  }

}
