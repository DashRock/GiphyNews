// newsapi.org API Key: ""

// let apiKey = "";

let giphyAPIKEY = "";



function setEleDisplay(id, display) {
    let ele = document.getElementById(id);
    if(!ele) {
        document.getElementByID("errorMsg").innerHTML = 'Element with id ' + id + ' not found in document.';
        return;
    } 
    ele.style.display = display;
}
   
    function showEle(id) {setEleDisplay(id, 'block');;}
    function hideEle(id) {setEleDisplay(id, 'none');}
    
    function makeHeadLine(title, output){
       
        output.push('<span class="article" onclick="showGiphys(\'' 
        + encodeURIComponent(title).replace(/'/g, "\\'")
        + '\')">');
        output.push('<a href="#article">');
        output.push(title);
        output.push('</a>');
        output.push('</span>\n');
       
        return output;
    }
  
function showHeadlines() {
    let headLinesURL = "https://newsapi.org/v2/top-headlines" +
    "?" +
    "country=us" +
    "&" +
    "category=entertainment" +
    "&" +
    "apiKey=";
    
    let req = new XMLHttpRequest();
    req.open("GET", headLinesURL, true);
    
    req.onload = function() {
        hideEle('ajaxWait');
       let newsData = JSON.parse(req.responseText);
        let output = [];
//         console.log(newsData.articles);
         for(
         let articleIdx = 0;
             articleIdx < newsData.articles.length;
             articleIdx++) {
             output = makeHeadLine(newsData.articles[articleIdx].title, output);
         }
        document.getElementById('headlines').innerHTML = output.join('<br />');
     };
     
   req.onerror = function() {
        hideEle('ajaxWait');
         document.getElementById('errorMsg').innerHTML = "Ooops, Something Went Wrong! Please try again, if the problem persists, contact support@dashwoorkz.ca";
         showEle('errorMsg');
    };
    req.send();
    showEle('ajaxWait');
   }
   
    function addGiphyImg(imgContainerId, imgSrc) {
    let newImg = document.createElement('img');
    newImg.src = imgSrc;
    let containerEle = document.getElementById(imgContainerId);
    containerEle.appendChild(newImg);
    }
        
     // ===  Giphy Function ================== //
     
     function showGiphys(searchTerm) {
     document.getElementById('returnedGif').innerHTML = '';
    let giphyURL = "http://api.giphy.com/v1/gifs/search" +
    "?" +
    "rating=g" +
    "&" +
    "q=" + searchTerm +
    "&" +
    "apiKey=YTz7xYutlTn4Tl9afAcbkd6hsrl10vlD";
    
    let req = new XMLHttpRequest();
    req.open("GET", giphyURL, true);
    
    req.onload = function() {
        hideEle('ajaxWait');
        let giphyData = JSON.parse(req.responseText);
         for(let gifIdx = 0; gifIdx < giphyData.data.length; gifIdx++) {
 //        console.log(gifData.data[gifIdx].images.original.url);
            addGiphyImg('returnedGif', giphyData.data[gifIdx].images.original.url);
        }   
  };
       
        req.onerror = function() {
        hideEle('ajaxWait');
         document.getElementById('errorMsg').innerHTML = "Ooops, Something Went Wrong! Please try again, if the problem persists, contact support@dashwoorkz.ca";
         showEle('errorMsg');
    };
    req.send();
    showEle('ajaxWait');
   }
     

     // === End Giphy Function

window.addEventListener('load', showHeadlines);



