# 🎓 Final Year Project - LMS Frontend

Welcome to the **Learning Management System (LMS)** frontend — a powerful, role-based education platform designed to streamline academic operations, facilitate learning, and enhance teacher-student engagement.

> 🚀 Built with **React.js**, this dynamic frontend adapts its UI based on user roles (Admin, Teacher, Student) to provide a customized experience for each.

## 📽️ Demo

🎬 [Watch the Demo Video](#) *(Replace with your actual link)*

---

## 🌟 Key Features

### 🏫 Academic Management
- **Campus, School, Department & Program Management**  
  Organize your institution’s hierarchy for structured access and scalability.

- **Batch & Semester Management**  
  Seamlessly manage academic cycles and student groupings.

### 👥 User & Role-Based Access Control
- **Admin Panel**  
  Full control over the platform, with access to all modules.

- **Dynamic Role & Permission System**  
  Assign fine-grained permissions to faculty, staff, and students.

- **User Types**
  - Students: View enrollments, grades, and submit activities  
  - Teachers: Manage activities, grading, discussions  
  - Admins: Full access including user and role management

### 📚 Course & Activity Management
- **Course Management**  
  Add, update, and assign courses to programs and departments.

- **Activity Creation & Resource Uploads**  
  Teachers can create assignments, quizzes, and share course material using integrated Azure Blob Storage.

- **Automatic Grading & Grade Visibility**  
  Grades are calculated and presented based on a defined grading policy.

- **Discussion Boards**  
  Each Course Section includes its own discussion forum for collaborative learning.

### 📊 Student Dashboard
- View enrolled courses and activities
- Submit assignments and participate in discussions
- Track progress and view marks/grades (if published by instructor)

---

## 🧰 Tech Stack

- ⚛️ **React.js** – Component-based UI
- 🌐 **React Router** – Client-side routing
- 📦 **Context API** – Global state management
- 🎨 **Tailwind CSS** – Utility-first responsive styling
- 🔌 **Axios** – API communication layer

---

## ⚙️ Getting Started

### 📦 Prerequisites

- Node.js (v18 or above)
- npm (or yarn)

### 🔧 Installation

```bash
git clone https://github.com/your-org/fyp-frontend.git
cd fyp-frontend
npm install
````

### ▶️ Run the Application

```bash
npm start
```

> App will be available at: `http://localhost:3000`

### 🔐 Environment Setup

Create a `.env` file in the root directory with the following:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BLOB_STORAGE_URL=your_azure_blob_storage_url
```

Replace with your actual API and blob storage endpoints.

---

## 👨‍💻 Contributors

* **Ali Shoaib** – Frontend Architecture & LMS Workflow
* **Muhammad Bilal** – UI/UX, Role Management, Student Experience

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

> ✨ Built with passion for innovation in education.

