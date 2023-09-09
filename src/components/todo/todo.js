import React, { useEffect, useState } from 'react';
import './style.css';



//to get local storage data
const getLocalData = () => {
    const list = localStorage.getItem("mytodolist");

    if (list) {
        return JSON.parse(list);
    }
    else {
        return [];
    }
};
const Todo = () => {
    const [inputData, setInputData] = useState("");        //to set value of list item 
    const [items, setItems] = useState(getLocalData());    //to show complete list of items
    const [isEditItem, setIsEditItem] = useState("");      //id of item to be edited
    const [toggleBtn, setToggleBtn] = useState(false);      // to show add and edit buttons


    // function to add item
    const addItem = () => {
        if (!inputData) {
            alert("Please enter data");
        }
        else if (inputData && toggleBtn) {         //when an item is being edited
            setItems(
                items.map((currEle) => {
                    if (currEle.id === isEditItem) {
                        return { ...currEle, name: inputData };
                    }
                    return currEle;
                })
            );
            setInputData("");
            setIsEditItem(null);
            setToggleBtn(false);
        }
        else {
            const newDataInput = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, newDataInput]);
            setInputData("");
        }
    };
    //function to delete items
    const deleteItem = (index) => {
        const updateItems = items.filter((currEle) => {
            return currEle.id !== index;
        });
        setItems(updateItems);
    };
    //function to remove all items
    const removeAll = () => {
        setItems([]);
    };
    //function to edit items
    const editItem = (index) => {
        const item_tobe_edited = items.find((currEle) => {
            return currEle.id === index;
        });
        setInputData(item_tobe_edited.name);
        setIsEditItem(index);
        setToggleBtn(true);
    };
    //adding local storage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);   //jab bhi items ki value badlegi tabhi local storage change hoga

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <img src='./images/todo.svg' alt='todo logo'></img>
                        <figcaption>Add Your List Here</figcaption>
                    </figure>
                    {/* Add items */}
                    <div className='addItems'>
                        <input
                            className='form-control'
                            type='text'
                            placeholder="✍️ Add Item..."
                            value={inputData}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {toggleBtn ? <i className="far fa-edit add-btn" onClick={addItem}></i>
                            : <i className="fa fa-plus add-btn" onClick={addItem}></i>};
                    </div>
                    {/* Show items */}
                    <div className='showItems'>
                        {items.map((currEle) => {
                            return (
                                <div className='eachItem' key={currEle.id}>
                                    <h3>{currEle.name}</h3>
                                    <div className='todo-btn'>
                                        <i className="far fa-edit add-btn" onClick={() => editItem(currEle.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => deleteItem(currEle.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Remove items */}
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}>
                            <span>CHECK LIST</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;