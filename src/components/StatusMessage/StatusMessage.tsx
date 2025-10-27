interface StatusMessageProps {
  message: string;
  type?: "error" | "info" | "warning";
}

const typeStyles:{ [key: string]: string } = {
  error: "text-red-700",
  info: "text-gray-700",
  warning: "text-yellow-700",
};

export default function StatusMessage({ message, type = "info" }: StatusMessageProps) {
  return (
    <p className={`text-lg font-medium py-20 text-center ${typeStyles[type]}`}>
      {message}
    </p>
  );
}
