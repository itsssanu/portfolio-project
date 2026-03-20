export const sendContactMail = async (formData) => {
  const res = await fetch("https://portfolio-api.onrender.com/api/send-mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
};