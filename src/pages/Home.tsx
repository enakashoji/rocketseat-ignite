import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
	const [tasks, setTasks] = useState<Task[]>([]);

	function handleAddTask(newTaskTitle: string) {
		if (tasks.find((task) => task.title === newTaskTitle)) {
			Alert.alert('Task já cadastrada');
		} else {
			const newTask: Task = {
				id: new Date().getTime(),
				title: newTaskTitle,
				done: false,
			};
			setTasks((oldState) => [...oldState, newTask]);
		}
	}

	function handleToggleTaskDone(id: number) {
		const list: Task[] = tasks.map((task: Task) => {
			if (task.id === id) {
				task.done = !task.done;
			}
			return task;
		});
		setTasks(list);
	}

	function handleEditTask(id: number, title: string) {
		const editedTaskList: Task[] = tasks.map((pTask) => {
			if (pTask.id === id) {
				pTask.title = title;
			}
			return pTask;
		});
		setTasks(editedTaskList);
	}

	function handleRemoveTask(id: number) {
		Alert.alert(
			'Remover item',
			'Tem certeza que você deseja remover esse item?',
			[
				{
					text: 'Cancel',
					style: 'cancel',
				},
				{
					text: 'Remover',
					style: 'default',
					onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
				},
			]
		);
	}

	return (
		<View style={styles.container}>
			<Header tasksCounter={tasks.length} />

			<TodoInput addTask={handleAddTask} />

			<TasksList
				tasks={tasks}
				toggleTaskDone={handleToggleTaskDone}
				editTask={handleEditTask}
				removeTask={handleRemoveTask}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EBEBEB',
	},
});
