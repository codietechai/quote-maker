"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, Lock, User, Calendar, IdCard } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterStepForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    passport: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateStep = () => {
    let newErrors: any = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name required";
      if (!formData.gender) newErrors.gender = "Select a gender";
      if (!formData.dob) newErrors.dob = "Date of birth required";
    }

    if (step === 2) {
      if (!formData.passport.trim())
        newErrors.passport = "Passport number required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Invalid email format";
    }

    if (step === 3) {
      if (!formData.password.trim()) newErrors.password = "Password required";
      if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep(step + 1);
  };
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    if (!validateStep()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          gender: formData.gender,
          dob: formData.dob,
          passport: formData.passport,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Registration failed");
      } else {
        alert("Registration successful!");
        router.push("/login");
        console.log("Registered User:", data.user);
        // optionally redirect to login page
      }
    } catch (err) {
      console.error("API Error:", err);
      alert("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-linear-to-b from-blue-50 to-white flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Register Account
          </h1>
          <p className="text-slate-600 text-lg">
            Step {step} of 3 • Complete your information
          </p>
        </div>

        {/* Step Card */}
        <Card className="rounded-3xl shadow-md p-6">
          <CardContent className="flex flex-col gap-6">
            {step === 1 && (
              <StepOne
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            )}

            {step === 2 && (
              <StepTwo
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            )}

            {step === 3 && (
              <StepThree
                formData={formData}
                setFormData={setFormData}
                errors={errors}
              />
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              {step > 1 ? (
                <Button
                  variant="outline"
                  className="px-8"
                  onClick={() => setStep(step - 1)}
                >
                  ← Back
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button className="px-8 bg-blue-700" onClick={handleNext}>
                  Next →
                </Button>
              ) : (
                <Button
                  className="px-8 bg-green-600 hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  Submit →
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

/* Step 1 */
function StepOne({ formData, setFormData, errors }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <InputField
        label="Full Name"
        icon={<User className="size-5 text-blue-600" />}
        value={formData.fullName}
        onChange={(e: { target: { value: any } }) =>
          setFormData({ ...formData, fullName: e.target.value })
        }
        placeholder="John Doe"
        error={errors.fullName}
      />

      {/* Gender */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-slate-700 font-medium">Gender</label>
        <select
          className="w-full px-4 py-3 border rounded-xl bg-white"
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm">{errors.gender}</p>
        )}
      </div>

      <InputField
        className="mt-4"
        label="Date of Birth"
        type="date"
        icon={<Calendar className="size-5 text-blue-600" />}
        value={formData.dob}
        onChange={(e: { target: { value: any } }) =>
          setFormData({ ...formData, dob: e.target.value })
        }
        error={errors.dob}
      />
    </motion.div>
  );
}

/* Step 2 */
function StepTwo({ formData, setFormData, errors }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <InputField
        label="Passport Number"
        icon={<IdCard className="size-5 text-blue-600" />}
        placeholder="A1234567"
        value={formData.passport}
        onChange={(e: { target: { value: any } }) =>
          setFormData({ ...formData, passport: e.target.value })
        }
        error={errors.passport}
      />

      <InputField
        className="mt-4"
        label="Email"
        type="email"
        icon={<Mail className="size-5 text-blue-600" />}
        placeholder="you@example.com"
        value={formData.email}
        onChange={(e: { target: { value: any } }) =>
          setFormData({ ...formData, email: e.target.value })
        }
        error={errors.email}
      />
    </motion.div>
  );
}

/* Step 3 */
function StepThree({ formData, setFormData, errors }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <InputField
        label="Password"
        type="password"
        icon={<Lock className="size-5 text-blue-600" />}
        placeholder="••••••••"
        value={formData.password}
        onChange={(e: { target: { value: any } }) =>
          setFormData({ ...formData, password: e.target.value })
        }
        error={errors.password}
      />

      <InputField
        className="mt-4"
        label="Confirm Password"
        type="password"
        icon={<Lock className="size-5 text-blue-600" />}
        placeholder="••••••••"
        value={formData.confirmPassword}
        onChange={(e: { target: { value: any } }) =>
          setFormData({ ...formData, confirmPassword: e.target.value })
        }
        error={errors.confirmPassword}
      />
    </motion.div>
  );
}

/* Reusable Input Component */
function InputField({
  label,
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  className,
}: any) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-slate-700 font-medium">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-3">{icon}</div>
        <Input
          type={type}
          placeholder={placeholder}
          className="pl-10 py-6 rounded-xl"
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
