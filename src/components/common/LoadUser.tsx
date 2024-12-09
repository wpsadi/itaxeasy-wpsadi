"use client";
import { useUserProfileQuery } from "@/services/user/profile/UserProfileQuery"

export const LoadUser = ()=>{
    useUserProfileQuery()
    return null
}