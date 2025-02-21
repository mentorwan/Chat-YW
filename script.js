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

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const msgerSendBtn = get(".msger-send-btn");


// Icons made by Freepik from www.flaticon.com
//const BOT_IMG = "./gpt.png";
const BOT_IMG = "./gpt4.png"

//const PERSON_IMG = "https://api.dicebear.com/5.x/micah/svg?seed=" + document.getElementById("id").value
const PERSON_IMG = "https://api.dicebear.com/6.x/fun-emoji/svg?seed=Sophie&backgroundColor=059ff2,f6d594,fcbc34&backgroundType=solid,gradientLinear&eyes=love&mouth=drip,plain,sad,smileTeeth,smileLol,wideSmile,cute,shout";
//const PERSON_IMG = "./tauri.png";
const BOT_NAME = "GPT4";
const PERSON_NAME = "";
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
        sessionStorage.removeItem('messages'); // Clear session storage
        sessionStorage.removeItem('userMessages'); // Clear session storage
        deleteAllCookies();
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

    // Call the loadMessages function to load and display messages from localStorage
    loadAllMessages()
    applyMarkdownFormatting();

    // Add event listeners for window resize and DOMContentLoaded
    //window.addEventListener('resize', applyMarkdownFormatting);
    //window.addEventListener('DOMContentLoaded', applyMarkdownFormatting);
    
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


msgerForm.addEventListener("submit", event => {
    event.preventDefault();

    const msgText = msgerInput.value;
    if (!msgText) return;

    const userId = saveUserMessage(msgText); // Save the user message
    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText, userId);

    msgerInput.value = "";

    sendMsg(msgText, clickedButton);
});


function getHistory() {
    var formData = new FormData();
    formData.append('user_id', USER_ID);
    fetch('/api.php', {method: 'POST', body: formData})
        .then(response => response.json())
        .then(chatHistory => {
            console.log("Complete chat history:", chatHistory); 
            for (const row of chatHistory) {
                appendMessage(PERSON_NAME, PERSON_IMG, "right", row.human);
                appendMessage(BOT_NAME, BOT_IMG, "left", row.ai, "");
                console.log("Line 171:",row.ai);
            }
        })
        .catch(error => console.error(error));
}

function appendMessage(name, img, side, text, id, isWriting = false) {
  
    const buttonOrTimeHTML = side === 'left' ?
        `<div id="copyButton" class="copyButton actionButton"><img src="file-copy-line.png" alt="Copy to clipboard" /></div>` :
        `<div class="msg-info-time">${formatDate(new Date())}</div>`;

    // Create the message element
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('msg', `${side}-msg`);

    console.log("Line 185:",text);

    const formattedClass = side === 'right' ? 'formatted' : '';
    
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

    //document.getElementById('copyButton').addEventListener('click', handleCopyClick);


    // Add the writing-indicator class if isWriting is true
    if (isWriting) {
        messageContainer.querySelector('.msg-text').classList.add("writing-indicator");
    }

    
    // Append the message element to the msgerChat

    console.log("Line 209:",messageContainer);
    msgerChat.appendChild(messageContainer);  

    scrollToBottom();
}

function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copyButton');
    copyButtons.forEach((button) => {
      button.addEventListener('click', handleCopyClick);
      console.log("Copy button clicked");
    });
}

function handleCopyClick(event) {
    const button = event.target.closest('.copyButton');
  
    // Show a message or add an animation to indicate that the text has been copied
    copyToClipboard(button);
  }
  


function saveMessage(id, formattedHtml) {
    let messages = JSON.parse(sessionStorage.getItem('messages')) || [];
    messages.push({ id, formattedHtml });
    sessionStorage.setItem('messages', JSON.stringify(messages));
}

function saveUserMessage(text) {
    let userMessages = JSON.parse(sessionStorage.getItem('userMessages')) || [];
    const id = Date.now().toString();
    userMessages.push({ text, id });
    sessionStorage.setItem('userMessages', JSON.stringify(userMessages));
    return id;
}


function loadAllMessages() {
    let botMessages = JSON.parse(sessionStorage.getItem('messages')) || [];
    let userMessages = JSON.parse(sessionStorage.getItem('userMessages')) || [];

    let allMessages = [];

    let maxMessages = Math.max(botMessages.length, userMessages.length);

    for (let i = 0; i < maxMessages; i++) {
        if (userMessages[i]) {
            allMessages.push({...userMessages[i], type: 'user'});
        }

        if (botMessages[i]) {
            allMessages.push({...botMessages[i], type: 'bot'});
        }
    }

    allMessages.forEach(message => {
        if (message.type === 'user') {
            appendMessage(PERSON_NAME, PERSON_IMG, "right", message.text, message.id);
        } else {
            appendMessage(BOT_NAME, BOT_IMG, "left", "", message.id);
            const div = document.getElementById(message.id);
            div.innerHTML = message.formattedHtml;
        }
    });

    applyMarkdownFormatting();
    initializeCopyButtons(); 
}


