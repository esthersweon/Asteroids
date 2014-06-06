(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Asteroid = Asteroids.Asteroid = function(pos, vel, radius, color){
    Asteroids.MovingObject.call(this, pos, vel, radius, color);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.RADIUS = 8;
  Asteroid.COLOR = "white";

  Asteroid.randomAsteroid = function(dimX, dimY) {
    var speed = 3;

    var x = 0;
    var y = 0;
    while ((x===0) || (y===0)) {
      var x = Math.random() * dimX;
      var y = Math.random() * dimY;
    }

    var vecx = 0;
    var vecy = 0;
    while (vecx === 0 && vecy === 0) {
      var vecx = Math.floor(Math.random() * speed*2 - speed);
      var vecy = Math.floor(Math.random() * speed*2 - speed);
    }

    return new Asteroid([x,y], [vecx, vecy], Asteroid.RADIUS, Asteroid.COLOR);
  };
})(this);

