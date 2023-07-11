import React from 'react'

type Props = {
  active : boolean
}

const Menu = ({active}: Props) => {
  return (
    <div className={`menu ${active ? "active" : ""}`}>
      <a href="#">testtest</a>
    </div>
  )
}

export default Menu