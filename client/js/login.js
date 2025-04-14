
const elForm = document.querySelector(".login-form");

elForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  localStorage.setItem("name", name);

  try {
    const res = await fetch("http://10.10.1.110:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name }),
    });
    
    if (!res.ok) {
      const text = await res.text(); 
      throw new Error("Xatolik: " + res.status + " | Javob: " + text);
    }
    
    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data.data))
    
    window.location.href = "/";
  } catch (error) {
    console.error("Login xatosi:", error);
    alert(error.message);
  }
});
