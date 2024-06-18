# Flowtech

Live site link: https://flow-tech-2ea9f.web.app/

## Key Features

### 1. User Authentication and Role Management:

Implemented robust email and password-based authentication with role-based access control for Employees, HR, and Admin users. Additional social login options like Google and GitHub are also available.

### 2. Comprehensive Dashboard:

A user-specific dashboard that includes workflow updates for employees, salary management for HR, and overall employee management for Admin. Each role has a tailored view with appropriate functionalities.

### 3. Salary and Payment Management:

HR can manage employee salaries, verify employees, and process payments using a secure payment gateway. The system ensures that no duplicate payments are made within the same month.

### 4. Dynamic Employee Work Tracking:

Employees can log their work hours by selecting tasks from a dropdown menu. HR can monitor these logs, filter them by employee name and month, and view a summary of work hours.

### 5. Detailed Analytics and Reporting:

HR can view detailed analytics on employee performance and salary history through interactive charts. Admins have access to comprehensive employee lists and can make data-driven decisions.

### 6. Secure Data Management:

Utilized environment variables to securely manage Firebase config keys and MongoDB credentials, ensuring data security and privacy.

### 7. Efficient CRUD Operations:

Implemented toast/notification alerts for all CRUD operations, providing users with immediate feedback on their actions without relying on default browser alerts.

### 8. Enhanced Data Fetching with TanStack Query:

All data fetching functionalities use TanStack Query, improving performance and providing efficient state management for GET requests.

### 9. Admin Controls:

Admins have the authority to promote employees to HR, adjust salaries, and terminate employment. These actions are protected by JWT tokens to ensure that only authorized users can perform these operations.

### 10. Responsive Design:

The application is fully responsive, providing a seamless experience across all devices, including mobile phones, tablets, and desktops.

## Technologies Used:

### Frontend:

React, Tailwind CSS, React Hook Form, TanStack Query, TanStack Table, Axios, Recharts, Swiper, Sweet Alert

### Backend:

Node.js, Express.js, MongoDB

### Authentication:

Firebase Authentication, JWT for role verification

### Other Tools:

GitHub for version control, imgbb for image uploads, Stripe for payment gateway
