// script for seeding the database with fake data
import { faker } from '@faker-js/faker';
import { Address, Department, Office, Role, User } from '@/models';
import connectDb from "@/lib/db";
import { departmentsArray as departments, rolesArray as roles } from '../../Constants/enum';
import { genders, statuses, offices } from '../../Constants/enum';
import countryNames from '../../Constants/countries';
import timezones from '../../Constants/timezones';
import { departmentDocument } from '@/models/schemas/DepartmentSchema';
import { officeDocument } from '@/models/schemas/OfficeSchema';
import { roleDocument } from '@/models/schemas/RoleSchema';
import { config } from './config';

async function seedBaseData() {
    // Create Departments
    const departmentDocs : departmentDocument[] = await Promise.all(
        departments.map(async (dept) => {
            return await Department.create({ title: dept });
        })
    );

    // Create Offices
    const officeDocs = await Promise.all(
        offices.map(async (office) => {
            return await Office.create({ title: office });
        })
    );

    // Create Roles (linked to departments)
    const roleDocs : roleDocument[] = await Promise.all(
        roles.map(async (role) => {
            return await Role.create({
                title: role,
                department: departmentDocs[0]._id // Assign first department to all roles
            });
        })
    );

    return { departmentDocs, officeDocs, roleDocs };
}

async function createUniqueAddress() {
    const country = faker.helpers.arrayElement(countryNames);
    const primary = faker.location.streetAddress(true); // Guaranteed unique by faker
    const state = faker.location.state();
    const city = faker.location.city();

    return await Address.create({
        primary,
        country,
        state,
        city
    });
}

interface baseDataInterface {
    departmentDocs: departmentDocument[];
    officeDocs: officeDocument[];
    roleDocs: roleDocument[];
}

async function seedUsers(baseData: baseDataInterface, count: number) {
    const { departmentDocs, officeDocs, roleDocs } = baseData;
    const users = [];

    for (let i = 0; i < count; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName });
        
        // Create unique address for each user
        const address = await createUniqueAddress();

        // Create user with references to other collections
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: 'password123', // Store password directly without hashing
            adminAccess: faker.datatype.boolean({ probability: 0.1 }), // 10% chance of being admin
            office: faker.helpers.arrayElement(officeDocs),
            department: faker.helpers.arrayElement(departmentDocs),
            role: faker.helpers.arrayElement(roleDocs),
            status: faker.helpers.arrayElement(statuses),
            timezone: faker.helpers.arrayElement(timezones),
            gender: faker.helpers.arrayElement(genders),
            address: address._id,
            phone: '+92' + faker.phone.number(), // Format: +1XXXXXXXXXX
            dateJoined: faker.date.past({ years: 2 })
        });

        users.push(user);
        console.log(`Created user ${i + 1} of ${count}: ${firstName} ${lastName}`);
    }

    return users;
}

async function main() {
    try {
        if (!config.mongoUri) {
            throw new Error('MONGO_DB_URI is not defined in environment variables');
        }
        
        await connectDb();
        
        // Clear existing data
        console.log('Clear existing data...');
        await Promise.all([
            User.deleteMany({}),
            Address.deleteMany({}),
            Department.deleteMany({}),
            Role.deleteMany({}),
            Office.deleteMany({})
        ]);

        console.log('Seeding base data...');
        const baseData = await seedBaseData();
        
        console.log('Seeding users...');
        await seedUsers(baseData, 100);
        
        console.log('Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

main();