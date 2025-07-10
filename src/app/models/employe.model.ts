export interface Employe {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  nomUtilisateur: string;
  motDePasse?: string; 
  role: 'admin' | 'employe';
  dateCreation?: Date;
}
