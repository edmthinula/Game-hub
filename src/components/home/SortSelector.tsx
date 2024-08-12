import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react'
import { BsChevronBarDown } from 'react-icons/bs'
import { MdLabel } from 'react-icons/md'

interface Props{
    onselecetSortorder:(sortOrder:string)=> void;
    sortOrder:string;
}

const SortSelector = ({onselecetSortorder,sortOrder}:Props) => {

    const sortOrders =[
        {value:'',label:'Relevance'},
        {value:'-added',label:'Date added'},
        {value:'name',label:'Name'},
        {value:'-released',label:'Release date'},
        {value:'-metacritic',label:'Popularity'},
        {value:'-rating',label:'Avarage rating'},
    ]
    const currentsortorder = sortOrders.find(order => order.value ===sortOrder);
  return (
    <Menu>
        <MenuButton as={Button} rightIcon={<BsChevronBarDown/>}>
        Order by : {currentsortorder?.label || 'Relevance'}

        </MenuButton>
        <MenuList>
            {sortOrders.map(order=> 
            <MenuItem onClick={()=>onselecetSortorder(order.value)} key={order.value} value={order.value}>{order.label}
            </MenuItem>)}
        </MenuList>
    </Menu>
  )
}

export default SortSelector