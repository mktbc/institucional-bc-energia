import { itemsData } from '@/components/Navbar/Items.data'

import Item from './Item'

const ItemsCol = ({ index }: { index: number }) => (
  <>
    <h5 className="mb-2 text-lg text-white lg:mb-6">{itemsData[index]?.title}</h5>
    <ul className="leading-[2.4rem] lg:leading-[3rem]">
      {itemsData[index]?.subItems?.map((item) => <Item key={item.id} data={item} />)}
    </ul>
  </>
)

export default ItemsCol
