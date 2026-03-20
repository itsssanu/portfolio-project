export const sendContactMail = async (formData) => {
  const res = await fetch("http://localhost:5000/api/send-mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return res.json();
};