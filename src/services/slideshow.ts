interface Slides {
  id: number;
  name: string;
  pc: string;
  mobile: string;
  more: string;
  trailer: string;
}

import mob1 from "../images/mob1.jpg";
import mob2 from "../images/mob2.jpg";

import blackmyth from '../images/blackmith.jpeg'
import alan from '../images/alan.webp'
import sonu from '../images/sonu.jpeg'
import cyber from '../images/cyberpunk.jpg'
import final from '../images/final.jpg'
import elden from '../images/eldern.jpeg'
import ghost from '../images/ghost.jpg'


const slideshow: Slides[] = [
  {
    id: 1,
    name: "Black Myth: Wukong",
    pc: blackmyth,
    mobile: mob1,
    more: "481913",
    trailer:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/pnSsgRJmsCc?si=wxmEQglrVcnx2hgp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 2,
    name: "Alan Wake II: Night Springs",
    pc: alan,
    mobile: mob2,
    more: "983203",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/O_-4XH79B7U?si=s2Jogz0L32HW38nm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 3,
    name: "Senua's Saga: Hellblade II",
    pc: sonu,
    mobile: mob1,
    more: "398401",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/3VYGOkMnGCE?si=yxUcY0NNyS6oEdX4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 4,
    name: "Cyberpunk 2077",
    pc: cyber,
    mobile: mob2,
    more: "41494",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ugb80d5lxEM?si=fttAJvyxYyGHTXOA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 5,
    name: "Final Fantasy VII Rebirth",
    pc: final,
    mobile: mob1,
    more: "802435",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/KOhs9ZLImgE?si=JfQ7fd2xDDsDAr2s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 6,
    name: "Elden Ring: Shadow of the Erdtree",
    pc: elden,
    mobile: mob2,
    more: "977470",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/JugxpebuS_E?si=A2COoHwsbaPHdmJ2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 7,
    name: "Ghost of Tsushima Director's Cut",
    pc: ghost,
    mobile: mob1,
    more: "638650",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/A5gVt028Hww?si=exFfNU0EONN0N1yb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
];

export default slideshow;
