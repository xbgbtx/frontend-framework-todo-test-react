import React from "react";
import {useState} from "react";

import grid_layout from "./css/grid.module.css";
import text_styles from "./css/text.module.css";

function App() {
    
    const [ todo_items, set_todo_items ] = useState([]);
    const [ done_items, set_done_items ] = useState([]);

    const [ todo_input_text, set_todo_input_text ] = useState("");

    const todo_submit_handler = e =>
    {
        e.preventDefault ();

        console.log ( `Submit: ${todo_input_text}` );

        if ( todo_input_text.length < 1 )
            return;

        let new_item = todo_input_text;
        set_todo_items  ( p => [ ...p, new_item ] );

        set_todo_input_text ( "" );
    };

    const todo_mark_done_handler = ( item_key ) =>
    {
        console.log ( `Mark Done: ${item_key}` );

        const item_idx = Number ( item_key );
        const item_text = todo_items[ item_idx ];

        set_todo_items ( p => p.filter ( (_, idx) => idx !== item_idx ) );

        set_done_items ( p => [ item_text, ...p ] );
    };

    const delete_done_item_handler = ( item_key ) =>
    {
        console.log ( `Delete: ${item_key}` );

        const item_idx = Number ( item_key );

        set_done_items ( p => p.filter ( (_, idx) => idx !== item_idx ) );
    };

    return (
        <div className={`${grid_layout.app_root}`}>

            <div class={`${grid_layout.header_container} 
                         ${grid_layout.section}`}>
                <span class={`${text_styles.page_title}`}>
                    ToDo
                </span>
            </div>

            <div class={`${grid_layout.todo_container} 
                         ${grid_layout.section}`}>
                <ListDisplay 
                    list_name="ToDo" 
                    list_items={todo_items} 
                    button_text="Mark as Done"
                    button_cb={todo_mark_done_handler}
                />
            </div>

            <div class={`${grid_layout.done_container} 
                         ${grid_layout.section}`}>
                <ListDisplay 
                    list_name="Done" 
                    list_items={done_items} 
                    button_text="Delete"
                    button_cb={delete_done_item_handler}
                />
            </div>

            <div class={`${grid_layout.input_container} 
                         ${grid_layout.section}`}>
                <TodoItemForm 
                    todo_text={todo_input_text}
                    change_cb={e => set_todo_input_text ( e.target.value )}
                    submit_cb={todo_submit_handler}
                />
            </div>

        </div>
    );
}

const ListDisplay = ({ list_name, list_items, button_text, button_cb }) =>
{
    const render_items = () =>
    {
        if ( list_items.length === 0 )
            return (<p>No items.</p>);


        const list_html = list_items.map ( (item, idx) => 
        {
            const item_key = idx.toString();

            return (
                <li key={item_key}>
                    {item}
                    <input type="button" 
                        value={button_text}
                        onClick={ () => button_cb ( item_key ) }
                    />
                </li>
            );
        });

        return (
            <ol>
                {list_html}
            </ol>
        );
    }

    return (
        <div>
            <h1>{list_name}:</h1>
            {render_items ()}
        </div>
    );

}

const TodoItemForm = ({ todo_text, change_cb, submit_cb }) =>
{
    return (
        <div>
            <h1>Add ToDo Item:</h1>
            <form onSubmit={submit_cb}>
                <label>
                    Add ToDo Item:
                    <input type="text" name="todo-item"
                        value={todo_text}
                        onChange={change_cb}
                    />
                </label>
                <input type="submit" value="Add Item" />
            </form>
        </div>
    );
}

export default App;
