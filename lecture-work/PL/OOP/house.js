/*
const color = require('./color');
const COLOR_BLACK = color(0,0,0);
const COLOR_WHITE = color(255, 255, 255);
const COLOR_RED = color(255, 0, 0);
*/
function colorString(r, g, b) {
	return "rgb(" + r + "," + g + "," + b + ")";
}
const COLOR_BLACK = colorString(0,0,0);
const COLOR_WHITE = colorString(255, 255, 255);
const COLOR_RED = colorString(255, 0, 0);
class Shape {
  constructor(parent, x, y, w, h) {
    this.name = "Shape";
    this.parent = parent;
    this.x = x || 0;
    this.y = y || 0;
    this.width = w || 0;
    this.height = h || 0;
  }
  absX() {
    if (this.parent === null) {
      return this.x;
    } else {
      return this.x + this.parent.absX();
    }
  }
  absY() {
    if (this.parent === null) {
      return this.y;
    } else {
      return this.y + this.parent.absY();
    }
  }
  toString = function () {
    const pn = this.parent ? this.parent.name : "no parent";
    return `${this.name}{parent:${pn}, x:${this.x}, y:${this.y}, width:${this.width}, height:${this.height}}`;
  };
}

class House extends Shape {
  constructor(parent, x, y, w, h) {
    super(parent, x, y, w, h);
    this.wall = null;
    this.roof = null;
    this.name = "House";
  }
  draw(ctx) {
    console.log("House draw with Contex="+this.toString()+" absX="+this.absX()+" absY="+this.absY());
    this.wall.draw(ctx);
    this.roof.draw(ctx);
  }
}

class Wall extends Shape {
  constructor(parent, x, y, w, h) {
    super(parent, x, y, w, h);
    this.door = null;
    this.windows = [];
    this.name = "Wall";
  }
  draw(ctx) {
    const ax = this.absX();
    const ay = this.absY();

    ctx.fillStyle = COLOR_WHITE;
    ctx.fillRect(ax, ay, this.width, this.height);

    ctx.strokeStyle = COLOR_BLACK;
    ctx.strokeRect(ax, ay, this.width, this.height);

    if (this.door) this.door.draw(ctx);
    for (let i = 0; i < this.windows.length; ++i) {
      this.windows[i].draw(ctx);
    }
  }
}

class Roof extends Shape {
  constructor(parent, x, y, w, h) {
    super(parent, x, y, w, h);
    this.name = "Roof";
  }
  draw(ctx) {}
}

class CathedralRoof extends Roof {
  constructor(parent, x, y, w, h) {
    super(parent, x, y, w, h);
    this.name = "CathedralRoof";
  }
  draw(ctx) {
    const ax = this.absX();
    const ay = this.absY();

    ctx.fillStyle = COLOR_RED;
    ctx.beginPath();
    ctx.moveTo(ax, ay + this.height);
    ctx.lineTo(ax + this.width / 2, ay);
    ctx.lineTo(ax + this.width, ay + this.height);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = COLOR_BLACK;
    ctx.beginPath();
    ctx.moveTo(ax, ay + this.height);
    ctx.lineTo(ax + this.width / 2, ay);
    ctx.lineTo(ax + this.width, ay + this.height);
    ctx.closePath();
    ctx.stroke();
  }
}

class DomeRoof extends Roof {
  constructor(parent, x, y, w, h) {
    super(parent, x, y, w, h);
    this.name = "DomeRoof";
  }
  draw(ctx) {
    const ax = this.absX();
    const ay = this.absY();
    const radius = this.width / 2;
    const cx = ax + radius;
    const cy = ay + radius;

    ctx.fillStyle = COLOR_RED;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, (Math.PI / 180) * 0, (Math.PI / 180) * 180, true);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = COLOR_BLACK;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, (Math.PI / 180) * 0, (Math.PI / 180) * 180, true);
    ctx.closePath();
    ctx.stroke();
  }
}

class GambrelRoof extends Roof {
  constructor(parent, x, y, w, h) {
    super(parent, x, y, w, h);
    this.name = "GambrelRoof";
  }
  draw(ctx) {
    const ax = this.absX();
    const ay = this.absY();

    ctx.fillStyle = COLOR_RED;
    ctx.beginPath();
    ctx.moveTo(ax, ay + this.height);
    ctx.lineTo(ax + this.width / 6, ay + this.height / 2);
    ctx.lineTo(ax + this.width / 2, ay);
    ctx.lineTo(ax + (this.width * 5) / 6, ay + this.height / 2);
    ctx.lineTo(ax + this.width, ay + this.height);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = COLOR_BLACK;
    ctx.beginPath();
    ctx.moveTo(ax, ay + this.height);
    ctx.lineTo(ax + this.width / 6, ay + this.height / 2);
    ctx.lineTo(ax + this.width / 2, ay);
    ctx.lineTo(ax + (this.width * 5) / 6, ay + this.height / 2);
    ctx.lineTo(ax + this.width, ay + this.height);
    ctx.closePath();
    ctx.stroke();
  }
}

