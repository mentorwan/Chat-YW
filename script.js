if (getCookie("id") == "") {
    uuid = uuidv4()
    document.cookie = "id=" + uuid
    document.getElementById("id").value = uuid
} else {
    document.getElementById("id").value = getCookie("id");
}
const idSession = get(".id_session");
const USER_ID = document.getElementById("id").value;
idSession.textContent = USER_ID
getHistory()

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const msgerSendBtn = get(".msger-send-btn");

var Button1click = 0;
var Button2click = 0;
var Button3click = 0;

// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "./gpt.png";
//const PERSON_IMG = "https://api.dicebear.com/5.x/micah/svg?seed=" + document.getElementById("id").value
const PERSON_IMG = "./tauri.png"
const BOT_NAME = "Assistant";
const PERSON_NAME = "Client";

// Function to delete chat history records for a user ID using the API
function deleteChatHistory(userId) {
    if (!confirm("Are you sure? Your Session and History will delete for good.")) {
        return false
    }

    fetch('/api.php?user=' + USER_ID, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting chat history: ' + response.statusText);
            }
            deleteAllCookies()
            location.reload(); // Reload the page to update the chat history table
        })
        .catch(error => console.error(error));
}


//auto hide sidebar
const sidebar = document.getElementById('sidebar');

//document.addEventListener('mousemove', (e) => {
//    if (e.clientX <= 50) { // Adjust the value for sensitivity
//        sidebar.style.left = '0';
//    } else {
//        sidebar.style.left = '-120px'; // Match the sidebar width in CSS
//    }
//});



// Event listener for the Delete button click
const deleteButton = document.querySelector('#delete-button');
deleteButton.addEventListener('click', event => {
    event.preventDefault();
    deleteChatHistory(USER_ID);
});

//Event listener for the button1 click
const Button1 = document.querySelector("#button1");
Button1.addEventListener('click',event => {
    event.preventDefault();
    Button1click = 1;
    Button2click = 0;
    Button3click = 0;

})

//Event listener for the button2 click
const Button2 = document.querySelector("#button2");
Button2.addEventListener('click',event => {
    event.preventDefault();
    Button1click = 0;
    Button2click = 1;
    Button3click = 0;
})

//Event listener for the button3 click
const Button3 = document.querySelector("#button3");
Button3.addEventListener('click',event => {
    event.preventDefault();
    Button1click = 0;
    Button2click = 0;
    Button3click = 1;

})


msgerForm.addEventListener("submit", event => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;
    
    console.log("Button1 " + Button1click);
    console.log("Button2 " + Button2click);
    console.log("Button3 " + Button3click);

    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";
  
    if (Button1click == 1){
        sendMsg1(msgText);
    } else if (Button2click == 1){
        sendMsg2(msgText);
    } else if (Button3click == 1){
        sendMsg3(msgText);
    }
});

function getHistory() {
    var formData = new FormData();
    formData.append('user_id', USER_ID);
    fetch('/api.php', {method: 'POST', body: formData})
        .then(response => response.json())
        .then(chatHistory => {
            for (const row of chatHistory) {
                appendMessage(PERSON_NAME, PERSON_IMG, "right", row.human);
                appendMessage(BOT_NAME, BOT_IMG, "left", row.ai, "");
            }
        })
        .catch(error => console.error(error));
}

