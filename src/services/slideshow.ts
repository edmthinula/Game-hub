interface Slides {
  id: number;
  name: string;
  pc: string;
  mobile: string;
  more: string;
  trailer: string;
}
import ghost1 from "../images/ghost1.jpeg";
const slideshow: Slides[] = [
  {
    id: 1,
    name: "Black Myth: Wukong",
    pc: "../images/ghost1.jpeg",
    mobile: "../images/mob1.jpg",
    more: "481913",
    trailer: "https://youtu.be/pnSsgRJmsCc?si=jzfzfjx0Asoxg71D",
  },
  {
    id: 2,
    name: "Alan Wake II: Night Springs",
    pc: "../images/ghost2.jpeg",
    mobile: "../images/mob2.jpg",
    more: "983203",
    trailer: "https://youtu.be/O_-4XH79B7U?si=I8rmFU2Avf-ayoYO",
  },
  {
    id: 3,
    name: "Senua's Saga: Hellblade II",
    pc: "../images/ghost1.jpeg",
    mobile: "../images/mob1.jpg",
    more: "398401",
    trailer: "https://youtu.be/3VYGOkMnGCE?si=9HFXFYXcStgTvEf9",
  },
  {
    id: 4,
    name: "Cyberpunk 2077",
    pc: "../images/ghost2.jpeg",
    mobile: "../images/mob2.jpg",
    more: "41494",
    trailer: "https://youtu.be/Ugb80d5lxEM?si=ju3QDA-OCMqDgj4m",
  },
  {
    id: 5,
    name: "Final Fantasy VII Rebirth",
    pc: "../images/ghost1.jpeg",
    mobile: "../images/mob1.jpg",
    more: "802435",
    trailer: "https://youtu.be/KOhs9ZLImgE?si=u9ksiru0ZXiQorr-",
  },
  {
    id: 6,
    name: "Elden Ring: Shadow of the Erdtree",
    pc: "../images/ghost2.jpeg",
    mobile: "../images/mob2.jpg",
    more: "977470",
    trailer: "https://youtu.be/JugxpebuS_E?si=6t1h26VVZZ6DGsVM",
  },
  {
    id: 7,
    name: "Ghost of Tsushima Director's Cut",
    pc: "../images/ghost1.jpeg",
    mobile: "../images/mob1.jpg",
    more: "638650",
    trailer: "https://youtu.be/A5gVt028Hww?si=K1N8YrxpLlWnqYGh",
  },
];

export default slideshow