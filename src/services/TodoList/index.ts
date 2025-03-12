export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }
  

  const saveTasksToLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  };
  

  export const loadTasks = (): Task[] => {
    const storedTasks = localStorage.getItem('todoTasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  };
  

  export const addTask = (tasks: Task[], newTask: Task): Task[] => {
    const updatedTasks = [...tasks, newTask];
    saveTasksToLocalStorage(updatedTasks);
    return updatedTasks;
  };
  

  export const updateTask = (tasks: Task[], updatedTask: Task): Task[] => {
    const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    saveTasksToLocalStorage(updatedTasks);
    return updatedTasks;
  };
  

  export const deleteTask = (tasks: Task[], id: number): Task[] => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    saveTasksToLocalStorage(updatedTasks);
    return updatedTasks;
  };
  

  export const toggleTaskCompletion = (tasks: Task[], id: number): Task[] => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasksToLocalStorage(updatedTasks);
    return updatedTasks;
  };
  