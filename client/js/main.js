import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
const socket = io("http://10.10.1.110:3000");

const elMessages = document.querySelector(".messages");
const elForm = document.querySelector(".message-form");
const elInput = document.querySelector(".message-input");
const elTyping = document.querySelector(".typing-text");

socket.on("message", (msgs) => {
  let user = JSON.parse(localStorage.getItem("user"));

  elMessages.innerHTML = "";

  msgs.forEach((m) => {
    if (m.type === "message") {
      if (m.user?._id == user?._id) {
        elMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="my-message align-self-end">
            <p class="message border d-inline p-2 rounded-3">
             ${m.text}
            </p>
            <div class="author fs-6 fw-bolder mb-2 text-end">
              ${user?.name.slice(0, 10)} <span>${new Date(
            m.createdAt
          ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}</span>
            </div>
          </div>`
        );
      } else {
        elMessages.insertAdjacentHTML(
          "beforeend",
          `<div class="other-message">
            <p class="message border d-inline p-2 rounded-3">
            ${m.text}
            </p>
            <div class="author fs-6 fw-bolder mb-2">
             ${m.user?.name} <span>${new Date(m.createdAt).toLocaleTimeString(
            [],
            { hour: "2-digit", minute: "2-digit" }
          )}</span>
            </div>
          </div>`
        );
      }
    }

    if (m.type === "join_message") {
      elMessages.insertAdjacentHTML(
        "beforeend",
        `<div class="join-message text-center text-success border rounded-2">
            <p class="p-0 m-0">${m?.user?.name?.slice(0, 20)} qoshildi
          <span>${new Date(m.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}</span>            </p>
        </div>`
      );
    }
  });

  elMessages.scrollTop = elMessages.scrollHeight;
});

socket.on("typing", (user) => {
  elTyping.innerHTML = "";
  elTyping.textContent = `${user.name} yozayapti...`;

  setTimeout(() => {
    elTyping.textContent = "";
  }, 2000);
});

elInput.addEventListener("keyup", function (e) {
  let user = JSON.parse(localStorage.getItem("user"));
  socket.emit("typing", { user: user?._id });
});

elForm.addEventListener("submit", (e) => {
  let user = JSON.parse(localStorage.getItem("user"));

  e.preventDefault();

  const text = e.target.message.value;
  if (text.trim()) {
    socket.emit("message", { user: user?._id, text });
    elInput.value = "";
  }
});
