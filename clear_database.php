<?php
// Your SQLite3 database connection code here
// For example:
 $db = new SQLite3('db.sqlite');

// Clear the database, for example by deleting all rows from a specific table
// Replace 'your_table' with the name of the table you want to clear
$query = "DELETE FROM main.chat_history";
$db->exec($query);

// Close the database connection
$db->close();
