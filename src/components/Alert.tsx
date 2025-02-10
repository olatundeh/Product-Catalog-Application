import { cn } from "@/lib/utils"

interface AlertProps {
  type: 'success' | 'error';
  message: string;
}

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const alertClasses = cn(
    "p-4 rounded",
    type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
  );

  return (
    <div className={alertClasses} role="alert">
      {message}
    </div>
  );
};