import {styled} from "@mui/material/styles";
import {alpha} from "@mui/material";

export const SearchPanel = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.9),
    },
    marginLeft: 0,
}));
export interface SearchProps {
    handleSubmit:(x:any)=>void;
}
