import { Class } from 'tinymce';
import { Classroom, PersonInCharge } from '../../models/classroom';
import { string } from 'zod';
export const classroomService = {
    getClassrooms: (): Classroom[] => {
        return JSON.parse(localStorage.getItem('classrooms') || '[]');
    },
    
    saveClassrooms: (classrooms: Classroom[]) => {
        localStorage.setItem('classrooms', JSON.stringify(classrooms));
    },

    isNameExist: (name: string, excludeId: string = ''): boolean => {
        const classrooms = classroomService.getClassrooms();
        return classrooms.some((classroom) => classroom.name === name && classroom.id !== excludeId);
    },

    getPersonsInCharge: (): PersonInCharge[] => {
        return JSON.parse(localStorage.getItem('personsInCharge') || '[]');
      },
    
    savePersonsInCharge: (persons: PersonInCharge[]) => {
        localStorage.setItem('personsInCharge', JSON.stringify(persons));
      },
    
    isPersonNameExists: (name: string, excludeId?: string): boolean => {
        const persons = classroomService.getPersonsInCharge();
        return persons.some(p => p.name === name && p.id !== excludeId);
      }

};