/* eslint-disable no-loop-func */

import "./styles.css";
import randomcolor from "randomcolor";
import V from "victor";
/**
 * V = {
 * x: Int,
 * y: Int
 * }
 */

const r = (min = 0, max = 1) => Math.random() * (max - min) + min;
const rm = () => randomcolor();

const cp = 2;
const cg = 2;
const W = 0.9;
const Sw = []; /* swarm */
const Sw2 = []; /* swarm */
let gb = new V(Infinity, Infinity); /* groupebest */
const Sp = {
  /* space width */
  x: window.innerWidth,
  y: window.innerHeight
};

class P {
  constructor() {
    this.pos = new V(r() * Sp.x, r() * Sp.y);
    this.v = new V(10 * r(-5, 12), 10 * r(-5, 12));
    this.initPartical();
    this.pb = this.pos; //pb = personal best
    if (gb.distanceSq(house.pos) > this.pos.distanceSq(house.pos)) {
      gb = this.pos; // gb = group best
    }
  }

  followVictor(v = this.v) {
    //this.pos = this.pos.add(v);
    this.htmlDot.style.top = this.pos.y + "px";
    this.htmlDot.style.left = this.pos.x + "px";
  }

  initPartical() {
    const Partical = document.createElement("div");
    Partical.style.backgroundColor = rm();
    Partical.classList.add("p");
    Partical.style.top = this.pos.y + "px";
    Partical.style.left = this.pos.x + "px";
    document.body.appendChild(Partical);
    this.htmlDot = Partical;
  }
}

class H {
  constructor() {
    this.pos = new V(r() * Sp.x, r() * Sp.y);
    this.initHouse();
  }

  initHouse() {
    const House = document.createElement("div");
    House.classList.add("house");
    House.style.top = this.pos.y - 30 / 2 + "px";
    House.style.left = this.pos.x - 30 / 2 + "px";
    document.body.appendChild(House);
    this.houseHtml = House;
  }
}
const house = new H();
for (let i = 0; i < 100; i++) {
  Sw.push(new P());
}

function play() {
  let con = 0;
  const int = setInterval(() => {
    con++;
    if (con > 5000) {
      clearInterval(int);
    }
    Sw.forEach(P => {
      let rg = new V(r(), r());
      let rp = new V(r(), r());
      /*  P.v = P.v
        .multiplyScalar(W)
        .add(
          P.pb
            .subtract(P.pos)
            .multiply(rp)
            .multiplyScalar(cp)
        )
        .add(
          gb
            .subtract(P.pos)
            .multiply(rg)
            .multiplyScalar(cg)
        );
*/
      P.pos = house.pos;
      P.followVictor();
      if (P.pos.distanceSq(house.pos) < P.pb.distanceSq(house.pos)) {
        P.pb = P.pos;
        if (P.pos.distanceSq(house.pos) < gb.distanceSq(house.pos)) {
          gb = P.pos;
        }
      }
    });
  }, 100);
}

document.addEventListener("click", () => play());
