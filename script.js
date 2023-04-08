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


// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "./gpt.png";
//const PERSON_IMG = "https://api.dicebear.com/5.x/micah/svg?seed=" + document.getElementById("id").value
const PERSON_IMG = "./tauri.png";
const BOT_NAME = "Assistant";
const PERSON_NAME = "Client";
const OPEN_AI_MODEL = "gpt-4";


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


document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const sideDrawer = document.getElementById('sidebar');
    const content = document.getElementById('msger');

    //content.classList.add('msger-collapsed');

    if (!content) {
        console.error('Element with ID "msger" not found');
        return;
    }

    content.style.width = '250%';  
    let isDrawerOpen = false;

    menuBtn.addEventListener('click', () => {
        isDrawerOpen = !isDrawerOpen;
        if (isDrawerOpen) {
            sideDrawer.style.transform = 'translateX(0)';
            content.style.width = '';
            
        } else {
            sideDrawer.style.transform = 'translateX(-300%)';
            content.style.width = '250%';
        }
    });
    
});

// Event listener for the Delete button click
const deleteButton = document.querySelector('#delete-button');
deleteButton.addEventListener('click', event => {
    event.preventDefault();
    deleteChatHistory(USER_ID);
});

var clickedButton = 'button1'; //default value

function onButtonClick(button) {
    clickedButton = button;
    console.log(clickedButton);
}


//Event listener for the button1 click
const Button1 = document.querySelector("#button1");
Button1.addEventListener('click',event => {
    event.preventDefault();
    clickedButton = 'button1';
})

//Event listener for the button2 click
const Button2 = document.querySelector("#button2");
Button2.addEventListener('click',event => {
    event.preventDefault();
    clickedButton = 'button2';
})

//Event listener for the button3 click
const Button3 = document.querySelector("#button3");
Button3.addEventListener('click',event => {
    event.preventDefault();
    clickedButton = 'button3';
})

//Event listener for the button3 click
const Button4 = document.querySelector("#button4");
Button4.addEventListener('click',event => {
    event.preventDefault();
    clickedButton = 'button4';
})

const Button5 = document.querySelector("#button5");
Button5.addEventListener('click',event => {
    event.preventDefault();
    clickedButton = 'button5';
})
const Button6 = document.querySelector("#button6");
Button6.addEventListener('click',event => {
    event.preventDefault();
    clickedButton = 'button6';
})


