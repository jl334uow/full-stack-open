To make frontend work with backend:
npm install cors   -   you will need to add app.use('cors') etc. in the backend index.js file
PORT = process.env.PORT in backend index.js file
app.use(express.static('dist')) in backend index.js file

Check baseUrl is correct in frontend service file
npm run build   inside frontend root folder
This creates a directory which minifies the frontend application to one file

Copy the dist folder to the backend root folder
cp -r dist ../../part3/phonebook

To access the frontend index.html: https://full-stack-open-yxkw.onrender.com/
To access the json data https://full-stack-open-yxkw.onrender.com/api/persons