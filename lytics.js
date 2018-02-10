var _AnalyticsCode = 'UA-37980828-6';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
  console.log('Inside self invoking function')
})();

function trackButtonClick(e) {
  var elem;
  if (e.target.tagName === 'svg') {
    var elem = e.target.parentNode.querySelector('div');
  } else {
    console.log(e.target);
    var elem = e.target.parentNode.parentNode.querySelector('div');
  }
  _gaq.push(['_trackEvent', elem.innerText, 'clicked']);
}


document.addEventListener('DOMContentLoaded', function () {
  console.log('Inside the domcontent loaded event listener');
  var app = document.querySelector('div#app');
  window.setTimeout(function() {
    var buttons = app.querySelectorAll('div.bottomNavigation button');
    console.log(buttons);
    buttons.forEach(function(button) {
      console.log('Inside the loop inside setTimeout');
      button.addEventListener('click', trackButtonClick);
    });
  }, 5000);
  // var buttons = app.querySelectorAll('button');
  // console.log(buttons);
  // for (var i = 0; i < buttons.length; i++) {
    // console.log('Inside the button event listener');
    // buttons[i].addEventListener('click', trackButtonClick);
  // }
});
