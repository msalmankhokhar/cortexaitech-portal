interface roleType {
    title: string;
}

interface departmentType {
    title: string;
    subDepartments?: departmentType[];
    roles: roleType[];
}

export const departments : departmentType[] = [
    {
         title: 'HR',
         roles: [
                { title: 'HR Manager' },
         ],
    },
    {
         title: 'Engineering',
         roles: [
                { title: 'Fullstack Developer' },
                { title: 'React Native Developer' },
                { title: 'Backend Developer' },
                { title: 'MERN Stack Developer' },
                { title: 'Next.js Developer' },
                { title: 'Frontend Developer' },
                { title: 'Machine Learning Engineer' },
                { title: 'AI Engineer' },
                { title: 'Others' },
         ],
    },
    {
         title: 'Data Analysis',
         roles: [
                { title: 'Data Analyst' },
         ],
    },
    {
         title: 'Marketing',
         roles: [
                { title: 'Google Ads Expert' },
                { title: 'Meta Ads Expert' },
         ],
    },
]

export const departmentsArray = departments.map(department => department.title);
export const rolesArray = departments.map(department => department.roles.map(role => role.title)).flat();

export const getRolesByDepartment = (departmentTitle: string): string[] => {
    const department = departments.find(dept => dept.title === departmentTitle);
    return department?.roles.map(role => role.title) || [];
};

export const offices = [
    'Remote',
    'Islamabad',
    'Lahore',
]

export const genders = [ 'Male', 'Female' ];
export const statuses = [ 'Active', 'On Leave' ];