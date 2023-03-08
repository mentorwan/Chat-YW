# ChatGPT Clone

<div align="center">

![ezgif-1-92e240a6d3](https://user-images.githubusercontent.com/22305274/220125119-ccbdb855-bdb9-476f-8f5f-f5d5530f0a24.gif)

</div>

This project is a ChatGPT clone that allows users to chat with an AI language model trained by OpenAI. It's powered by the github.com/orhanerday/OpenAI php library, which provides an easy-to-use interface for communicating with the OpenAI API.

![Image](https://user-images.githubusercontent.com/22305274/219878523-6d8be435-35df-4cce-b2cd-52334f9e7f12.png)



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

## Chat History
This project saves chat history using cookies by default. If you want to change this to use authentication instead, you can modify the code in index.php to save chat history in a database or other storage mechanism.

## Credits
This project is powered by the github.com/orhanerday/OpenAI php library, which provides an easy-to-use interface for communicating with the OpenAI API.