const SASHWIDTH = 2;

class Window extends Shape {
  constructor(parent, x, y, w, h) {
    super(parent, x, y, w, h);
    this.sash = false;
    this.name = "Window";
  }
  draw(ctx) {
    const ax = this.absX();
    const ay = this.absY();

    ctx.fillStyle = COLOR_WHITE;
    ctx.fillRect(ax, ay, this.width, this.height);

    //ctx.lineWidth = 1;
    ctx.strokeStyle = COLOR_BLACK;
    ctx.strokeRect(ax, ay, this.width, this.height);

    if (this.sash) {
      ctx.strokeRect(ax - SASHWIDTH, ay - SASHWIDTH, this.width + 2 * SASHWIDTH, this.height + 2 * SASHWIDTH);
    }
  }
}

class DoubleWindow extends Window {
  constructor(parent, x, y, w, h) {
    super(parent, x, y, w, h);
    this.name = "DoubleWindow";
  }
  draw(ctx) {
    const ax = this.absX();
    const ay = this.absY();

    ctx.fillStyle = COLOR_WHITE;
    ctx.fillRect(ax, ay, this.width, this.height);

    //ctx.lineWidth = 1;
    ctx.strokeStyle = COLOR_BLACK;
    ctx.strokeRect(ax, ay, this.width, this.height);

    if (this.sash) {
      ctx.strokeRect(ax - SASHWIDTH, ay - SASHWIDTH, this.width + 2 * SASHWIDTH, this.height + 2 * SASHWIDTH);
    }
    ctx.strokeStyle = COLOR_BLACK;
    ctx.beginPath();
    ctx.moveTo(ax, ay + this.height / 2);
    ctx.lineTo(ax + this.width, ay + this.height / 2);
    ctx.closePath();
    ctx.stroke();
  }
}

class QuadWindow extends Window {
  constructor(parent, x, y, w, h) {
    super(parent, x, y, w, h);
    this.name = "QuadWindow";
  }
  draw(ctx) {
    console.log("QuadWindow draw with Contex="+this.toString()+" absX="+this.absX()+" absY="+this.absY());
    const ax = this.absX();
    const ay = this.absY();

    ctx.fillStyle = COLOR_WHITE;
    ctx.fillRect(ax, ay, this.width, this.height);

    //ctx.lineWidth = 1;
    ctx.strokeStyle = COLOR_BLACK;
    ctx.strokeRect(ax, ay, this.width, this.height);

    if (this.sash) {
      ctx.strokeRect(ax - SASHWIDTH, ay - SASHWIDTH, this.width + 2 * SASHWIDTH, this.height + 2 * SASHWIDTH);
    }
    ctx.strokeStyle = COLOR_BLACK;
    ctx.beginPath();
    ctx.moveTo(ax, ay + this.height / 2);
    ctx.lineTo(ax + this.width, ay + this.height / 2);
    ctx.moveTo(ax + this.width / 2, ay);
    ctx.lineTo(ax + this.width / 2, ay + this.height);
    ctx.closePath();
    ctx.stroke();
  }
}

const KNOBGAP = 2;
const KNOBSIZE = 4;

class Door extends Shape {
  constructor(parent, x, y, w, h) {
    super(parent, x, y, w, h);
    this.leftKnob = false;
    this.name = "Door";
  }
  draw(ctx) {
    var ax = this.absX();
    var ay = this.absY();

    ctx.fillStyle = COLOR_WHITE;
    ctx.fillRect(ax, ay, this.width, this.height);

    //ctx.lineWidth = 1;
    ctx.strokeStyle = COLOR_BLACK;
    ctx.strokeRect(ax, ay, this.width, this.height);

    ctx.strokeStyle = COLOR_BLACK;
    ctx.beginPath();
    if (this.leftKnob) {
      ctx.arc(ax + KNOBGAP + KNOBSIZE / 2, ay + this.height / 2, KNOBSIZE / 2, 0, (Math.PI / 180) * 360, true);
    } else {
      ctx.arc(
        ax + this.width - KNOBGAP - KNOBSIZE / 2,
        ay + this.height / 2,
        KNOBSIZE / 2,
        0,
        (Math.PI / 180) * 360,
        true
      );
    }
    ctx.closePath();
    ctx.stroke();
  }
}
