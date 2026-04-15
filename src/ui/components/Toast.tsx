type Props = {
  message: string | null;
};

export const Toast = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div className="toast" role="status" aria-live="polite">
      {message}
    </div>
  );
};
