import '../styles/EditForm.css'
import { useRef, useState } from 'react'
import { Ingredient } from '../types'
import { deleteIngredient, putIngredient} from '../api'
import Button from './Button'


export default function EditIngredient(ingredient: Ingredient) {
  
  const [editingState, setEditingState] = useState(false)

  let nameInput = useRef(null)
  let amountInput = useRef(null)
  let allergenIngredientsInput = useRef(null)

  async function updateIngredient() {
    await putIngredient({
    id: ingredient.id,
    name: nameInput.current.value,
    amount: amountInput.current.amount,
    allergenIngredients: ingredient.allergenIngredients,
    dateTimeCreated: ''
  })
    window.location.reload()
  }

  async function removeIngredient() {
    await deleteIngredient(ingredient)
    window.location.reload()
  }

  return (
    <>
      <div onClick={() => setEditingState(true)}>
        Edit
      </div>

      {editingState ? (
        <form>
          <div className="edit-form">
            <h1 className="edit-form-title">Update menu item information</h1>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Dish name</div>
              <input className="edit-form-input" ref={nameInput} defaultValue={ingredient.name} />
            </div>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Amount</div>
              <input className="edit-form-input" ref={amountInput} defaultValue={ingredient.amount} />
            </div>

            <div className="edit-form-inputs">
              <div className="edit-form-label">Allergen</div>
              <input className="edit-form-input" ref={allergenIngredientsInput} defaultValue={ingredient.allergenIngredients} />
            </div>

            <div className="edit-form-btns">
            <div onClick={() => setEditingState(false)}>
                <Button text={'Cancel'} />
              </div>
              <div onClick={updateIngredient}>
                <Button text={'Update'} />
              </div>
              <div onClick={removeIngredient}>
                <Button text={'Delete'} />
              </div>
            </div>
          </div>
          <div onClick={() => setEditingState(false)} className="edit-form-block" />
        </form>
      ) : null}
    </>
  )
}
