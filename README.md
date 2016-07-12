# Full Stack Development - Fetching Data, Visualizing With D3, and Deploying With Dokku

source: https://realpython.com/blog/python/web-development-with-flask-fetching-data-with-requests/

Web application to grab data from the NASDAQ-100 and visualize it as a bubble graph with D3. Then to top it off, we’ll deploy this on Digital Ocean via Dokku.

Start by locating and downloading the file _app_boilerplate.zip from this repo. 
This file contains a Flask boilerplate. Once downloaded, extract the file and folders, activate a virtualenv, and install the dependencies with Pip:

> $ pip install -r requirements.txt

Then test to make sure it works: Fire up the server, open your browser, and navigate to http://localhost:5000/. You should see “Hello, world!” staring back at you.

## Visualizing
Along with HTML and CSS, we’ll be using Bootstrap, Javascript/jQuery, and D3 to power our front-end. 
We’ll also use the client-side dependency management tool Bower to download and manage these libraries.

Your turn: Follow the installation instructions to setup Bower on your machine. 
Hint: You will need to install Node.js before you install Bower.

Ready?

## Bower
Two files are needed to get bower going – bower.json and .bowerrc.

The latter file is used to configure Bower. Add it to the main directory:
```
{
  "directory": "static/bower_components"
}
```

This just specifies that we want the dependencies installed in the bower_components directory (convention) within the app’s static directory.

Meanwhile, the first file, bower.json, stores the Bower manifest – meaning that it contains metadata about the Bower components as well as the application itself. 
The file can be created interactively with the bower init command. Do that now. Just accept all the defaults.

Now, we can install the dependencies.

> $ bower install bootstrap#3.2.0 jquery#2.1.1 d3#3.4.11 --save

The --save flag adds the packages to the bower.json dependencies array. Check it out. Also, make sure the dependency versions in bower.json match up to the versions we specified – i.e., bootstrap#3.20.

With our dependencies installed, let’s make them accessible in our app.


