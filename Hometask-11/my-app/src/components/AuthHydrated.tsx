'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setToken, fetchCurrentUser } from '../store/slices/userSlice';

export default function AuthHydrator() {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.token);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            dispatch(setToken(token));
        }
        if (isAuthenticated) {
            dispatch(fetchCurrentUser())
        }
    }, [dispatch, isAuthenticated]);

    return null;
}