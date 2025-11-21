import { useState, useEffect } from "react";
import api from "../api/backend";

interface Lawyer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  status: string;
  passportPhoto: string;
  officeAddress: string;
}

export default function Lawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        let data;
        if (filter === "all") {
          data = await api.lawyers.list();
        } else {
          data = await api.lawyers.list(filter);
        }
        setLawyers(data);
      } catch (err: any) {
        setError(err.message || "Failed to load lawyers");
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
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
          <h1 className="text-3xl font-bold text-gray-900">Registered Lawyers</h1>

          <div className="mt-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
            >
              <option value="all">All Lawyers</option>
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
                    Lawyer Information
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
                {lawyers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-8 text-center text-gray-500 text-sm"
                    >
                      No lawyers found
                    </td>
                  </tr>
                ) : (
                  lawyers.map((lawyer) => (
                    <tr key={lawyer._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 h-16 w-16">
                            {lawyer.passportPhoto ? (
                              <img
                                src={lawyer.passportPhoto}
                                alt={lawyer.name}
                                className="h-16 w-16 rounded-lg object-cover shadow-sm"
                              />
                            ) : (
                              <div className="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center text-black text-xl font-semibold shadow-sm">
                                {lawyer.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-base font-semibold text-gray-900">
                              {lawyer.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {lawyer._id}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            {lawyer.qualification}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            lawyer.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {lawyer.status.charAt(0).toUpperCase() +
                            lawyer.status.slice(1)}
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
