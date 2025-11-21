import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/backend";
import { useAuth } from "../context/AuthContext";

interface Lawyer {
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
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "disbarred">("all");
  const [approvalData, setApprovalData] = useState({
    caseName: "",
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

  const fetchLawyers = async () => {
    setLoading(true);
    try {
      const data = await api.lawyers.list(filter !== "all" ? filter : undefined);
      setLawyers(data || []);
      setError("");
    } catch (err: any) {
      setError(err.message || "Failed to load lawyers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // initial load

  const handleApprove = async (lawyerId: string) => {
    try {
      if (!approvalData.caseName) {
        alert("Please enter case name");
        return;
      }
      await api.lawyers.approve(lawyerId, {
        caseName: approvalData.caseName,
        message: approvalData.message,
      });
      // Refresh the list
      await fetchLawyers();
      setSelectedLawyer(null);
      setApprovalData({ caseName: "", message: "" });
    } catch (err: any) {
      alert(err.message || "Failed to approve lawyer");
    }
  };

  const handleMarkDisbarred = async (lawyerId: string, data: { reason?: string; caseName?: string }) => {
    try {
      // backend endpoint name retained as 'deceased' previously — ensure api.lawyers.disbar exists and maps to correct route,
      // but using api.lawyers.disbar here would be ideal. If backend still uses deceased endpoint, api.lawyers.disbar should map to that.
      // We'll call api.lawyers.disbar if available, otherwise fallback to api.lawyers.deceased to avoid breaking.
      if ((api as any).lawyers && (api as any).lawyers.disbar) {
        await (api as any).lawyers.disbar(lawyerId, { reason: data.reason, caseName: data.caseName });
      } else {
        // fallback to existing 'deceased' endpoint if backend still exposes it
        await api.lawyers.deceased(lawyerId, { reason: data.reason, caseName: data.caseName });
      }
      await fetchLawyers();
    } catch (err: any) {
      alert(err.message || "Failed to mark lawyer as disbarred");
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
          <p className="mt-2 text-gray-600">Manage lawyer approvals and registrations</p>
        </div>

        <div className="mb-6">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter Lawyers
          </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => {
              const v = e.target.value as typeof filter;
              setFilter(v);
              // fetch with new filter
              (async () => {
                setLoading(true);
                try {
                  const data = await api.lawyers.list(v !== "all" ? v : undefined);
                  setLawyers(data || []);
                  setError("");
                } catch (err: any) {
                  setError(err.message || "Failed to load lawyers");
                } finally {
                  setLoading(false);
                }
              })();
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
          >
            <option value="all">All Lawyers</option>
            <option value="pending">Pending Approval</option>
            <option value="approved">Approved</option>
            <option value="disbarred">Disbarred</option>
          </select>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="divide-y divide-gray-200">
            {lawyers.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No lawyers found</div>
            ) : (
              lawyers.map((lawyer) => (
                <div key={lawyer._id} className="p-6">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      {lawyer.passportPhoto ? (
                        <img src={lawyer.passportPhoto} alt={lawyer.name} className="h-24 w-24 rounded-lg object-cover" />
                      ) : (
                        <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center">
                          <span className="text-2xl text-gray-500">{lawyer.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{lawyer.name}</h2>
                          <p className="text-sm text-gray-500">Registered on {new Date(lawyer.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            lawyer.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : lawyer.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {lawyer.status.charAt(0).toUpperCase() + lawyer.status.slice(1)}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-900">{lawyer.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="text-sm font-medium text-gray-900">{lawyer.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Qualification</p>
                          <p className="text-sm font-medium text-gray-900">{lawyer.qualification}</p>
                        </div>
                        {lawyer.certificates && (
                          <div>
                            <p className="text-sm text-gray-500">Certificates</p>
                            <a href={lawyer.certificates} target="_blank" rel="noopener noreferrer" className="text-sm text-black hover:underline">
                              View Certificates
                            </a>
                          </div>
                        )}
                      </div>

                      {selectedLawyer?._id === lawyer._id ? (
                        <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                          <div className="space-y-4">
                            <div>
                              <label htmlFor="caseName" className="block text-sm font-medium text-gray-700">
                                Case Name *
                              </label>
                              <input
                                type="text"
                                id="caseName"
                                value={approvalData.caseName}
                                onChange={(e) =>
                                  setApprovalData((prev) => ({ ...prev, caseName: e.target.value }))
                                }
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                                required
                              />
                            </div>
                            <div>
                              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                                Approval Message (Optional)
                              </label>
                              <textarea
                                id="message"
                                value={approvalData.message}
                                onChange={(e) =>
                                  setApprovalData((prev) => ({ ...prev, message: e.target.value }))
                                }
                                rows={3}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                              />
                            </div>
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => setSelectedLawyer(null)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleApprove(lawyer._id)}
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
                            onClick={() => setSelectedLawyer(lawyer)}
                            className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-500"
                          >
                            Approve Lawyer
                          </button>
                          <button
                            onClick={() => {
                              const reason = window.prompt("Enter reason for marking as disbarred (optional):");
                              const caseName = window.prompt("Enter related case name (optional):");
                              if (reason !== null || caseName !== null) {
                                handleMarkDisbarred(lawyer._id, {
                                  reason: reason || undefined,
                                  caseName: caseName || undefined,
                                });
                              }
                            }}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                          >
                            Mark as Disbarred
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
