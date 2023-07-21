type Props = {
  frequency: number;
  bandwidth: number;
};

export const SpecBox = ({ frequency, bandwidth }: Props) => {
  return (
    <div className="box has-background-black-ter p-1 mb-2">
      <div className="is-flex is-justify-content-space-evenly">
        <p className=" has-text-light has-text-right is-size-7">
          {`${(frequency / 1000 / 1000).toFixed(1)} MHz`}
        </p>
        <p className=" has-text-light has-text-left is-size-7">
          {`${(bandwidth / 1000).toFixed()} kHz`}
        </p>
      </div>
    </div>
  );
};
