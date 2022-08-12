import React from 'react'

const List = ({items, removeItem, editItem}) => {
    
  return (
    <div>
        {items.map((item)=>{
            const {title, id}= item;
            return(
                <div className='list-div'>
                    <p className="title">{title}</p>
                    <div className="list-btns">
                        <button className="edit-btn" onClick={()=>editItem(id)}>Edit</button>
                        <button className="remove-btn" onClick={()=> removeItem(id)} >remove</button>
                    </div>
                </div>
            )
        })}

    </div>
  )
}

export default List