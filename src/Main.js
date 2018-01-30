var brickCount = 0;
var brickHeight = 69;
var brickSeparation = 5;
var distanceFromBottom = 300;

var addBrick = function(a) {
  var container = document.getElementById("main-container");
  var brickWrapper = document.createElement("div");
  var brick = document.createElement("img");
  var text = document.createElement("p");
  var top = distanceFromBottom - (brickCount*brickHeight + brickCount*brickSeparation + brickSeparation + brickHeight);


  brickWrapper.appendChild(brick);
  brickWrapper.appendChild(text);

  text.innerText = a;
  text.className = "brick-text";
  brick.src="brick.png";
  brickWrapper.className = "brick";
  brickWrapper.style.top = top + "px";
  brickCount++;

  container.appendChild(brickWrapper);
}

var removeBrick = function() {
  var container = document.getElementById("main-container");
  var brick = container.children[brickCount];

  brick.remove();
  brickCount--;
}

exports.push = function(a) {
  return function(s) {
    return function(cb) {
      return function() {
        s.push(a);

        setTimeout(function() {
          cb({value0: a, value1: s})();
          addBrick(a);
        }, 1000);

        return {}
      }
    }
  }
}

exports.pop = function(a) {
  return function(s) {
    return function(cb) {
      return function() {
        s.pop();


        setTimeout(function() {
          cb({value0: a, value1: s})();
          removeBrick();
        }, 1000);

        return {}
      }
    }
  }
}
