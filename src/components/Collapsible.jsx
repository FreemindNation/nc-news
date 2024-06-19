import { useState } from "react";

const Collapsible = ({ children, contentDescriptor, commentCount })=> {

    const [isHidden, setIsHidden] = useState(false);

    const toggleIsHidden = ()=> {
        setIsHidden(!isHidden);
    }

    return (
        <section>
            <button onClick={toggleIsHidden}>
                {isHidden ? 'Show' : 'Hide'} {contentDescriptor} ({commentCount})
            </button>
            {isHidden ? null : children}
        </section>
    );


};



export default Collapsible;