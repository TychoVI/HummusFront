import '../styles/Menu.css'
import { Navigation, SmallCategoryCard, MenuItemCard, Loading, Button, AddFormMenuItem, AddFormCategory } from '../components'
import { useState, useEffect } from 'react'
import { Category, MenuItem } from '../types'
import { fetchCategories, fetchMenuItemsByCategory } from '../api'
import { useSearchParams } from 'react-router-dom'

const AUTHED = false

export default function Menu() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [categories, setCategories] = useState<Category[]>([])
  const [menuItems, setMenuItem] = useState<MenuItem[]>([])
  const [searchParams, _] = useSearchParams()
  const categoryId = searchParams.get('category')

  useEffect(() => {
    fetchMenuItemsByCategory(categoryId).then(setMenuItem)
    fetchCategories().then(setCategories)
  }, [])

  return (
    <>
      {menuItems.length != 0 || categories.length != 0 ? (
        <div className="menu-container">
          <Navigation url={banner} />

          <div className="inner-menu-container">
            <div className="menu-carousel">
              <div className="menu-carousel-inner">
                {categories.length != 0 &&
                  categories.map((c) => {
                    return <SmallCategoryCard key={c.id} {...c} />
                  })}
              </div>
            </div>

            <div className="menu-items">
              {AUTHED ? <AddFormMenuItem categoryId={categoryId} /> : null}
              {menuItems.length != 0 &&
                menuItems.map((m) => {
                  return <MenuItemCard key={m.id} {...m} />
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
