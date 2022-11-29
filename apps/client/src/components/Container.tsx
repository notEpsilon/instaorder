interface Props {
  className?: string;
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ className, children }) => {
  return (
    <div className={`max-w-[min(90%,78.125rem)] mx-auto h-full ${className}`}>
      {children}
    </div>
  );
};

export default Container;
