import { sideBarDropDownProps } from "@/components/root/SideBar/SideBarDropDown"
import { sideBarIcons } from "./sideBarIcons"

export const maxWorkHoursPerDay = 8;

export const AdminSideBarItemsData : sideBarDropDownProps[] = [
    {
        title: 'Employees',
        icon: sideBarIcons.employees,
        items: [
            {
                title: 'Manage Employees',
                url: '/manage-employees',
            },
        ]
    },
    {
        title: 'Checklist',
        icon: sideBarIcons.checkList,
        items: [
            {
                title: 'To-Dos',
            },
            {
                title: 'Onboarding',
            },
            {
                title: 'Offboarding',
            },
            {
                title: 'Settings',
            },
        ],
    },
    {
        title: 'Time Off',
        icon: sideBarIcons.timeOff,
        items: [
            {
                title: 'My Time Off',
            },
            {
                title: 'Employee Time Off',
            },
            {
                title: 'Team Time Off',
            },
            {
                title: 'Settings',
            },
        ],
    },
    {
        title: 'Attendence',
        icon: sideBarIcons.attendance,
        items: [
            {
                title: 'My Attendence',
            },
            {
                title: 'Employee Attendence',
            },
            {
                title: 'Team Attendence',
            },
            {
                title: 'Settings',
            },
        ],
    },
    {
        title: 'Payroll',
        icon: sideBarIcons.payroll,
        items: [
            {
                title: 'Employee Payroll',
            },
            {
                title: 'Settings',
            },
        ],
    },
    {
        title: 'Recruitment',
        icon: sideBarIcons.recruitment,
        items: [
            {
                title: 'Jobs',
            },
            {
                title: 'Candidates',
            },
            {
                title: 'Settings',
            },
        ],
    },
]

export const EmployeeSideBarItemsData : sideBarDropDownProps[] = [
    {
        title: 'Profile',
        icon: sideBarIcons.profile,
        items: [
            {
                title: 'My Profile',
                url: '/employee-profile/myprofile',
            },
        ]
    },
    {
        title: 'Attendence',
        icon: sideBarIcons.attendance,
        items: [
            {
                title: 'My Attendence',
            },
        ],
    },
]

export const sideBarItemsData = {
    admin: AdminSideBarItemsData,
    employee: EmployeeSideBarItemsData,
}

export const newEmployeeEmailTemplate = (firstName: string, email: string, password: string) => `
  <h1>Welcome to Cortex AI Tech!</h1>
  <p>Dear ${firstName},</p>
  <p>Your account has been created on our HR dashboard.</p>
  <p>You can login using these credentials:</p>
  <ul>
    <li>Email: ${email}</li>
    <li>Password: ${password}</li>
  </ul>
  <p>Please visit <a href="${process.env.BASE_URL_PROD}/login?type=Employee&callbackUrl=${process.env.BASE_URL_PROD}">our login page</a> to access your account.</p>
`;

export const newEmployeeAdminNotificationEmailTemplate = (employeeData: EmployeeDocument) => `
  <h1>New Employee Account Created</h1>
  <p>A new employee account has been created with the following details:</p>
  <ul>
    <li>Name: ${employeeData.firstName} ${employeeData.lastName}</li>
    <li>Email: ${employeeData.email}</li>
    <li>Passowrd: ${employeeData.password}</li>
    <li>Department: ${employeeData.department.title}</li>
    <li>Role: ${employeeData.role.title}</li>
  </ul>
`;