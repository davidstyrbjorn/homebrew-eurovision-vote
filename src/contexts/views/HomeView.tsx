import { Button, Grid } from "@mui/material";
import React, { useContext } from "react";
import { UserContext } from "../UserContext";

const HomeView: React.FC<{}> = () => {

    const {user, setUser} = useContext(UserContext)

    return ( 
        <Grid>
            <p>{user.name}</p>
            <Button onClick={() => {
                setUser({...user, name: "Hello"})
            }}>SIGN ME IN</Button>
        </Grid>
     );
}

export default HomeView;