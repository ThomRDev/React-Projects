import { addHours } from "date-fns";
import { useAuthStore, useCalendarStore, useUIStore } from "../../hooks";
import { TYPES_OF_ACTIVE_EVENTS } from "../../store";

// floating action button add new
export const FabAddNew = () => {
  const { openDateModal } = useUIStore();
  const { setActiveEvent } = useCalendarStore();
  const { user } = useAuthStore()

  const handleClickNew = () => {
    setActiveEvent({
      type: TYPES_OF_ACTIVE_EVENTS.NEW_EVENT,
      event: {
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2),
        bgColor: "#fafafa",
        user : {
          uid : user?.uid as string,
          name : user?.name as string
        },
      },
    });

    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus fa-2x" />
    </button>
  );
};
