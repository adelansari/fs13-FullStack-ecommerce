import { Button, Menu, Fade, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../features/account/accountSlice";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { clearBasket } from "../../features/basket/basketSlice";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.account);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button color="inherit" onClick={handleClick} sx={{ typography: "h6", border: "1px solid black", boxShadow: "2px 2px 4px gray" }}>
                {user?.username}
                <ArrowDropDownIcon />
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem divider onClick={handleClose}>
                    My orders
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        dispatch(signOut());
                        dispatch(clearBasket());
                    }}
                >
                    Logout
                </MenuItem>
            </Menu>
        </>
    );
}
