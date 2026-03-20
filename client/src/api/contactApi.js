export const sendContactMail = async (formData) => {
  try {
    const res = await fetch("https://portfolio-api.onrender.com/api/send-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Contact form error:", err);
    throw err;
  }
};