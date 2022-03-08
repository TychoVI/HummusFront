import '../styles/Home.css'
import { CategoryCard, Navigation } from '../components'
import { useState, useEffect } from 'react'
import { fetchCategories } from '../api'
import { Category } from '../types'

export default function Home() {
  const banner = 'https://www.nestleprofessionalmena.com/sites/default/files/2020-05/Vision%20banner.png'
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    fetchCategories().then(setCategories)
  }, [])

  return (
    <div className="app-container ">
      <Navigation url={banner} />

      <div className="app-canvas">
        {categories.length &&
          categories.map((c) => {
            return <CategoryCard key={c.id} id={c.id} name={c.name} image={c.image} />
          })}
      </div>
    </div>
  )
}
