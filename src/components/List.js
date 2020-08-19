import { defineComponent, toRefs } from "vue";

export default defineComponent({
    name: 'List',

    props: {
        title: String,
        todos: Array
    },

    setup(props, { emit }) {
        const completeChange = (id) => (e) => {
            emit('completeChange', id, e.target.checked);
        }

        const handleDelete = (id) => (e) => {
            e.preventDefault();

            emit('delTodo', id);
        }

        const handleEdit = (id) => (e) => {
            emit('editTodo', id, e.target.value);
        }

        return {
            ...toRefs(props),
            completeChange,
            handleDelete,
            handleEdit,
        };
    },

    render(ctx) {
        const { title, todos, completeChange, handleDelete, handleEdit } = ctx;

        const todosNodes = todos.map(todo => (
            <li class={ todo.completed ? 'is-completed' : '' } key={todo.id}>
                <input type="checkbox" checked={ todo.completed } onChange={ completeChange(todo.id) } />
                <p>
                    <input value={ todo.title } onInput={ handleEdit(todo.id) } />
                </p>
                <a href="" onClick={ handleDelete(todo.id) }>-</a>
            </li>
        ));

        return (
            <>
                <h2>{ title }<span>{ todos.length }</span></h2>
                <ul>
                    { todosNodes }
                </ul>
            </>    
        );
    }
});
