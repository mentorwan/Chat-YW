# ChatGPT Clone


This project is a ChatGPT clone that allows users to chat with an AI language model trained by OpenAI. It's powered by the github.com/orhanerday/OpenAI php library, which provides an easy-to-use interface for communicating with the OpenAI API.


# Important Notice
This project was created to highlight the [Stream Example](https://github.com/orhanerday/open-ai#stream-example) feature of [OpenAI GPT-3 Api Client in PHP by Orhan Erday](https://github.com/orhanerday/open-ai), please don't have too high expectations about the project.


## Using Docker
<hr>

#### Clone this repository to your local machine
```sh
git clone https://github.com/mentorwan/Chat-YW.git
```
#### Navigate to the project directory
```sh
cd ChatGPT
```
#### Build the image
```shell
docker build -t chatgpt .
```
#### Run the app
```shell
docker run -p 80:80 -e OPENAI_API_KEY=<key> chatgpt
```
#### Open your web browser and go

http://localhost
<hr>


## Configuration

| Environment Variable       | Description                                                                                               | Default Value         |
|----------------------------|-----------------------------------------------------------------------------------------------------------|-----------------------|
| `OPENAI_API_KEY`           | API key for the OpenAI API.                                                                               | None (required)       |
| `OPENAI_MODEL`             | Name of the OpenAI model to use.                                                                          | `gpt-3.5-turbo`       |
| `OPENAI_TEMPERATURE`       | Temperature value for generating text using the OpenAI API.                                               | `1.0`                 |
| `OPENAI_MAX_TOKENS`        | Maximum number of tokens to generate when using the OpenAI API.                                           | `100`                 |
| `OPENAI_FREQUENCY_PENALTY` | Frequency penalty value when generating text using the OpenAI API.                                        | `0.0`                 |
| `OPENAI_PRESENCE_PENALTY`  | Presence penalty value when generating text using the OpenAI API.                                         | `0.0`                 |
| `DB_FILE`                  | Path to the SQLite database file.                                                                         | `db.sqlite`           |



## Prerequisites
Before running this project, you should have the following:

* PHP 7.4 or later with SQLite3 enabled
* Composer
* An OpenAI API key (which should be set to the $open_ai_key variable in event-stream.php)
Getting Started

## Get Started

### Enable sqlite3

* Open the php.ini file. This file is usually located in the PHP installation directory.
* Find the following line: ;extension=php_sqlite3.dll
* Remove the semicolon at the beginning of the line to uncomment it.
* Save the file.
* Restart the web server.

* ### Clone this repository to your local machine
```sh
git clone https://github.com/orhanerday/ChatGPT.git
```
* ### Navigate to the project directory
```sh
cd ChatGPT
```
* ### Install OrhanErday/OpenAI
```sh
composer require orhanerday/open-ai
```

* ### Set your OpenAI API key as the `$open_ai_key` variable in `event-stream.php`
```php
$open_ai_key = ""; 
```

* ### Start the PHP built-in web server
```sh
php -S localhost:80 -t .
```
* ### Open your web browser and go to http://localhost

* ### You should now see the ChatGPT clone interface, where you can chat with the OpenAI language model.

## Chat History
This project saves chat history using cookies by default. If you want to change this to use authentication instead, you can modify the code in index.php to save chat history in a database or other storage mechanism.

## Credits
This project is forked from the github.com/orhanerday/OpenAI php library, which provides an easy-to-use interface for communicating with the OpenAI API.
