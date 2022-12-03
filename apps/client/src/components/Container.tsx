interface Props {
  className?: string;
  children: React.ReactNode;
  maxW?: string;
}

const Container: React.FC<Props> = ({
  className,
  children,
  maxW = "max-w-[min(90%,78.125rem)]",
}) => {
  return (
    <div className={`${maxW} mx-auto h-full ${className}`}>{children}</div>
  );
};

export default Container;
