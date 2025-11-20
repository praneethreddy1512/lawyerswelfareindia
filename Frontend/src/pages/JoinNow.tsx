import React, { useState } from "react";
import { Upload, CheckCircle, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface FormDataState {
  name: string;
  age: string;
  sex: string;
  qualification: string;
  mobile: string;
  alternateMobile: string;
  email: string;
  password: string;
  passportPhoto: File | null;
  certificates: File | null;
  houseAddress: string;
  chamberAddress: string; // UI label for chamber / office
  barCouncilId: string;
  nomineeName: string;
  nomineeAge: string;
  nomineeSex: string;
  nomineeEmail: string;
  nomineePhone: string;
  nomineeBankAccount: string;
  nomineeBankAccountConfirm: string;
  nomineeIFSC: string;
  nomineeBankHolder: string;
  family1Name: string;
  family1Age: string;
  family1Sex: string;
  family1Email: string;
  family1Mobile: string;
  family1Address: string;
  family2Name: string;
  family2Age: string;
  family2Sex: string;
  family2Email: string;
  family2Mobile: string;
  family2Address: string;
  termsAccepted: boolean;
  subscribe: boolean;
}

export default function JoinNow(): JSX.Element {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    age: "",
    sex: "",
    qualification: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    password: "",
    passportPhoto: null,
    certificates: null,
    houseAddress: "",
    chamberAddress: "",
    barCouncilId: "",
    nomineeName: "",
    nomineeAge: "",
    nomineeSex: "",
    nomineeEmail: "",
    nomineePhone: "",
    nomineeBankAccount: "",
    nomineeBankAccountConfirm: "",
    nomineeIFSC: "",
    nomineeBankHolder: "",
    family1Name: "",
    family1Age: "",
    family1Sex: "",
    family1Email: "",
    family1Mobile: "",
    family1Address: "",
    family2Name: "",
    family2Age: "",
    family2Sex: "",
    family2Email: "",
    family2Mobile: "",
    family2Address: "",
    termsAccepted: false,
    subscribe: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked } as FormDataState);
    } else {
      setFormData({ ...formData, [name]: value } as FormDataState);
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] } as FormDataState);
      if (errors[name]) {
        setErrors({ ...errors, [name]: "" });
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age) {
      newErrors.age = "Valid age is required (18+)";
    } else {
      const ageNum = parseInt(formData.age as string, 10);
      if (isNaN(ageNum) || ageNum < 18) {
        newErrors.age = "Valid age is required (18+)";
      } else if (ageNum > 120) {
        newErrors.age = "Please enter a valid age";
      }
    }
    if (!formData.sex) newErrors.sex = "Sex is required";
    if (!formData.qualification)
      newErrors.qualification = "Qualification is required";
    if (!formData.mobile || formData.mobile.length < 10)
      newErrors.mobile = "Valid mobile number is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.passportPhoto)
      newErrors.passportPhoto = "Passport photo is required";
    if (!formData.certificates)
      newErrors.certificates = "Certificates are required";
    if (!formData.barCouncilId.trim())
      newErrors.barCouncilId = "Bar Council ID is required";
    if (!formData.houseAddress.trim())
      newErrors.houseAddress = "Residential address is required";
    if (!formData.chamberAddress.trim())
      newErrors.chamberAddress = "Chamber address is required";

    if (!formData.nomineeName.trim())
      newErrors.nomineeName = "Nominee name is required";
    if (!formData.nomineeAge) newErrors.nomineeAge = "Nominee age is required";
    if (!formData.nomineeSex) newErrors.nomineeSex = "Nominee sex is required";
    if (
      !formData.nomineeEmail ||
      !/\S+@\S+\.\S+/.test(formData.nomineeEmail)
    )
      newErrors.nomineeEmail = "Valid nominee email is required";
    if (!formData.nomineePhone) newErrors.nomineePhone = "Nominee phone is required";
    if (!formData.nomineeBankAccount.trim())
      newErrors.nomineeBankAccount = "Bank account is required";
    if (
      formData.nomineeBankAccount.trim() !==
      formData.nomineeBankAccountConfirm.trim()
    )
      newErrors.nomineeBankAccountConfirm = "Account numbers do not match";
    if (!formData.nomineeIFSC.trim())
      newErrors.nomineeIFSC = "IFSC code is required";
    if (!formData.nomineeBankHolder.trim())
      newErrors.nomineeBankHolder = "Bank holder name is required";

    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password (min 6 chars) is required";

    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";
    if (!formData.subscribe)
      newErrors.subscribe = "You must opt-in to receive updates";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validate first and set focus to first error if any
    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const element = firstErrorField ? document.getElementById(firstErrorField) : null;
      if (element) element.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("age", formData.age);
      form.append("sex", formData.sex);
      form.append("qualification", formData.qualification);
      form.append("phone", formData.mobile);
      if (formData.alternateMobile) form.append("alternateMobile", formData.alternateMobile);
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("houseAddress", formData.houseAddress);

      // send both keys just in case backend expects either
      form.append("chamberAddress", formData.chamberAddress);
      form.append("officeAddress", formData.chamberAddress);

      form.append("barCouncilId", formData.barCouncilId);

      form.append("acceptTerms", formData.termsAccepted ? "true" : "false");
      form.append("subscribeUpdates", formData.subscribe ? "true" : "false");

      const nominee = {
        name: formData.nomineeName,
        age: formData.nomineeAge,
        sex: formData.nomineeSex,
        email: formData.nomineeEmail,
        phone: formData.nomineePhone,
        bankAccountNumber: formData.nomineeBankAccount,
        confirmBankAccountNumber: formData.nomineeBankAccountConfirm,
        ifscCode: formData.nomineeIFSC,
        bankHolderName: formData.nomineeBankHolder,
      };
      form.append("nominee", JSON.stringify(nominee));

      const family1 = {
        name: formData.family1Name,
        age: formData.family1Age,
        sex: formData.family1Sex,
        email: formData.family1Email,
        mobile: formData.family1Mobile,
        address: formData.family1Address,
      };
      if (family1.name) form.append("familyMember1", JSON.stringify(family1));

      const family2 = {
        name: formData.family2Name,
        age: formData.family2Age,
        sex: formData.family2Sex,
        email: formData.family2Email,
        mobile: formData.family2Mobile,
        address: formData.family2Address,
      };
      if (family2.name) form.append("familyMember2", JSON.stringify(family2));

      if (formData.passportPhoto) form.append("passportPhoto", formData.passportPhoto);
      if (formData.certificates) form.append("certificates", formData.certificates);

      // lazy import api to avoid circular imports like before
      const apiModule = (await import("../api/backend")).default;

      // NOTE: changed to lawyers.register
      const res = await apiModule.lawyers.register(form);

      // store token if returned
      const token =
        res?.data?.token ||
        res?.token ||
        (res && (res.token || res.data?.token));
      if (token) localStorage.setItem("token", token);

      // success
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });

      // redirect to login after a short pause
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      } catch (err: unknown) {
      console.error("Registration error", err);
      alert((err as { message?: string })?.message || "Failed to submit application");
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Thank you for applying to Lawyer Welfare India. We have received
              your application and will verify your documents within 2-3
              business days.
            </p>
            <p className="text-gray-600 mb-8">
              A confirmation email has been sent to{" "}
              <strong>{formData.email}</strong> with further instructions.
            </p>
            <p className="text-black mb-6">You will be redirected to the login page in a moment...</p>
            <div className="space-y-4">
              <a
                href="/"
                className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-transparent hover:text-white border border-white transition-colors text-lg"
              >
                Return to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-black to-gray-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Lawyer Welfare India</h1>
          <p className="text-xl text-white max-w-3xl">Complete the registration form below to become a member</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
              <p className="text-gray-600">Please provide your personal details</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.age ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`}
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div>
                <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-2">Sex *</label>
                <select id="sex" name="sex" value={formData.sex} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.sex ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.sex && <p className="text-red-500 text-sm mt-1">{errors.sex}</p>}
              </div>

              <div>
                <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-2">Qualification *</label>
                <select id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.qualification ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`}>
                  <option value="">Select</option>
                  <option value="Advocate">Advocate</option>
                  <option value="Senior Advocate">Senior Advocate</option>
                  <option value="Legal Consultant">Legal Consultant</option>
                  <option value="Corporate Lawyer">Corporate Lawyer</option>
                  <option value="Law Student">Law Student</option>
                </select>
                {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
              </div>

              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.mobile ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>

              <div>
                <label htmlFor="alternateMobile" className="block text-sm font-medium text-gray-700 mb-2">Alternate Mobile Number</label>
                <input type="tel" id="alternateMobile" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input type="password" id="password" name="password" placeholder="Create a secure password" value={formData.password} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Document Upload</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="passportPhoto" className="block text-sm font-medium text-gray-700 mb-2">Passport-Size Photo *</label>
                  <div className="relative">
                    <input type="file" id="passportPhoto" name="passportPhoto" onChange={handleFileChange} accept="image/*" className="hidden" />
                    <label htmlFor="passportPhoto" className={`flex items-center justify-center w-full px-4 py-3 border-2 ${errors.passportPhoto ? "border-red-500" : "border-gray-300"} border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors`}>
                      <Upload className="mr-2 text-gray-400" size={20} />
                      <span className="text-gray-600">{formData.passportPhoto ? formData.passportPhoto.name : "Choose file"}</span>
                    </label>
                  </div>
                  {errors.passportPhoto && <p className="text-red-500 text-sm mt-1">{errors.passportPhoto}</p>}
                </div>

                <div>
                  <label htmlFor="certificates" className="block text-sm font-medium text-gray-700 mb-2">Law Certificates*</label>
                  <div className="relative">
                    <input type="file" id="certificates" name="certificates" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" className="hidden" />
                    <label htmlFor="certificates" className={`flex items-center justify-center w-full px-4 py-3 border-2 ${errors.certificates ? "border-red-500" : "border-gray-300"} border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors`}>
                      <Upload className="mr-2 text-gray-400" size={20} />
                      <span className="text-gray-600">{formData.certificates ? formData.certificates.name : "Choose file"}</span>
                    </label>
                  </div>
                  {errors.certificates && <p className="text-red-500 text-sm mt-1">{errors.certificates}</p>}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Address Information</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="houseAddress" className="block text-sm font-medium text-gray-700 mb-2">Residential Address *</label>
                  <textarea id="houseAddress" name="houseAddress" value={formData.houseAddress} onChange={handleChange} rows={3} className={`w-full px-4 py-2 border ${errors.houseAddress ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`}></textarea>
                  {errors.houseAddress && <p className="text-red-500 text-sm mt-1">{errors.houseAddress}</p>}
                </div>

                <div>
                  <label htmlFor="chamberAddress" className="block text-sm font-medium text-gray-700 mb-2">Chamber / Office Address *</label>
                  <textarea id="chamberAddress" name="chamberAddress" value={formData.chamberAddress} onChange={handleChange} rows={3} className={`w-full px-4 py-2 border ${errors.chamberAddress ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`}></textarea>
                  {errors.chamberAddress && <p className="text-red-500 text-sm mt-1">{errors.chamberAddress}</p>}
                </div>

                <div>
                  <label htmlFor="barCouncilId" className="block text-sm font-medium text-gray-700 mb-2">Bar Council ID *</label>
                  <input type="text" id="barCouncilId" name="barCouncilId" value={formData.barCouncilId} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.barCouncilId ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                  {errors.barCouncilId && <p className="text-red-500 text-sm mt-1">{errors.barCouncilId}</p>}
                </div>
              </div>
            </div>

            <div className="mb-8 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Nominee Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nomineeName" className="block text-sm font-medium text-gray-700 mb-2">Nominee Name *</label>
                  <input type="text" id="nomineeName" name="nomineeName" value={formData.nomineeName} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.nomineeName ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                  {errors.nomineeName && <p className="text-red-500 text-sm mt-1">{errors.nomineeName}</p>}
                </div>

                <div>
                  <label htmlFor="nomineeAge" className="block text-sm font-medium text-gray-700 mb-2">Nominee Age *</label>
                  <input type="number" id="nomineeAge" name="nomineeAge" value={formData.nomineeAge} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.nomineeAge ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                  {errors.nomineeAge && <p className="text-red-500 text-sm mt-1">{errors.nomineeAge}</p>}
                </div>

                <div>
                  <label htmlFor="nomineeSex" className="block text-sm font-medium text-gray-700 mb-2">Nominee Sex *</label>
                  <select id="nomineeSex" name="nomineeSex" value={formData.nomineeSex} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.nomineeSex ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.nomineeSex && <p className="text-red-500 text-sm mt-1">{errors.nomineeSex}</p>}
                </div>

                <div>
                  <label htmlFor="nomineeEmail" className="block text-sm font-medium text-gray-700 mb-2">Nominee Email *</label>
                  <input type="email" id="nomineeEmail" name="nomineeEmail" value={formData.nomineeEmail} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.nomineeEmail ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                  {errors.nomineeEmail && <p className="text-red-500 text-sm mt-1">{errors.nomineeEmail}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="nomineePhone" className="block text-sm font-medium text-gray-700 mb-2">Nominee Phone *</label>
                  <input type="tel" id="nomineePhone" name="nomineePhone" value={formData.nomineePhone} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.nomineePhone ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                  {errors.nomineePhone && <p className="text-red-500 text-sm mt-1">{errors.nomineePhone}</p>}
                </div>

                <div>
                  <label htmlFor="nomineeBankHolder" className="block text-sm font-medium text-gray-700 mb-2">Bank Holder Name *</label>
                  <input type="text" id="nomineeBankHolder" name="nomineeBankHolder" value={formData.nomineeBankHolder} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.nomineeBankHolder ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                  {errors.nomineeBankHolder && <p className="text-red-500 text-sm mt-1">{errors.nomineeBankHolder}</p>}
                </div>

                <div>
                  <label htmlFor="nomineeBankAccount" className="block text-sm font-medium text-gray-700 mb-2">Bank Account Number *</label>
                  <input type="text" id="nomineeBankAccount" name="nomineeBankAccount" value={formData.nomineeBankAccount} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.nomineeBankAccount ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                  {errors.nomineeBankAccount && <p className="text-red-500 text-sm mt-1">{errors.nomineeBankAccount}</p>}
                </div>

                <div>
                  <label htmlFor="nomineeBankAccountConfirm" className="block text-sm font-medium text-gray-700 mb-2">Confirm Account Number *</label>
                  <input type="text" id="nomineeBankAccountConfirm" name="nomineeBankAccountConfirm" value={formData.nomineeBankAccountConfirm} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.nomineeBankAccountConfirm ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                  {errors.nomineeBankAccountConfirm && <p className="text-red-500 text-sm mt-1">{errors.nomineeBankAccountConfirm}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="nomineeIFSC" className="block text-sm font-medium text-gray-700 mb-2">IFSC Code *</label>
                  <input type="text" id="nomineeIFSC" name="nomineeIFSC" value={formData.nomineeIFSC} onChange={handleChange} className={`w-full px-4 py-2 border ${errors.nomineeIFSC ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent`} />
                  {errors.nomineeIFSC && <p className="text-red-500 text-sm mt-1">{errors.nomineeIFSC}</p>}
                </div>
              </div>
            </div>

            <div className="mb-8 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Family Member 1 (Optional)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="family1Name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" id="family1Name" name="family1Name" value={formData.family1Name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                <div>
                  <label htmlFor="family1Age" className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input type="number" id="family1Age" name="family1Age" value={formData.family1Age} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                <div>
                  <label htmlFor="family1Sex" className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                  <select id="family1Sex" name="family1Sex" value={formData.family1Sex} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="family1Email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" id="family1Email" name="family1Email" value={formData.family1Email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                <div>
                  <label htmlFor="family1Mobile" className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                  <input type="tel" id="family1Mobile" name="family1Mobile" value={formData.family1Mobile} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="family1Address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea id="family1Address" name="family1Address" value={formData.family1Address} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"></textarea>
                </div>
              </div>
            </div>

            <div className="mb-8 bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Family Member 2 (Optional)</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="family2Name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" id="family2Name" name="family2Name" value={formData.family2Name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                <div>
                  <label htmlFor="family2Age" className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input type="number" id="family2Age" name="family2Age" value={formData.family2Age} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                <div>
                  <label htmlFor="family2Sex" className="block text-sm font-medium text-gray-700 mb-2">Sex</label>
                  <select id="family2Sex" name="family2Sex" value={formData.family2Sex} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="family2Email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" id="family2Email" name="family2Email" value={formData.family2Email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                <div>
                  <label htmlFor="family2Mobile" className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                  <input type="tel" id="family2Mobile" name="family2Mobile" value={formData.family2Mobile} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="family2Address" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <textarea id="family2Address" name="family2Address" value={formData.family2Address} onChange={handleChange} rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"></textarea>
                </div>
              </div>
            </div>

            <div className="mb-8 space-y-4">
              <div className="flex items-start">
                <input type="checkbox" id="termsAccepted" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} className="mt-1 mr-3 h-5 w-5 text-black focus:ring-gray-500 border-gray-300 rounded" />
                <label htmlFor="termsAccepted" className="text-sm text-gray-700">
                  I accept the{" "}
                  <Link to="/terms" className="text-black hover:underline">
                    Terms &amp; Conditions
                  </Link>{" "}
                  and understand that all information provided is accurate and complete. *
                </label>
              </div>
              {errors.termsAccepted && <p className="text-red-500 text-sm">{errors.termsAccepted}</p>}

              <div className="flex items-start">
                <input type="checkbox" id="subscribe" name="subscribe" checked={formData.subscribe} onChange={handleChange} className="mt-1 mr-3 h-5 w-5 text-black focus:ring-gray-500 border-gray-300 rounded" />
                <label htmlFor="subscribe" className="text-sm text-gray-700">I want to receive updates and newsletters *</label>
              </div>
              {errors.subscribe && <p className="text-red-500 text-sm">{errors.subscribe}</p>}
            </div>

            <div className="text-center">
              <button type="submit" disabled={isSubmitting} className={`px-12 py-4 rounded-lg font-semibold transition-colors text-lg flex items-center justify-center mx-auto ${isSubmitting ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-black text-white hover:bg-gray-500"}`}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
              <p className="text-sm text-gray-600 mt-4">Fields marked with * are mandatory</p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
