import { Banknote, BriefcaseBusiness, CalendarCheck, ChartLine, ClipboardList, Timer, UserRound, UsersRound } from "lucide-react";

export const sideBarIcons = {
    employees: (<UsersRound strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />),
    profile: (<UserRound strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />),
    checkList: (<ClipboardList strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />),
    timeOff: (<Timer strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />),
    attendance: (<CalendarCheck strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />),
    payroll: (<Banknote strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />),
    performance: (<ChartLine strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />),
    recruitment: (<BriefcaseBusiness strokeWidth={1.5} size={18} className='text-secondary-700 dark:text-secondary-400' />),
}