function appendMessage(name, img, side, text, id) {
    //   Simple solution for small apps
    const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>
      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text" id=${id}>${text}</div>
      </div>
    </div>
  `;

    msgerChat.insertAdjacentHTML("beforeend", msgHTML);
    
    scrollToBottom();
    
    //console.log("scrollTop location:", msgerChat.scrollTop);
    
    
}

function sendMsg1(msg) {
    msgerSendBtn.disabled = true
    var formData = new FormData();
    formData.append('msg', msg);
    formData.append('user_id', USER_ID);
   
        fetch('/send-message.php', {method: 'POST', body: formData})
        .then(response => response.json())
        .then(data => {
            let uuid = uuidv4()
            const eventSource = new EventSource(`/event-stream1.php?chat_history_id=${data.id}&id=${encodeURIComponent(USER_ID)}`);
            appendMessage(BOT_NAME, BOT_IMG, "left", "", uuid);
            const div = document.getElementById(uuid);
            
            eventSource.onmessage = function (e) {
                if (e.data == "[DONE]") {
                	  msgerChat.scrollTop = msgerChat.scrollHeight;
                    msgerSendBtn.disabled = false
                    eventSource.close();
                } else {
                    let txt = JSON.parse(e.data).choices[0].delta.content
                    if (txt !== undefined) {
                        div.innerHTML += txt.replace(/(?:\r\n|\r|\n)/g, '<br>');
                    }
                    
                }
            };
            eventSource.onerror = function (e) {
                msgerSendBtn.disabled = false
                console.log(e);
                eventSource.close();
            };
        })
        .catch(error => console.error(error));

}


function sendMsg2(msg) {
    msgerSendBtn.disabled = true
    var formData = new FormData();
    formData.append('msg', msg);
    formData.append('user_id', USER_ID);
   
        fetch('/send-message.php', {method: 'POST', body: formData})
        .then(response => response.json())
        .then(data => {
            let uuid = uuidv4()
            const eventSource = new EventSource(`/event-stream2.php?chat_history_id=${data.id}&id=${encodeURIComponent(USER_ID)}`);
            appendMessage(BOT_NAME, BOT_IMG, "left", "", uuid);
            const div = document.getElementById(uuid);
            
            eventSource.onmessage = function (e) {
                if (e.data == "[DONE]") {
                	  msgerChat.scrollTop = msgerChat.scrollHeight;
                    msgerSendBtn.disabled = false
                    eventSource.close();
                } else {
                    let txt = JSON.parse(e.data).choices[0].delta.content
                    if (txt !== undefined) {
                        div.innerHTML += txt.replace(/(?:\r\n|\r|\n)/g, '<br>');
                    }
                    
                }
            };
            eventSource.onerror = function (e) {
                msgerSendBtn.disabled = false
                console.log(e);
                eventSource.close();
            };
        })
        .catch(error => console.error(error));
    

}

function sendMsg3(msg) {
    msgerSendBtn.disabled = true
    var formData = new FormData();
    formData.append('msg', msg);
    formData.append('user_id', USER_ID);
   
        fetch('/send-message.php', {method: 'POST', body: formData})
        .then(response => response.json())
        .then(data => {
            let uuid = uuidv4()
            const eventSource = new EventSource(`/event-stream3.php?chat_history_id=${data.id}&id=${encodeURIComponent(USER_ID)}`);
            appendMessage(BOT_NAME, BOT_IMG, "left", "", uuid);
            const div = document.getElementById(uuid);
            
            eventSource.onmessage = function (e) {
                if (e.data == "[DONE]") {
                	  msgerChat.scrollTop = msgerChat.scrollHeight;
                    msgerSendBtn.disabled = false
                    eventSource.close();
                } else {
                    let txt = JSON.parse(e.data).choices[0].delta.content
                    if (txt !== undefined) {
                        div.innerHTML += txt.replace(/(?:\r\n|\r|\n)/g, '<br>');
                    }
                    
                }
            };
            eventSource.onerror = function (e) {
                msgerSendBtn.disabled = false
                console.log(e);
                eventSource.close();
            };
        })
        .catch(error => console.error(error));

}

// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

function formatDate(date) {
    const h = "0" + date.getHours();
    const m = "0" + date.getMinutes();

    return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function deleteAllCookies() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function formatCodeBlocks(text) {
  const codeBlockRegex = /```([\s\S]+?)```/g;
  return text.replace(codeBlockRegex, '<pre><code>$1</code></pre>');
}


// Function to scroll to the bottom of the messages
function scrollToBottom() {
  // Calculate the target scroll position
  const targetScrollTop = msgerChat.scrollHeight - msgerChat.clientHeight;

  // Animate the scrollTop property
  msgerChat.animate({ scrollTop: targetScrollTop }, 300);
}