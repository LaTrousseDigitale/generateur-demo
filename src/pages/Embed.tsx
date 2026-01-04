import { useEffect } from "react";
import { SalesQuizGenerator } from "@/components/sales-quiz/SalesQuizGenerator";

const Embed = () => {
  useEffect(() => {
    document.documentElement.classList.add('embed-mode');
    return () => {
      document.documentElement.classList.remove('embed-mode');
    };
  }, []);

  return <SalesQuizGenerator embedMode />;
};

export default Embed;
