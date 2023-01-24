interface CalendarEventProps {
  event: {
    title: string;
    user: {
      name: string;
    };
  };
}

// en el caso tengamos muchos eventos en el calendario este componente
// se renderizara a cada rato, lo cual si este componente crece
// es mejor usar el React.memo
export const CalendarEvent = ({ event }: CalendarEventProps) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};
