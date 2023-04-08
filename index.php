<?php

$db = new SQLite3('db.sqlite');

$stmt = $db->prepare('SELECT * FROM main.chat_history');

// Execute the query and get the results
$result = $stmt->execute();

// Count the number of rows returned
$numQuestionsAnswered = 0;
while ($row = $result->fetchArray()) {
    $numQuestionsAnswered++;
}

// Close the database connection
$db->close();

?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>ChatGPT Tools</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="./style.css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v6.3.0/css/all.css" integrity="sha384-4HTzq+EQ0XRE6sz/dH5/5Z5x5Fcl90zU6fPqx6RzU6E1UOvxXbSZQ1m/wkZvjddC" crossorigin="anonymous">
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

<div class="sidebar" id="sidebar">
  <p class="sidebar-header">GPT4</p>
    <form class="tabcontent">
         <button type="submit" class="tablink" onclick="openTab('button1')" id="button1" value="button1">CHAT ANYTHING</button>
    </form>
    <form class="tabcontent">
         <button type="submit" class="tablink" onclick="openTab('button2')" id="button2" value="button2">GRAMMAR CHECK</button>
    </form>
    <form class="tabcontent">
         <button type="submit" class="tablink" onclick="openTab('button3')" id="button3" value="button3">TRANSLATE</button>
    </form>
    <form class="tabcontent">
         <button type="submit" class="tablink" onclick="openTab('button4')" id="button4" value="button4">STOCK</button>
    </form>
    <form class="tabcontent">
         <button type="submit" class="tablink" onclick="openTab('button5')" id="button5" value="button5">AP STAT</button>
    </form>
    <form class="tabcontent">
         <button type="submit" class="tablink" onclick="openTab('button6')" id="button6" value="button6">GRADE 9</button>
    </form>
</div>

<section class="msger" id="msger">
    <div class="msger-header">
      <div class="msger-header-title">
        <i class="fas fa-comment-alt"></i><input type="text" id="id" hidden><span class="id_session"></span>
      </div>
      <div class="msger-header-options1">
            <button id="menu-btn">MODE</button>
      </div>
      <div class="msger-header-message">
        <input type="text" class="header-text" value="<?php echo 'Questions: ' . $numQuestionsAnswered; ?>">   
      </div>
      <div class="msger-header-options2">
            <button id="delete-button">Delete History</button>
      </div>
    </div>
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
function openTab(tabName) {
  var i, tabcontent, tablinks;
  //tabcontent = document.getElementsByClassName("tabcontent");
  
  //for (i = 0; i < tabcontent.length; i++) {
  //  tabcontent[i].style.display = "none";
  //}
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  //evt.currentTarget.className += " active";
  document.getElementById(tabName).className += " active";
}
</script>
<script src="https://cdn.jsdelivr.net/npm/marked@3.0.8/lib/marked.min.js"></script>



</body>

</html>