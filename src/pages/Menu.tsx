import '../styles/Menu.css'
import { Navigation, SmallCategoryCard, MenuItemCard, Loading, Cart } from '../components'
import { useState, useEffect } from 'react'
import { Category, MenuItem } from '../types'
import { fetchCategories, fetchItemByCategory, fetchMenuItems } from '../api'
import { useSearchParams } from 'react-router-dom'

export default function Menu() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItem] = useState<MenuItem[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryId = searchParams.get('category')

  useEffect(() => {
    console.log(categoryId)
    fetchItemByCategory(categoryId).then(setMenuItem)

    fetchCategories().then(setCategories)
  }, [])

  return (
    <>
      {(menuItems.length || categories.length) ? (
        <div className="menu-container">
          <Navigation url={banner} />

          <div className="inner-menu-container">
            <div className="menu-carousel">
              <div className="menu-carousel-inner">
                {categories.length &&
                  categories.map((c) => {
                    return <SmallCategoryCard key={c.id} id={c.id} name={c.name} image={c.image} />
                  })}
              </div>
            </div>

            <h1>Menu Items</h1>
            <div className="menu-items">
              {menuItems.length &&
                menuItems.map((m) => {
                  return <MenuItemCard key={m.id} id={m.id} name={m.name} price={m.price} image={m.image} />
                })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
