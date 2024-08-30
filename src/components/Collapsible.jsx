import { useState } from "react";
import { Button } from "@mui/material";

const Collapsible = ({ children, contentDescriptor, commentCount })=> {

    const [isHidden, setIsHidden] = useState(false);

    const toggleIsHidden = ()=> {
        setIsHidden(!isHidden);
    }

    return (
        <section>
            <Button variant="outlined" color="primary" onClick={toggleIsHidden}>
                {isHidden ? 'hide' : 'Show'} {contentDescriptor} ({commentCount})
            </Button>
            {isHidden ? children : null}
        </section>
    );


};



export default Collapsible;