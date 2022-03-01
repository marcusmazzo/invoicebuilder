const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + '/dist/invoice-win'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+'/dist/invoice-win/index.html'));});
app.listen(process.env.PORT || 8080); 
console.log("server running")