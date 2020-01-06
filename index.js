
const inquirer = require("inquirer");
const axios = require("axios");
// var pdf = require("html-pdf")

var generateHtml = require("./generateHTML.js")
const fs = require("fs");
var convertFactory = require('electron-html-to');
var conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
  });
   
const util = require("util");
// var options = { format:"US Letter"}
const writeToFileAsync = util.promisify(fs.writeFile)
function promptUser(){
        return inquirer.prompt([
            {
                type:"input",
                message:"whats you github user name friend?",
                name:"username"
            },{
                type:"list",
                message:"choose your favorite color",
                choices:["red","pink","blue","green"],
                name:"color"
            }

        ])
}
promptUser().then(function({username,color}){
    axios
    .get(`https://api.github.com/users/${username}`)
    .then(function(res){
        //make if statement if status code is 404
        let data = res.data
        data.color = color
        writeToFile(generateHtml.generateHTML(data));
        // pdf.create(generateHtml.generateHTML(data),options).toFile("./index.pdf",function(err,res){
        //     if(err) return console.log(err)
        //     console.log("Here's your pdf:"+JSON.stringify(res))
        //     console.log("Here's your html: portfolio.html")
        // }) 
        conversion({ html:generateHtml.generateHTML(data)} , function(err, result) {
            if (err) {
              return console.error(err);
            }
           
            result.stream.pipe(fs.createWriteStream('./portfolio.pdf',{mode:"0766",flag:"w"}));
            conversion.kill(); // necessary if you use the electron-server strategy, see bellow for details
            
          });
        
   })
})
writeToFile = (data) =>{
    writeToFileAsync("portfolio.html",data)
 }