const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const sendContactMail = async (formData) => {
  const res = await fetch(`${BASE_URL}/api/send-mail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  return res.json();
};