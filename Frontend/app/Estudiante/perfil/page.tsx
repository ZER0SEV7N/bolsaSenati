"use client";

import { ProfileCard } from "./components/ProfileCard";
import { PersonalInfo} from "./components/PersonalInfo";
import { usePerfil } from "./hook/usePerfil";
import { AcademicInfo } from "./components/AcademicInfo";




export default function PerfilPage() {
const { perfil } = usePerfil()

console.log(perfil)


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
      
      <ProfileCard perfil={perfil} />

      <div className="lg:col-span-2">
        <PersonalInfo perfil={perfil}/>

        <AcademicInfo/>

      </div>

    </div>
  );
}
