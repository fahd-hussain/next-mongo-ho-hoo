import CategoryIcon from '@mui/icons-material/Dashboard'
import DashboardIcon from '@mui/icons-material/Dvr'
import StockIcon from '@mui/icons-material/Inventory'
import ProductIcon from '@mui/icons-material/Widgets'

interface ISidebarItem {
  id: string
  name: string
  Icon: any
  link: string
}

const sidebarItems: ISidebarItem[] = [
  { id: 'dashboard', name: 'Dashboard', Icon: DashboardIcon, link: '/' },
  {
    id: 'category',
    name: 'Category',
    Icon: CategoryIcon,
    link: '/category',
  },
  { id: 'product', name: 'Product', Icon: ProductIcon, link: '/product' },
  { id: 'stock', name: 'Stock', Icon: StockIcon, link: '/stock' },
]

export default sidebarItems
