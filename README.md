# Auto-Portfolio
## User Story
- Using node.js the program will take the user's github username and there favorite color. Using this information this we will create a protfolio for the user.
## Site Picture
![Auto Port](/assets/Auto-port.gif)


## Technologies Used
- HTML - used to create elements on the DOM
- CSS - styles html elements on page
- Bootstrap - Used to create cosmitics of the website and Media inquries
- FontAwesome - used to add nice looking icons 
- Git - version control system to track changes to source code
- GitHub - hosts repository that can be deployed to GitHub Pages
- JQuery - used to set actions in with bottstarp and change the background image 
- Inquirer - An npm extension to get information from user
- Axios -An npm to fetch data about the user from Github 
- electron - npm to generate pdf
- electron-prebuilt - npm to generate pdf
- electron-html-to - npm to generate pdf

## Summary 
This a website that has information about me, how to contact me and projects I've worked on before.

## Code Snippet
```html
<html>
<body>
 <script>
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
    function init (){
        promptUser().then(function({username,color}){
            
            axios
            .get(`https://api.github.com/users/${username}`)
            .then(function(res){
                //make if statement if status code is 404
                let data = res.data
                data.color = color
                writeToFile(generateHtml.generateHTML(data));
                conversion({ html:generateHtml.generateHTML(data)} , function(err, result) {
                    if (err) {
                    return console.error(err);
                    }


     </script>
</body>
</html>
```
- This code get the infromaition from the user and makes a axios call to fetch the information from the api and generates an html file and a pdf a file accordin to the information given.
## Author Links
[LinkedIn](linkedin.com/in/andres-felipe-jimenez-ferreira-b67a35192)
[GitHub](https://github.com/AndresF97)