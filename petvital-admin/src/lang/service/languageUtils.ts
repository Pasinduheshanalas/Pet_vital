import { useState } from "react";
import i18n from "i18next";

export function useLanguageSelect() {
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: localStorage.getItem("selectedLanguageCode") || null,
    text: "Select Language",
  });

  const handleLanguageSelect = (code: string | undefined, text: any) => {
    if (code) {
      setSelectedLanguage({ code, text });

      const direction = i18n.dir(code);

      localStorage.setItem("selectedLanguageCode", code);
      localStorage.setItem("isRTL", direction);

      window.dispatchEvent(new Event("storage"));

      document.body.setAttribute("dir", direction);

      i18n.changeLanguage(code);
    } else {
      setSelectedLanguage({ code: null, text: "Select Language" });

      const direction = i18n.dir(navigator.language);

      localStorage.removeItem("selectedLanguageCode");
      localStorage.setItem("isRTL", direction);

      document.body.setAttribute("dir", direction);
    }
  };

  return { selectedLanguage, handleLanguageSelect };
}
