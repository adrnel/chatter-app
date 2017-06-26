# chatter-app
Template for a chat room app using Node.js, Express.js and Websockets IO, using Docker to build.
It is a simple app that others can use as a base for creating there own chat app, for adding a chat app the their project or to just play about with and learn about websockets.
It is very easy to get up and running by itself without using Docker and a bit more tricky with

![Chatter App Image](https://user-images.githubusercontent.com/14028071/27507856-a2fdc4c4-58d0-11e7-859e-e1eb3cc7b6b7.PNG)



## Prerequisites

- **Nodejs**

  Download and install from [http://nodejs.org](https://nodejs.org/en/)
    - To verify

    ```
    $ npm -v
    ```

    - should output something like

    ```
    3.3.12
    ```

 - **Clone the Git Repository**

 	```
 	$ git clone https://github.com/adrnel/chatter-app.git
 	$ cd climbing-app
 	$ git checkout master
 	```
  
  
## Developing for the project

- **Install the node modules**

    ```
    $ sudo npm install
    ```


## Running the project
- **Node**

    - Run the app using node to start it on port 3000 (or change the port for a more suitable one in the app.js file)

    ```
    $ node app.js
    ```
    
    
## Building with Docker
- **Docker**

    - Download and install Docker from the official site (https://docs.docker.com/engine/installation/)
    
    - Open a Docker Terminal
    
    - Pull the repository from Docker Hub 

    ```
    $ docker pull adrnel/chatter-app:v1
    ```
    
    - Check the image was pulled correctly 
        
    ```
    $ docker images
    ```
    
    - You should see "adrnel/chatter-app" as the repository
    
    - Make sure you are in the app directory
    
    ```
    $ cd <path-to-app>/chatter-app/
    ```
    - Build the image
    ```
    $ docker build -t adrnel/chatter-app .
    ```
    - Run the container
    ```
    docker run -p 3000:3000 adrnel/chatter-app (or change the first port 3000 to the port which you want to hit on your docker     Machine's IP address)
    ```
    - Navigate to your docker Machine's IP address and correct port (i.e. 3000)
