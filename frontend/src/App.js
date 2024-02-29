import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";

import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";
import { Card, Typography } from "@mui/material";

const columns = [
  { field: "id", headerName: "S No", width: 90 },
  {
    field: "customername",
    headerName: "Customer Name",
    width: 180,
  },
  { field: "age", headerName: "Age", width: 90 },
  {
    field: "phone",
    headerName: "phone",
    width: 130,
  },
  {
    field: "location",
    headerName: "Location",
    width: 150,
  },
  {
    field: "date",
    headerName: "Date",
    width: 150,
  },
  {
    field: "time",
    headerName: "Time",
    width: 150,
  },
];

function App() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const getUserData = async () => {
      try {
        const res = await axios.get("/api/users");
        const data = res.data.map((x) => {
          const [formattedDate, formattedTime] = x.createdat.split("T");
          const date = formattedDate;
          const time = formattedTime.split(".")[0];
          return { ...x, date, time };
        });
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getUserData();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50px",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        style={{ marginTop: "15px", marginBottom: "20px" }}
      >
        USER DATA
      </Typography>

      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Card style={{ padding: "10px" }}>
          <DataGrid
            rows={users}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 15]}
          />
        </Card>
      )}
    </div>
  );
}

export default App;
