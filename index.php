<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>ChatGPT 3.5 Turbo Tools</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./style.css">
</head>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-85F61RZYRT"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-85F61RZYRT');
</script>

<body>

<div class="header">
  <form class="tabcontent">
    <button type="submit" class="tablink" onclick="openTab('button1')" id="button1" value="button1">CHATTING</button>
  </form>
  <form class="tabcontent">
    <button type="submit" class="tablink" onclick="openTab('button2')" id="button2" value="button2">GRAMMAR CHECK</button>
  </form>
  <form class="tabcontent">
    <button type="submit" class="tablink" onclick="openTab('button3')" id="button3" value="button3">TRANSLATE EN/CN</button>
  </form>
</div>

<section class="msger">
    <header class="msger-header">
        <div class="msger-header-title">
            <i class="fas fa-comments"></i> SESSION ID: <input type="text" id="id" hidden> <span class="id_session"></span>
        </div>
        <div class="msger-header-options">
            <button id="delete-button">Delete History</button>
        </div>
    </header>

    <main class="msger-chat">
    </main>

    <form class="msger-inputarea">
        <input class="msger-input" placeholder="Enter your message..." require>
        <button type="submit" class="msger-send-btn">Send</button>
    </form>
</section>
<!-- <script src='https://use.fontawesome.com/releases/v5.0.13/js/all.js'></script> -->
<script src="./script.js"></script>
<script>
function openTab(tabName) {
  var i, tabcontent, tablinks;
  //tabcontent = document.getElementsByClassName("tabcontent");
  
  //for (i = 0; i < tabcontent.length; i++) {
  //  tabcontent[i].style.display = "none";
  //}
  tablinks = document.getElementsByClassName("tablink");
  console.log(tablinks.length);
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  //evt.currentTarget.className += " active";
  document.getElementById(tabName).className += " active";
}
</script>


</body>

</html>