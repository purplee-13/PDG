import { Users, MapPin, GraduationCap } from "lucide-react"

export default function CategoriesSection() {
  const categories = [
    {
      title: "Wirausaha",
      icon: Users,
      gradient: "from-blue-400 to-purple-500",
    },
    {
      title: "Wisatawan",
      icon: MapPin,
      gradient: "from-orange-400 to-red-500",
    },
    {
      title: "Pelajar",
      icon: GraduationCap,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Masyarakat",
      icon: Users,
      gradient: "from-green-400 to-blue-500",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">Kategori Layanan</h2>
          <p className="text-gray-600 text-lg">Temukan aplikasi dan pelayanan di Kota Parepare berdasarkan kategori!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <div
                key={index}
                className="bg-white rounded-lg p-8 text-center shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${category.gradient} rounded-lg flex items-center justify-center`}
                >
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
