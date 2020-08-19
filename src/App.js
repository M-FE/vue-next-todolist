import { defineComponent, reactive, computed } from 'vue';
import Header from './components/Header';
import List from './components/List';
import Footer from './components/Footer';

import useVisit from './visit';

export default defineComponent({
	setup() {
		const { clickCount, visitCount } = useVisit();

		let state = reactive({
			text: '',
			todoList: [
				{ id: 1, title: 'HTML', completed: true },
				{ id: 2, title: 'CSS', completed: false },
				{ id: 3, title: 'JavaScript', completed: false }
			]
		});

		const completedTodos = computed(() => state.todoList.filter(i => i.completed));
		const incompleteTodos = computed(() => state.todoList.filter(i => !i.completed));

		const textChange = (newText) => {
			state.text = newText;
		};

		const addTodo = () => {
			if (!state.text) {
				return;
			}

			state.todoList.push({
				id: + new Date(),
				title: state.text,
				completed: false
			});
			state.text = '';
		}

		const editTodo = (id, newTitle) => {
			state.todoList = state.todoList.map(todo => {
				if (todo.id === id) {
					return {
						...todo,
						title: newTitle
					};
				}

				return todo;
			});
		}

		const delTodo = (id) => {
			const index = state.todoList.findIndex(todo => todo.id === id);

			state.todoList.splice(index, 1);
		}

		const completeChange = (id, completed) => {
			state.todoList = state.todoList.map(todo => {
				if (id === todo.id) {
					return {
						...todo,
						completed
					};
				}

				return todo;
			});
		}

		return {
			state,
			completedTodos,
			incompleteTodos,
			clickCount, 
			visitCount,
			textChange,
			addTodo,
			editTodo,
			delTodo,
			completeChange
		};
	},

	render(ctx) {
		const { 
			state, 
			completedTodos, 
			incompleteTodos, 
			clickCount, 
			visitCount,
			textChange,
			addTodo,
			editTodo,
			delTodo,
			completeChange
		} = ctx;

		const lists = [
			{ title: '正在进行', todos: incompleteTodos },
			{ title: '已经完成', todos: completedTodos }
		];

		return (
			<>
				<Header text={state.text} onTextChange={textChange} onAddTodo={ addTodo } />
				<section>
					<div class="tip">您已经访问过当前页面<i>{ visitCount }</i>次，本次访问共点击了<i>{ clickCount }</i>次页面。</div>
					{
						lists.map((list, index) => (
							<List 
								key={index}
								title={ list.title }
								todos={ list.todos }
								onEditTodo={ editTodo }
								onDelTodo={ delTodo }
								onCompleteChange={ completeChange }
							/>
						))
					}
				</section>
				<Footer />
			</>
		);
	},
});
