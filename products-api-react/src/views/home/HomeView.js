import React from "react";
import TopLayout from "../../layout/TopLayout";

class HomeView extends React.Component {
    
    constructor(props){
        super(props);
    }

    render(){
        return(
            <TopLayout>
                <div>Home</div>
            </TopLayout>
        );
    }
}

export default HomeView;