import { useState, useEffect } from "react";
import api from "../api/backend";

interface Doctor {
  _id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  status: string;
  passportPhoto: string;
  clinicAddress: string;
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        let data;
        if (filter === "all") {
          data = await api.doctors.list();
        } else {
          data = await api.doctors.list(filter);
        }
        setDoctors(data);
      } catch (err: any) {
        setError(err.message || "Failed to load doctors");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [filter]);

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
          <h1 className="text-3xl font-bold text-gray-900">
            Registered Doctors
          </h1>
          <div className="mt-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            >
              <option value="all">All Doctors</option>
              <option value="approved">Active</option>
              <option value="deceased">Deceased</option>
            </select>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2"
                  >
                    Doctor Information
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3"
                  >
                    Qualification
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {doctors.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500 text-sm"
                    >
                      No doctors found
                    </td>
                  </tr>
                ) : (
                  doctors.map((doctor) => (
                    <tr key={doctor._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 h-16 w-16">
                            {doctor.passportPhoto ? (
                              <img
                                src={doctor.passportPhoto}
                                alt={doctor.name}
                                className="h-16 w-16 rounded-lg object-cover shadow-sm"
                              />
                            ) : (
                              <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center text-black text-xl font-semibold shadow-sm">
                                {doctor.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-base font-semibold text-gray-900">
                              {doctor.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {doctor._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {doctor.qualification}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            doctor.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {doctor.status.charAt(0).toUpperCase() +
                            doctor.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
