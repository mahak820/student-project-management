import Navbar from '../components/Navbar'

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 to-primary-800">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")'
          }}
        ></div>
        <div className="absolute inset-0 bg-white bg-opacity-10"></div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="bg-white bg-opacity-95 rounded-2xl p-12 shadow-2xl backdrop-blur-sm">
            <h1 className="text-5xl md:text-6xl font-bold text-secondary-900 mb-6">
              Student Project Management App
            </h1>
            <p className="text-xl text-secondary-700 mb-4">
              Streamline your academic projects with our comprehensive management platform
            </p>
            <p className="text-lg text-secondary-600 mb-8">
              Submit projects, get teacher reviews, collaborate with peers, and track your academic progress all in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/register" className="btn-primary text-lg px-8 py-4">
                Get Started
              </a>
              <a href="#about" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              Why Choose ThinkBuild?
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Our platform helps students manage their projects efficiently while providing teachers with powerful tools to review and guide student work.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Easy Project Submission
              </h3>
              <p className="text-secondary-600">
                Submit your projects with detailed descriptions, deadlines, and supporting documents
              </p>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">👨‍🏫</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Teacher Reviews
              </h3>
              <p className="text-secondary-600">
                Get detailed feedback and ratings from your teachers to improve your work
              </p>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">👀</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                View Others' Projects
              </h3>
              <p className="text-secondary-600">
                Browse and learn from other students' projects to gain inspiration and insights
              </p>
            </div>

            <div className="card text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Track Past Submissions
              </h3>
              <p className="text-secondary-600">
                Keep track of all your submissions, grades, and progress over time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section id="help" className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-secondary-600">
              Simple steps to get started with ThinkBuild
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-700">1</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Create Your Account
              </h3>
              <p className="text-secondary-600">
                Sign up as a student and complete your profile to get started
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-700">2</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Submit Your Projects
              </h3>
              <p className="text-secondary-600">
                Upload your projects with descriptions and meet the deadlines
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-700">3</span>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                Get Feedback
              </h3>
              <p className="text-secondary-600">
                Receive reviews from teachers and peers to improve your work
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-secondary-600 mb-8">
            Join thousands of students already using ThinkBuild to manage their projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/register" className="btn-primary text-lg px-8 py-4">
              Sign Up Now
            </a>
            <a href="/login" className="btn-secondary text-lg px-8 py-4">
              Already have an account?
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">ThinkBuild</h3>
            <p className="text-secondary-300 mb-4">
              Empowering students to build better projects
            </p>
            <p className="text-secondary-400 text-sm">
              © 2025 ThinkBuild. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage