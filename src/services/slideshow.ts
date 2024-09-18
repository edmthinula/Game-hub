interface Slides {
  id: number;
  name: string;
  pc: string;
  mobile: string;
  more: string;
  trailer: string;
}
import ghost1 from "../images/ghost1.jpeg";
import ghost2 from "../images/ghost2.jpeg";
import mob1 from "../images/mob1.jpg";
import mob2 from "../images/mob2.jpg";
const slideshow: Slides[] = [
  {
    id: 1,
    name: "Black Myth: Wukong",
    pc: ghost1,
    mobile: mob1,
    more: "481913",
    trailer: "https://youtu.be/pnSsgRJmsCc?si=jzfzfjx0Asoxg71D",
  },
  {
    id: 2,
    name: "Alan Wake II: Night Springs",
    pc: ghost2,
    mobile: mob2,
    more: "983203",
    trailer: "https://youtu.be/O_-4XH79B7U?si=I8rmFU2Avf-ayoYO",
  },
  {
    id: 3,
    name: "Senua's Saga: Hellblade II",
    pc: ghost1,
    mobile: mob1,
    more: "398401",
    trailer: "https://youtu.be/3VYGOkMnGCE?si=9HFXFYXcStgTvEf9",
  },
  {
    id: 4,
    name: "Cyberpunk 2077",
    pc: ghost2,
    mobile: mob2,
    more: "41494",
    trailer: "https://youtu.be/Ugb80d5lxEM?si=ju3QDA-OCMqDgj4m",
  },
  {
    id: 5,
    name: "Final Fantasy VII Rebirth",
    pc: ghost1,
    mobile: mob1,
    more: "802435",
    trailer: "https://youtu.be/KOhs9ZLImgE?si=u9ksiru0ZXiQorr-",
  },
  {
    id: 6,
    name: "Elden Ring: Shadow of the Erdtree",
    pc: ghost2,
    mobile: mob2,
    more: "977470",
    trailer: "https://youtu.be/JugxpebuS_E?si=6t1h26VVZZ6DGsVM",
  },
  {
    id: 7,
    name: "Ghost of Tsushima Director's Cut",
    pc: ghost1,
    mobile: mob1,
    more: "638650",
    trailer: "https://youtu.be/A5gVt028Hww?si=K1N8YrxpLlWnqYGh",
  },
];

export default slideshow