class ChatBox {
    constructor() {
      this.args = {
        openButton: document.querySelector(".chatbox__button"),
        chatBox: document.querySelector(".chatbox__support"),
        sendButton: document.querySelector(".send__button"),
      };
  
      this.state = false;
      this.messages = [];
    }
  
    display() {
      const { openButton, chatBox, sendButton } = this.args;
  
      openButton.addEventListener("click", () => {
        this.toggleState(chatBox);
        setTimeout(() => {
            this.sendGreeting(chatBox); // Send greeting message after a short delay
          }, 500);
        });
      sendButton.addEventListener("click", () => this.onSendButton(chatBox));
  
      const node = chatBox.querySelector("input");
      node.addEventListener("keyup", ({ key }) => {
        if (key === "Enter") {
          this.onSendButton(chatBox);
        }
      });
    }
  
    toggleState(chatbox) {
      this.state = !this.state;
  
      if (this.state) {
        chatbox.classList.add("chatbox_active");
      } else {
        chatbox.classList.remove("chatbox_active");
      }
    }
  
    sendGreeting(chatbox) {
      const greeting = "Hello! How can I assist you today?";
      const msg = { name: "Dr. Derma", message: greeting };
      this.messages.push(msg);
      this.updateChatText(chatbox);
    }
  
    onSendButton(chatbox) {
      var textField = chatbox.querySelector("input");
      let text1 = textField.value;
      if (text1 === "") {
        return;
      }
  
      let msg1 = { name: "User", message: text1 };
      this.messages.push(msg1);
      this.updateChatText(chatbox);
  
      // Display typing effect
      let msg2 = { name: "Dr. Derma", message: "..." };
      this.messages.push(msg2);
      this.updateChatText(chatbox);
  
      setTimeout(() => {
        fetch("http://127.0.0.1:5000/chatbot", {
          method: "POST",
          body: JSON.stringify({ user_input: text1 }),
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((r) => r.json())
          .then((r) => {
            let msg3 = { name: "Dr. Derma", message: r.response }; 
            this.messages.pop(); // Remove typing effect message
            this.messages.push(msg3);
            this.updateChatText(chatbox);
            textField.value = "";
          })
          .catch((error) => {
            console.error("Error:", error);
            this.updateChatText(chatbox);
            textField.value = "";
          });
      }, 1000);
    }      
  
    updateChatText(chatbox) {
      var html = "";
      this.messages.slice().reverse().forEach(function (item, index) {
        if (item.name === "Dr. Derma") {
          html +=
            '<div class="messages__item messages__item_visitor">' +
            item.message +
            "</div>";
        } else {
          html +=
            '<div class="messages__item messages__item_operator">' +
            item.message +
            "</div>";
        }
      });
      const chatmessage = chatbox.querySelector(".chatbox__messages");
      chatmessage.innerHTML = html;
  
      // Apply fade-in animation to chat messages
      const messages = chatmessage.querySelectorAll(".messages__item");
      messages.forEach(((message) => {
        message.style.opacity = 0;
        message.style.transform = "translateY(20px)";
        message.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      
        setTimeout(() => {
          message.style.opacity = 1;
          message.style.transform = "translateY(0)";
        }, 50);
      }));
      
      // Apply typing animation to latest message
      const latestMessage = messages[messages.length - 1];
      if (latestMessage && latestMessage.innerText === "...") {
        const typingDot = document.createElement("span");
        typingDot.classList.add("typing-dot");
        typingDot.innerText = ".";
        latestMessage.innerHTML = "Dr. Derma is typing" + typingDot.outerHTML;
      
        let i = 1;
        setInterval(() => {
          typingDot.innerText = ".".repeat(i % 4 + 1);
          i++;
        }, 400);
      }
    }
}

const chatbox = new ChatBox();
chatbox.display();      
