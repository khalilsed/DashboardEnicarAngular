import { Routes } from '@angular/router';
import { AttribuerNoteComponent } from 'src/app/pages/prof-content/attribuer-note/attribuer-note.component';
import { GestionNotesComponent } from 'src/app/pages/prof-content/gestion-notes/gestion-notes.component';


export const ProfLayoutRoutes: Routes = [
    { path: 'prof/attribuer-note',        component: AttribuerNoteComponent },
    { path: 'prof/gestion-notes',        component: GestionNotesComponent }
];
