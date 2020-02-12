import { Typography, Box } from "@material-ui/core"
import { Page } from "./navbar"

interface TabPanelProps {
    children?: React.ReactNode;
    index: Page;
    value: Page;
}

export const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        {...other}
    >
        {value === index && <Box p={3}>{children}</Box>}
    </Typography>
}