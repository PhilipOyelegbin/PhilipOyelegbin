import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const QuickChat = () => {
  return (
    <Link
      href="https://wa.me/2348054945601?text=Hi Philip, I need your service as a ..."
      className="fixed bottom-20 right-4"
      target="_blank"
    >
      <FaWhatsapp className="p-2 text-5xl animate-pulse bg-lime-500 text-white rounded-full shadow-lg" />
    </Link>
  );
};

export default QuickChat;
