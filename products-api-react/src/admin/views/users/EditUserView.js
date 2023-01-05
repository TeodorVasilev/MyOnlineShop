import React from "react";
import AdminLayout from "../../layout/AdminLayout";

class EditUserView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AdminLayout>
                <div>{this.props.location.state.user}</div>
            </AdminLayout>
        );
    }
}

export default EditUserView;