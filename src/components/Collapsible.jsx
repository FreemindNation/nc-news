import { useState } from "react";
import { Button, Container} from "@mui/material";

const Collapsible = ({ children, contentDescriptor, commentCount })=> {

    const [isHidden, setIsHidden] = useState(false);

    const toggleIsHidden = ()=> {
        setIsHidden(!isHidden);
    }

    return (
        <Container>
            <Button variant="outlined" color="primary" onClick={toggleIsHidden}>
                {isHidden ? 'hide' : 'Show'} {contentDescriptor} ({commentCount})
            </Button>
            {isHidden ? children : null}
        </Container>
    );


};



export default Collapsible;