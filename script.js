var unusedClasses = ['akaya', 'roboto', 'noto', 'lat', 'stick', 'roboto-condensed', 'pt-sans', 'source-code', 'anton', 'lobster', 'dancing', 'architects', 'indie'];
var usedClasses = [];

var pClasses = unusedClasses;
var pUsed = [];

var intervalTime = 1200;


/*
  Does Animation for the Fonts
*/
function initFontAnime() {
  if(document.getElementsByTagName('body')[0].className !== 'even')
    return;

  var h = document.getElementsByTagName('h1')[0];
  var p = document.getElementsByTagName('p')[0];

  updateFont(unusedClasses, usedClasses, h);
  setTimeout(function () {
    updateFont(pClasses, pUsed, p);
  }, intervalTime / 2)

};

// Updates the font for the given element in a sequential interval
function updateFont(mainClass, subClass, el) {
  setInterval(function () {
    if (mainClass.length === 0) {
      mainClass = subClass;
      subClass = [];
    }
    randomIndex = Math.randomIndex(mainClass.length - 2);
    el.className = mainClass[randomIndex];
    subClass.push(mainClass.splice(randomIndex, 1)[0]);
  }, intervalTime);
}

Math.__proto__.randomIndex = function (max) {
  return this.floor(this.random() * max) + 1;
}

// Fetch with Timout function
function timout(url, timerMs) {
  return new Promise(function(resolve, reject) {
    var timer = setTimeout(function() {
      console.log('rejecting from timer')
      reject('timeout');
    }, timerMs || 2000);

    fetch(url).then(function (resp) {
      resp.json().then(function (data) {
        clearTimeout(timer);
        resolve(data);
      }).catch(function() {
        reject(...arguments);
        clearTimeout(timer);
      })
    });
  });
}


// Main Init function
timout('https://api.ipify.org?format=json', 3000).then(function(data) {
  var lastAddr = data.ip.split('.').pop();
  document.getElementsByTagName('body')[0].className = (lastAddr % 2 == 0) ? 'even' : 'odd'
  initFontAnime();
}).catch(function() {
  console.error(arguments);
  document.getElementsByTagName('body')[0].className = 'odd';
})