import { RiDashboardFill , RiGraduationCapFill } from "react-icons/ri";
import { GiTeacher } from "react-icons/gi";
import { TbTableColumn } from "react-icons/tb";
import { FaGraduationCap } from "react-icons/fa";
import { AiOutlineRise } from "react-icons/ai";


export const sidebar_nav_elements = [
    {
        id : 1,
        icon : RiDashboardFill,
        link : 'dashboard'
    },
    {
        id : 2,
        icon : RiGraduationCapFill,
        link : 'students'
    },
    {
        id : 3,
        icon : GiTeacher,
        link : 'teachers'
    },
    {
        id : 4,
        icon : TbTableColumn,
        link : 'time table'
    }
]

export const admin_stats = [
    {
        id : 1,
        icon : FaGraduationCap,
        bgColor : 'bg-[#293241]',
        item : 'students'
    },
    {
        id : 2,
        icon : GiTeacher,
        bgColor : 'bg-[#ef233c]',
        item : 'mentors'
    },
    {
        id : 3,
        icon : TbTableColumn,
        bgColor : 'bg-[#38b000]',
        item : 'events'
    },
    {
        id : 4,
        icon : AiOutlineRise,
        bgColor : 'bg-[#ffba08]',
        item : 'performance'
    }
]

