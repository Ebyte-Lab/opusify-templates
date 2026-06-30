import { Project, Task } from '../../types/project.types';
import { mockProjects, mockTasks } from '../mock/projects.mock';
import { delay } from './client';

let localProjects = [...mockProjects];
let localTasks = { ...mockTasks };

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    await delay(500);
    return [...localProjects];
  },

  getById: async (id: string): Promise<Project | null> => {
    await delay(400);
    const proj = localProjects.find(p => p.id === id) || null;
    return proj;
  },

  create: async (payload: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'progress'>): Promise<Project> => {
    await delay(600);
    const newProject: Project = {
      ...payload,
      id: `proj-${Date.now()}`,
      progress: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    localProjects.unshift(newProject);
    localTasks[newProject.id] = [];
    return newProject;
  },

  update: async (id: string, payload: Partial<Project>): Promise<Project> => {
    await delay(500);
    const index = localProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    const updated = {
      ...localProjects[index],
      ...payload,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    localProjects[index] = updated;
    return updated;
  },

  delete: async (id: string): Promise<void> => {
    await delay(400);
    localProjects = localProjects.filter(p => p.id !== id);
    delete localTasks[id];
  },

  // Task methods for Kanban board
  getTasks: async (projectId: string): Promise<Task[]> => {
    await delay(400);
    return localTasks[projectId] || [];
  },

  createTask: async (projectId: string, task: Omit<Task, 'id'>): Promise<Task> => {
    await delay(500);
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`
    };
    if (!localTasks[projectId]) {
      localTasks[projectId] = [];
    }
    localTasks[projectId].push(newTask);
    
    // Update project progress
    projectsApi.recalculateProgress(projectId);

    return newTask;
  },

  updateTask: async (projectId: string, taskId: string, payload: Partial<Task>): Promise<Task> => {
    await delay(300);
    const tasks = localTasks[projectId] || [];
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) throw new Error('Task not found');
    const updatedTask = {
      ...tasks[index],
      ...payload
    };
    tasks[index] = updatedTask;
    localTasks[projectId] = tasks;

    // Update project progress
    projectsApi.recalculateProgress(projectId);

    return updatedTask;
  },

  deleteTask: async (projectId: string, taskId: string): Promise<void> => {
    await delay(300);
    if (localTasks[projectId]) {
      localTasks[projectId] = localTasks[projectId].filter(t => t.id !== taskId);
      projectsApi.recalculateProgress(projectId);
    }
  },

  recalculateProgress: (projectId: string) => {
    const tasks = localTasks[projectId] || [];
    if (tasks.length === 0) {
      const projIndex = localProjects.findIndex(p => p.id === projectId);
      if (projIndex !== -1) localProjects[projIndex].progress = 0;
      return;
    }
    const doneCount = tasks.filter(t => t.status === 'done').length;
    const progress = Math.round((doneCount / tasks.length) * 100);
    
    const projIndex = localProjects.findIndex(p => p.id === projectId);
    if (projIndex !== -1) {
      localProjects[projIndex].progress = progress;
      if (progress === 100) {
        localProjects[projIndex].status = 'completed';
      } else if (localProjects[projIndex].status === 'completed') {
        localProjects[projIndex].status = 'active';
      }
    }
  }
};
