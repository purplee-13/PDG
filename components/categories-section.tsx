"use client"

import { Users, MapPin, GraduationCap } from "lucide-react"
import { motion } from "framer-motion"

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

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">Kategori Layanan</h2>
          <p className="text-gray-600 text-lg">Temukan aplikasi dan pelayanan di Kota Parepare berdasarkan kategori!</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-2xl transition-all cursor-pointer group border border-gray-100"
              >
                <div
                  className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">{category.title}</h3>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
