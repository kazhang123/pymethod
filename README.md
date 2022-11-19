Required Downloads:

Install Node.js: https://nodejs.org/en/download/
Install python 3: https://www.python.org/downloads/
Install flask and gunicorn by typing this in the terminal: pip3 install flask gunicorn

How to run:

Run 'python3 api.py' in the root directory then run 'npm start' in the /frontend directory.

In the terminal where you ran 'python3 api.py', it will say the link that it is running on. Append '/graph' at the end of the link and paste the link into line 10 frontend/src/App.js.

Open up the react app that is running on Chrome, and click on 'Choose File'. Choose one of the files /userfiles.

Go to network in the Inspector, and check out the response.
