    // grabs all of "data-elements" buttons        
const elements = document.querySelectorAll(".btn, .align-btn");


/* Events on which we will add some methods to run our ediotr's functionality: */

    // 
elements.forEach(element => {
    
        // enables "click" event on "data-elements" buttons
    element.addEventListener("click", () => {


            
        let command = element.dataset["element"];

            // the value of hyperlink is equal to the input entered by the user in the prompt
        if(command == "createLink") {

                // input entered by the user in the prompt
            let givenUrl = prompt("Enter the link here: ");

            document.execCommand(command, false, givenUrl);

        }else{
            
                // executes the functionality of the "data-elements" buttons after clicking them
            document.execCommand(command, false, null);

        }
            
    })
    
})



/* JSON logic section #1 - exporting a plain text into a JSON file: */


    // grabs everything what the user typed in a const
const userContentContainer = document.querySelector(".user-content-container");

    // grabs JSON export HTML button in a const
const exportFile = document.querySelector(".export-btn");
    

    // function that converts the text wrote by user to a JSOn file & downloads it
function exportAndDownloadText() {

        // if the user entered any plain text, these lines are executed:
    if (!userContentContainer.innerHTML) return;
    
            // creates the HTML <a> element
        const hyperlinkElement = document.createElement("a");

            // creates a prompt that asks user how to name downloading file
        const downloadPrompt = window.prompt("Enter the name of JSON file in order to download it: ");

            // tranforms plain text wrote by the user into a JS object
        const textToObject = { 
            text: userContentContainer.innerHTML
        };
        
            // transforms JS object containing text wrote by the user into a JSON file
        const ObjectToJson = new Blob([JSON.stringify(textToObject)], {
            type: "application/json"
        })
    
        
        hyperlinkElement.href = URL.createObjectURL(ObjectToJson);
    

         // the name of downloading file has to be equal to the name given by the user in the prompt
    if (downloadPrompt) {
        hyperlinkElement.download = downloadPrompt;
    }

        // which name has to be assigned to the downloading file when the user hasn't entered any character in the prompt
    else if (downloadPrompt === "") {
        hyperlinkElement.download = "jsonConvertedToString.json";
    }
    
        
    else if (downloadPrompt === null) return;
            
        hyperlinkElement.click();

}


    // runs the above function using the 'click' event via clicking on the export button
exportFile.addEventListener("click", () => {

    exportAndDownloadText();
    
});




/* JSON logic section #2 - importing a JSON file into a plain text: */


    // grabs file that is uploading by the user into the website
let selectingFileToImport = document.querySelector(".import-btn");

    // asks the user to select a JSON file, then uploads it and converts into a plain text
function importJson() {

        // grabs JSON import file in a let
    let importingFile = document.querySelector(".import-btn").files[0];

        // an object that can read uploaded files by the user
    let fileReader = new FileReader();

    
        
        // what happens when the user clicks on the import JSON button
    fileReader.onload = (event) => {
            // parses the file uploaded by the user from JSON to the JS object
        let importingResult = JSON.parse(event.target.result);
        
            // returns an array of 'importingResult' property names
        userContentContainer.innerHTML = importingResult[Object.keys(importingResult)[0]];
    };
    
        // outputs the final text as a string converted frm JSON n the user's editable area
    importingFile && fileReader.readAsText(importingFile, "utf-8");
    
}


    // listens when the user adds a file and when it happens - executes the "importJson" function
selectingFileToImport.addEventListener("change", () => {

    importJson();
    
});