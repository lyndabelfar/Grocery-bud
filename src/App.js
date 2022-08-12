import { useEffect, useState } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage=()=>{
  let list = localStorage.getItem('list')
  if (list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return [];
  }
}


function App() {
  const [name, setName] = useState('')
  const [alert, setAlert] = useState({show: false, message:'', type:''})
  const [isEditing, setIsEditing] = useState(false)
  const [list, setList] = useState(getLocalStorage())
  const [editId, setEditId] = useState(null)
  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!name){
      showAlert(true,'Please add a new item', 'danger' )
    }else if (name && isEditing){
      setList(
        list.map((item)=>{
          if (item.id=== editId){
            return{...item, title:name}
          }
          return item
        }
      ))
      setName('')
      setEditId(null)
      setIsEditing(false)
      showAlert(true,'an item has been edited', 'success')
    }else{
      showAlert(true, 'a new item has been added', 'success')
      const newItem = {id: new Date().getTime().toString(), title:name}
      setList([...list, newItem])
      setName('')
    }
  }
  const showAlert =(show=false, message='',type="")=>{
    setAlert({show, message, type})
  }
  const handleInputChange =(e)=>{
    setName(e.target.value)
  }
  const handleClearAll =()=>{
    setList([])
  }

  const removeItem =(id)=>{
    showAlert(true, 'an item has been removed', 'danger')
    setList(list.filter((item)=> item.id !== id))
  }
  const editItem =(id)=>{
    const specificItem = list.find((item)=> item.id === id)
    setIsEditing(true)
    setEditId(id)
    setName(specificItem.title)

  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <>
    <div className="container">
      <form onSubmit={handleSubmit}> 
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
        <h3>Grocery Bud</h3>
        <input type="text" placeholder="e.g. eggs" value={name} onChange={handleInputChange}/>
        <button type="submit" className="submit-btn">{isEditing?'Edit': 'Submit'}</button>
      </form>
      {list.length>0 && (
        <div className="items-container">
          <List items={list}  removeItem={removeItem} editItem={editItem}/>
          <button className="clear-all-btn" onClick={handleClearAll}>Clear All</button>
        </div>
      )}

      

    </div>
      
    </>
  );
}

export default App;
