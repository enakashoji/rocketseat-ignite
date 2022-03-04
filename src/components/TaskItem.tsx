import React, { useEffect, useRef, useState } from 'react';
import {
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { Task } from './TasksList';
import trashIcon from '../assets/icons/trash/trash.png';
import Icon from 'react-native-vector-icons/Feather';

interface TaskItemProps {
	task: Task;
	index: number;
	toggleTaskDone: (id: number) => void;
	removeTask: (id: number) => void;
	editTask: (id: number, newTitle: string) => void;
}

export function TaskItem({
	task,
	index,
	toggleTaskDone,
	removeTask,
	editTask,
}: TaskItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(task.title);
	const textInputRef = useRef<TextInput>(null);

	const handleStartEditing = () => {
		setIsEditing(true);
	};

	const handleCancelEditing = () => {
		setIsEditing(false);
	};

	const handleSubmitEditing = () => {
		editTask(task.id, newTitle);
		setIsEditing(false);
	};

	useEffect(() => {
		if (textInputRef.current) {
			if (isEditing) {
				textInputRef.current.focus();
			} else {
				textInputRef.current.blur();
			}
		}
	}, [isEditing]);

	return (
		<>
			<View>
				<TouchableOpacity
					testID={`button-${index}`}
					activeOpacity={0.7}
					style={styles.taskButton}
					onPress={() => toggleTaskDone(task.id)}>
					<View
						testID={`marker-${index}`}
						style={task.done ? styles.taskMarkerDone : styles.taskMarker}>
						{task.done && <Icon name='check' size={12} color='#FFF' />}
					</View>

					<TextInput
						ref={textInputRef}
						style={task.done ? styles.taskTextDone : styles.taskText}
						value={newTitle}
						editable={isEditing}
						onChangeText={setNewTitle}
						onSubmitEditing={handleSubmitEditing}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonView}>
				<TouchableOpacity
					testID={`trash-${index}`}
					style={{
						paddingHorizontal: 5,
					}}
					onPress={handleStartEditing}>
					{isEditing && <Icon name='x' size={20} style={styles.button} />}
					{!isEditing && <Icon name='edit-3' size={20} style={styles.button} />}
				</TouchableOpacity>
				<TouchableOpacity
					testID={`trash-${index}`}
					onPress={() => removeTask(task.id)}
					style={{ paddingHorizontal: 24 }}>
					<Image source={trashIcon} />
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	taskButton: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 15,
		marginBottom: 4,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center',
	},
	taskMarker: {
		height: 16,
		width: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#B2B2B2',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	taskText: {
		color: '#666',
		fontFamily: 'Inter-Medium',
	},
	taskMarkerDone: {
		height: 16,
		width: 16,
		borderRadius: 4,
		backgroundColor: '#1DB863',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	taskTextDone: {
		color: '#1DB863',
		textDecorationLine: 'line-through',
		fontFamily: 'Inter-Medium',
	},
	button: {
		justifyContent: 'flex-end',
		color: '#B2B2B2',
	},
	buttonView: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
