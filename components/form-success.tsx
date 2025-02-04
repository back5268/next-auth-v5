import { BsExclamationTriangle } from "react-icons/bs";

interface FormSuccessProps {
  message: string | undefined;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    message && (
      <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
        <BsExclamationTriangle className="h-4 w-4" />
        <p>{message}</p>
      </div>
    )
  );
};
