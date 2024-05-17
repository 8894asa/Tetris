type Props = {
  className?: string;
};

export function Block({ className = "" }: Props) {
  return (
    <div className={`h-block w-block border border-gray-400 ${className}`} />
  );
}
