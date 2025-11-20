import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/backend";
import { useAuth } from "../context/AuthContext";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  status: string;
  passportPhoto: string;
  certificates: string;
  createdAt: string;
}

export default function Admin() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "deceased"
  >("all");
  const [approvalData, setApprovalData] = useState({
    disease: "",
    message: "",
  });
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login");
      return;
    }
  }, [isAdmin, navigate]);

  const fetchDoctors = async () => {
    try {
      const data = await api.doctors.list(
        filter !== "all" ? filter : undefined
      );
      setDoctors(data);
    } catch (err: any) {
      setError(err.message || "Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleApprove = async (doctorId: string) => {
    try {
      if (!approvalData.disease) {
        alert("Please enter disease name");
        return;
      }
      await api.doctors.approve(doctorId, {
        disease: approvalData.disease,
        message: approvalData.message,
      });
      // Refresh the list
      fetchDoctors();
      setSelectedDoctor(null);
      setApprovalData({ disease: "", message: "" });
    } catch (err: any) {
      alert(err.message || "Failed to approve doctor");
    }
  };

  const handleMarkDeceased = async (
    doctorId: string,
    data: { reason?: string; diseaseName?: string }
  ) => {
    try {
      await api.doctors.deceased(doctorId, data);
      // Refresh the list
      fetchDoctors();
    } catch (err: any) {
      alert(err.message || "Failed to mark doctor as deceased");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Manage doctor approvals and registrations
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="filter"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter Doctors
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value as typeof filter);
              fetchDoctors();
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          >
            <option value="all">All Doctors</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="deceased">Deceased</option>
          </select>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="divide-y divide-gray-200">
            {doctors.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No pending approvals
              </div>
            ) : (
              doctors.map((doctor) => (
                <div key={doctor._id} className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      {doctor.passportPhoto ? (
                        <img
                          src={doctor.passportPhoto}
                          alt={doctor.name}
                          className="h-24 w-24 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center">
                          <span className="text-2xl text-gray-500">
                            {doctor.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">
                            {doctor.name}
                          </h2>
                          <p className="text-sm text-gray-500">
                            Registered on{" "}
                            {new Date(doctor.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            doctor.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : doctor.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {doctor.status.charAt(0).toUpperCase() +
                            doctor.status.slice(1)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-900">
                            {doctor.email}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-sm font-medium text-gray-900">
                            {doctor.phone}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Qualification</p>
                          <p className="text-sm font-medium text-gray-900">
                            {doctor.qualification}
                          </p>
                        </div>
                        {doctor.certificates && (
                          <div>
                            <p className="text-sm text-gray-500">
                              Certificates
                            </p>
                            <a
                              href={doctor.certificates}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-black hover:underline"
                            >
                              View Certificates
                            </a>
                          </div>
                        )}
                      </div>

                      {selectedDoctor?._id === doctor._id ? (
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-4">
                            <div>
                              <label
                                htmlFor="disease"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Disease Name *
                              </label>
                              <input
                                type="text"
                                id="disease"
                                value={approvalData.disease}
                                onChange={(e) =>
                                  setApprovalData((prev) => ({
                                    ...prev,
                                    disease: e.target.value,
                                  }))
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="message"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Approval Message (Optional)
                              </label>
                              <textarea
                                id="message"
                                value={approvalData.message}
                                onChange={(e) =>
                                  setApprovalData((prev) => ({
                                    ...prev,
                                    message: e.target.value,
                                  }))
                                }
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              />
                            </div>
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => setSelectedDoctor(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleApprove(doctor._id)}
                                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-500"
                              >
                                Confirm Approval
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={() => setSelectedDoctor(doctor)}
                            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-500"
                          >
                            Approve Doctor
                          </button>
                          <button
                            onClick={() => {
                              const reason = window.prompt(
                                "Enter reason for marking as deceased (optional):"
                              );
                              const disease = window.prompt(
                                "Enter disease name (optional):"
                              );
                              if (reason !== null || disease !== null) {
                                handleMarkDeceased(doctor._id, {
                                  reason: reason || undefined,
                                  diseaseName: disease || undefined,
                                });
                              }
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                          >
                            Mark as Deceased
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
