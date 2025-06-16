import { create } from 'zustand';

const useCourseSectionStore = create((set) => ({
  selectedCourseSection: null,
  setSelectedCourseSection: (section) => set({ selectedCourseSection: section }),
  clearSelectedCourseSection: () => set({ selectedCourseSection: null }),
}));

export default useCourseSectionStore;

