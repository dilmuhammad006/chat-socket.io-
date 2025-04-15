
const elForm = document.querySelector(".login-form");

elForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = e.target.name.value;
  const room = e.target.room.value
  localStorage.setItem("name", name);

  try {
    const res = await fetch("http://192.168.29.74:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name }),
    });
    

    if (!res.ok) {
      const text = await res.text(); 
      throw new Error(text);
    }
    
    const data = await res.json();
    localStorage.setItem("user", JSON.stringify(data.data))
    localStorage.setItem("room", room)
    
    
    window.location.href = "/";
  } catch (error) {
    console.error("Login xatosi:", error);
    alert(error.message);
  }
});
