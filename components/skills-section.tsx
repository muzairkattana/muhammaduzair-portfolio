"use client"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import SkillRadar from "@/components/skill-radar"

const SkillsSection = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-16"
        >
          <Badge variant="outline" className="mb-4 text-primary border-primary/30">
            Professional Skills
          </Badge>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
            Skills{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Overview</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across multiple domains with proven track record
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Enhanced Skill Radar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="skill-chart-professional skill-radar-container"
          >
            <SkillRadar
              skills={[
                { name: "React/Next.js", level: 95 },
                { name: "TypeScript", level: 90 },
                { name: "Node.js", level: 85 },
                { name: "AI/ML", level: 80 },
                { name: "UI/UX Design", level: 88 },
                { name: "Business Strategy", level: 92 },
              ]}
              size={400}
              className="mx-auto"
            />
          </motion.div>

          {/* Enhanced Skills List */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Professional skill categories with enhanced styling */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
