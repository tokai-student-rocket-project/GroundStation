type Props = {
  msg1?: string;
  msg2?: string;
};

export const EventErrorBox = ({ msg1, msg2 }: Props) => {
  return (
    <div className="box has-background-black-ter p-2">
      <p className="has-text-light is-size-7">{msg1 ?? "-"}</p>
      <p className="has-text-light is-size-7">{msg2 ?? "-"}</p>
    </div>
  );
};
