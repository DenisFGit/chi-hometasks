"use client"; // required because we use Redux hooks

import { useState, useEffect } from "react";
import Link from "next/link";
import { logout } from "../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useRouter } from 'next/navigation';

import { Box, Button } from "@mui/material";

// import "./Navigation.scss";

export default function Navigation() {
    const dispatch = useAppDispatch();

    const isAuthenticated = useAppSelector(
        (state) => Boolean(state.user.token));

    const router = useRouter();

    const handleLogout = async () => {
        await dispatch(logout());;
        router.push('/login');
    }


    return (
        <Box
            sx={{
                position: "fixed",
                zIndex: 3,
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#27A6F5",
                color: "#fff",
                padding: "20px",
            }}>

            <ul className="flex gap-20 text-lg [&_a:hover]:text-blue-200 ">
                <li>
                    <Link href="/register">Register</Link>
                </li>
                <li>
                    <Link href="/login">Login</Link>
                </li>
                <li>
                    <Link href="/">Stripe</Link>
                </li>
                {/* <li>
                    <Link href="/test">Test</Link>
                </li> */}
                {isAuthenticated ?
                    <>
                        <li>
                            <Link href="/home">Home</Link>
                        </li>
                        <li>
                            <Link href="/newPost">New post</Link>
                        </li>
                    </>
                    : null}
            </ul>

            <Button
                className="nav__btn"
                onClick={handleLogout}
                sx={{
                    backgroundColor: "white",
                    fontWeight: 700,
                    color: "black",
                    "&:hover": {
                        backgroundColor: "#CDEDF7",
                    },
                }}
            >
                Log out
            </Button>
        </Box>
    );
}