function applyMarkdownFormatting() {
  //console.log('Applying markdown formatting...')
  const formattedTexts = document.querySelectorAll('.formatted');
  formattedTexts.forEach((formattedText) => {
    const textContent = formattedText.textContent;
    //console.log("Line 245 Text content: " + textContent);
    const html = marked(textContent);
    const updatedHtml = customizeCodeBlocks(html);
    formattedText.innerHTML = updatedHtml;
  });
}


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
                assistant_prompt = "You can answer any questions. But if it is Chinese, pleease answer in Chinese. If it is English, please answer in English.";
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
                system_prompt = "Forgot about all previous records. You are a financial expert with stock recommendation experience.";
                assistant_prompt = "Please Answer YES if good news and Answer NO if bad news in the first line. Answer UNKNOWN if uncertain in the first line. Then elaborate with one short and concise answer in the second line.";
                break;
        }     
                     
        const eventSource = new EventSource(`/event-stream.php?chat_history_id=${data.id}&id=${encodeURIComponent(USER_ID)}
        &system_prompt=${encodeURIComponent(system_prompt)}&assistant_prompt=${encodeURIComponent(assistant_prompt)}
        &open_ai_model=${encodeURIComponent(open_ai_model)}&question=${encodeURIComponent(msg)}`
            );
        
        let accumulatedText = '';
        

        // Store the UUID of the writing indicator message
        let writingIndicatorUUID;
        let messageComplete = false;

        // Show the writing indicator message
        function showWritingIndicator(uuid) {
            writingIndicatorUUID = uuid;
            appendMessage(BOT_NAME, BOT_IMG, "left", "Writing...", writingIndicatorUUID, true);
        }

        // Update the writing indicator message
        function updateWritingIndicator(uuid) {
            const writingIndicator = document.getElementById(uuid);
            if (writingIndicator) {
                writingIndicator.innerHTML += '.';
            }
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

        // Initialize the copy button's event listener
        //initializeCopyButton();
        const div = document.getElementById(uuid);

        function checkWritingStatus() {
            setTimeout(() => {
                if (!eventSource.closed && !messageComplete) {
                    // Update the writing indicator
                    updateWritingIndicator(uuid);
                    checkWritingStatus();
                }
            }, 5000);
        }
        
        checkWritingStatus();


        
        eventSource.onmessage = function (e) {
            if (e.data == "[DONE]") {
                
                messageComplete = true;
                // Remove the writing indicator
                removeWritingIndicator(uuid);
                let html = marked(accumulatedText);

                // Apply custom CSS class to code blocks
                html = customizeCodeBlocks(html);
                
                // div.classList.add('formatted');
                // div.innerHTML += html;
                // applyMarkdownFormatting();

                div.classList.add('formatted');
                div.innerHTML += html;

                //console.log("Line 405: ", div.innerHTML);
                
                // Apply markdown formatting to the updated content
                //applyMarkdownFormatting();

                console.log("Line 410: ", div.innerHTML);

                // Save the formatted message to localStorage
                saveMessage(uuid, html);

                accumulatedText ='';

                msgerChat.addEventListener('click', (event) => {
                    if (event.target.closest('.copyButton')) {
                      handleCopyClick(event);
                    }
                  });
                
                
                msgerChat.scrollTop = msgerChat.scrollHeight;
                msgerSendBtn.disabled = false
                eventSource.close();
            } else {
                let txt = JSON.parse(e.data).choices[0].delta.content
                if (txt !== undefined) {
                    accumulatedText += txt;
                }

                    // Show the writing indicator if it's not already visible
                if (!writingIndicatorUUID) {
                    showWritingIndicator(uuid);
                }
                
            }
        };
        
        //document.addEventListener('DOMContentLoaded', applyMarkdownFormatting);
        //window.addEventListener('load', applyMarkdownFormatting);

        
       
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

//window.addEventListener('resize', applyMarkdownFormatting);

// Utils
function get(selector, root = document) {
    return root.querySelector(selector);
}


function copyToClipboard(Button){ 
    const msgBubble = Button.parentElement.parentElement;
    const msgText = msgBubble.querySelector('.msg-text');
    const longResponse = msgText.innerText;

    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = longResponse;

    tempTextArea.style.position = 'fixed';
    tempTextArea.style.left = '-9999px';
    document.body.appendChild(tempTextArea);

    tempTextArea.select();
    tempTextArea.setSelectionRange(0, 99999);

    const imgElement = Button.querySelector('img');

    try {
        const successful = document.execCommand('copy'); //Store result in a variable

        if (successful) {
            imgElement.src = 'file-copy-fill.png';
            setTimeout(() => {
              imgElement.src = 'file-copy-line.png';
            }, 4000);
          } else {
            throw new Error('Browser did not support copying');
          }
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }

    document.body.removeChild(tempTextArea);

    setTimeout(() => {
        Button.classList.remove('copied');
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