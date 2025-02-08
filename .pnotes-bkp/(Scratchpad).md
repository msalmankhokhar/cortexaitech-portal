Note before commit:
add base_url in vercel env

features kia kia hongy
1 - Employees table
2 - Employee details page
3 - Attendance

Database structure kia hoga ?

Total Models:
User, Department, Role, Address

{
    Attendance Model:
    date: Date
    user: User
    checkIn: Date
    checkOut: Date
}

{
    Address Model:
    user: User
    primary string unique
    country string
    state string
    city
}

{
    Office Model:
    title: string default: 'Remote'
}

{
    User Model:
    firstName
    lastName
    email
    password

    status (Active or On Leave)
    department Department[]
    role Role[]
    timezone
    office: Office

    gender
    address: Address
    nationality
}

{
    Department Model
    title: string
    subDepartments: Department[]
}

{
    Role Model
    title: string
    department: Department[]
}
