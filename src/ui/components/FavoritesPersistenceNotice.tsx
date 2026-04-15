type Props = { message: string | null };

export const FavoritesPersistenceNotice = ({ message }: Props) => {
  if (!message) return null;
  return (
    <div className="banner err" data-testid="favorites-persist-error">
      {message}
    </div>
  );
};
