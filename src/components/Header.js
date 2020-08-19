import { defineComponent, toRefs } from 'vue';

export default defineComponent({
    name: 'Header',

    props: {
        text: String
    },
    
    setup(props, { emit }) {
        const handleChange = (e) => {
            emit('textChange', e.target.value);
        }

        const handleAdd = (e) => {
            if (e.keyCode !== 13) {
                return;
            }

            emit('addTodo');
        }

        return {
            ...toRefs(props),
            handleChange,
            handleAdd
        };
    },

	render(ctx) {
        const { text, handleChange, handleAdd } = ctx;

		return (
            <header>
                <section>
                    <label for="title">ToDoList</label>
                    <input 
                        id="title" 
                        name="title" 
                        value={ text }
                        placeholder="添加ToDo"
                        autocomplete="off"
                        onInput={ handleChange }
                        onKeydown={ handleAdd }
                    />
                </section>
            </header>
        );
	},
});
