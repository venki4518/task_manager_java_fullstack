import { CheckCircle2, Circle, Trash2 } from 'lucide-react';

const TaskList = ({ tasks, onToggleStatus, onDeleteTask }) => {
    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 border-dashed">
                <p className="text-slate-500">No tasks yet. Create one above!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div 
                    key={task.id} 
                    className={`group flex items-start gap-4 p-5 bg-white rounded-2xl border transition-all duration-200 ${
                        task.completed 
                            ? 'border-slate-100 opacity-60 bg-slate-50/50' 
                            : 'border-slate-100 shadow-sm hover:shadow-md hover:border-primary-100'
                    }`}
                >
                    <button 
                        onClick={() => onToggleStatus(task)}
                        className="mt-1 flex-shrink-0 text-slate-400 hover:text-primary-500 transition-colors"
                    >
                        {task.completed ? (
                            <CheckCircle2 className="text-green-500" size={24} />
                        ) : (
                            <Circle size={24} />
                        )}
                    </button>
                    
                    <div className="flex-grow min-w-0">
                        <h3 className={`text-lg font-medium truncate ${task.completed ? 'text-slate-500 line-through' : 'text-slate-800'}`}>
                            {task.title}
                        </h3>
                        {task.description && (
                            <p className={`mt-1 text-sm ${task.completed ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                {task.description}
                            </p>
                        )}
                    </div>

                    <button 
                        onClick={() => onDeleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        aria-label="Delete task"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
