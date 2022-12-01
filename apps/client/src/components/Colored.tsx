interface Props {
  className?: string;
  children: React.ReactNode;
  from: string;
  to: string;
}

const Colored: React.FC<Props> = ({ children, from, to, className }) => {
  return (
    <span
      className={`bg-gradient-to-r bg-clip-text text-transparent ${from} ${to} ${className}`}
    >
      {children}
    </span>
  );
};

export default Colored;
