
const inquirer = require("inquirer");
const axios = require("axios");
var pdf = require("html-pdf")
var generateHtml = require("./generateHTML.js")
const fs = require("fs");
const util = require("util");
var options = { format:"A4"}
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

        let data = res.data
        data.color = color
        writeToFile(generateHtml.generateHTML(data))
        pdf.create(generateHtml.generateHTML(data),options).toFile("./index.pdf",function(err,res){
            if(err) return console.log(err)
            console.log(res)
        })
        
   })
})
writeToFile = (data) =>{
    writeToFileAsync("portfolio.html",data)
 }