import CountUp from "react-countup";

const ReactCountUp = ({
  amt,
  className,
  prefix,
  decimals = false,
  children,
}: {
  amt: number;
  className?: string;
  prefix?: string;
  decimals?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <>
      <span className={`${className}`}>
        <CountUp
          end={amt}
          decimal="."
          prefix={prefix}
          decimals={decimals ? 2 : 0}
          duration={0.8}
        />
        {children}
      </span>
    </>
  );
};

export default ReactCountUp;
