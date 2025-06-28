// Mock Users
export const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    password: 'password123',
    role: 'student',
    profileComplete: true,
    bio: 'Computer Science student passionate about web development',
    skills: 'React, JavaScript, Python, Node.js',
    github: 'https://github.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    password: 'password123',
    role: 'student',
    profileComplete: false,
    createdAt: '2024-02-10T14:30:00Z'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+1234567892',
    password: 'password123',
    role: 'student',
    profileComplete: true,
    bio: 'Full-stack developer with 2 years of experience',
    skills: 'Java, Spring Boot, Angular, MySQL',
    github: 'https://github.com/mikejohnson',
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    id: 999,
    name: 'Admin User',
    email: 'admin@thinkbuild.com',
    phone: '+1234567899',
    password: 'admin123',
    role: 'admin',
    profileComplete: true,
    createdAt: '2024-01-01T00:00:00Z'
  }
]

// Mock Projects
export const mockProjects = [
  {
    id: 1,
    title: 'E-commerce Website',
    description: 'Build a complete e-commerce website with user authentication, product catalog, shopping cart, and payment integration. Use modern web technologies and follow best practices.',
    submissionDate: '2024-12-01T00:00:00Z',
    lastDate: '2024-12-31T23:59:59Z',
    createdBy: 999,
    createdAt: '2024-11-01T10:00:00Z'
  },
  {
    id: 2,
    title: 'Mobile App UI Design',
    description: 'Create a mobile app UI design for a fitness tracking application. Include wireframes, mockups, and a prototype. Focus on user experience and modern design principles.',
    submissionDate: '2024-12-05T00:00:00Z',
    lastDate: '2024-12-25T23:59:59Z',
    createdBy: 999,
    createdAt: '2024-11-05T14:30:00Z'
  },
  {
    id: 3,
    title: 'Database Design Project',
    description: 'Design and implement a database for a library management system. Include ER diagrams, normalized tables, and sample queries. Use SQL and provide documentation.',
    submissionDate: '2024-12-10T00:00:00Z',
    lastDate: '2024-12-30T23:59:59Z',
    createdBy: 999,
    createdAt: '2024-11-10T16:45:00Z'
  },
  {
    id: 4,
    title: 'Machine Learning Model',
    description: 'Develop a machine learning model for predicting house prices. Use Python, pandas, and scikit-learn. Include data preprocessing, model training, and evaluation.',
    submissionDate: '2024-12-15T00:00:00Z',
    lastDate: '2024-12-28T23:59:59Z',
    createdBy: 999,
    createdAt: '2024-11-15T11:20:00Z'
  },
  {
    id: 5,
    title: 'React Native App',
    description: 'Build a React Native mobile application for expense tracking. Include features like adding expenses, categories, charts, and data persistence.',
    submissionDate: '2024-12-20T00:00:00Z',
    lastDate: '2024-12-27T23:59:59Z',
    createdBy: 999,
    createdAt: '2024-11-20T13:10:00Z'
  }
]

// Mock Submissions
export const mockSubmissions = [
  {
    id: 1,
    projectId: 1,
    studentId: 1,
    description: 'A fully functional e-commerce website built with React and Node.js. Features include user authentication, product management, shopping cart, and Stripe payment integration.',
    githubUrl: 'https://github.com/johndoe/ecommerce-project',
    submittedAt: '2024-11-25T15:30:00Z',
    rating: 5,
    feedback: 'Excellent work! The implementation is clean, well-documented, and includes all required features. Great use of modern React patterns.',
    reviewed: true,
    ranking: '1st'
  },
  {
    id: 2,
    projectId: 2,
    studentId: 3,
    description: 'Mobile UI design for FitTrack app with complete user flow, high-fidelity mockups, and interactive prototype created in Figma.',
    githubUrl: 'https://github.com/mikejohnson/fittrack-ui',
    submittedAt: '2024-11-22T10:15:00Z',
    rating: 4,
    feedback: 'Good design work with attention to user experience. Some improvements could be made in color consistency and accessibility.',
    reviewed: true,
    ranking: '2nd'
  },
  {
    id: 3,
    projectId: 3,
    studentId: 1,
    description: 'Complete database design for library management system with normalized tables, relationships, and stored procedures.',
    githubUrl: 'https://github.com/johndoe/library-db',
    submittedAt: '2024-11-20T14:45:00Z',
    rating: 4,
    feedback: 'Well-structured database design with proper normalization. Documentation could be more comprehensive.',
    reviewed: true
  },
  {
    id: 4,
    projectId: 1,
    studentId: 3,
    description: 'E-commerce platform with Vue.js frontend and Express.js backend. Includes product catalog, user management, and order processing.',
    githubUrl: 'https://github.com/mikejohnson/vue-ecommerce',
    submittedAt: '2024-11-28T09:20:00Z',
    rating: 4,
    feedback: 'Good implementation with Vue.js. The backend API is well-structured. Could improve error handling and add more unit tests.',
    reviewed: true,
    ranking: '2nd'
  },
  {
    id: 5,
    projectId: 4,
    studentId: 2,
    description: 'House price prediction model using linear regression and random forest algorithms. Includes data visualization and model comparison.',
    githubUrl: 'https://github.com/janesmith/house-price-ml',
    submittedAt: '2024-12-01T11:30:00Z',
    rating: 3,
    feedback: 'Basic implementation of ML algorithms. Could benefit from more feature engineering and hyperparameter tuning.',
    reviewed: true
  },
  {
    id: 6,
    projectId: 5,
    studentId: 1,
    description: 'React Native expense tracker app with local storage, charts, and category management.',
    githubUrl: 'https://github.com/johndoe/expense-tracker-rn',
    submittedAt: '2024-12-05T16:00:00Z',
    rating: null,
    feedback: null,
    reviewed: false
  }
]