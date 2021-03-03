var unusedClasses = ['akaya', 'roboto', 'noto', 'lat', 'stick', 'roboto-condensed', 'pt-sans', 'source-code', 'anton', 'lobster', 'dancing', 'architects', 'indie'];
var usedClasses = [];

var pClasses = unusedClasses;
var pUsed = [];

var intervalTime = 500;

(function () {

  Math.__proto__.randomIndex = function (max) {
    return this.floor(this.random() * max) + 1;
  }

  setTimeout(function () {

    var h = document.getElementsByTagName('h1')[0];
    var p = document.getElementsByTagName('p')[0];

    setInterval(function () {

      if (unusedClasses.length === 0) {
        unusedClasses = usedClasses;
        usedClasses = [];
      }
      randomIndex = Math.randomIndex(unusedClasses.length - 2);
      h.className = unusedClasses[randomIndex];
      usedClasses.push(unusedClasses.splice(randomIndex, 1)[0]);
    }, intervalTime);

    setTimeout(function () {

      setInterval(function () {
        if (pClasses.length === 0) {
          pClasses = pUsed;
          pUsed = [];
        }
        randomIndex = Math.randomIndex(pClasses.length - 2);
        p.className = pClasses[randomIndex];
        pUsed.push(pClasses.splice(randomIndex, 1)[0]);
      }, intervalTime);

    }, intervalTime / 2)


  }, 0);

})();

fetch('https://api.ipify.org?format=json').then(function (resp) {
  resp.json().then(function (data) {
    var lastAddr = data.ip.split('.').pop();
    document.getElementsByTagName('body')[0].className =  (lastAddr % 2 == 0) ? 'even' : 'odd'
  }).catch(function() {
    document.getElementsByTagName('body')[0].className = 'even';
  })
})