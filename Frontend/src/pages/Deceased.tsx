import { useState, useEffect } from 'react';
import api from '../api/backend';

interface Nominee {
  name: string;
  age: string;
  sex: string;
  email: string;
  phone: string;
  bankAccountNumber: string;
  ifscCode: string;
  bankHolderName: string;
}

interface Lawyer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  qualification: string;
  status: string;
  deceasedDate: string;
  deceasedReason: string;
  deceasedCase?: string;
  passportPhoto: string;
  nominee: Nominee;
}

export default function DeceasedLawyers() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeceasedLawyers = async () => {
      try {
        const data = await api.lawyers.list('deceased');
        setLawyers(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load deceased lawyers');
      } finally {
        setLoading(false);
      }
    };

    fetchDeceasedLawyers();
  }, []);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

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
          <h1 className="text-3xl font-bold text-gray-900">Deceased Lawyers</h1>
          <p className="mt-2 text-gray-600">List of lawyers who have passed away</p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {lawyers.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No deceased lawyers found
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {lawyers.map((lawyer) => (
                <li key={lawyer._id} className="p-6">
                  <div className="flex items-start space-x-4">
                    
                    <div className="flex-shrink-0 h-12 w-12">
                      {lawyer.passportPhoto ? (
                        <img
                          src={lawyer.passportPhoto}
                          alt={lawyer.name}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                          {lawyer.name.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {lawyer.name}
                        </h2>
                        <span className="text-sm text-gray-500">
                          {new Date(lawyer.deceasedDate).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-2 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Email:</span> {lawyer.email}
                          </p>

                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Phone:</span> {lawyer.phone}
                          </p>

                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Qualification:</span>{' '}
                            {lawyer.qualification}
                          </p>

                          {lawyer.deceasedCase && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Case Type:</span>{' '}
                              {lawyer.deceasedCase}
                            </p>
                          )}

                          {lawyer.deceasedReason && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Reason:</span>{' '}
                              {lawyer.deceasedReason}
                            </p>
                          )}
                        </div>

                        {/* Nominee Section */}
                        {lawyer.nominee && (
                          <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Nominee Details
                            </h3>

                            <div className="bg-gray-50 rounded-lg overflow-hidden">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-100">
                                  <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                      Name
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                      Contact
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                      Account Details
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                      IFSC
                                    </th>
                                  </tr>
                                </thead>

                                <tbody className="bg-white divide-y divide-gray-200">
                                  <tr>
                                    <td className="px-4 py-3 text-sm text-gray-900">
                                      <p className="font-medium">{lawyer.nominee.name}</p>
                                      <p className="text-gray-500">
                                        {lawyer.nominee.age} years, {lawyer.nominee.sex}
                                      </p>
                                    </td>

                                    <td className="px-4 py-3 text-sm text-gray-900">
                                      <p>{lawyer.nominee.email}</p>
                                      <p>{lawyer.nominee.phone}</p>
                                    </td>

                                    <td className="px-4 py-3 text-sm">
                                      <p className="font-medium">
                                        {lawyer.nominee.bankHolderName}
                                      </p>
                                      <p className="text-gray-500">
                                        AC: {lawyer.nominee.bankAccountNumber}
                                      </p>
                                    </td>

                                    <td className="px-4 py-3 text-sm font-mono">
                                      {lawyer.nominee.ifscCode}
                                    </td>
                                  </tr>
                                </tbody>

                              </table>
                            </div>

                          </div>
                        )}

                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

      </div>
    </div>
  );
}
