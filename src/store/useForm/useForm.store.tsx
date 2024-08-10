import { create } from 'zustand';

interface FormState {
	activeForm: string;
}

interface FormActions {
	setActiveForm: (form: string) => void;
}

type FormStore = FormState & FormActions;

export const useFormStore = create<FormStore>((set) => ({
	activeForm: 'account',
	setActiveForm: (form) => set({ activeForm: form }),
}));
