import React from "react";
import AdminLayout from "../layout/AdminLayout";

class AdminView extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <AdminLayout>
                    <div className="">dashboard</div>
            </AdminLayout>
        );
    }
}

export default AdminView;