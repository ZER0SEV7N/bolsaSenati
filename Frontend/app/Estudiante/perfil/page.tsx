"use client";

import { ProfileCard } from "../avance/components/ProfileCard";
import { PersonalInfo} from "../avance/components/PersonalInfo";
import { usePerfil } from "../avance/hook/usePerfil";
import { AcademicInfo } from "../avance/components/AcademicInfo";




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
