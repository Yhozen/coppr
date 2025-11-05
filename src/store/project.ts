import { create } from 'zustand';
import { Project, ViewType } from '../types';
import { generateId } from '../lib/utils';

interface ProjectStore {
  currentProject: Project | null;
  currentView: ViewType;

  createProject: (name: string) => void;
  loadProject: (project: Project) => void;
  setCurrentView: (view: ViewType) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
  currentProject: {
    id: generateId(),
    name: 'Untitled Project',
    patterns: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  currentView: 'code',

  createProject: (name: string) => {
    const newProject: Project = {
      id: generateId(),
      name,
      patterns: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    set({ currentProject: newProject });
  },

  loadProject: (project: Project) => {
    set({ currentProject: project });
  },

  setCurrentView: (view: ViewType) => {
    set({ currentView: view });
  },
}));
