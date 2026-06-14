import AuthCheck from "@components/Auth/AuthCheck";
import PatientSidebar from "@components/Sidebar/PatientSidebar";

export default function Reports(params) {
    return (
        <AuthCheck requiredRole="patient">
            <PatientSidebar>
                <h1>All Reports</h1>
            </PatientSidebar>
        </AuthCheck>
    );
}