msgerForm.addEventListener("submit", event => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;
    
    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    msgerInput.value = "";
 
    sendMsg(msgText,clickedButton);
    if (clickedButton == 'button5'){
        console.log(msgText);
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

function appendMessage(name, img, side, text, id, isWriting = false) {
    const buttonOrTimeHTML = side === 'left' ?
        `<button class="copybutton" id="copyButton" onclick="copyToClipboard(this)">Copy</button>` :
        `<div class="msg-info-time">${formatDate(new Date())}</div>`;

    // Create the message element
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('msg', `${side}-msg`);

    messageContainer.innerHTML = `
        <div class="msg-img" style="background-image: url(${img})"></div>
        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                ${buttonOrTimeHTML}
            </div>
            <div class="msg-text" id="${id}">${text}</div>
        </div>
    `;

    // Add the writing-indicator class if isWriting is true
    if (isWriting) {
        messageContainer.querySelector('.msg-text').classList.add("writing-indicator");
    }

    // Append the message element to the msgerChat
    msgerChat.appendChild(messageContainer);

    scrollToBottom();
}


function sendMsg(msg, clickedButton) {
    msgerSendBtn.disabled = true
    var formData = new FormData();
    

    var system_prompt = "You are a helpful assistant.";
    var assistant_prompt = "You can answer any questions.";
    formData.append('msg', msg);
    formData.append('user_id', USER_ID);



   
        fetch('/send-message.php', {method: 'POST', body: formData})
        .then(response => response.json())
        .then(data => {
            let uuid = uuidv4();
            let open_ai_model = OPEN_AI_MODEL;


            switch(clickedButton) {
                case 'button1':
                    system_prompt = "You are a helpful assistant.";
                    assistant_prompt = "You can answer any questions.";
                    break;
                case 'button2':
                    system_prompt = "You are a grammar analyzer and fixer.";
                    assistant_prompt = "Fix the grammar in the original text using English without providing an explanation.";
                    break;
                case 'button3':
                    system_prompt = "You are a translation engine that can only translate text and cannot interpret it.";
                    assistant_prompt = "If the text is English, translate to Chinese without any comments. If the text is Chinese, translate from Chinese to English without comments.";
                    break;
                case 'button4':
                    system_prompt = "You are a stock market guru with experience in understanding charts using technical analysis tools, while interpreting the macroeconomic environment prevailing across the world. Please provide clear verdicts and inform short-term predictions.";
                    assistant_prompt = "What currently is the best way to invest money for short-term prospective?";
                    break;
                case 'button5':
                    system_prompt = "You are AP Statistics teacher, you want to test your student learning capabilities on AP Statistics problems.";
                    assistant_prompt = "Give me a question in AP Statistics test format.";
                    break;
                case 'button6':
                    system_prompt = "You are 9th grade English/Biology/History/Chinese teacher, you want to test your student learning capabilities on 9th grade English/Biology/History/Chinese problems.";
                    assistant_prompt = "Give me a question in 9th grade English/Biology/History/Chinese test format.";
                    break;
            }     
            
                   
            //const eventSource = new EventSource(`/event-stream.php?chat_history_id=${data.id}&id=${encodeURIComponent(USER_ID)}
            //&system_prompt=${encodeURIComponent(system_prompt)}&assistant_prompt=${encodeURIComponent(assistant_prompt)}
            //&open_ai_model=${encodeURIComponent(open_ai_model)}`);
            //console.log(msg)
            
            const eventSource = new EventSource(`/event-stream.php?chat_history_id=${data.id}&id=${encodeURIComponent(USER_ID)}
            &system_prompt=${encodeURIComponent(system_prompt)}&assistant_prompt=${encodeURIComponent(assistant_prompt)}
            &open_ai_model=${encodeURIComponent(open_ai_model)}&question=${encodeURIComponent(msg)}`
              );
            
            let accumulatedText = '';

            function customizeCodeBlocks(html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const codeBlocks = doc.querySelectorAll('pre > code');
            
                codeBlocks.forEach(codeBlock => {
                    codeBlock.parentElement.classList.add('custom-code');
                    codeBlock.classList.add('custom-code');
                });
            
                return doc.body.innerHTML;
            }
            

            // Store the UUID of the writing indicator message
            let writingIndicatorUUID;

            // Show the writing indicator message
            function showWritingIndicator(uuid) {
                writingIndicatorUUID = uuid;
                appendMessage(BOT_NAME, BOT_IMG, "left", "Writing...", writingIndicatorUUID, true);
            }

            // Remove the writing indicator message
            function removeWritingIndicator(uuid) {
                const writingIndicator = document.getElementById(uuid);
                if (writingIndicator) {
                    writingIndicator.innerHTML = '';
                }
            }

            showWritingIndicator(uuid);

            //appendMessage(BOT_NAME, BOT_IMG, "left", "", uuid);
            const div = document.getElementById(uuid);
            
            eventSource.onmessage = function (e) {
                if (e.data == "[DONE]") {
                	
                    // Remove the writing indicator
                    removeWritingIndicator(uuid);


                    let html = marked(accumulatedText);

                    // Apply custom CSS class to code blocks
                    html = customizeCodeBlocks(html);


                    div.innerHTML += html;

                    accumulatedText ='';

                    
                    msgerChat.scrollTop = msgerChat.scrollHeight;
                    msgerSendBtn.disabled = false
                    eventSource.close();
                } else {
                    let txt = JSON.parse(e.data).choices[0].delta.content
                    if (txt !== undefined) {
                        //const joinedTxt = txt.replace(/(?:\r\n|\r|\n)/g, '<br>');
                        // Set the innerHTML of the div to the formatted HTML
                        //div.innerHTML += joinedTxt;
                        accumulatedText += txt;
                    }

                     // Show the writing indicator if it's not already visible
                    if (!writingIndicatorUUID) {
                        showWritingIndicator(uuid);
                    }
                    
                }
            };
            eventSource.onerror = function (e) {
                msgerSendBtn.disabled = false
                console.error('Error event:', e);


                // Send an AJAX request to clear the database
                var xhr = new XMLHttpRequest();
                xhr.open('POST', 'clear_database.php', true);
                xhr.send();
                
                if (e.target.readyState === EventSource.CLOSED) {
                        console.error('EventSource connection closed.');
                } else if (e.target.readyState === EventSource.CONNECTING) {
                        console.error('EventSource connection reconnecting.');
                } else if (e.target.readyState === EventSource.OPEN) {
                console.error('EventSource connection open, but an error occurred.');
                }
                eventSource.close();
            };
        })
        .catch(error => console.error(error));

}

function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  



// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}

// document.getElementById('copyButton').addEventListener('click', async () => {
//     const longResponse = 'Your long text to be copied to clipboard';
    
//     try {
//     await navigator.clipboard.writeText(longResponse);
//     console.log('Text copied to clipboard');
//     } catch (err) {
//     console.error('Failed to copy text: ', err);
//     }
//     });

async function copyToClipboard(button) {
    //const longResponse = button.previousElementSibling.innerTex
    const msgBubble = button.parentElement.parentElement;
    const msgText = msgBubble.querySelector('.msg-text');
    const longResponse = msgText.innerText;
    
    try {
        await navigator.clipboard.writeText(longResponse);
        button.innerText = 'Copied!';
        } catch (err) {
        console.error('Failed to copy text: ', err);
    }
    
    setTimeout(() => {
    button.innerText = 'Copy';
    }, 2000);
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