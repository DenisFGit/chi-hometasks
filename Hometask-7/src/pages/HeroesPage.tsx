import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Box, Button, Typography } from "@mui/material";

import useTheme from "../hooks/useTheme";

import { fetchHeroes } from "../api/services";
import { useRequest } from "ahooks";

import type { Hero } from "../api/services";

const HeroesPage = () => {
    const [rows, setRows] = useState<Hero[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const navigate = useNavigate();
    const { isDark } = useTheme();

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", width: 130 },
        { field: "status", headerName: "Status", width: 130 },
    ];

    const { loading, run } = useRequest(fetchHeroes, {
        manual: true,
        onSuccess: (data) => {
            const newRows: Hero[] = data.results.map((item) => ({
                id: item.id,
                name: item.name,
                status: item.status,
            }));

            setRows((prev) => [...prev, ...newRows]);
            setPage((prev) => prev + 1);
            setHasMore(Boolean(data.info.next));
        },
    });

    useEffect(() => {
        run(1);
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
                backgroundColor: isDark ? "#919191" : "white",
                pb: 2,
                color: isDark ? "white" : "black",
            }}
        >
            <Typography
                variant="h1"
                fontSize={40}
                textAlign={"center"}
            >
                Heroes Page
            </Typography>

            <Box sx={{ height: "100%", width: "100%", mt: 2 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    loading={loading}
                    onRowClick={(params) => navigate(`/heroes/${params.id}`)}
                    // pagination={false}
                    sx={{
                        backgroundColor: isDark ? "#919191" : "#f5f5f5",
                        color: isDark ? "#fff" : "#000",

                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: isDark ? "#7f7f7f" : "#e0e0e0",
                            color: "black",
                        },

                        "& .MuiDataGrid-row": {
                            backgroundColor: isDark ? "#919191" : "#fff",
                            transition: "background-color 0.2s ease",
                        },

                        "& .MuiDataGrid-row:hover": {
                            backgroundColor: isDark ? "#6f6f6f" : "#f0f0f0",
                        },

                        "& .MuiDataGrid-row.Mui-selected": {
                            backgroundColor: isDark ? "#5f5f5f" : "#cce4ff",
                        },

                        "& .MuiDataGrid-row.Mui-selected:hover": {
                            backgroundColor: isDark ? "#4f4f4f" : "#b6d9ff",
                        },

                        "& .MuiDataGrid-cell": {
                            borderBottom: `1px solid ${isDark ? "#7a7a7a" : "#ddd"}`,
                        },

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
                        onClick={() => run(page)}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Load More Heroes"}
                    </Button>
                </Box>
            )}

            {!hasMore && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Typography>No more heroes</Typography>
                </Box>
            )}
        </Box>
    );
};

export default HeroesPage;