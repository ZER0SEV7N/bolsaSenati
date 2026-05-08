import { useState } from "react";
import { useRouter } from "next/navigation";

export const useEmpresa = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    razonSocial: "",
    direccion: "",
    linkGoogleMaps: "",
    fechaInicio: "",
    email: "",
    distrito: "",
    puestoAprendiz: "",
    logoEmpresa: "",
    fullName: "",
    ruc: "",
    dni: "",
    cargo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleNext = () => {
    const {
      razonSocial,
      direccion,
      linkGoogleMaps,
      fechaInicio,
      email,
      distrito,
      puestoAprendiz,
    } = formData;

    if (
      razonSocial &&
      direccion &&
      linkGoogleMaps &&
      fechaInicio &&
      email &&
      distrito &&
      puestoAprendiz
    ) {
      setActiveTab("empresa");
    } else {
      alert("Por favor, completa todos los campos de la empresa.");
    }
  };

  const handleFinish = () => {
    const { fullName, ruc, dni, cargo } = formData;
    if (fullName && ruc && dni && cargo) {
      alert("Formulario enviado con éxito");
      console.log(formData);
    } else {
      alert("Por favor, completa los datos del monitor.");
    }
  };

  const handleCancel = () => {
    router.push("/Estudiante/empresa");
  };

  const handleBack = () => {
    setActiveTab("personal");
  };

  return {
    activeTab,
    formData,
    handleChange,
    handleNext,
    handleFinish,
    handleCancel,
    handleBack,
  };
};
