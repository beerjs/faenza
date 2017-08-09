require('../scss/drunkboy.scss');

var moment = require('moment');

(function() {
  
  // The event data url
  var eventUrl = 'https://cdn.rawgit.com/beerjs/faenza/a57c04c6/beerjs.json';

  // Bubbles taken from BeerJS Santiago
  var canvas = document.getElementById('bubbling');
  var ctx = canvas.getContext('2d');
  var particles = [];
  var particleCount = 280;
  
  for (var i = 0; i < particleCount; i++) {
    particles.push(new particle());
  }
  
  function particle() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 300;
    this.speed = .5 + Math.random();
    this.radius = Math.random() * 3;
    this.opacity = (Math.random() * 300) / 1000;
  }
  
  function loopBubbles() {
    requestAnimationFrame(loopBubbles);
    draw();
  }
  
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.fillStyle = 'rgba(255,255,255,' + p.opacity + ')';
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
      ctx.fill();
      p.y -= p.speed;
      if (p.y <= -10)
      particles[i] = new particle();
    }
  }
  
  // start bubbles
  loopBubbles();
  
  // Load the event json
  function loadJSON(url, callback) {   
    
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', url, true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);  
    
  }  
  
  // Get the event data to populate page
  loadJSON(eventUrl, function(response) {
    
    // Get json event data
    var eventData = JSON.parse(response);
    
    // Get elements
    var eventTitle = document.getElementById('eventTitle');
    var eventTime = document.getElementById('eventTime');
    var eventPlace = document.getElementById('eventPlace');
    var eventTheme = document.getElementById('eventTheme');
    
    // Get dates
    var today = moment();
    var eventDate = moment(eventData.date, 'DD/MM/YYYY');

    // Set event data on page    
    eventTitle.innerHTML = eventData.event;
    eventPlace.innerHTML = eventData.place;
    eventTheme.innerHTML = eventData.theme;
    
    // If event is not yet occurred
    if( today.diff(eventDate) < 0 ) {
      eventTime.innerHTML = [eventDate.fromNow(), '-', eventData.time].join(' ');      
    }
      
    // If event already happen
    if( today.diff(eventDate) > 0 ) {
      eventTime.innerHTML = eventDate.fromNow();
    }
    
  });
  
})();