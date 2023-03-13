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

<div class="sidebar">
  <p class="sidebar-header">MODE</p>
    <form class="tabcontent">
         <button type="submit" class="tablink" onclick="openTab(event, 'button1')" id="button1" name="button1">ASK ANYTHING</button>
    </form>
    <form class="tabcontent">
         <button type="submit" class="tablink" onclick="openTab(event, 'button2')" id="button2" name="button2">GRAMMAR FIX</button>
    </form>
    <form class="tabcontent">
         <button type="submit" class="tablink" onclick="openTab(event, 'button3')" id="button3" name="button3">EN TO CN</button>
    </form>
    <form class="tabcontent">
         <button type="submit" class="tablink" onclick="openTab(event, 'button4')" id="button4" name="button4">EN TO CN</button>
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
<script src='https://use.fontawesome.com/releases/v5.0.13/js/all.js'></script>
<script src="./script.js"></script>
<script>
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  console.log(tablinks.length)
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