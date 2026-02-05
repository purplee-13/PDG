"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/lib/auth/auth-context"
import { ArrowLeft, ArrowRight, Eye, EyeOff, Check, User, Calendar, MapPin, Shield, Home } from "lucide-react"

interface FormData {
  // Step 1: NIK Verification
  nik: string
  name: string
  captcha: string

  // Step 2: Personal Data
  birthDate: string
  province: string
  city: string
  district: string
  village: string
  rt: string
  rw: string
  postalCode: string
  address: string

  // Step 3: Account Data
  phone: string
  email: string
  username: string
  password: string
  confirmPassword: string

  // Step 4: Agreement
  agreeTerms: boolean
}

const districtsData: Record<string, string[]> = {
  "Bacukiki": ["Galung Maloang", "Lemoe", "Lompoe", "Watang Bacukiki"],
  "Bacukiki Barat": ["Bumi Harapan", "Cappa Galung", "Kampung Baru", "Lumpue", "Sumpang Minangae", "Tiro Sompe"],
  "Soreang": ["Bukit Harapan", "Bukit Indah", "Kampung Pisang", "Lakessi", "Ujung Baru", "Ujung Lare", "Watang Soreang"],
  "Ujung": ["Labukkang", "Lapadde", "Mallusetasi", "Ujung Bulu", "Ujung Sabbang"]
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    nik: "",
    name: "",
    captcha: "",
    birthDate: "",
    province: "Sulawesi Selatan",
    city: "Parepare",
    district: "",
    village: "",
    rt: "",
    rw: "",
    postalCode: "",
    address: "",
    phone: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const { register, isLoading } = useAuth()
  const router = useRouter()

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setError("")

    if (currentStep === 1) {
      if (!formData.nik || !formData.name) {
        setError("NIK dan nama harus diisi")
        return
      }
      if (formData.nik.length !== 16) {
        setError("NIK harus 16 digit")
        return
      }
    } else if (currentStep === 2) {
      if (!formData.birthDate || !formData.province || !formData.city || !formData.district || !formData.village) {
        setError("Semua field harus diisi")
        return
      }
    } else if (currentStep === 3) {
      if (!formData.phone || !formData.email || !formData.username || !formData.password || !formData.confirmPassword) {
        setError("Semua field harus diisi")
        return
      }
      if (!formData.email.includes("@")) {
        setError("Email tidak valid (harus mengandung '@')")
        return
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Password tidak cocok")
        return
      }
      if (formData.password.length < 8) {
        setError("Password minimal 8 karakter")
        return
      }

      const hasNumber = /\d/.test(formData.password)
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)

      if (!hasNumber || !hasSymbol) {
        setError("Password harus mengandung kombinasi angka dan simbol")
        return
      }
    }

    setCurrentStep((prev) => prev + 1)
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleSubmit = async () => {
    if (!formData.agreeTerms) {
      setError("Anda harus menyetujui syarat dan ketentuan")
      return
    }

    const success = await register({
      nik: formData.nik,
      name: formData.name,
      birthDate: formData.birthDate,
      province: formData.province,
      city: formData.city,
      district: formData.district,
      village: formData.village,
      rt: formData.rt,
      rw: formData.rw,
      postalCode: formData.postalCode,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      username: formData.username,
      password: formData.password,
    })

    if (success) {
      router.push("/login")
    } else {
      setError("Registrasi gagal. NIK atau email sudah terdaftar.")
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step < currentStep
                ? "bg-green-500 text-white"
                : step === currentStep
                  ? "bg-orange-500 text-white"
                  : "bg-gray-300 text-gray-600"
                }`}
            >
              {step < currentStep ? <Check className="w-4 h-4" /> : step}
            </div>
            {step < 4 && <div className={`w-12 h-1 mx-2 ${step < currentStep ? "bg-green-500" : "bg-gray-300"}`} />}
          </div>
        ))}
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Cek ketersediaan akun menggunakan NIK dan Nama Lengkap
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Masukkan 16 Digit NIK*</label>
        <input
          type="text"
          value={formData.nik}
          onChange={(e) => updateFormData("nik", e.target.value)}
          placeholder="731504**************"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          maxLength={16}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap (Sesuai KTP, Tanpa Gelar)*</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          placeholder="Lorem lorem"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>

    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Silahkan Lengkapi data Diri Anda pada isian berikut
        </h3>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-500" />
          <div>
            <p className="font-medium text-gray-900">{formData.name}</p>
            <p className="text-sm text-gray-600">{formData.nik}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Data Diri</h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Lahir*</label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) => updateFormData("birthDate", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Detail Alamat Sesuai KTP</h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kecamatan*</label>
            <select
              value={formData.district}
              onChange={(e) => {
                updateFormData("district", e.target.value)
                updateFormData("village", "") // Reset village when district changes
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Pilih Kecamatan</option>
              {Object.keys(districtsData).sort().map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kelurahan*</label>
            <select
              value={formData.village}
              onChange={(e) => updateFormData("village", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={!formData.district}
            >
              <option value="">Pilih Kelurahan</option>
              {(formData.district ? districtsData[formData.district] : []).sort().map((village) => (
                <option key={village} value={village}>
                  {village}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="RT"
                value={formData.rt}
                onChange={(e) => updateFormData("rt", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="RW"
                value={formData.rw}
                onChange={(e) => updateFormData("rw", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Kode POS"
              value={formData.postalCode}
              onChange={(e) => updateFormData("postalCode", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Alamat Lengkap Sesuai KTP*"
              value={formData.address}
              onChange={(e) => updateFormData("address", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Formulir pendaftaran telah sesuai, lanjutkan pembuatan username dan kata sandi pada tahapan berikut.
        </h3>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-500" />
          <div>
            <p className="font-medium text-gray-900">{formData.name}</p>
            <p className="text-sm text-gray-600">{formData.nik}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4">Data Akun</h4>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">No. Whatsapp*</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => updateFormData("phone", e.target.value)}
              placeholder="08123456789"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Email*</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="contoh@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => updateFormData("username", e.target.value)}
              placeholder="username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi*</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">Gunakan minimal 8 karakter dengan gabungan huruf, angka, dan simbol</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ulang Kata Sandi*</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                placeholder="Konfirmasi kata sandi"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-500" />
          <div>
            <p className="font-medium text-gray-900">{formData.name}</p>
            <p className="text-sm text-gray-600">{formData.nik}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-gray-500" />
          Data Diri
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Tanggal Lahir</span>
            <span className="font-medium">{formData.birthDate || "03-03-2000"}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-gray-500" />
          Detail Alamat Sesuai KTP
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Provinsi</span>
            <span className="font-medium">{formData.province || "SULAWESI SELATAN"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Kota/Kabupaten</span>
            <span className="font-medium">{formData.city || "PAREPARE"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Kecamatan</span>
            <span className="font-medium">{formData.district || "BACUKIKI"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Kelurahan</span>
            <span className="font-medium">{formData.village || "WATANG BACUKIKI"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Alamat/Nama Jalan</span>
            <span className="font-medium">{formData.address || "Jalan Jendral Sudirman"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">RT/RW</span>
            <span className="font-medium">
              {formData.rt || "-"}/{formData.rw || "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Kode Pos</span>
            <span className="font-medium">{formData.postalCode || "-"}</span>
          </div>
        </div>
      </div>

      <div className="bg-white border-t pt-6">
        <h4 className="font-medium text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-gray-500" />
          Data Akun
        </h4>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">No. WhatsApp Aktif</span>
            <span className="font-medium">{formData.phone || "08889989989"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Email</span>
            <span className="font-medium">{formData.email || "loremipsum@gmail.com"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Username</span>
            <span className="font-medium">{formData.username || "loremipsum"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Kata Sandi</span>
            <span className="font-medium">******</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="flex items-start space-x-3">
          <input
            type="checkbox"
            checked={formData.agreeTerms}
            onChange={(e) => updateFormData("agreeTerms", e.target.checked)}
            className="mt-1 w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">
            Dengan ini, saya menyetujui{" "}
            <Link href="/terms" className="text-orange-500 hover:text-orange-600 font-medium">
              Syarat & Ketentuan
            </Link>{" "}
            dan{" "}
            <Link href="/privacy" className="text-orange-500 hover:text-orange-600 font-medium">
              Kebijakan Privasi
            </Link>{" "}
            yang berlaku
          </span>
        </label>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Background */}
      <div className="hidden lg:flex lg:flex-1 relative">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/bg.png"
            alt="Parepare Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 text-white w-full">
          <h1 className="text-4xl font-bold mb-8" style={{ color: '#FF9100' }}>
            Selamat Datang!
            <br />
            Parepare Dalam Genggaman
          </h1>

          <div className="mb-6 w-[300px] h-[300px] relative">
            <Image
              src="/images/IconLogin.png"
              alt="Icon Login"
              fill
              className="object-contain"
              priority
            />
          </div>

          <p className="text-lg max-w-md " style={{ color: '#083358' }}>
            Kemudahan untuk mendapatkan semua layanan dalam satu aplikasi
          </p>
        </div>
      </div>

      {/* Right side - Registration form */}
      <div className="flex-1 lg:flex-none lg:w-[600px] bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-green-600 mb-6 transition-colors font-medium">
            <Home className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-green-600 rounded-full"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Pendaftaran Akun</h1>
          </div>

          {renderStepIndicator()}

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali</span>
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors ml-auto"
                >
                  <span>Lanjut</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isLoading || !formData.agreeTerms}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>{isLoading ? "Memproses..." : "Kirim"}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            Sudah Mempunyai Akun?{" "}
            <Link href="/login" className="text-orange-500 hover:text-orange-600 font-medium">
              Login Disini
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
