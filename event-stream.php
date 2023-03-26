<?php

header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');


require __DIR__ . '/vendor/autoload.php'; // remove this line if you use a PHP Framework.

use Orhanerday\OpenAi\OpenAi;

const ROLE = "role";
const CONTENT = "content";
const USER = "user";
const SYS = "system";
const ASSISTANT = "assistant";

$open_ai_key = getenv('OPENAI_API_KEY');
$open_ai = new OpenAi($open_ai_key);
// Open the SQLite database
$db = new SQLite3('db.sqlite');

$chat_history_id = $_GET['chat_history_id'];
$id = $_GET['id'];

// Add different parameters for event stream
$system_prompt = $_GET['system_prompt'];
$assistant_prompt = $_GET['assistant_prompt'];
$open_ai_model = $_GET['open_ai_model'];



if (isset($_GET['question'])) {
    $new_question = $_GET['question'];
    // Get the last 5 messages from the database
    
    $stmt = $db->prepare('SELECT id, human, ai FROM main.chat_history ORDER BY id DESC LIMIT 5'); // Adjust the LIMIT value based on how much conversation history you want to fetch

    $result = $stmt->execute();
    //$history = [];

    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
    $history[] = $row;
    }
  
    //$messages = [];
    $messages[] = [ROLE => SYS, CONTENT => $system_prompt];

    foreach (array_reverse($history) as $row) {
    $messages[] = ['role' => 'user', 'content' => $row['human']];
    $messages[] = ['role' => 'assistant', 'content' => $row['ai']];
    }

    $messages[] = ['role' => 'user', 'content' => $new_question];
    $messages[] = ['role' => 'user', 'content' => $assistant_prompt];

    

}
// Prepare a SELECT statement to retrieve the 'human' field of the row with ID 6
// $stmt = $db->prepare('SELECT human FROM main.chat_history WHERE id = :id');
// $stmt->bindValue(':id', $chat_history_id, SQLITE3_INTEGER);

// // Execute the SELECT statement and retrieve the 'human' field
// $result = $stmt->execute();
// $msg = $result->fetchArray(SQLITE3_ASSOC)['human'];

// $history[] = [ROLE => USER, CONTENT => $msg];

$opts = [
   'model' =>  $open_ai_model,
   'messages' => $messages,
   'temperature' => 1,
   'max_tokens' => 1024,
   'frequency_penalty' => 0,
   'presence_penalty' => 0,
   'stream' => true
];

header('Content-type: text/event-stream');
header('Cache-Control: no-cache');

error_log(print_r($opts['messages'], true));


$txt = "";
$complete = $open_ai->chat($opts, function ($curl_info, $data) use (&$txt) {
    if ($obj = json_decode($data) and $obj->error->message != "") {
        error_log(json_encode($obj->error->message));
    } else {
        echo $data;
        $clean = str_replace("data: ", "", $data);
        $arr = json_decode($clean, true);
        if ($data != "data: [DONE]\n\n" and isset($arr["choices"][0]["delta"]["content"])) {
            $txt .= $arr["choices"][0]["delta"]["content"];
        }
    }

    echo PHP_EOL;
    ob_flush();
    flush();
    return strlen($data);
});


// Prepare the UPDATE statement
$stmt = $db->prepare('UPDATE main.chat_history SET ai = :ai WHERE id = :id');
$row = ['id' => $chat_history_id, 'ai' => $txt];
// Bind the parameters and execute the statement
$stmt->bindValue(':id', $row['id']);
$stmt->bindValue(':ai', $row['ai']);
$stmt->execute();

//
// Close the database connection
$db->close();
