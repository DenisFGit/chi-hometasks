import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/ThemeProvider.jsx";

import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material"

const HeroesPage = () => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { isDark } = useContext(ThemeContext);

    const columns = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 130 },
        { field: "status", headerName: "Status", width: 130 },
    ];

    const fetchHeroes = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const res = await fetch(
                `https://rickandmortyapi.com/api/character?page=${page}`
            );
            const data = await res.json();
            const { info, results } = data;

            const newRows = results.map((item) => ({
                id: item.id,
                name: item.name,
                status: item.status,
            }));

            setRows((prev) => [...prev, ...newRows]);
            setPage((prev) => prev + 1);
            setHasMore(info.next !== null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHeroes();
    }, []);

    return (
        <Box sx={{
            width: "100%",
            backgroundColor: isDark ? '#919191' : 'white',
            pb: 2,
            color: isDark ? 'white' : 'black'
        }}>
            <Typography variant="h1" fontSize={40} textAlign={'center'}>Heroes Page</Typography>
            <Box sx={{
                height: '100%',
                width: "100%",
                mt: 2
            }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    onRowClick={(params) => navigate(`/heroes/${params.id}`)}
                    pagination={false}
                    sx={{
                        backgroundColor: isDark ? "#919191" : "#f5f5f5",
                        color: isDark ? "#fff" : "#000",

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: isDark ? "#7f7f7f" : "#e0e0e0",
                            color: 'black'
                        },

                        "& .MuiDataGrid-row": {
                            backgroundColor: isDark ? "#919191" : "#fff",
                            transition: "background-color 0.2s ease",
                        },

                        /* 🔹 Hover */
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: isDark ? "#6f6f6f" : "#f0f0f0",
                        },

                        /* 🔹 Selected (clicked) row */
                        "& .MuiDataGrid-row.Mui-selected": {
                            backgroundColor: isDark ? "#5f5f5f" : "#cce4ff",
                        },

                        /* 🔹 Selected + hover */
                        "& .MuiDataGrid-row.Mui-selected:hover": {
                            backgroundColor: isDark ? "#4f4f4f" : "#b6d9ff",
                        },

                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${isDark ? "#7a7a7a" : "#ddd"}`,
                        },

                        /* 🔹 Remove default blue outline */
                        "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
                            outline: "none",
                        },

                    }}
                />
            </Box>

            {hasMore && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={fetchHeroes}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Load More Heroes"}
                    </Button>
                </Box>
            )}

            {!hasMore && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <p>No more heroes</p>
                </Box>
            )}
        </Box>
    );
};

export default HeroesPage;
