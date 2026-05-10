import { useEffect, useState } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from './api';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { LayoutList } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      // Sort tasks: incomplete first, then by ID descending
      const sortedTasks = data.sort((a, b) => {
        if (a.completed === b.completed) {
            return b.id - a.id;
        }
        return a.completed ? 1 : -1;
      });
      setTasks(sortedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAdded = async (newTaskData) => {
    try {
      await createTask(newTaskData);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      await updateTask(task.id, { ...task, completed: !task.completed });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary-100 rounded-2xl mb-4">
            <LayoutList className="text-primary-600" size={32} />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Task Master</h1>
          <p className="mt-2 text-lg text-slate-600">Organize your work, beautifully.</p>
        </header>

        <main>
          <TaskForm onTaskAdded={handleTaskAdded} />
          
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Your Tasks</h2>
                <span className="bg-primary-100 text-primary-700 py-1 px-3 rounded-full text-sm font-medium">
                    {tasks.filter(t => !t.completed).length} remaining
                </span>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <TaskList 
                tasks={tasks} 
                onToggleStatus={handleToggleStatus} 
                onDeleteTask={handleDeleteTask} 
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
