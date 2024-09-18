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
    trailer:
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/pnSsgRJmsCc?si=wxmEQglrVcnx2hgp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 2,
    name: "Alan Wake II: Night Springs",
    pc: ghost2,
    mobile: mob2,
    more: "983203",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/O_-4XH79B7U?si=s2Jogz0L32HW38nm" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 3,
    name: "Senua's Saga: Hellblade II",
    pc: ghost1,
    mobile: mob1,
    more: "398401",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/3VYGOkMnGCE?si=yxUcY0NNyS6oEdX4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 4,
    name: "Cyberpunk 2077",
    pc: ghost2,
    mobile: mob2,
    more: "41494",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ugb80d5lxEM?si=fttAJvyxYyGHTXOA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 5,
    name: "Final Fantasy VII Rebirth",
    pc: ghost1,
    mobile: mob1,
    more: "802435",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/KOhs9ZLImgE?si=JfQ7fd2xDDsDAr2s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 6,
    name: "Elden Ring: Shadow of the Erdtree",
    pc: ghost2,
    mobile: mob2,
    more: "977470",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/JugxpebuS_E?si=A2COoHwsbaPHdmJ2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
  {
    id: 7,
    name: "Ghost of Tsushima Director's Cut",
    pc: ghost1,
    mobile: mob1,
    more: "638650",
    trailer: '<iframe width="560" height="315" src="https://www.youtube.com/embed/A5gVt028Hww?si=exFfNU0EONN0N1yb" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  },
];

export default slideshow;
