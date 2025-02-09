"use client";
import { useEmployeeContext } from "@/Context/EmployeeContext";
import EmployeeEditableInfoBoxGeneralPersonalInfo from "@/components/root/EditableInfoBox/employee-profile/EmployeeEditableInfoBoxGeneralPersonalInfo";
import EmployeeEditableInfoBoxGeneralAddress from "@/components/root/EditableInfoBox/employee-profile/EmployeeEditableInfoBoxGeneralAddress";

export default function EmployeeProfile() {
  const { employee } = useEmployeeContext();

  return (
    <>
      {/* Editable info box components for Employee profile page */}
      
      <EmployeeEditableInfoBoxGeneralPersonalInfo employee={employee!} />
      <EmployeeEditableInfoBoxGeneralAddress employee={employee!} />
    </>
  );
}