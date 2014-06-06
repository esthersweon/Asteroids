(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var Game = Asteroids.Game = function(ctx) {
    this.ctx = ctx;
    this.asteroids = this.addAsteroids(10);
    this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2],
      [0, 0], Asteroids.Ship.RADIUS, Asteroids.Ship.COLOR);
    this.intervalTimer = 0;
    this.bullets = [];
    this.image = new Image();
    this.image.src = '/images/universe.jpeg';
    this.image.width = "600";
    this.image.height = "600"
  }

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function(numAsteroids) {
    var asteroids = [];
    for(var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroids.Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }
    return asteroids;
  };

  Game.prototype.draw = function() {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.drawImage(this.image, 0, 0, Game.DIM_X, Game.DIM_Y);

    this.ship.draw(this.ctx);

    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].draw(this.ctx); }

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].draw(this.ctx); }
  };

  Game.prototype.move = function() {
    for (var i = 0; i < this.asteroids.length; i++){
      this.asteroids[i].move();
    }
    this.ship.move();

    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].move(this); }
  };

  Game.prototype.step = function() {
    this.move();
    this.draw();
    this.isOutOfBounds();
    this.checkCollisions();
  };

  Game.prototype.isOutOfBounds = function(){
    this.resetAsteroids();
    this.removeBullets();
    this.resetShip();
  };

  Game.prototype.start = function() {
    this.bindKeyHandlers();
    this.intervalTimer = window.setInterval(this.step.bind(this), Game.FPS);
  };

  Game.prototype.checkCollisions = function() {
    for(var i = 0; i < this.asteroids.length; i++) {
      if (this.asteroids[i].isCollidedWith(this.ship)) {
        alert("You've been hit! Game over.");
        this.stop(); 
      }
    }
  };

  Game.prototype.stop = function() {
    clearInterval(this.intervalTimer);
  };

  Game.prototype.resetAsteroids = function() {
    for(var i = this.asteroids.length-1; i >= 0; i--) {
      if(this.asteroids[i].pos[0] < 0) {
        var old_y = this.asteroids[i].pos[1];
        this.asteroids[i].pos = [Game.DIM_X, old_y];
      } else if (this.asteroids[i].pos[0] > Game.DIM_X) {
        var old_y = this.asteroids[i].pos[1];
        this.asteroids[i].pos = [0, old_y];
      } else if(this.asteroids[i].pos[1] < 0) {
        var old_x = this.asteroids[i].pos[0];
        this.asteroids[i].pos = [old_x, Game.DIM_Y];
      } else if (this.asteroids[i].pos[1] > Game.DIM_Y) {
        var old_x = this.asteroids[i].pos[0];
        this.asteroids[i].pos = [old_x, 0];
      }
    }
  };

  Game.prototype.removeBullets = function() {
    for(var i = this.bullets.length-1; i >= 0; i--) {
      if(this.bullets[i].pos[0] < 0 || this.bullets[i].pos[0] > Game.DIM_X) {
        this.bullets.splice(i, 1);
      } else if(this.bullets[i].pos[1] < 0 || this.bullets[i].pos[1] > Game.DIM_Y) {
        this.bullets.splice(i, 1);
      }
    }

  };

    Game.prototype.resetShip = function() {
    if(this.ship.pos[0] < 0) {
      var old_y = this.ship.pos[1];
      this.ship.pos = [Game.DIM_X, old_y];
    } else if (this.ship.pos[0] > Game.DIM_X) {
      var old_y = this.ship.pos[1];
      this.ship.pos = [0, old_y]; 
    } else if(this.ship.pos[1] < 0) {
      var old_x = this.ship.pos[0];
      this.ship.pos = [old_x, Game.DIM_Y];
    } else if (this.ship.pos[1] > Game.DIM_Y) {
      var old_x = this.ship.pos[0];
      this.ship.pos = [old_x, 0];
    }
  };

  Game.prototype.bindKeyHandlers = function() {
    var that = this;
    key('up', function(){ that.ship.power([0,-1]) });
    key('left', function(){ that.ship.power([-1,0]) });
    key('down', function(){ that.ship.power([0,1]) });
    key('right', function(){ that.ship.power([1,0]) });
    key('space', function(){ that.fireBullet() });
  };

  Game.prototype.fireBullet = function() {
    this.bullets.push(this.ship.fireBullet() );
  };

  Game.prototype.removeBullet = function(bullet) {
    for(var i = this.bullets.length - 1; i >= 0; i--) {
      if (this.bullets[i] == bullet){
        this.bullets.splice(i, 1);
      }
    }
  };

  Game.prototype.removeAsteroid = function(i) {
    this.asteroids.splice(i, 1);
  }

})(this);