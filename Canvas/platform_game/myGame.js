/**
 * Created by Administrator on 2015/5/17.
 */
var plan = [
    "                      ",
    "                      ",
    "  x              = x  ",
    "  x         o o    x  ",
    "  x @      xxxxx   x  ",
    "  xxxxx            x  ",
    "      x!!!!!!!!!!!!x  ",
    "      xxxxxxxxxxxxxx  ",
    "                      "
];

var actorChars = {
    "@": Player,
    "o": Coin,
    "=": Lava, "|": Lava, "v": Lava
}

function Level(plan) {
    this.width = plan[0].length;
    this.height = plan.length;
    this.grid = [];
    this.actors = [];

    for (var y = 0; y < this.height; y++ ) {
        var gridLine = [];
        for (var x = 0; x < this.width; x++) {
            var fieldType = null;
            var ch = plan[y][x];
            var Actor = actorChars[ch];
            if (Actor) {
                this.actors.push(new Actor(new Vector(x, y)));
            };
            if (ch == "x") {
                fieldType = "wall";
            } else if (ch == "!") {
                fieldType = "lava";
            };
            gridLine.push(fieldType);
        };
        this.grid.push(gridLine);
    };
}


function elt(type, className) {
    var elt = document.createElement(type);
    if (className) {
        elt.className = className;
    }
    return elt;
}

var scale = 20;



function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
}

function Player(pos) {
    this.pos = pos.plus(new Vector(0, -0.5));
    this.size = new Vector(0.8, 1.5);
}
Player.prototype.type = "player";

function Lava(pos) {
    this.pos = pos;
    this.size = new Vector(1, 1);
}
Lava.prototype.type = "lava";

function Coin(pos) {
    this.pos = pos;
    this.size = new Vector(0.6, 0.6);
}
Coin.prototype.type = "coin";

function Display(parent, level) {
    this.level = level;
    this.wrap = parent.appendChild(elt("div"));
    this.wrap.appendChild(this.drawBackground());
}

Display.prototype.drawBackground = function() {
    var table = elt("table", "background");
    table.style.width = this.level.width * scale  + "px";

    this.level.grid.forEach(function(row) {
        var tr = elt("tr");
        tr.style.height = scale  + "px";
        row.forEach(function(type) {
            var td = elt("td", type);
            tr.appendChild(td);
        });
        table.appendChild(tr);
    });
    return table;
}

var level = new Level(plan);
var display = new Display(document.body, level);