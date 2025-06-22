const HeroSection = () => {
  return (
    <section className="bg-secondary/10 py-20">
      <div className="container mx-auto text-center">
        {/* Replace the logo/cube with the profile image */}
        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl mx-auto mb-8">
          <img src="/images/uzair-chatbot.jpg" alt="Muhammad Uzair" className="w-full h-full object-cover" />
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4">Muhammad Uzair</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8">Software Engineer | AI Enthusiast | Chatbot Developer</p>
        <a
          href="#projects"
          className="bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-dark transition-colors duration-300"
        >
          View My Work
        </a>
      </div>
    </section>
  )
}

export default HeroSection
